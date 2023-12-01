import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import MyDropdown from "../components/MyDropdown";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";

export default function SortScribblePage() {
  const [newDrawerNameFieldSelected, setNewDrawerNameFieldSelected] =
    useState(true);
  const [displayMessage, setDisplayMessage] = useState(
    "Or choose from existing drawer"
  );

  const navigate = useNavigate();
  const { state } = useLocation();
  // const data = useDataContext();
  const { drawers, scribbles } = useDataContext();

  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();

  //console.log("State", state);

  //To persist selected Scribble ID so browser refresh won't wipe it
  useEffect(() => {
    setSelectedScribbleId(state.id);
    handleSelectedDrawerId(""); //this is still bit in quesion
  }, []);

  //console.log("Sccribleid is", selectedScribbleId);

  const addScribbleToNewSubDrawer = (passedId) => {
    console.log("PUT");
    // const scribbleObject = data["scribbles"].filter(
    // const scribbleObject = Array(scribbles).filter(
    const scribbleObject = scribbles.filter(
      (item) => item._id == selectedScribbleId
    );

    let dataPost = {
      rootDrawerId: passedId,
      drawerId: passedId,
      userId: 1,
      title: scribbleObject[0]["title"],
      content: scribbleObject[0]["content"],
      type: "scribble",
      //ids: selectedScribbleId,
      stray: false,
      level: 1,
      attachment: scribbleObject[0]["attachment"],
      files: [scribbleObject[0]["files"]],
    };
    // fetch(`http://localhost:3000/scribbles/${selectedScribbleId}`, {
    fetch(`http://localhost:8080/api/scribbles/${selectedScribbleId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const createNewDrawer = () => {
    // console.log("drawer length: ", Object.values(data["drawers"]).length);
    let dataPost = {
      // rootId: Object.values(data["drawers"]).length + 1,
      rootId: Object.values(drawers).length + 1,
      // rootId: dataPost._id,

      userId: 1,
      // id: Object.values(data["drawers"]).length + 1,
      // id: Object.values(drawers).length + 1,
      //idd: drawers.length + 1,

      name: drawerName.toUpperCase(),
      type: "drawer",
      subDrawer: false,
      root: true,
      level: 1,
    };
    // fetch("http://localhost:3000/drawers", {
    fetch("http://localhost:8080/api/drawers/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    }).then((response) => console.log(response.json()));

    // addScribbleToNewSubDrawer(Object.values(data["drawers"]).length + 1);
    // addScribbleToNewSubDrawer(Object.values(drawers).length + 1);
    console.log("dataPost.ID", dataPost._id)
    addScribbleToNewSubDrawer(dataPost._id);
  };

  const handleChange = (value) => {
    console.log(value);
    //somehow need a spot to set this state
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
    setDrawerName("");
  };

  //console.log("NewDrawerNameFieldSelected", newDrawerNameFieldSelected);

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage === "Or choose from existing drawer"
        ? setDisplayMessage("Or create new top level drawer")
        : setDisplayMessage("Or choose from existing drawer");
    }
  };

  return (
    <div id="page">
      <h4>Scribble ID: {selectedScribbleId}</h4>
      <h4>Selected Drawer Id: {selectedDrawerId}</h4>
      <div>
        {newDrawerNameFieldSelected && (
          <>
            <InputField
              type="text"
              name="create-new-drawer"
              id="create-new-drawer"
              placeholder="Enter new drawer name"
              value={drawerName}
              handleNewDrawerChange={handleChange}
            />
            <br />
            <MyButton
              href={null}
              btnName="Create & Save"
              handleNewDrawerCreate={handleCreate}
              drawerName={drawerName}
            />
          </>
        )}
      </div>

      <button className="sort-msg-btn" onClick={handleDisplay}>
        {displayMessage}
      </button>

      {!newDrawerNameFieldSelected && (
        <>
          <MyDropdown
          // data={data}
          // selectedDrawerId={selectedDrawerId}
          // setSelectedDrawerId={setSelectedDrawerId}
          />
          <Button
            variant="success"
            className="next-btn"
            onClick={(e) => {
              e.preventDefault();
              let passingData = { selectedScribbleId, selectedDrawerId };
              console.log("PassingData", passingData);
              navigate("/sort-preview", { state: passingData });
            }}
          >
            Next
          </Button>
        </>
      )}

      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
