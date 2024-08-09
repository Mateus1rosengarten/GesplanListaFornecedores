import { createContext, useState } from "react";

export const suppliersDataContext = createContext();

function SuppliersDataContext({ children }) {
  const [singleID, setSingleID] = useState("");
  const [multipleID, setMultipleID] = useState([]);
  const [supplierValues, setSupplierValues] = useState({
    namesupplier: "",
    emailsupplier: "",
    numbersupplier: "",
    kindofsupplier: "",
    detailsupplier: "",
    fav: false,
  });
  const [editSupplierValues, setEditSupplierValues] = useState({
    namesupplier: "",
    emailsupplier: "",
    numbersupplier: "",
    kindofsupplier: "",
    detailsupplier: "",
  });

  return (
    <suppliersDataContext.Provider
      value={{
        supplierValues,
        setSupplierValues,
        editSupplierValues,
        setEditSupplierValues,
        singleID,
        setSingleID,
        multipleID,
        setMultipleID,
      }}
    >
      {children}
    </suppliersDataContext.Provider>
  );
}

export default SuppliersDataContext;
