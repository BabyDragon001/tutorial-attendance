import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import axiosInstance from "../axiosInstance";
import { AiFillDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi"; // Icon for class details

// Confirm modal component
const ConfirmModal = ({
  onConfirm,
  onCancel,
  isOpen,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this class?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={onConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Class details modal
const ClassDetailsModal = ({
  classId,
  onClose,
}: {
  classId: string;
  onClose: () => void;
}) => {
  const [classDetails, setClassDetails] = useState<any>(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/classes/${classId}/attendance`
        );
        setClassDetails(response.data.classDetails);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);

  return (
    <>
      {classDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-[500px] w-full">
            <h3 className="text-2xl mb-4 text-primary font-bold text-center">
              Students who attended
            </h3>

            {/* Display students */}
            <div>
              <ul className="space-y-2">
                {classDetails.students.map((student: any) => (
                  <li
                    key={student._id}
                    className="flex justify-between items-center p-2 px-3 bg-gray-100 rounded-md"
                  >
                    <div>
                      <p className="font-semibold capitalize">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-sm text-primary">
                        Points: {student.cummulativePoint}
                      </p>
                    </div>
                    {/* You can add more functionality here, like viewing student's details */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// All Classes Drawer Component
const AllClassesDrawer = ({ onClose }: { onClose: () => void }) => {
  const drawerSpring = useSpring({
    transform: "translateX(0)",
    config: { tension: 170, friction: 26 },
    from: { transform: "translateX(-100%)" },
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

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

  const handleDeleteClass = async (classId: string) => {
    try {
      await axiosInstance.delete(`/classes/${classId}`);
      setClasses(classes.filter((cls) => cls._id !== classId)); // Remove deleted class from UI
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const openDetailsModal = (classId: string) => {
    setSelectedClassId(classId);
    setDetailsModalOpen(true);
  };

  return (
    <>
      {/* Backdrop for the drawer */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Drawer Content */}
      <animated.div
        style={drawerSpring}
        className="fixed left-0 top-0 w-[300px] bg-white h-full p-8 shadow-lg z-50 overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">All Classes</h2>

        {/* Search Input */}
        <form>
          <div className="mb-4">
            <label htmlFor="className" className="block text-sm">
              Class Name
            </label>
            <input
              id="className"
              type="text"
              className="border p-4 w-full mt-2"
              placeholder="Search classes"
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

        {/* Classes List */}
        <div className="mt-4">
          {classes.length === 0 ? (
            <p>No classes found</p>
          ) : (
            <ul>
              {classes.map((cls) => (
                <li
                  key={cls._id}
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg bg-gray-100"
                >
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {cls.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {cls.description}
                    </p>
                  </div>

                  {/* Class Details Icon */}
                  <BiDetail
                    size={20}
                    onClick={() => {
                      openDetailsModal(cls._id);
                      setSelectedClassId(cls._id);
                    }}
                    className="text-primary"
                  />

                  {/* Delete Icon */}
                  <AiFillDelete
                    size={20}
                    onClick={() => {
                      setSelectedClassId(cls._id);
                      setIsConfirmModalOpen(true);
                    }}
                    className="ml-4 text-red-500"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </animated.div>

      {/* Confirmation Modal for Deletion */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={() => handleDeleteClass(selectedClassId!)}
        onCancel={() => setIsConfirmModalOpen(false)}
      />

      {/* Class Details Modal */}
      {detailsModalOpen && (
        <ClassDetailsModal
          classId={selectedClassId!}
          onClose={() => setDetailsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AllClassesDrawer;
