import { Icon } from "@iconify/react";
import "../css/SortPreviewPage.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useUserContext } from "../context/UserContext";

export default function SortScribblePreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newSubDrawerName, setNewSubDrawerName] = useState("");
  const [saveHereSelected, setSaveHereSelected] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("Or create sub-drawer");
  const { drawers, scribbles, loadingScribbles, loadingDrawers } =
    useDataContext();
  const [selectedScribbleId] = useSelectedScribbleContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const { user } = useUserContext();

  //+++++++++++++++++Tooltip++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const tooltipSaveHere = <Tooltip id="tooltip">Save Here</Tooltip>;

  //+++++++++++++++++Update Parent Drawer's Boolean [subDrawer to true]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const updateParentDrawerBoolean = (parentDrawerId) => {
    let dataPost;
    const x = drawers.filter((item) => item._id == parentDrawerId);

    if (x[0]["drawerId"]) {
      dataPost = {
        ["subDrawer"]: true,
      };
    } else {
      dataPost = {
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
      .catch((error) => console.error(error.message));
  };

  //+++++++++++++++++Add selected scribble to the new sub drawer++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const addScribbleToNewSubDrawer = (passedId, selectedDrawerLevel) => {
    const newlyCreatedDrawerObj = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    let dataPost = {
      rootDrawerId: newlyCreatedDrawerObj[0]["rootId"],
      drawerId: passedId,
      stray: false,
      level: selectedDrawerLevel,
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
      .then(() => navigate(0))
      .catch((error) => console.error(error.message));
  };

  //+++++++++++++++++Create a new sub drawer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const createNewSubDrawer = () => {
    const selectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    //const item = selectedDrawerObject[0]["rootId"];

    let dataPost = {
      rootId: selectedDrawerObject[0]["rootId"],
      userId: user._id,
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
        addScribbleToNewSubDrawer(
          json.data._id,
          selectedDrawerObject[0]["level"] + 1
        );
        navigate(0);
      })
      .then(() => updateParentDrawerBoolean(state.selectedDrawerId))
      .catch((error) => console.error(error.message));
  };

  //+++++++++++++++++Save selected scribble to existing drawer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleSaveHere = () => {
    const selectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );

    const screateNewSubDrawerelectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    addScribbleToNewSubDrawer(
      state.selectedDrawerId,
      selectedDrawerObject[0]["level"]
    );
    navigate("/home");
    navigate(0);
  };

  const handleChange = (value) => {
    setNewSubDrawerName(value);
  };

  //+++++++++++++++++Create new subdrawer under the selected existing drawer instead of directly saving under the selected drawer++++++++++++++++++++
  const handleCreate = () => {
    createNewSubDrawer();
    navigate("/home");
  };

  //+++++++++++++++++Preview list - selected drawer++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const renderedList = drawers
    .filter((item) => item._id == state.selectedDrawerId)
    .map((item) => (
      <h4 className="sort-preview-drawer" key={item._id}>
        {item.name}
      </h4>
    ));

  //+++++++++++++Function to find scribbles in the selected drawer++++++++++++++++++++++++++++++++++++
  const scribblies = () => {
    console.log("Obj ID", sessionStorage.getItem("selectedDrawer"));
    let scribbleArray = [];
    for (let x of scribbles) {
      if (
        x["drawerId"] &&
        x.stray === false &&
        x["drawerId"] == sessionStorage.getItem("selectedDrawer")
      ) {
        scribbleArray.push(x);
        console.log("scribbleArray", scribbleArray);
      }
    }
    const result = scribbleArray.map((scrb) => (
      <p key={scrb._id} className={"sort-preview-scribbles scrb-indent" + 1}>
        <span>
          <Icon icon="tabler:scribble" color="black" />
        </span>{" "}
        {scrb.title}
      </p>
    ));
    return result.length > 0 ? (
      result
    ) : (
      <p className="empty-drawer">No scribble exists.</p>
    );
  };

  //+++++++++++++++++Function to find sub drawers in the selected drawer++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const subDrawers = () => {
    let subDrawersArray = [];
    for (let x in drawers) {
      if (
        drawers[x]["drawerId"] &&
        drawers[x]["drawerId"] == sessionStorage.getItem("selectedDrawer")
      ) {
        subDrawersArray.push(drawers[x]);
      }
    }
    return subDrawersArray.map((sub) => (
      <p key={sub._id} className={"sort-preview-sub-drawers indent-" + 1}>
        <span>
          <Icon icon="mingcute:drawer-line" color="black" />
        </span>{" "}
        {sub.name}
      </p>
    ));
  };

  //+++++++++++++++++++++++++++Function to finally render all the sub-drawers and scribbles in the selected drawer+++++++++++++++++++++++++++++++
  const FindSubDrawers = () => {
    if (!loadingDrawers) {
      const selectedDrawerObj = drawers.filter(
        (item) => item._id == sessionStorage.getItem("selectedDrawer")
      );
      const renderedChildren = selectedDrawerObj[0]["subDrawer"] ? (
        <>
          {scribblies()}
          {subDrawers()}
        </>
      ) : (
        <>{scribblies()}</>
      );

      return renderedChildren;
    }
  };

  ///++++++++++++++++++++++++++++To swap display message on a button+++++++++++++++++++++++++++++++++++
  const handleDisplay = () => {
    setSaveHereSelected(!saveHereSelected);
    {
      displayMessage == "Or create sub-drawer"
        ? setDisplayMessage("Or save here")
        : setDisplayMessage("Or create sub-drawer");
    }
  };

  //++++++++++++++++++++++++++++To handle source and destination display at the top of the page++++++++++++++++++++++++++
  const scrb = scribbles.find((item) => item._id === state.selectedScribbleId);
  const destinationDrawer = drawers.find(
    (item) => item._id === state.selectedDrawerId
  );

  return (
    <div>
      {/* <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      <p>Scribble ID: {state.selectedScribbleId}</p> */}

      {/* I want to display scribble name an destination drawer name in future. Currently issue upon refresh */}
      <p>
        {!loadingScribbles && scrb.title}
        <Icon icon="tabler:scribble" color="red" />{" "}
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && destinationDrawer?.name}{" "}
        <Icon icon="mingcute:drawer-line" color="red" />
      </p>

      <div className="drawer-content-result-div">
        <div>{renderedList}</div>
        <FindSubDrawers />
      </div>

      {saveHereSelected && (
        <div>
          <OverlayTrigger placement="right" overlay={tooltipSaveHere}>
            <Button variant="dark" onClick={handleSaveHere}>
              <Icon icon="ic:round-save-alt" width="30" />
            </Button>
          </OverlayTrigger>
        </div>
      )}

      <button onClick={handleDisplay} className="sort-msg-btn">
        {displayMessage}
      </button>

      {!saveHereSelected && (
        <div className="scrb-createNewDrawer-div">
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
            btnName={<Icon icon="typcn:plus" />}
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
