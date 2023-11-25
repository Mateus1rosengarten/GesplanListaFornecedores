// import {Formik ,Form , Field , ErrorMessage} from 'formik';

import { useState } from "react";
import "./editForm.css";
import axios from "axios";
import { useContext } from "react";
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
  const [setDataFormIsValid] = useState(false);
  const [enableMorePhone, setEnableMorePhone] = useState(false);
  const toast = useToast();

  const closingModal = () => {
    setIsOpenUpdate(false);
  };

  const checkingFormValidation = () => {
    return new Promise((resolve) => {
      const phoneNumberRegex = /^\(\d{2}\) \d \d{4} \d{4}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

      const validNumber = phoneNumberRegex.test(
        editSupplierValues.numberSupplier
      );
      const validAltNumber = phoneNumberRegex.test(
        editSupplierValues.alternativeNumberSupplier
      );
      const validEmail = emailRegex.test(editSupplierValues.emailSupplier);

      if (enableMorePhone) {
        if (
          editSupplierValues.nameSupplier.length <= 3 ||
          !validEmail ||
          !validNumber ||
          !validAltNumber ||
          !editSupplierValues.kindOfSupplier
        ) {
          setDataFormIsValid(false);
          resolve(false);
          toast({
            title: "Erro:",
            description:
              "Por favor insira dados validos,exatamente no formato pedido e nos campos requisitados:",
            duration: "3000",
            isClosable: true,
          });
        } else {
          setDataFormIsValid(true);
          resolve(true);
        }
      } else {
        if (
          editSupplierValues.nameSupplier.length <= 3 ||
          !validEmail ||
          !validNumber ||
          !editSupplierValues.kindOfSupplier
        ) {
          setDataFormIsValid(false);
          resolve(false);
          toast({
            title: "Erro:",
            description:
              "Por favor insira dados validos,exatamente no formato pedido e nos campos requisitados:",
            duration: "3000",
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
        const response = await axios.post(`http://localhost:3000/update/${singleID}`,
          editSupplierValues
        );

        toast({
          title: "Sucesso:",
          description: "Fornecedor atualizado com sucesso!",
          duration: "2000",
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        setIsOpenUpdate(false);
      }
    } catch (error) {
      console.log("Error in SubmitForm Edit Function", error);
    }
  };

  return (
    <>
      <div className="edit-form">
        <div className="overlay">
          <div className="modal-content">
            <h1>Editar Fornecedor</h1>

            <Box width="25vw" padding="5%">
              <FormControl marginBottom="2%" isRequired>
                <FormLabel>Nome</FormLabel>

                <Input
                  placeholder="Name"
                  type="text"
                  onChange={(e) =>
                    setEditSupplierValues({
                      ...editSupplierValues,
                      nameSupplier: e.target.value,
                    })
                  }
                  id="name"
                />
              </FormControl>

              <FormControl marginBottom="2%" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Email"
                  onChange={(e) =>
                    setEditSupplierValues({
                      ...editSupplierValues,
                      emailSupplier: e.target.value,
                    })
                  }
                  id="email"
                />
              </FormControl>

              <FormControl marginBottom="2%" isRequired>
                <FormLabel>Telefone</FormLabel>
                <Button
                  onClick={() => {
                    setEnableMorePhone(true);
                  }}
                  className="addPhone-button"
                  color="blue"
                  size="sm"
                >
                  +
                </Button>
                <Input
                  type="tel"
                  placeholder="Telefone"
                  onChange={(e) =>
                    setEditSupplierValues({
                      ...editSupplierValues,
                      numberSupplier: e.target.value,
                    })
                  }
                  id="phone"
                />
              </FormControl>

              {enableMorePhone && (
                <FormControl marginBottom="2%" isRequired>
                  <Button
                    onClick={() => {
                      setEnableMorePhone(false);
                    }}
                    className="closePhone-button"
                    color="red"
                    size="sm"
                  >
                    x
                  </Button>
                  <Input
                    type="tel"
                    placeholder="Telefone 2"
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        alternativeNumberSupplier: e.target.value,
                      })
                    }
                    id="altphone"
                  />
                </FormControl>
              )}

              <FormControl marginBottom="2%" isRequired>
                <FormLabel>Tipo de Fornecedor</FormLabel>
                <Select
                  value={editSupplierValues.kindOfSupplier}
                  placeholder="Selecione tipo de fornecedor"
                  onChange={(e) =>
                    setEditSupplierValues({
                      ...editSupplierValues,
                      kindOfSupplier: e.target.value,
                    })
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
                  type="text"
                  placeholder="Observacao"
                  onChange={(e) =>
                    setEditSupplierValues({
                      ...editSupplierValues,
                      detailsSupplier: e.target.value,
                    })
                  }
                  id="details"
                />
              </FormControl>

              <Stack marginTop="2%">
                <Button
                  onClick={closingModal}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                >
                  CANCELAR
                </Button>
                <Button onClick={submitForm} colorScheme="teal" size="sm">
                  SALVAR
                </Button>
              </Stack>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditForm;
