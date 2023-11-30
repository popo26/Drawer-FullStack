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
  //const [newSubDrawerName, setNewSubDrawerName] = useState("");
  const data = useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();

  console.log("State", state);

  //To persist those 2 values incase of browser refresh
  useEffect(() => {
    setDrawerToBeMoved(sessionStorage.getItem("drawerToBeMoved"));
    // setSelectedDrawerId(sessionStorage.getItem("selectedDrawerId"));
    handleSelectedDrawerId(sessionStorage.getItem("selectedDrawerId"));
  }, []);

  const updateParentDrawerBoolean = (parentDrawerId) => {
    console.log("PUT2");
    let dataPost;
    const parentDrawerObj = data["drawers"].filter(
      (item) => item.id == parentDrawerId
    );
    //Something wrong with here
    // console.log("x[0][drawerId]", x[0]["drawerId"]);
    if (parentDrawerObj[0]["drawerId"]) {
      dataPost = {
        // rootId: parentDrawerId,
        rootId: parentDrawerObj[0]["rootId"],
        drawerId: parentDrawerObj[0]["drawerId"],
        userId: 1,
        // name: "Bagger",
        // type: "drawer",
        name: parentDrawerObj[0]["name"],
        type: "drawer",
        ["subDrawer"]: true,
        // level:Object.values(data["drawers"])[parentDrawerId]["level"],
        // root:Object.values(data["drawers"])[parentDrawerId]["root"]
        level: parentDrawerObj[0]["level"],
        root: parentDrawerObj[0]["root"],
      };
    } else {
      dataPost = {
        // rootId: parentDrawerId,
        rootId: parentDrawerObj[0]["rootId"],
        userId: 1,
        name: parentDrawerObj[0]["name"],
        type: "drawer",
        ["subDrawer"]: true,
        level: 1,
        root: true,
      };
    }

    // fetch(`http://localhost:3000/drawers/${parentDrawerId}`, {
      fetch(`http://localhost:8080/api/drawers/${parentDrawerId}`, {

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

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    const allDrawers = data["drawers"];
    const allScribbles = data["scribbles"];

    const drawerToBeMovedObject = allDrawers.filter(
      //   (item) => item.id == drawerToBeMoved
      (item) => item.id == parentDrawerId
    );

    const newTopLevelDrawerObject = allDrawers.filter(
      (item) => item.id == newTopLevelDrawerId
    );

    // for (let x of allDrawers) {
    //   if (x.drawerId === parentDrawerId) {
    //     let dataPost = {
    //       rootId: newTopLevelDrawerId,
    //       userId: 1,
    //       drawerId: x.drawerId,
    //       id: x.id,
    //       name: x.name,
    //       type: "drawer",
    //       ["subDrawer"]: x["subDrawer"],
    //       root: false,
    //       level: newTopLevelDrawerObject[0]["level"] + 1,
    //     };
    let subDrawersToBeMoved = [];

    for (let x of allDrawers) {
      if (
        x.drawerId === parentDrawerId ||
        (x.rootId === drawerToBeMovedObject[0]["rootId"] &&
          x.level > drawerToBeMovedObject[0]["level"])
      ) {
        subDrawersToBeMoved.push(x);
        console.log("index", subDrawersToBeMoved.indexOf(x));
        let dataPost = {
          rootId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          id: x.id,
          name: x.name,
          type: "drawer",
          ["subDrawer"]: x["subDrawer"],
          root: false,
          // level: newTopLevelDrawerObject[0]["level"] + x.level,
          level:
            newTopLevelDrawerObject[0]["level"] +
            subDrawersToBeMoved.indexOf(x) +
            2,
        };

        // fetch(`http://localhost:3000/drawers/${x.id}`, {
          fetch(`http://localhost:8080/api/drawers/${x.id}`, {

          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => console.log(response.json()))
          .catch((error) => console.error(error.message));
      }
    }

    for (let x of allScribbles) {
      if (x.rootDrawerId === parentDrawerId) {
        let dataPost = {
          rootDrawerId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          id: x.id,
          title: x.title,
          content: x.content,
          type: "scribble",
          stray: false,
          // level: drawerToBeMovedObject[0]["level"],
          level: newTopLevelDrawerObject[0]["level"] + x.level,
          // level: x.level + 1,
        };
        // fetch(`http://localhost:3000/scribbles/${x.id}`, {
          fetch(`http://localhost:8080/api/scribbles/${x.id}`, {

          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => console.log(response.json()))
          .catch((error) => console.error(error.message));
      }
    }
  };

  const moveDrawerToNewDrawer = (passedId) => {
    const drawerToBeMovedObject = data["drawers"].filter(
      (item) => item.id == drawerToBeMoved
    );
    const parentDrawerObject = data["drawers"].filter(
      (item) => item.id == passedId
    );
    let dataPost = {
      // rootId: passedId,
      rootId: parentDrawerObject[0]["rootId"],
      userId: 1,
      // drawerId: passedId,
      drawerId: parentDrawerObject[0]["id"],
      id: drawerToBeMovedObject[0]["id"],
      name: drawerToBeMovedObject[0]["name"],
      type: "drawer",
      ["subDrawer"]: drawerToBeMovedObject[0]["subDrawer"],
      root: false,
      // level: 2,
      level: parentDrawerObject[0]["level"] + 1,
    };
    // fetch(`http://localhost:3000/drawers/${drawerToBeMoved}`, {
      fetch(`http://localhost:8080/api/drawers/${drawerToBeMoved}`, {

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

  const handleMoveHere = () => {
    moveDrawerToNewDrawer(selectedDrawerId);
    moveAllChildrenToNewDrawer(drawerToBeMoved, selectedDrawerId);
    updateParentDrawerBoolean(selectedDrawerId);
  };

  //   const handleChange = (value) => {
  //     setNewSubDrawerName(value);
  //   };

  //   const handleCreate = (value) => {
  //     createNewSubDrawer();
  //   };

  const renderedList = data["drawers"]
    .filter((item) => item.id == state.selectedDrawerId)
    .map((item) => (
      <h4 className="sort-preview-drawer" key={item.id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    return data["scribbles"]
      .filter((scrb) => scrb.drawerId == x[0].id)
      .map((scrb) => (
        <p
          key={scrb.id}
          className={"sort-preview-scribbles scrb-indent" + scrb.level}
        >
          ID:{scrb.id}:{scrb.title}
          <span>-- [scribble]</span>
        </p>
      ));
  };

  const subDrawers = (x) => {
    return data["drawers"]
      .filter((sub) => sub.drawerId == x[0].id)
      .map((sub) => (
        <p
          key={sub.id}
          className={"sort-preview-sub-drawers indent-" + sub.level}
        >
          ID:{sub.id}:{sub.name}
          <span>-- [Sub-Drawer]</span>
        </p>
      ));
  };

  const FindSubDrawers = () => {
    const x = data["drawers"].filter(
      (item) => item.id == state.selectedDrawerId
    );
    const renderedChildren =
      x[0]["sub-drawer"] === true ? (
        <>
          {scribblies(x)}
          {subDrawers(x)}
        </>
      ) : (
        <>{scribblies(x)}</>
      );

    return renderedChildren;
  };

  console.log(
    "drawer session moved",
    sessionStorage.getItem("drawerToBeMoved")
  );
  console.log(
    "drawer session selected",
    sessionStorage.getItem("selectedDrawerId")
  );

  //To persist those 2 values incase of browser refresh
  const drawerToBeMovedObj = data["drawers"].filter(
    (item) => item.id == sessionStorage.getItem("drawerToBeMoved")
  );

  const destinationObj = data["drawers"].filter(
    (item) => item.id == sessionStorage.getItem("selectedDrawerId")
  );

  console.log("LOOK", drawerToBeMovedObj[0]["name"]);
  console.log("LOOK", destinationObj[0]["name"]);

  return (
    <div className="sort-drawer-preview-div">
      <h3>
        Drawer to be moved: {drawerToBeMovedObj[0]["name"]}---ID{" "}
        {drawerToBeMoved}
      </h3>
      <h3>To: {selectedDrawerId}</h3>

      <div>{renderedList}</div>
      {/* <div>{findSubDrawers()}</div> */}
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
