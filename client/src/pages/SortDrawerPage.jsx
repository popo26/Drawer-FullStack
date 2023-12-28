import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import MyDropdown from "../components/MyDropdown";
import "../css/SortPage.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";
import { useUserContext } from "../context/UserContext";

export default function SortDrawerPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { drawers, scribbles, setDrawers, setScribbles, loadingDrawers } =
    useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();
  const [newDrawerNameFieldSelected, setNewDrawerNameFieldSelected] =
    useState(true);
  const [displayMessage, setDisplayMessage] = useState(
    "Or move it to existing drawer"
  );
  const { user } = useUserContext();
  const tooltipNext = <Tooltip id="tooltip">Next</Tooltip>;


  useEffect(() => {
    let drawerToBeMovedSession = sessionStorage.getItem("drawerToBeMoved");
    setDrawerToBeMoved(drawerToBeMovedSession);
    handleSelectedDrawerId("");
    return () => {
      console.log("cleanup");
    };
  }, []);


  ///NOT WORKING! :-()

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    const drawerToBeMovedObject = drawers.filter(
      (item) => item._id == parentDrawerId
    );

    let subDrawersToBeMoved = [];
    for (let x in drawers) {
      if (
        drawers[x].drawerId == parentDrawerId ||
        // (drawers[x].rootId == drawerToBeMoved && drawers[x].level > 1)
        (drawers[x].rootId == drawerToBeMoved)

      ) {
        // subDrawersToBeMoved.push(x);
        subDrawersToBeMoved.push(drawers[x]);



        let dataPost = {
          rootId: newTopLevelDrawerId,
          root: false,
          // level: 2 + subDrawersToBeMoved.indexOf(drawers[x]),
          // level: 1 + subDrawersToBeMoved.indexOf(drawers[x]),
          level: drawers[x].level + 1,


        };

        fetch(`http://localhost:8080/api/drawers/${drawers[x]._id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => response.json())
          .catch((error) => console.error(error.message));
      }
    }

    for (let x in scribbles) {
      if (scribbles[x].rootDrawerId == parentDrawerId) {
        let dataPost = {
          rootDrawerId: newTopLevelDrawerId,
          stray: false,
          // level: drawerToBeMovedObject[0]["level"] + scribbles[x].level + 1,
          level: drawerToBeMovedObject[0]["level"] + scribbles[x].level,

        };
        fetch(`http://localhost:8080/api/scribbles/${scribbles[x]._id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => response.json())
          .catch((error) => console.error(error.message));
      }
    }
  };

  const moveDrawerToNewDrawer = (passedId) => {
    let dataPost = {
      rootId: passedId,
      drawerId: passedId,
      root: false,
      level: 2,
    };
    fetch(`http://localhost:8080/api/drawers/${drawerToBeMoved}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then(()=>navigate(0))
      .catch((error) => console.error(error.message));
  };

  const createNewDrawer = () => {
    let dataPost = {
      rootId: drawers.length + 1,
      userId: user._id,
      name: drawerName.toUpperCase(),
      type: "drawer",
      subDrawer: true,
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
        console.log("You are here1")

        moveDrawerToNewDrawer(json.data._id);
        console.log("You are here2")
        moveAllChildrenToNewDrawer(drawerToBeMoved, json.data._id);
      })
      .catch((error) => console.error(error.message));
  };

  const handleChange = (value) => {
    setDrawerName(value);
  };

  const handleCreate = () => {
    {
      !drawerName ? alert("The new drawer name is empty.") : createNewDrawer();
      setDrawerName("");
      navigate("/home");
      //navigate(0);
    }
  };

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage == "Or move it to existing drawer"
        ? setDisplayMessage("Or create new top level drawer")
        : setDisplayMessage("Or move it to existing drawer");
    }
  };

  const drawerToBeMovedObjName = () => {
    const obj = drawers.filter(
      (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
    );
    return obj[0]["name"];
  };

  const destinationDrawerObjName = () => {
    const obj = drawers.filter((item) => item._id == selectedDrawerId);
    return obj[0]["name"];
  };

  return (
    <div id="page">
      <h4 className="sort-drawer-title">
        {sessionStorage.getItem("drawerToBeMoved") &&
          !loadingDrawers &&
          drawerToBeMovedObjName()}
        <Icon icon="mingcute:drawer-line" color="red" />
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && destinationDrawerObjName()}
        <Icon icon="mingcute:drawer-line" color="red" />
      </h4>

      {newDrawerNameFieldSelected && (
        <div>
          <InputField
            type="text"
            name="create-new-drawer"
            id="create-new-drawer"
            placeholder="Create new TOP-level drawer"
            value={drawerName}
            handleNewDrawerChange={handleChange}
          />
          <br />
          <MyButton
            href={null}
            btnName={<Icon icon="ic:baseline-move-down" width="30" />}
            handleNewDrawerCreate={handleCreate}
            drawerName={drawerName}
          />
        </div>
      )}

      <Button onClick={handleDisplay} className="sort-msg-btn" variant="dark">
        {displayMessage}
      </Button>

      {!newDrawerNameFieldSelected && (
        <>
          <div>
            <MyDropdown user={user} />
          </div>
          <OverlayTrigger placement="right" overlay={tooltipNext}>
            <Button
              variant="dark"
              className="next-btn"
              onClick={(e) => {
                e.preventDefault();
                let passingData = { selectedDrawerId, drawerToBeMoved };
                //console.log("PassingData", passingData);
                {
                  !selectedDrawerId
                    ? alert("Please select destination drawer")
                    : navigate("/sort-drawer-preview", { state: passingData });
                  sessionStorage.setItem("selectedDrawerId", selectedDrawerId);
                }
              }}
            >
              <Icon icon="tabler:player-track-next-filled" />
            </Button>
          </OverlayTrigger>
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
