import { Request, Response, Router } from "express";
import User, { IUser } from "../model/user";
import { sendOTP } from "../emailService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateIdentityNumber } from "../utils/identity";
import { uploadToCloudinary } from "../utils/cloudinary";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, number, password, name, department, level } = req.body;

  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // if (!email && !number) {
    //   return res.status(400).send("Email and phone number are required");
    // }
    const user = new User({
      email,
      number,
      password,
      department,
      level,
      name,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });
    await user.save();
    sendOTP(email, otp);
    res.status(201).send("User registered, OTP sent");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).send("Error registering user");
  }
});

router.post("/verify-otp", async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      return res.status(400).send("User not found");
    }
    if (!user.otpExpires || user.otpExpires.getTime() < Date.now()) {
      return res.status(400).send("OTP has expired");
    }

    const isMatch = await bcrypt.compare(otp, user.otp || "");
    if (!isMatch) {
      return res.status(400).send("Invalid OTP");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.identityNumber = await generateIdentityNumber();

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ identityNumber: user.identityNumber });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(400).send("Error verifying OTP");
  }
});

router.post("/resend-otp", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      return res.status(400).send("User not found");
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    sendOTP(email, otp);
    res.status(200).send("OTP resent");
  } catch (error) {
    res.status(400).send("Error resending OTP");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "login successful", user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Server error");
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.send("Logged out");
});

router.get("/verify-token", async (req: Request, res: Response) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Invalid token" });
    }
    return res.json({ isAuthenticated: true, user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Token verification failed" });
  }
});

// Update user profile
router.put("/users/:id/profile", async (req: Request, res: Response) => {
  const userId = req.params.id; // Assuming user ID is passed in the request params
  const { name, familyName, department, level, image } = req.body; // Fields that are allowed to be updated

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields (excluding role)
    if (name) user.name = name;
    if (familyName) user.familyName = familyName;
    if (department) user.department = department;
    if (level) user.level = level;
    if (image) {
      const uploadedImage = await uploadToCloudinary(image);
      user.image = uploadedImage;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
