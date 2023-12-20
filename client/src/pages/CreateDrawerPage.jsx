import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import "../css/CreateDrawerPage.css";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";

export default function CreateDrawerPage({user, setUser}) {
  const navigate = useNavigate();
  const { drawers, scribbles, setDrawers } = useDataContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();

console.log("user ID", user._id)

  //working! POST
  const createNewDrawer = () => {
    let dataPost = {
      rootId: drawers.length + 1,
      userId: user._id,
      name: drawerName.toUpperCase(),
      type: "drawer",
      subDrawer: false,
      root: true,
      level: 1,
    };
    fetch("http://localhost:8080/api/drawers/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((json) => {
        setDrawers((prevItems) => [...prevItems, json.data]);
        // sessionStorage.setItem("newDrawerId", json.data._id)
      })
      .catch((error) => console.error(error.message));
  };

  const handleChange = (value) => {
    //console.log(value);
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    //console.log("Create btn clicked", value);
    createNewDrawer();
    setDrawerName("");
    navigate("/home");
    // sessionStorage.setItem("newDrawerId", drawerName)

  };

  // useEffect(()=>{
  //   setDrawers(drawers)
  //   sessionStorage.setItem("drawers", JSON.stringify(drawers));
  //   //setDrawers(sessionStorage.setItem("drawers", JSON.stringify(drawers)))
  //   // sessionStorage.setItem("scribbles", JSON.stringify(scribbles))

  // }, [createNewDrawer])

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
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-success cancel-btn"
      >
        Cancel
      </button>
    </div>
  );
}
