import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import { useState } from "react";
import "../css/SortPreviewPage.css";
import MyButton from "../components/MyButton";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";

export default function SortDrawerPreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { drawers, scribbles } = useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();

  //console.log("State", state);
  console.log("drawerToBeMoved", sessionStorage.getItem("drawerToBeMoved"));

  //To persist those 2 values incase of browser refresh -- moved to context?
  const drawerToBeMovedObj = drawers.filter(
    (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
  );
  const destinationObj = drawers.filter(
    (item) => item._id == sessionStorage.getItem("selectedDrawerId")
  );

  //To persist those 2 values incase of browser refresh
  useEffect(() => {
    setDrawerToBeMoved(sessionStorage.getItem("drawerToBeMoved"));
    handleSelectedDrawerId(sessionStorage.getItem("selectedDrawerId"));
  }, []);

  const updateParentDrawerBoolean = (parentDrawerId) => {
    let dataPost;
    const parentDrawerObj = drawers.filter(
      (item) => item._id == parentDrawerId
    );
    //Later remove if statement
    if (parentDrawerObj[0]["drawerId"]) {
      dataPost = {
        // rootId: parentDrawerObj[0]["rootId"],
        // drawerId: parentDrawerObj[0]["drawerId"],
        // userId: 1,
        // name: parentDrawerObj[0]["name"],
        // type: "drawer",
        ["subDrawer"]: true,
        // level: parentDrawerObj[0]["level"],
        // root: parentDrawerObj[0]["root"],
      };
    } else {
      dataPost = {
        // rootId: parentDrawerObj[0]["rootId"],
        // userId: 1,
        // name: parentDrawerObj[0]["name"],
        // type: "drawer",
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

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    const drawerToBeMovedObject = drawers.filter(
      (item) => item._id == parentDrawerId
    );

    const newTopLevelDrawerObject = drawers.filter(
      (item) => item._id == newTopLevelDrawerId
    );

    let subDrawersToBeMoved = [];

    for (let x in drawers) {
      if (
        drawers[x].drawerId == parentDrawerId ||
        (drawers[x].rootId == drawerToBeMovedObject[0]["rootId"] &&
          drawers[x].level > drawerToBeMovedObject[0]["level"])
      ) {
        subDrawersToBeMoved.push(drawers[x]);
        //console.log("index", subDrawersToBeMoved.indexOf(x));
        let dataPost = {
          rootId: newTopLevelDrawerId,
          userId: 1,
          // drawerId: drawers[x].drawerId,
          // name: drawers[x].name,
          // type: "drawer",
          // subDrawer: drawers[x]["subDrawer"],
          root: false,
          level:
            newTopLevelDrawerObject[0]["level"] +
            subDrawersToBeMoved.indexOf(drawers[x]) +
            2,
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
          userId: 1,
          // drawerId: scribbles[x].drawerId,
          // title: scribbles[x].title,
          // content: scribbles[x].content,
          // type: "scribble",
          stray: false,
          level: newTopLevelDrawerObject[0]["level"] + scribbles[x].level,
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
    // const drawerToBeMovedObject = drawers.filter(
    //   (item) => item._id == drawerToBeMoved
    // );
    const parentDrawerObject = drawers.filter((item) => item._id == passedId);
    let dataPost = {
      rootId: parentDrawerObject[0]["rootId"],
      userId: 1,
      drawerId: parentDrawerObject[0]["_id"],
      // name: drawerToBeMovedObject[0]["name"],
      // type: "drawer",
      // ["subDrawer"]: drawerToBeMovedObject[0]["subDrawer"],
      root: false,
      level: parentDrawerObject[0]["level"] + 1,
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
      .catch((error) => console.error(error.message));
  };

  const handleMoveHere = () => {
    moveDrawerToNewDrawer(selectedDrawerId);
    moveAllChildrenToNewDrawer(drawerToBeMoved, selectedDrawerId);
    updateParentDrawerBoolean(selectedDrawerId);
    navigate("/home");
    navigate(0);
  };

  const renderedList = drawers
    // .filter((item) => item._id == state.selectedDrawerId)
    .filter((item) => item._id == sessionStorage.getItem("selectedDrawerId"))

    .map((item) => (
      <h4 className="sort-preview-drawer" key={item._id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    return (
      scribbles
        // .filter((scrb) => scrb.drawerId == x[0]._id)
        .filter((scrb) => scrb.drawerId == x._id)

        .map((scrb) => (
          <p
            key={scrb._id}
            className={"sort-preview-scribbles scrb-indent" + scrb.level}
          >
            ID:{scrb._id}:{scrb.title}
            <span>-- [scribble]</span>
          </p>
        ))
    );
  };

  const subDrawers = (x) => {
    return drawers
      .filter((sub) => sub.drawerId == x[0]._id)
      .map((sub) => (
        <p
          key={sub._id}
          className={"sort-preview-sub-drawers indent-" + sub.level}
        >
          ID:{sub._id}:{sub.name}
          <span>-- [Sub-Drawer]</span>
        </p>
      ));
  };

  const FindSubDrawers = () => {
    // const x = drawers.filter((item) => item._id == state.selectedDrawerId);
    const x = drawers.filter(
      (item) => item._id == sessionStorage.getItem("selectedDrawerId")
    );
    console.log("X", x);

    const renderedChildren =
      x["subDrawer"] === true ? (
        // x[0]["subDrawer"] === true ? (
        <>
          {scribblies(x)}
          {subDrawers(x)}
        </>
      ) : (
        <>{scribblies(x)}</>
      );

    return renderedChildren;
  };

  return (
    <div className="sort-drawer-preview-div">
      <h3>
        Drawer to be moved: {drawerToBeMovedObj["name"]}---ID {drawerToBeMoved}
      </h3>
      <h3>To: {selectedDrawerId}</h3>
      <div>{renderedList}</div>
      <FindSubDrawers />
      <div>
        <Button onClick={handleMoveHere} variant="success" className="move-btn">
          Move Here
        </Button>

        {/* UNDERCONSTRUCTION or NOT REQUIRED */}
        {/* <h6>Or create new sub-drawer</h6>
        <InputField
          type="text"
          name="create-new-sub-drawer"
          id="create-new-sub-drawer"
          placeholder="New sub drawer name"
          value={newSubDrawerName}
          //handleNewDrawerChange={handleChange}
        />
        <br />
        <MyButton
          href={null}
          btnName="Create & Move"
          //handleNewDrawerCreate={handleCreate}
          drawerName={newSubDrawerName}
        /> */}
        {/* UNDERCONSTRUCTION        */}
      </div>
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
