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
    <div className="div-button-add"> 
      <Button
        onClick={openingModal}
        colorScheme="teal"
        className="add-button"
        w="20%"
      >
        Novo
      </Button>
      </div>
    </>
  );
}

export default AddButton;
