import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import MyDropdown from "../components/MyDropdown";
import "../css/SortPage.css";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";

export default function SortDrawerPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();

  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();
  const [newDrawerNameFieldSelected, setNewDrawerNameFieldSelected] =
    useState(true);
  const [displayMessage, setDisplayMessage] = useState(
    "Or move it to existing drawer"
  );

  console.log("State", state);
  console.log("DrawerToBeMoved", drawerToBeMoved);
  console.log("sessionStorage", sessionStorage.getItem("drawerToBeMoved"));

  useEffect(() => {
    let drawerToBeMovedSession = sessionStorage.getItem("drawerToBeMoved");
    setDrawerToBeMoved(drawerToBeMovedSession);
    //setDrawerToBeMoved(state.drawerToBeMoved);
    // setSelectedDrawerId("");
    handleSelectedDrawerId("");

    return () => {
      console.log("cleanup");
    };
  }, []);

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    console.log("PUT - move Children");
    // const drawerToBeMovedObject = data["drawers"].filter(
    // const drawerToBeMovedObject = Array(drawers).filter(
    const drawerToBeMovedObject = drawers.filter(
      (item) => item._id == parentDrawerId
    );

    // const newTopLevelDrawerObject = data["drawers"].filter(
    // const newTopLevelDrawerObject = Array(drawers).filter(
    const newTopLevelDrawerObject = drawers.filter(
      (item) => item._id == newTopLevelDrawerId
    );

    const allDrawers = drawers;
    const allScribbles = scribbles;

    let subDrawersToBeMoved = [];
    for (let x of allDrawers) {
      if (
        x.drawerId == parentDrawerId ||
        // (x.rootId === drawerToBeMovedObject[0]["rootId"] &&
        //   x.level > drawerToBeMovedObject[0]["level"])
        (x.rootId == drawerToBeMoved && x.level > 1)
      ) {
        subDrawersToBeMoved.push(x);

        // console.log("drawerToBeMoved!!!", drawerToBeMoved);
        // console.log("INDEXINDEXINDEX", subDrawersToBeMoved);
        // console.log("newTopLevelDrawerId", newTopLevelDrawerId);
        // console.log("drawerToBeMovedObj", drawerToBeMovedObject[0]);

        let dataPost = {
          rootId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          //idd: x.idd,
          name: x.name,
          type: "drawer",
          ["subDrawer"]: x["subDrawer"],
          root: false,
          //DONT DELETE TILL GET MONGO
          level: 2 + subDrawersToBeMoved.indexOf(x),
          // level: 2 + parseInt(subDrawersToBeMoved.indexOf(x)),
          // level: drawerToBeMovedObj[0]['level'] - subDrawersToBeMoved.indexOf(x),
        };

        // fetch(`http://localhost:3000/drawers/${x.id}`, {
        fetch(`http://localhost:8080/api/drawers/${x._id}`, {
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
      if (x.rootDrawerId == parentDrawerId) {
        // const linkedDrawerObj = allDrawers.filter((item)=> item.id == x.drawerId);
        // const newLevel = parseInt(linkedDrawerObj[0]['level'])+1;

        // console.log("NewLEVEL!!!!!!!!!!!!!!!!!!!!!!!!!!", newLevel)
        let dataPost = {
          rootDrawerId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          //ids: x.ids,
          title: x.title,
          content: x.content,
          type: "scribble",
          stray: false,
          level: drawerToBeMovedObject[0]["level"] + x.level + 1,
          // level: x.level + 2,
          // level: parseInt(linkedDrawerObj[0]['level'])+1,
          // level:newLevel,
        };
        // fetch(`http://localhost:3000/scribbles/${x.id}`, {
        fetch(`http://localhost:8080/api/scribbles/${x._id}`, {
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

  console.log("drawerToBeMoved");

  const moveDrawerToNewDrawer = (passedId) => {
    // const drawerToBeMovedObject = data["drawers"].filter(
    // const drawerToBeMovedObject = Array(drawers).filter(
    const drawerToBeMovedObject = drawers.filter(
      (item) => item._id == drawerToBeMoved
      // (item) => item.id == sessionStorage.getItem("DrawerToBeMoved")
    );
    // const parentDrawerObject = data["drawers"].filter(
    //   (item) => item.id == passedId
    // );
    let dataPost = {
      rootId: passedId,
      userId: 1,
      drawerId: passedId,
      //idd: drawerToBeMovedObject[0]["idd"],
      name: drawerToBeMovedObject[0]["name"],
      type: "drawer",
      ["subDrawer"]: drawerToBeMovedObject[0]["subDrawer"],
      root: false,
      level: 2,
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

  const createNewDrawer = () => {
    let dataPost = {
      // rootId: Object.values(data["drawers"]).length + 1,
      rootId: Object.values(drawers).length + 1,

      userId: 1,
      // id: Object.values(data["drawers"]).length + 1,
      // id: Object.values(drawers).length + 1,
      // idd: drawers.length + 1,

      name: drawerName.toUpperCase(),
      type: "drawer",
      subDrawer: true,
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
    // .then(moveDrawerToNewDrawer(Object.values(data["drawers"]).length + 1))
    // .then(moveDrawerToNewDrawer(dataPost._id))

    // .then(
    //   moveAllChildrenToNewDrawer(
    //     drawerToBeMoved,
    //     Object.values(data["drawers"]).length + 1
    //   )
    // )

    // moveDrawerToNewDrawer(Object.values(data["drawers"]).length + 1);
    // moveDrawerToNewDrawer(Object.values(drawers).length + 1);
    moveDrawerToNewDrawer(dataPost._id);

    moveAllChildrenToNewDrawer(
      drawerToBeMoved,
      // Object.values(data["drawers"]).length + 1
      // Object.values(drawers).length + 1
      dataPost._id
    );
  };

  const handleChange = (value) => {
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    createNewDrawer();
    setDrawerName("");
  };

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage == "Or move it to existing drawer"
        ? setDisplayMessage("Or create new top level drawer")
        : setDisplayMessage("Or move it to existing drawer");
    }
  };

  //Using ID of drawerToBeMoved stored in sessionStorage to avoid error in case of page refresh
  // const drawerToBeMovedObj = data["drawers"].filter(
  // const drawerToBeMovedObj = Array(drawers).filter(
  const drawerToBeMovedObj = drawers.filter(
    (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
  );
  console.log("LOOK", drawerToBeMoved);

  return (
    <div id="page">
      <h4 className="sort-drawer-title">
        Drawer to be moved : {drawerToBeMovedObj[0]["name"]}---ID
        {drawerToBeMoved}
      </h4>
      <h4>Selected drawer Id : {selectedDrawerId}</h4>

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
            btnName="Create & Move"
            handleNewDrawerCreate={handleCreate}
            drawerName={drawerName}
          />
        </div>
      )}

      <Button onClick={handleDisplay} className="sort-msg-btn">
        {displayMessage}
      </Button>

      {!newDrawerNameFieldSelected && (
        <>
          <div>
            <MyDropdown
            // data={data}
            // selectedDrawerId={selectedDrawerId}
            // setSelectedDrawerId={setSelectedDrawerId}
            />
          </div>
          <Button
            variant="success"
            className="next-btn"
            onClick={(e) => {
              e.preventDefault();
              let passingData = { selectedDrawerId, drawerToBeMoved };
              console.log("PassingData", passingData);
              navigate("/sort-drawer-preview", { state: passingData });
              sessionStorage.setItem("selectedDrawerId", selectedDrawerId);
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

//   return (
//     <div id="page">
//       <h4 className="sort-drawer-title">
//         Drawer to be moved : {drawerToBeMovedObj[0]["name"]}---ID
//         {drawerToBeMoved}
//       </h4>
//       <h4>Selected drawer Id : {selectedDrawerId}</h4>
//       <div>
//         <InputField
//           type="text"
//           name="create-new-drawer"
//           id="create-new-drawer"
//           placeholder="Create new TOP-level drawer"
//           value={drawerName}
//           handleNewDrawerChange={handleChange}
//         />
//         <br />
//         <MyButton
//           href={null}
//           btnName="Create & Move"
//           handleNewDrawerCreate={handleCreate}
//           drawerName={drawerName}
//         />

//         <h4 className="sort-msg">Or move it to...</h4>

//         <Dropdown
//           data={data}
//           selectedDrawerId={selectedDrawerId}
//           setSelectedDrawerId={setSelectedDrawerId}
//         />
//       </div>
//       <button
//         className="btn btn-outline-success next-btn"
//         onClick={(e) => {
//           e.preventDefault();
//           let passingData = { selectedDrawerId, drawerToBeMoved };
//           console.log("PassingData", passingData);
//           navigate("/sort-drawer-preview", { state: passingData });
//         }}
//       >
//         Next
//       </button>
//       <div>
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
