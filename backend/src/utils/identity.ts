import User, { IUser } from "../model/user";

export const generateIdentityNumber = async (): Promise<string> => {
  const currentYear = new Date().getFullYear().toString().slice(-2);

  // Find the user with the highest identity number
  const lastUser = await User.findOne({
    identityNumber: { $regex: `^gt/${currentYear}/` },
  }).sort({ identityNumber: -1 });

  let lastIdentityNumber = 0;
  if (lastUser && lastUser.identityNumber) {
    const lastIdentity = parseInt(lastUser.identityNumber.split("/")[2]);
    lastIdentityNumber = lastIdentity;
  }

  const newIdentityNumber = `gt/${currentYear}/${String(
    lastIdentityNumber + 1
  ).padStart(3, "0")}`;
  return newIdentityNumber;
};
