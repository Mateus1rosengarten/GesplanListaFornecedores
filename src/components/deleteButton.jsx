import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { modalPopUpContext } from "../context/modalPopUpContext";
import { suppliersDataContext } from "../context/suppliersDataContext";

function DeleteButton() {
  const { allowToDelete, setAllowToDelete } = useContext(modalPopUpContext);
  const { multipleID } = useContext(suppliersDataContext);
  const toast = useToast();

  useEffect(() => {
    if (multipleID && multipleID.length >= 1) {
      setAllowToDelete(true);
    } else {
      setAllowToDelete(false);
    }
  }, [multipleID]);

  const deletingSuppliers = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete/${multipleID}`);
      toast({
        title: "Sucesso:",
        description: "Colaborador/es deletados com sucesso!",
        duration: "2000",
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (error) {
      console.log("Error in deletingSupplier Function", error);
    }
  };

  return (
    <>
      <Button
        onClick={deletingSuppliers}
        colorScheme="red"
        variant="outline"
        className="delete-button"
        isDisabled={!allowToDelete ? true : false}
      >
        Deletar
      </Button>
    </>
  );
}

export default DeleteButton;
