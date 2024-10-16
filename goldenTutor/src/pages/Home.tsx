import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stateManager";
import { GrFormSchedule } from "react-icons/gr";
import { FiUserPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineFingerprint } from "react-icons/md";
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
  const navigate = useNavigate();

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const togglePunchIn = () => {
    setIsPunchedIn(!isPunchedIn);
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

  return (
    <div className="bg-bg w-[100vw] h-[200vh] flex flex-col items-center">
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
                onClick={togglePunchIn}
                className={`text-5xl cursor-pointer transition-colors duration-300 ${
                  isPunchedIn ? "text-green-500" : "text-primary"
                }`}
              />
              <p className="uppercase text-xs font-bold">Punch in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Classes Section */}
      <div className="w-[90%] mt-6 flex flex-wrap justify-center gap-4">
        {classes?.map((classItem: Iclass) => (
          <div
            key={classItem._id}
            className="bg-white shadow-lg rounded-lg p-4 w-[300px]"
          >
            <h2 className="text-xl font-bold">{classItem.name}</h2>
            <p className="text-gray-600">{classItem.description}</p>
            <p className="text-sm text-gray-500">
              {classItem.students.length}{" "}
              {classItem.students.length === 1 ? "student" : "students"}{" "}
              enrolled
            </p>
          </div>
        ))}
      </div>

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
            <li>Monday: Math Class</li>
            <li>Tuesday: Science Class</li>
            <li>Wednesday: History Class</li>
            <li>Thursday: Art Class</li>
            <li>Friday: Sports</li>
          </ul>
        </div>
      </animated.div>
    </div>
  );
};

export default Home;
