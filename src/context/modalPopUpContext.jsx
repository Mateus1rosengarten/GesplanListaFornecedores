import { createContext, useState } from "react";

export const modalPopUpContext = createContext();

function ModalPopUpContext({ children }) {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [allowToEdit, setAllowToEdit] = useState(false);
  const [allowToDelete, setAllowToDelete] = useState(false);

  return (
    <modalPopUpContext.Provider
      value={{
        isOpenCreate,
        setIsOpenCreate,
        isOpenUpdate,
        setIsOpenUpdate,
        allowToEdit,
        setAllowToEdit,
        allowToDelete,
        setAllowToDelete,
      }}
    >
      {children}
    </modalPopUpContext.Provider>
  );
}

export default ModalPopUpContext;
