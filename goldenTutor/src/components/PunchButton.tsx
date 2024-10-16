import { useState } from "react";
import { FaFingerprint } from "react-icons/fa";

const PunchButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  // Handler for click event
  const handleClick = () => {
    setIsClicked(true);
    // Set a timeout to reset the click effect after a short delay
    setTimeout(() => {
      setIsClicked(false);
    }, 1000); // 1 second effect duration
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Punch button */}
        <div
          className={`p-4 bg-primary text-white rounded-full cursor-pointer transition-all duration-150 ${
            isClicked ? "scale-90" : "scale-100"
          }`}
          onClick={handleClick}
        >
          {/* Fingerprint icon */}
          <FaFingerprint
            className={`text-4xl transition-colors duration-300 ${
              isClicked ? "text-green-500" : "text-white"
            }`}
          />
        </div>

        {/* Green range/ring animation when clicked */}
        {isClicked && (
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <div
              className="w-full h-full border-4 border-green-500 rounded-full opacity-0 animate-pulse"
              style={{ animationDuration: "1s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PunchButton;
