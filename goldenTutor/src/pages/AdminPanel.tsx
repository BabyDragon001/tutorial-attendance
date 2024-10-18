import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { BsClipboardPlus } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { PiUsersFourBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { useSpring, animated } from "@react-spring/web";
import Modal from "../components/ClassModal";
import RecordStudentDrawer from "../components/RecordStudentDrawer";
import AllClassesDrawer from "../components/AllClassesDrawer";
import AllStudentsDrawer from "../components/AllStudentsDrawer";

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAllClassesDrawerOpen, setIsAllClassesDrawerOpen] = useState(false);
  const [isAllStudentsDrawerOpen, setIsAllStudentsDrawerOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to open the Record Student drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the Record Student drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Function to open the All Classes drawer
  const openAllClassesDrawer = () => {
    setIsAllClassesDrawerOpen(true);
  };

  // Function to close the All Classes drawer
  const closeAllClassesDrawer = () => {
    setIsAllClassesDrawerOpen(false);
  };

  // Function to open the All Students drawer
  const openAllStudentsDrawer = () => {
    setIsAllStudentsDrawerOpen(true);
  };

  // Function to close the All Students drawer
  const closeAllStudentsDrawer = () => {
    setIsAllStudentsDrawerOpen(false);
  };

  return (
    <div>
      {/* Admin Panel Header */}
      <div className="h-[25vh] bg-primary relative w-full text-white flex flex-col items-center justify-center gap-2 rounded-br-full rounded-bl-full">
        <p className="text-lg">Welcome</p>
        <div className="flex gap-2 items-center justify-center">
          <GrUserAdmin />
          <p className="text-2xl">Admin Panel</p>
        </div>
      </div>

      {/* Admin Panel Buttons */}
      <div className="content w-full py-6 px-6 grid grid-cols-2 gap-7">
        <Box
          icon={<IoCreateOutline className="text-4xl text-primary" />}
          text="Create Class"
          onClick={openModal} // Attach the modal open handler
        />
        <Box
          icon={<BsClipboardPlus className="text-4xl text-primary" />}
          text="Record Student"
          onClick={openDrawer} // Attach the drawer open handler
        />
        <Box
          icon={<SiGoogleclassroom className="text-4xl text-primary" />}
          text="All classes"
          onClick={openAllClassesDrawer} // Attach the all classes drawer open handler
        />
        <Box
          icon={<PiUsersFourBold className="text-4xl text-primary" />}
          text="All Students"
          onClick={openAllStudentsDrawer} // Attach the all students drawer open handler
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-primary p-3 rounded-lg text-white">
          {" "}
          Mark attendance{" "}
        </div>
      </div>

      {/* Modal with spring animation */}
      {isModalOpen && <Modal onClose={closeModal} />}

      {/* Drawer with spring animation (Record Student) */}
      {isDrawerOpen && <RecordStudentDrawer onClose={closeDrawer} />}

      {/* Drawer for All Classes, coming from the left */}
      {isAllClassesDrawerOpen && (
        <AllClassesDrawer onClose={closeAllClassesDrawer} />
      )}

      {/* Drawer for All Students, coming from the left */}
      {isAllStudentsDrawerOpen && (
        <AllStudentsDrawer onClose={closeAllStudentsDrawer} />
      )}
    </div>
  );
};

interface IBox {
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
}

function Box({ icon, text, onClick }: IBox) {
  return (
    <div
      onClick={onClick}
      className="box h-[20vh] bg-bg rounded-lg shadow-md flex gap-2 items-center justify-center flex-col"
    >
      <div className="bg-primary/20 p-5 rounded-lg flex items-center justify-center ">
        {icon}
      </div>
      <p className="text-xl w-4/12 text-center">{text}</p>
    </div>
  );
}

export default AdminPanel;
