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
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();
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
    const scribbleObject = scribbles.filter(
      (item) => item._id == selectedScribbleId
    );

    let dataPost = {
      rootDrawerId: passedId,
      drawerId: passedId,
      // userId: 1,
      // title: scribbleObject[0]["title"],
      // content: scribbleObject[0]["content"],
      // type: "scribble",
      stray: false,
      level: 1,
      // attachment: scribbleObject[0]["attachment"],
      // files: [scribbleObject[0]["files"]],
    };
    fetch(`http://localhost:8080/api/scribbles/${selectedScribbleId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      // .then((json) => {
      //   setScribbles((prevItems) => [...prevItems, json.data]);
      // })
      
      .catch((error) => console.error(error.message));
  };

  const createNewDrawer = () => {
    let dataPost = {
      rootId: drawers.length + 1,
      userId: 1,
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
        addScribbleToNewSubDrawer(json.data._id);
      })
      .catch((error) => console.error(error.message));
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
    navigate("/");
    navigate(0);
  };

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage == "Or choose from existing drawer"
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
