import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import { useState } from "react";
import "../css/SortPreviewPage.css";
import MyButton from "../components/MyButton";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
//import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";

export default function SortScribblePreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newSubDrawerName, setNewSubDrawerName] = useState("");
  const [saveHereSelected, setSaveHereSelected] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("Or create sub-drawer");
  // const data = useDataContext();
  const { drawers, scribbles } = useDataContext();

  // const { selectedDrawerId, handleSelectedDrawerId } =
  //   useSelectedDrawerContext();
  const [selectedScribbleId] = useSelectedScribbleContext();

  console.log("State", state.selectedDrawerId);

  const updateParentDrawerBoolean = (parentDrawerId) => {
    console.log("PUT2");
    let dataPost;
    // const x = data["drawers"].filter((item) => item.id == parentDrawerId);
    // const x = Array(drawers).filter((item) => item.id == parentDrawerId);
    const x = drawers.filter((item) => item._id == parentDrawerId);

    //Something wrong with here
    // console.log("x[0][drawerId]", x[0]["drawerId"]);
    if (x[0]["drawerId"]) {
      dataPost = {
        // rootId: parentDrawerId,
        rootId: x[0]["rootId"],
        drawerId: x[0]["drawerId"],
        userId: 1,
        // name: "Bagger",
        // type: "drawer",
        name: x[0]["name"],
        type: "drawer",
        ["subDrawer"]: true,
        // level:Object.values(data["drawers"])[parentDrawerId]["level"],
        // root:Object.values(data["drawers"])[parentDrawerId]["root"]
        level: x[0]["level"],
        root: x[0]["root"],
      };
    } else {
      dataPost = {
        rootId: parentDrawerId,
        userId: 1,
        // name: "Bomb",
        name: x[0]["name"],
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

  const addScribbleToNewSubDrawer = (passedId, selectedDrawerLevel) => {
    console.log("PUT");
    // const scribbleObject = data["scribbles"].filter(
    // const scribbleObject = Array(scribbles).filter(
    const scribbleObject = scribbles.filter(
      (item) => item._id == selectedScribbleId
    );

    // const newlyCreatedDrawerObj = data["data"].filter((item)=> item.id == passedId)

    // const newlyCreatedDrawerObj = data["drawers"].filter(
    // const newlyCreatedDrawerObj = Array(drawers).filter(
    const newlyCreatedDrawerObj = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    //console.log("scribble length: ", Object.values(data["scribbles"]).length);
    let dataPost = {
      //   drawerId: Object.values(data["drawers"]).length + 1,
      rootDrawerId: newlyCreatedDrawerObj[0]["rootId"],
      drawerId: passedId,
      userId: 1,
      title: scribbleObject[0]["title"],
      content: scribbleObject[0]["content"],
      type: "scribble",
      //ids: state.selectedScribbleId,
      stray: false,
      // level:parentDrawerObject[0]["level"]+1,
      level: selectedDrawerLevel,
      attachment: scribbleObject[0]["attachment"],
      files: scribbleObject[0]["files"],
    };
    // fetch(`http://localhost:3000/scribbles/${state.selectedScribbleId}`, {
    fetch(`http://localhost:8080/api/scribbles/${state.selectedScribbleId}`, {
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

  const createNewSubDrawer = () => {
    console.log("POST");
    // const selectedDrawerObject = data["drawers"].filter(
    // const selectedDrawerObject = Array(drawers).filter(
    const selectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );

    let dataPost = {
      rootId: selectedDrawerObject[0]["rootId"],
      // rootId: data["drawers"][state.selectedDrawerId]["rootId"],
      userId: 1,
      // id: Object.values(data["drawers"]).length + 1,
      // id: Object.values(drawers).length + 1,
      //idd: drawers.length + 1,


      name: newSubDrawerName,
      type: "drawer",
      // "subDrawer": false,
      subDrawer: selectedDrawerObject[0]["subDrawer"],
      // drawerId: state.selectedDrawerId,
      drawerId: selectedDrawerObject[0]["_id"],
      root: false,
      // level:Object.values(data["drawers"])[state.selectedDrawerId]["level"],
      level: selectedDrawerObject[0]["level"] + 1,
    };
    // fetch("http://localhost:3000/drawers", {
    fetch("http://localhost:8080/api/drawers/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => {
        console.log(response.json());
      })
      .catch((error) => console.error(error.message));

    addScribbleToNewSubDrawer(
      // Object.values(data["drawers"]).length + 1,
      // Object.values(drawers).length + 1,
      // drawers.length + 1,
      dataPost._id,



      selectedDrawerObject[0]["level"] + 1
    );
    updateParentDrawerBoolean(state.selectedDrawerId);
  };

  // console.log("RootId",Object.values(data["drawers"]))
  // // console.log("Selected one",Object.values(data["drawers"])["id"] = state.selectedDrawerId)
  // // console.log("Selected ID",state.selectedDrawerId)
  // const u = data['drawers'].filter((item)=> item.id == state.selectedDrawerId)
  // console.log("U id", u[0]['rootId'])
  // console.log("length", u.length)

  const handleSaveHere = () => {
    // const selectedDrawerObject = data["drawers"].filter(
    // const selectedDrawerObject = Array(drawers).filter(
    const selectedDrawerObject = drawers.filter(
      (item) => item._id == state.selectedDrawerId
    );
    addScribbleToNewSubDrawer(
      state.selectedDrawerId,
      selectedDrawerObject[0]["level"]
    );
  };

  const handleChange = (value) => {
    setNewSubDrawerName(value);
  };

  const handleCreate = (value) => {
    createNewSubDrawer();
  };

  // const renderedList = data["drawers"]
  // const renderedList = Array(drawers)
  const renderedList = drawers

    .filter((item) => item._id == state.selectedDrawerId)
    .map((item) => (
      <h4 className="sort-preview-drawer" key={item._id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    // return data["scribbles"]
    // return Array(scribbles)
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
    // return data["drawers"]
    // return Array(drawers)
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
    // const x = data["drawers"].filter(
    // const x = Array(drawers).filter(
    const x = drawers.filter((item) => item._id == state.selectedDrawerId);
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

  console.log("saveHereSelected", saveHereSelected);
  console.log("displayMessage", displayMessage);

  const handleDisplay = () => {
    setSaveHereSelected(!saveHereSelected);
    {
      displayMessage === "Or create sub-drawer"
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

//   return (
//     <div>
//       <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
//       <p>Scribble ID: {state.selectedScribbleId}</p>

//       <div>{renderedList}</div>
//       <FindSubDrawers />

//       <div>
//         <button className="btn btn-outline-success" onClick={handleSaveHere}>Save Here</button>
//         <h6 className="sort-msg">Or create new sub-drawer</h6>
//         <InputField
//           type="text"
//           name="create-new-sub-drawer"
//           id="create-new-sub-drawer"
//           placeholder="New sub drawer name"
//           value={newSubDrawerName}
//           handleNewDrawerChange={handleChange}
//         />
//         <br />
//         <MyButton
//           href={null}
//           btnName="Create & Save"
//           handleNewDrawerCreate={handleCreate}
//           drawerName={newSubDrawerName}
//         />
//       </div>
//       <div className="back-btn">
//         <Icon
//           icon="icon-park-outline:back"
//           color="black"
//           width="50"
//           onClick={() => navigate(-1)}
//         />
//       </div>
//     </div>
//   );
// }
