// Record Student Drawer (right side)
import { useSpring, animated } from "@react-spring/web";

const RecordStudentDrawer = ({ onClose }: { onClose: () => void }) => {
  const drawerSpring = useSpring({
    transform: "translateX(0)",
    config: { tension: 170, friction: 26 },
    from: { transform: "translateX(100%)" },
  });

  return (
    <>
      {/* Backdrop for the drawer */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      {/* Drawer Content */}
      <animated.div
        style={drawerSpring}
        className="fixed right-0 top-0 w-[300px] bg-white h-full p-8 shadow-lg z-50"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Record Student</h2>
        <p className="text-xl font-bold mb-4 text-primary">
          Add to the point of a student
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="studentname" className="block text-sm">
              Student Name
            </label>
            <input
              id="studentname"
              type="text"
              className="border p-4 w-full mt-2"
              placeholder="Enter student Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="marks" className="block text-sm">
              Marks
            </label>
            <input
              id="marks"
              type="number"
              className="border p-4 w-full mt-2"
              placeholder="Enter marks"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-primary text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Submit
            </button>
          </div>
        </form>
      </animated.div>
    </>
  );
};
export default RecordStudentDrawer;
