import { useState } from "react";
import axios from "axios";
import "./addForm.css";
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

function AddForm() {
  const { supplierValues, setSupplierValues } = useContext(suppliersDataContext);
  const { setIsOpenCreate } = useContext(modalPopUpContext);
  const [dataFormIsValid,setDataFormIsValid] = useState(false);
  const toast = useToast();

  const closingModal = () => {
    setIsOpenCreate(false);
  };

  const checkingFormValidation = () => {
    return new Promise((resolve) => {
      const phoneNumberRegex = /^\(\d{2}\)\s?\d\s?\d{4}\s?\d{4}$|^\(\d{2}\)\s?\d{8,9}$|^\(\d{2}\)\d\s\d{8}$|^\(\d{2}\)\s?\d{9}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

      const validNumber = phoneNumberRegex.test(supplierValues.numbersupplier);
      const validEmail = emailRegex.test(supplierValues.emailsupplier);

      console.log(
        supplierValues.namesupplier,supplierValues.emailsupplier,supplierValues.numbersupplier,supplierValues.kindofsupplier,supplierValues.detailsupplier
        ,validNumber,validEmail
      )

      if (
        supplierValues.namesupplier.length <= 3 ||
        !validEmail ||
        !validNumber ||
        !supplierValues.kindofsupplier
      ) {
        setDataFormIsValid(false);
        toast({
          title: "Erro:",
          description:
            "Por favor insira dados validos,exatamente  no formato pedido e nos campos requisitados:",
          duration: "2000",
          isClosable: true,
        });
        resolve(false);
      } else {
        setDataFormIsValid(true);
        resolve(true);
      }
    });
  };

  const submitForm = async () => {
    try {
      const validFormData = await checkingFormValidation();

      if (validFormData) {
        
        const response = await axios.post("http://localhost:3000/create",supplierValues);
        console.log('response from submit createForm',response);
        toast({
          title: "Sucesso:",
          description: `${supplierValues.kindofsupplier} adicionado com sucesso!`,
          duration: "2000",
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);

        setIsOpenCreate(false);
      }
    } catch (error) {
      console.log("Error sending data to DB", error);
    }
  };

  return (
    <>
      <div className="add-form">
        <div className="overlay">
          <div className="modal-content">
            <h1 className="heading-add-form">Criar Novo Fornecedor</h1>

            <Box width="25vw" padding="5%" marginTop="2vw">
              <FormControl isRequired marginBottom="5%">
                <FormLabel>Nome</FormLabel>

                <Input
                  placeholder="Nome do fornecedor ou empresa"
                  type="text"
                  onChange={(e) =>
                    setSupplierValues({
                      ...supplierValues,
                      namesupplier: e.target.value,
                    })
                  }
                  id="name"
                />
              </FormControl>

              <FormControl isRequired marginBottom="5%">
                <FormLabel>Email</FormLabel>
                <Input
                
                  type="text"
                  placeholder="xxxxx@xxxx.com"
                  onChange={(e) =>
                    setSupplierValues({
                      ...supplierValues,
                      emailsupplier: e.target.value,
                    })
                  }
                  id="email"
                />
              </FormControl>

              <FormControl isRequired marginBottom="5%">
                <FormLabel>Telefone</FormLabel>
                <Input
                
                  type="tel"
                  placeholder="(xx)xxxxxxxxx"
                  onChange={(e) =>
                    setSupplierValues({
                      ...supplierValues,
                      numbersupplier: e.target.value,
                    })
                  }
                  id="phone"
                />
              </FormControl>

              <FormControl isRequired marginBottom="5%" className="kindOf-form-control">
                <FormLabel>Tipo de Fornecedor</FormLabel>
                <Select
                  value={supplierValues.kindOfSupplier}
                  placeholder="Selecione tipo de fornecedor"
                  onChange={(e) =>
                    setSupplierValues({
                      ...supplierValues,
                      kindofsupplier: e.target.value,
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

              <FormControl marginBottom="15%">
                <FormLabel>Detalhes</FormLabel>
                <Textarea
                resize={'none'}
                  type="text"
                  onChange={(e) =>
                    setSupplierValues({
                      ...supplierValues,
                      detailsupplier: e.target.value,
                    })
                  }
                  id="pass"
                />
              </FormControl>

              <Stack>
                <Button
                className="close-modal-button"
                  onClick={closingModal}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                >
                  CANCELAR
                </Button>
                <Button
                className="add-supplier-button"
                onClick={submitForm} colorScheme="teal" size="sm">
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

export default AddForm;
