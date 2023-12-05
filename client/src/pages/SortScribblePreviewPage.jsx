import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import { useState } from "react";
import "../css/SortPreviewPage.css";
import MyButton from "../components/MyButton";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";

export default function SortScribblePreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newSubDrawerName, setNewSubDrawerName] = useState("");
  const [saveHereSelected, setSaveHereSelected] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("Or create sub-drawer");
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();
  const [selectedScribbleId] = useSelectedScribbleContext();

  console.log("State", state.selectedDrawerId);

  const updateParentDrawerBoolean = (parentDrawerId) => {
    let dataPost;
    const x = drawers.filter((item) => item._id == parentDrawerId);

    //Something wrong with here
    if (x[0]["drawerId"]) {
      dataPost = {
        rootId: x[0]["rootId"],
        drawerId: x[0]["drawerId"],
        userId: 1,
        name: x[0]["name"],
        type: "drawer",
        ["subDrawer"]: true,
        level: x[0]["level"],
        root: x[0]["root"],
      };
    } else {
      dataPost = {
        rootId: parentDrawerId,
        userId: 1,
        name: x[0]["name"],
        type: "drawer",
        ["subDrawer"]: true,
        level: 1,
        root: true,
      };
    }

    fetch(`http://localhost:8080/api/drawers/${parentDrawerId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((json) => (prevItems) => [...prevItems, json.data])
      .catch((error) => console.error(error.message));
  };

  const addScribbleToNewSubDrawer = (passedId, selectedDrawerLevel) => {
    const scribbleObject = scribbles.filter(
      (item) => item._id == selectedScribbleId
    );

    const newlyCreatedDrawerObj = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    let dataPost = {
      rootDrawerId: newlyCreatedDrawerObj[0]["rootId"],
      drawerId: passedId,
      userId: 1,
      title: scribbleObject[0]["title"],
      content: scribbleObject[0]["content"],
      type: "scribble",
      stray: false,
      level: selectedDrawerLevel,
      attachment: scribbleObject[0]["attachment"],
      files: scribbleObject[0]["files"],
    };
    fetch(`http://localhost:8080/api/scribbles/${state.selectedScribbleId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((json) => {
        setScribbles((prevItems) => [...prevItems, json.data]);
      })
      .catch((error) => console.error(error.message));
  };

  const createNewSubDrawer = () => {
    const selectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    console.log("parent folder RootID", selectedDrawerObject[0]["rootId"]);
    let dataPost = {
      rootId: selectedDrawerObject[0]["rootId"],
      userId: 1,
      name: newSubDrawerName.toUpperCase(),
      type: "drawer",
      subDrawer: "false",
      drawerId: selectedDrawerObject[0]["_id"],
      root: false,
      level: selectedDrawerObject[0]["level"] + 1,
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
        console.log("JSON ID", json.data._id);
        addScribbleToNewSubDrawer(
          json.data._id,
          selectedDrawerObject[0]["level"] + 1
        );
      })
      .then(() => updateParentDrawerBoolean(state.selectedDrawerId))
      .catch((error) => console.error(error.message));
  };

  const handleSaveHere = () => {
    const screateNewSubDrawerelectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    addScribbleToNewSubDrawer(
      state.selectedDrawerId,
      selectedDrawerObject[0]["level"]
    );
    navigate("/");
  };

  const handleChange = (value) => {
    setNewSubDrawerName(value);
  };

  const handleCreate = (value) => {
    createNewSubDrawer();
    navigate("/");
  };

  const renderedList = drawers

    .filter((item) => item._id == state.selectedDrawerId)
    .map((item) => (
      <h4 className="sort-preview-drawer" key={item._id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    return scribbles
      .filter((scrb) => scrb.drawerId == x[0]._id)
      .map((scrb) => (
        <p
          key={scrb._id}
          className={"sort-preview-scribbles scrb-indent" + scrb.level}
        >
          ID:{scrb._id}:{scrb.title}
          <span>-- [scribble]</span>
        </p>
      ));
  };

  const subDrawers = (x) => {
    return drawers
      .filter((sub) => sub.drawerId == x[0]._id)
      .map((sub) => (
        <p
          key={sub._id}
          className={"sort-preview-subDrawers indent-" + sub.level}
        >
          ID:{sub._id}:{sub.name}
          <span>-- [Sub-Drawer]</span>
        </p>
      ));
  };

  const FindSubDrawers = () => {
    const x = drawers?.filter((item) => item._id == state.selectedDrawerId);
    const renderedChildren =
      x[0]["subDrawer"] === true ? (
        <>
          {scribblies(x)}
          {subDrawers(x)}
        </>
      ) : (
        <>{scribblies(x)}</>
      );

    return renderedChildren;
  };

  console.log("saveHereSelected", saveHereSelected);
  console.log("displayMessage", displayMessage);

  const handleDisplay = () => {
    setSaveHereSelected(!saveHereSelected);
    {
      displayMessage == "Or create sub-drawer"
        ? setDisplayMessage("Or save here")
        : setDisplayMessage("Or create sub-drawer");
    }
  };

  return (
    <div>
      <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      <p>Scribble ID: {state.selectedScribbleId}</p>

      <div>{renderedList}</div>
      <FindSubDrawers />

      {saveHereSelected && (
        <div>
          <Button variant="success" onClick={handleSaveHere}>
            Save Here
          </Button>
        </div>
      )}

      <button onClick={handleDisplay} className="sort-msg-btn">
        {displayMessage}
      </button>

      {!saveHereSelected && (
        <div>
          <InputField
            type="text"
            name="create-new-sub-drawer"
            id="create-new-sub-drawer"
            placeholder="New sub drawer name"
            value={newSubDrawerName}
            handleNewDrawerChange={handleChange}
          />
          <br />
          <MyButton
            href={null}
            btnName="Create & Save"
            handleNewDrawerCreate={handleCreate}
            drawerName={newSubDrawerName}
          />
        </div>
      )}

      <div className="back-btn">
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
