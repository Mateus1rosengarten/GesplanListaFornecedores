import axios from "axios";
import { useEffect} from "react";
import "./listSuppliers.css";
import { useState, useContext } from "react";
import { suppliersDataContext } from "../context/suppliersDataContext";
import { Spinner } from "@chakra-ui/react";

function ListSuppliers() {
  useEffect(() => {
    getAllSuppliers();
  }, []);

  const [trigger, setTrigger] = useState(false);
  const [savingID, setSavinID] = useState("");
  const [suppliersArray, setSupplierArray] = useState([]);
  const { setSingleID, multipleID, setMultipleID } = useContext(suppliersDataContext);
  let supplierArraySorted;

  const getAllSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/show");
      console.log("response", response);
      setSupplierArray(response.data);
    } catch (error) {
      console.log(
        "Problem tryng to fetch data in getAllSuppliers Function",
        error
      );
    }
  };

  useEffect(() => {
    const documentToUpdate = suppliersArray.find(
      (item) => item._id === savingID
    );

    if (documentToUpdate) {
      const fav = documentToUpdate.fav;
      axios.post(`http://localhost:3000/update/${savingID}`, { fav })
        .then((response) => {
          console.log("success in updateFavStatus function", response);
          setSavinID("");
        })
        .catch((error) => {
          console.log("error in updateFavStatus function", error);
        });
    } else {
      console.log("didnt found a match ID");
    }
  }, [trigger]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Tipo de Fornecedor</th>
            <th>Observação</th>
            <th>Favoritar</th>
          </tr>
        </thead>
        <tbody>
          {suppliersArray?.length >= 1 ? (
            ((supplierArraySorted = suppliersArray.sort((a, b) =>
              a.fav === b.fav ? 0 : b.fav ? 1 : -1
            )),
            supplierArraySorted.map((item) => (
              <tr key={item._id}>
                <td>
                  <input
                    onChange={(event) => {
                      const isChecked = event.target.checked;

                      if (isChecked) {
                        const supplierID = item._id;

                        setSingleID(supplierID);
                        setMultipleID((prevsIDs) => [...prevsIDs, supplierID]);
                      } else {
                        const supplierID = item._id;

                        setSingleID("");
                        {
                          multipleID?.length >= 1 &&
                            setMultipleID((prevsIDs) =>
                              prevsIDs.filter((id) => id !== supplierID)
                            );
                        }
                      }
                    }}
                    type="checkbox"
                    className="form-checkbox"
                  />
                </td>
                <td>{item.nameSupplier}</td>
                <td>{item.emailSupplier}</td>
                <td>{item.numberSupplier}</td>
                <td>{item.kindOfSupplier}</td>
                <td>{item.detailsSupplier}</td>

                <td>
                  <button
                    className="fav-button"
                    onClick={async () => {
                      setSupplierArray((prev) =>
                        prev.map((supplier) => {
                          return supplier._id === item._id
                            ? { ...supplier, fav: !supplier.fav }
                            : supplier;
                        })
                      );
                      setSavinID(item._id);
                      setTrigger(!trigger);
                    }}
                  >
                    <span className={item.fav === true ? "fav-star" : "star"}>
                      &#9734;
                    </span>
                  </button>
                </td>
              </tr>
            )))
          ) : (
            <tr>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ListSuppliers;
