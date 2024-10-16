import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stateManager";
import { GrFormSchedule } from "react-icons/gr";
import { FiUserPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineFingerprint } from "react-icons/md";
import { TbPlayerTrackNext } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

interface Iclass {
  _id: string;
  name: string;
  description: string;
  students: string[];
}

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [classes, setClasses] = useState<Iclass[]>([]); // State for classes
  const [specialCode, setSpecialCode] = useState<string | null>(null); // For storing the special code
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For handling error messages
  const [disablePunchIn, setDisablePunchIn] = useState(false); // Disable punch-in if already active
  const navigate = useNavigate();

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const dropDownAnimation = useSpring({
    transform: isScheduleOpen ? "translateY(0)" : "translateY(-100%)",
    opacity: isScheduleOpen ? 1 : 0,
    config: {
      tension: 500,
      friction: 15,
      mass: 1,
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get("/classes");
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  // Punch-in logic
  const handlePunchIn = async () => {
    try {
      const response = await axiosInstance.post("/punch-in", {
        userId: user?._id,
      });
      setSpecialCode(response.data.specialCode);
      setIsPunchedIn(true); // User is now punched in
      setErrorMessage(null); // Clear any previous error
      setDisablePunchIn(true); // Disable further punch-ins for 2 hours

      // Automatically re-enable punch-in after 2 hours
      setTimeout(() => {
        setDisablePunchIn(false);
        setIsPunchedIn(false);
        setSpecialCode(null); // Clear the special code after 2 hours
      }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while punching in."
      );
      setIsPunchedIn(false);
    }
  };

  const getNextClass = (
    timetable: { day: string; time: string; course: string }[]
  ) => {
    const now = new Date();
    const currentDayIndex = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format

    // Define the days of the week for easy reference
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Loop through the timetable to find the next class
    for (let i = 0; i < timetable.length; i++) {
      const { day, time } = timetable[i];
      const dayIndex = daysOfWeek.indexOf(day);

      // Check if the class is tomorrow or next week
      if (
        dayIndex > currentDayIndex ||
        (dayIndex === 0 && currentDayIndex === 6)
      ) {
        // Wrap around from Saturday to Sunday
        return timetable[i]; // Return the next class
      }
    }

    // If no next class found, return null
    return null;
  };

  const timetable = [
    { day: "Monday", time: "08:00", course: "TBD" },
    { day: "Tuesday", time: "12:30", course: "TBD" },
    { day: "Wednesday", time: "15:00", course: "TBD" },
    { day: "Saturday", time: "11:00", course: "TBD" },
  ];

  const nextClass = getNextClass(timetable);

  return (
    <div className="bg-bg w-[100vw] h-[150vh] flex flex-col items-center">
      {/* Header with user info */}
      <div className="h-[15vh] w-[95%] my-4 flex items-center justify-between px-4">
        <div className="flex gap-3 h-full items-center ">
          <div className="h-12 w-12 rounded-full border border-primary flex items-center justify-center">
            {user?.image ? (
              <img src={user.image} alt="user pic" className="rounded-full" />
            ) : (
              <FiUserPlus
                onClick={() => navigate("profile")}
                className="text-primary text-2xl"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="uppercase">Hey {user?.name}</p>
            <p className="uppercase text-gray-500">{user?.identityNumber}</p>
          </div>
        </div>
        <GrFormSchedule
          className="text-primary text-3xl cursor-pointer"
          onClick={toggleSchedule}
        />
      </div>

      {/* Display current time */}
      <div className="h-[10%] flex items-center justify-center flex-col w-full gap-1">
        <p className="text-5xl text-primary">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-sm text-gray-600">
          {currentTime.toLocaleDateString()} -{" "}
          {currentTime.toLocaleString("en-US", { weekday: "long" })}
        </p>
      </div>

      {/* Punch In/Out Button */}
      <div className="h-[25%] flex items-center justify-center flex-col w-full gap-1 ">
        <div className="firstC">
          <div
            className={`secondC p-4 rounded-full transition-all duration-300 ${
              isPunchedIn
                ? "bg-green-100 border-8 border-green-500 "
                : "bg-white border-2"
            }`}
          >
            <div className="thirdC flex flex-col items-center gap-2">
              <MdOutlineFingerprint
                onClick={handlePunchIn}
                className={`text-5xl cursor-pointer transition-colors duration-300 ${
                  disablePunchIn
                    ? "text-gray-500"
                    : isPunchedIn
                    ? "text-green-500"
                    : "text-primary"
                }`}
                disabled={disablePunchIn}
              />
              <p className="uppercase text-xs font-bold">
                {disablePunchIn
                  ? "Already active"
                  : `Punch ${isPunchedIn ? "out" : "in"}`}
              </p>
              {specialCode && <p>Special Code: {specialCode}</p>}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Available Classes Section */}
      <div className="w-[90%] mt-6 flex flex-wrap justify-center gap-4">
        <p>Available classes</p>
        {classes?.map((classItem: Iclass) => (
          <div
            key={classItem._id}
            className="bg-white shadow-lg rounded-lg p-4 w-[300px] relative"
          >
            <h2 className="text-xl font-bold capitalize">{classItem.name}</h2>
            <p className="text-gray-600 capitalize">{classItem.description}</p>
            <p className="text-sm text-gray-500">
              {classItem.students.length}{" "}
              {classItem.students.length === 1 ? "student " : "students "}
              enrolled
            </p>
            <div
              className={`w-[10%] h-full absolute top-0 right-0 rounded-lg ${
                classItem.students.includes(user?._id as string)
                  ? "bg-green-500"
                  : "bg-primary"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Next Class */}
      {nextClass ? (
        <div className="next-class bg-white shadow-lg rounded-lg p-4 w-[90%] mt-6 flex flex-col">
          <div className="w-full bg-primary flex p-2 text-white items-center gap-5 rounded-lg">
            <TbPlayerTrackNext className="text-2xl" />
            <h2 className="text-xl font-bold capitalize">Next Class</h2>
          </div>

          <div className="flex gap-3 px-3 items-center justify-center mt-3">
            <IoIosTimer className="text-primary text-2xl" />
            <p className="text-gray-600">{nextClass.day}</p>
            <p className="text-gray-600">{nextClass.time}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-600 font-bold text-xl">
              {nextClass.course}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No more classes today!</p>
      )}

      <div className="min-h-[22vh] bg-bg w-full mt-3"></div>
      <animated.div
        style={dropDownAnimation}
        className="w-full h-full bg-white shadow-md fixed top-0 left-0 z-10 flex flex-col"
      >
        <div className="flex justify-end p-4">
          <IoClose
            className="text-3xl cursor-pointer text-gray-700"
            onClick={toggleSchedule}
          />
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          <p className="text-center text-xl font-semibold mb-6">
            Tutorial Timetable
          </p>
          <ul className="text-lg space-y-4">
            <div className="flex gap-5 w-[97%] justify-center items-center">
              <p className="w-[36%] text-sm p-2 text-center font-bold">D.O.W</p>
              <p className="w-[36%] text-sm p-2 text-center font-bold">Time </p>
              <p className="w-[36%] text-sm p-2 text-center font-bold">
                Courses
              </p>
            </div>
            {/* Example timetable rows */}
            <div className="flex gap-5 w-[90%] justify-center items-center">
              <p className="w-[36%] text-sm p-2 text-center">Monday</p>
              <p className="w-[36%] text-sm p-2 text-center">8-10:30am </p>
              <p className="w-[36%] text-sm p-2 text-center">TBD</p>
            </div>
            <div className="flex gap-5 w-[90%] justify-center items-center">
              <p className="w-[36%] text-sm p-2 text-center">Tuesday</p>
              <p className="w-[36%] text-sm p-2 text-center">12:30-2pm </p>
              <p className="w-[36%] text-sm p-2 text-center">TBD</p>
            </div>
          </ul>
        </div>
      </animated.div>
    </div>
  );
};

export default Home;
