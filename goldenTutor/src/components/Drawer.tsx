import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const BottomDrawer = ({ specialCode }) => {
  return (
    <Drawer>
      <DrawerTrigger className="p-2 shadow-lg rounded-lg py-2 px-4 flex items-center justify-center">
        Open Code
      </DrawerTrigger>
      <DrawerContent className="backdrop-blur-lg">
        <DrawerHeader>
          <DrawerTitle className="text-white gap-3 ">
            Your Code is <br /> <br />
            {specialCode ? specialCode : "Please make yourself active"}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button className="bg-primary text-white">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomDrawer;
