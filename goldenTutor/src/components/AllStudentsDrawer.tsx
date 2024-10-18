// All Students Drawer (left side)
import { useSpring, animated } from "@react-spring/web";

const AllStudentsDrawer = ({ onClose }: { onClose: () => void }) => {
  const drawerSpring = useSpring({
    transform: "translateX(0)",
    config: { tension: 170, friction: 26 },
    from: { transform: "translateX(-100%)" },
  });

  return (
    <>
      {/* Backdrop for the drawer */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      {/* Drawer Content */}
      <animated.div
        style={drawerSpring}
        className="fixed left-0 top-0 w-[300px] bg-white h-full p-8 shadow-lg z-50"
      >
        <h2 className="text-2xl font-bold mb-4">All Students</h2>
        {/* Add content for all students */}
        <form>
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-sm">
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              className="border p-4 w-full mt-2"
              placeholder="Search students"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-primary text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Search
            </button>
          </div>
        </form>
      </animated.div>
    </>
  );
};
export default AllStudentsDrawer;
