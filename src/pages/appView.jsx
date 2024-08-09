import AddButton from "../components/addButton";
import EditButton from "../components/editButton";
import DeleteButton from "../components/deleteButton";
import AddForm from "../components/addForm";
import EditForm from "../components/editForm";
import ListSuppliers from "../components/listSuppliers";
import "../components/buttons.css";
import { modalPopUpContext } from "../context/modalPopUpContext";
import { useContext } from "react";

function AppView() {
  const { isOpenCreate,isOpenUpdate} = useContext(modalPopUpContext);

  return (
    <>
     <div className="container-buttons">
      <AddButton />
      <div className="container-edit-delete-buttons">
      <EditButton />
      <DeleteButton />
      </div>
      </div>
      <ListSuppliers />

      {isOpenCreate && <AddForm />}
      {isOpenUpdate && <EditForm />}
    </>
  );
}

export default AppView;
