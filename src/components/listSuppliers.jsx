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
      (item) => item.id === savingID
    );

    if (documentToUpdate) {
      const fav = documentToUpdate.fav;
      axios.post(`http://localhost:3000/updateFav/${savingID}`, { fav })
        .then((response) => {
          console.log("success in updateFavStatus function", response);
          setSavinID('');
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
    <div className="container-form-list"> 
      <table>
        <thead>
          <tr>
            <th className="th-check"></th>
            <th className="th-name">Nome</th>
            <th className="th-email">E-mail</th>
            <th className="th-number">Telefone</th>
            <th className="th-kind-supplier">Tipo de Fornecedor</th>
            <th className="th-details">Observação</th>
            <th className="th-fav">Favoritar</th>
          </tr>
        </thead>
        <tbody>
          {suppliersArray?.length >= 1 ? (
            ((supplierArraySorted = suppliersArray.sort((a, b) =>
              a.fav === b.fav ? 0 : b.fav ? 1 : -1
            )),
            supplierArraySorted.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    onChange={(event) => {
                      const isChecked = event.target.checked;

                      if (isChecked) {
                        const supplierID = item.id;

                        setSingleID(supplierID);
                        setMultipleID((prevsIDs) => [...prevsIDs, supplierID]);
                      } else {
                        const supplierID = item.id;

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
                <td className="td-name">{item.namesupplier}</td>
                <td>{item.emailsupplier}</td>
                <td className="td-number">{item.numbersupplier} <br />
                {item.alternativenumbersupplier && item.alternativenumbersupplier}
                </td>
                <td>{item.kindofsupplier}</td>
                <td>{item.detailsupplier}</td>

                <td>
                  <button
                    className="fav-button"
                    onClick={async () => {
                      setSupplierArray((prev) =>
                        prev.map((supplier) => {
                          return supplier.id === item.id
                            ? { ...supplier, fav: !supplier.fav }
                            : supplier;
                        })
                      );
                      setSavinID(item.id);
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
      </div>
    </>
  );
}

export default ListSuppliers;
