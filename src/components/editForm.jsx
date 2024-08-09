import { useState, useContext } from "react";
import "./editForm.css";
import axios from "axios";
import { suppliersDataContext } from "../context/suppliersDataContext";
import { modalPopUpContext } from "../context/modalPopUpContext";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";

function EditForm() {
  const { editSupplierValues, setEditSupplierValues, singleID } = useContext(suppliersDataContext);
  const { setIsOpenUpdate } = useContext(modalPopUpContext);
  const [dataFormIsValid, setDataFormIsValid] = useState(false);
  const [enableMorePhone, setEnableMorePhone] = useState(false);
  const toast = useToast();

  const closingModal = () => {
    setIsOpenUpdate(false);
  };

  const checkingFormValidation = () => {
    return new Promise((resolve) => {
      const phoneNumberRegex = /^\(\d{2}\)\s?\d\s?\d{4}\s?\d{4}$|^\(\d{2}\)\s?\d{8,9}$|^\(\d{2}\)\d\s\d{8}$|^\(\d{2}\)\s?\d{9}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

      const validNumber = phoneNumberRegex.test(editSupplierValues.numbersupplier);
      const validAltNumber = phoneNumberRegex.test(editSupplierValues.alternativenumbersupplier);
      const validEmail = emailRegex.test(editSupplierValues.emailsupplier);

      if (enableMorePhone) {
        if (
          editSupplierValues.namesupplier.length <= 3 ||
          !validEmail ||
          !validNumber ||
          !validAltNumber ||
          !editSupplierValues.kindofsupplier
        ) {
          setDataFormIsValid(false);
          resolve(false);
          toast({
            title: "Erro:",
            description: "Por favor insira dados válidos, exatamente no formato pedido e nos campos requisitados:",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setDataFormIsValid(true);
          resolve(true);
        }
      } else {
        if (
          editSupplierValues.namesupplier.length <= 3 ||
          !validEmail ||
          !validNumber ||
          !editSupplierValues.kindofsupplier
        ) {
          setDataFormIsValid(false);
          resolve(false);
          toast({
            title: "Erro:",
            description: "Por favor insira dados válidos, exatamente no formato pedido e nos campos requisitados:",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setDataFormIsValid(true);
          resolve(true);
        }
      }
    });
  };

  const submitForm = async () => {
    try {
      const validFormData = await checkingFormValidation();

      if (validFormData) {
        await axios.post(`http://localhost:3000/update/${singleID}`, editSupplierValues);

        toast({
          title: "Sucesso:",
          description: "Fornecedor atualizado com sucesso!",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        setIsOpenUpdate(false);
      }
    } catch (error) {
      console.error("Error in SubmitForm Edit Function", error);
    }
  };

  return (
    <div className="edit-form">
      <div className="overlay">
        <div className="modal-edit-content">
          <h1>Editar Fornecedor</h1>

          <Box width="25vw" padding="5%">
            <FormControl marginBottom="2%" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Name"
                type="text"
                value={editSupplierValues.namesupplier}
                onChange={(e) =>
                  setEditSupplierValues({ ...editSupplierValues, namesupplier: e.target.value })
                }
                id="name"
              />
            </FormControl>

            <FormControl marginBottom="2%" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                placeholder="Email"
                value={editSupplierValues.emailsupplier}
                onChange={(e) =>
                  setEditSupplierValues({ ...editSupplierValues, emailsupplier: e.target.value })
                }
                id="email"
              />
            </FormControl>

            <div className="container-tel">
              <FormControl marginBottom="2%" isRequired>
                <FormLabel className="form-label-number">Telefone</FormLabel>
                <Button
                onClick={() => setEnableMorePhone((prev) => !prev)}
                className={enableMorePhone ? "closePhone-button" : "addPhone-button"}
                color={enableMorePhone ? "red" : "blue"}
                size="sm"
              >
                {enableMorePhone ? "x" : "+"}
              </Button>
              
                <Input
                  className="tel-number"
                  type="tel"
                  placeholder="(xx)xxxxxxxxx"
                  value={editSupplierValues.numbersupplier}
                  onChange={(e) =>
                    setEditSupplierValues({ ...editSupplierValues, numbersupplier: e.target.value })
                  }
                  id="phone"
                />
              </FormControl>
             

              {enableMorePhone && (
                <FormControl marginBottom="2%">
                  <FormLabel>Telefone Alternativo</FormLabel>
                  <Input
                    className="input-alter-number"
                    type="tel"
                    placeholder="(xx)xxxxxxxxx"
                    value={editSupplierValues.alternativenumbersupplier}
                    onChange={(e) =>
                      setEditSupplierValues({ ...editSupplierValues, alternativenumbersupplier: e.target.value })
                    }
                    id="altphone"
                  />
                </FormControl>
              )}

             
            </div>

            <FormControl marginBottom="2%" isRequired>
              <FormLabel>Tipo de Fornecedor</FormLabel>
              <Select
                value={editSupplierValues.kindofsupplier}
                placeholder="Selecione tipo de fornecedor"
                onChange={(e) =>
                  setEditSupplierValues({ ...editSupplierValues, kindofsupplier: e.target.value })
                }
                id="kindOf"
              >
                <option value="Atacadista">Atacadista</option>
                <option value="Fornecedor">Fornecedor</option>
                <option value="Fabricante">Fabricante</option>
                <option value="Varejista">Varejista</option>
              </Select>
            </FormControl>

            <FormControl marginBottom="2%">
              <FormLabel>Detalhes</FormLabel>
              <Textarea
              resize={'none'}
                type="text"
                placeholder="Observação"
                value={editSupplierValues.detailsupplier}
                onChange={(e) =>
                  setEditSupplierValues({ ...editSupplierValues, detailsupplier: e.target.value })
                }
                id="details"
              />
            </FormControl>

            <Stack marginTop="2%">
              <Button 
              className="close-modal-button"
              onClick={closingModal} colorScheme="red" variant="outline" size="sm">
                CANCELAR
              </Button>
              <Button
              className="save-edit-supplier"
               onClick={submitForm} colorScheme="teal" size="sm">
                SALVAR
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
