import { useState } from "react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import "../css/CreateDrawerPage.css";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";


  export default function CreateDrawerPage() {

  const navigate = useNavigate();
//  const data = useDataContext();
const {drawers, scribbles} = useDataContext();

 const [drawerName, setDrawerName] = useDrawerNameContext();
  //working! POST
  const createNewDrawer = () => {
    // console.log("drawer length: ", Object.values(data['drawers']).length)
    let dataPost = {
      // "rootId":Object.values(data['drawers']).length + 1,
      "rootId":Object.values(drawers).length + 1,
      "userId": 1,
      // "id":Object.values(data['drawers']).length + 1,
      "id":Object.values(drawers).length + 1,

      "name": drawerName.toUpperCase(),
      "type": "drawer",
      "subDrawer": false,
      "root":true,
      "level":1,
    }
    // fetch("http://localhost:3000/drawers", {
      fetch("http://localhost:8080/api/drawers", {

      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    }).then((response) => console.log(response.json()))
    .catch((error)=> console.error(error.message));
    
  };

  const handleChange = (value) => {
    console.log(value);
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
  };

  return (
    <div className="CreateDrawerPage">
      <form>
        <InputField
          htmlFor="new-drawer"
          name="new-drawer"
          id="new-drawer"
          placeholder="New Drawer Name"
          type="text"
          value={drawerName}
          // onChange={handleChange}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <MyButton
          href={null}
          btnName="Create"
          handleNewDrawerCreate={handleCreate}
          drawerName={drawerName}
        />
        <br />
      </form>
      <button onClick={() => navigate(-1)} className="btn btn-outline-success cancel-btn">Cancel</button>

    </div>
  );
}
