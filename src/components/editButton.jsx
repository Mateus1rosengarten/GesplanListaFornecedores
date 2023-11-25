import { useContext } from "react";
import { modalPopUpContext } from "../context/modalPopUpContext";
import { suppliersDataContext } from "../context/suppliersDataContext";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function EditButton() {
  const { setIsOpenUpdate } = useContext(modalPopUpContext);
  const { allowToEdit, setAllowToEdit } = useContext(modalPopUpContext);
  const { multipleID } = useContext(suppliersDataContext);
  const toast = useToast();

  useEffect(() => {
    if (multipleID && multipleID.length > 1) {
      setAllowToEdit(false);

      toast({
        title: "Mensagem:",
        description: "Voce so pode editar um item por vez",
        duration: "1500",
        isClosable: true,
      });
    }
    if (multipleID && multipleID.length == 1) {
      setAllowToEdit(true);
    } else {
      setAllowToEdit(false);
    }
  }, [multipleID]);

  const openingModal = () => {
    setIsOpenUpdate(true);
  };

  return (
    <>
      <Button
        onClick={openingModal}
        colorScheme="teal"
        size="sm"
        className="edit-button"
        isDisabled={!allowToEdit ? true : false}
      >
        Editar
      </Button>
    </>
  );
}

export default EditButton;
