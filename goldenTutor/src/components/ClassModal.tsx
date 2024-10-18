// Modal Component
import { useSpring, animated } from "@react-spring/web";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const modalSpring = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    config: { tension: 170, friction: 26 },
    from: { opacity: 0, transform: "translateY(-100px)" },
  });

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Modal Content */}
      <animated.div
        style={modalSpring}
        className="fixed left-[20%] top-[40%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50"
      >
        <h2 className="text-2xl font-bold mb-4">Create a New Class</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="className" className="block text-sm">
              Class Name
            </label>
            <input
              id="className"
              type="text"
              className="border p-4 w-full mt-2"
              placeholder="Enter class name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="border p-4 w-full mt-2"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-primary text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Create
            </button>
          </div>
        </form>
      </animated.div>
    </>
  );
};
export default Modal;
