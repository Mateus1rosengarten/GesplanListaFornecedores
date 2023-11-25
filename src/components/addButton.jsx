import "./buttons.css";
import { modalPopUpContext } from "../context/modalPopUpContext";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";

function AddButton() {
  const { isOpenCreate, setIsOpenCreate } = useContext(modalPopUpContext);

  const openingModal = () => {
    setIsOpenCreate(true);
    console.log(isOpenCreate);

    setTimeout(() => {
      console.log(isOpenCreate);
    }, 2000);
  };

  return (
    <>
      <Button
        onClick={openingModal}
        colorScheme="teal"
        size="sm"
        className="add-button"
        w="12%"
      >
        Novo
      </Button>
    </>
  );
}

export default AddButton;
