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

// export default function SortDrawerPage({user, setUser}) {
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
  const { user, setUser } = useUserContext();
  const tooltipNext = <Tooltip id="tooltip">Next</Tooltip>;

  console.log("State", state);
  console.log("DrawerToBeMoved", drawerToBeMoved);
  console.log(
    "sessionStorage-drawerToBeMoved not in context",
    sessionStorage.getItem("drawerToBeMoved")
  );

  useEffect(() => {
    let drawerToBeMovedSession = sessionStorage.getItem("drawerToBeMoved");
    // let drawerToBeMovedSession = sessionStorage.getItem("toBeMovedDrawer");

    setDrawerToBeMoved(drawerToBeMovedSession);
    handleSelectedDrawerId("");
    return () => {
      console.log("cleanup");
    };
  }, []);

  // useEffect(() => {
  //   const userInBrowser = JSON.parse(localStorage.getItem("user"));
  //   console.log("user in browser", userInBrowser);
  //   setUser(userInBrowser);
  // }, []);

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    const drawerToBeMovedObject = drawers.filter(
      (item) => item._id == parentDrawerId
    );

    // const newTopLevelDrawerObject = drawers.filter(
    //   (item) => item._id == newTopLevelDrawerId
    // );

    let subDrawersToBeMoved = [];
    for (let x in drawers) {
      if (
        drawers[x].drawerId == parentDrawerId ||
        (drawers[x].rootId == drawerToBeMoved && drawers[x].level > 1)
      ) {
        subDrawersToBeMoved.push(x);

        let dataPost = {
          rootId: newTopLevelDrawerId,
          // userId: 1,
          // drawerId: x.drawerId,
          // name: x.name,
          // type: "drawer",
          // ["subDrawer"]: x["subDrawer"],
          root: false,
          //DONT DELETE TILL GET MONGO
          level: 2 + subDrawersToBeMoved.indexOf(drawers[x]),
          // level: 2 + parseInt(subDrawersToBeMoved.indexOf(x)),
          // level: drawerToBeMovedObj[0]['level'] - subDrawersToBeMoved.indexOf(x),
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

    // for (let x of drawers) {
    //   if (
    //     x.drawerId == parentDrawerId ||
    //     (x.rootId == drawerToBeMoved && x.level > 1)
    //   ) {
    //     subDrawersToBeMoved.push(x);

    //     // console.log("drawerToBeMoved!!!", drawerToBeMoved);
    //     // console.log("INDEXINDEXINDEX", subDrawersToBeMoved);
    //     // console.log("newTopLevelDrawerId", newTopLevelDrawerId);
    //     // console.log("drawerToBeMovedObj", drawerToBeMovedObject[0]);

    //     let dataPost = {
    //       rootId: newTopLevelDrawerId,
    //       // userId: 1,
    //       // drawerId: x.drawerId,
    //       // name: x.name,
    //       // type: "drawer",
    //       // ["subDrawer"]: x["subDrawer"],
    //       root: false,
    //       //DONT DELETE TILL GET MONGO
    //       level: 2 + subDrawersToBeMoved.indexOf(x),
    //       // level: 2 + parseInt(subDrawersToBeMoved.indexOf(x)),
    //       // level: drawerToBeMovedObj[0]['level'] - subDrawersToBeMoved.indexOf(x),
    //     };

    //     fetch(`http://localhost:8080/api/drawers/${x._id}`, {
    //       method: "PUT",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(dataPost),
    //     })
    //       .then((response) => response.json())
    //       .catch((error) => console.error(error.message));
    //   }
    // }

    for (let x in scribbles) {
      if (scribbles[x].rootDrawerId == parentDrawerId) {
        let dataPost = {
          rootDrawerId: newTopLevelDrawerId,
          // userId: 1,
          // drawerId: x.drawerId,
          // title: x.title,
          // content: x.content,
          // type: "scribble",
          stray: false,
          level: drawerToBeMovedObject[0]["level"] + scribbles[x].level + 1,
          // level: x.level + 2,
          // level: parseInt(linkedDrawerObj[0]['level'])+1,
          // level:newLevel,
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
          // .then((json) => setScribbles((prevItems) => [...prevItems, json.data]))
          .catch((error) => console.error(error.message));
      }
    }
  };

  //   for (let x of scribbles) {
  //     if (x.rootDrawerId == parentDrawerId) {
  //       let dataPost = {
  //         rootDrawerId: newTopLevelDrawerId,
  //         userId: 1,
  //         drawerId: x.drawerId,
  //         title: x.title,
  //         content: x.content,
  //         type: "scribble",
  //         stray: false,
  //         level: drawerToBeMovedObject[0]["level"] + x.level + 1,
  //         // level: x.level + 2,
  //         // level: parseInt(linkedDrawerObj[0]['level'])+1,
  //         // level:newLevel,
  //       };
  //       fetch(`http://localhost:8080/api/scribbles/${x._id}`, {
  //         method: "PUT",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataPost),
  //       })
  //         .then((response) => response.json())
  //         .catch((error) => console.error(error.message));
  //     }
  //   }
  // };

  const moveDrawerToNewDrawer = (passedId) => {
    // const drawerToBeMovedObject = drawers.filter(
    //   (item) => item._id == drawerToBeMoved
    // );
    let dataPost = {
      rootId: passedId,
      // userId: 1,
      drawerId: passedId,
      // name: drawerToBeMovedObject[0]["name"],
      // type: "drawer",
      // ["subDrawer"]: drawerToBeMovedObject[0]["subDrawer"],
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
      // .then((json) => setDrawers((prevItems) => [...prevItems, json.data]))
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
        moveDrawerToNewDrawer(json.data._id);
        moveAllChildrenToNewDrawer(drawerToBeMoved, json.data._id);
      })
      .catch((error) => console.error(error.message));

    // moveDrawerToNewDrawer(dataPost._id);
    // moveAllChildrenToNewDrawer(drawerToBeMoved, dataPost._id);
  };

  const handleChange = (value) => {
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    createNewDrawer();
    setDrawerName("");
    navigate("/home");
    navigate(0);
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
  // const temp = JSON.parse(sessionStorage.getItem("drawersData"))
  // console.log("temp", temp)
  // const drawerToBeMovedObj = temp.find((item)=>item._id == sessionStorage.getItem("drawerToBeMoved"))

  // const drawerToBeMovedObj = drawers.filter(
  //   (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
  // );

  const drawerToBeMovedObjName = () => {
    const obj = drawers.filter(
      (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
    );
    return obj[0]["name"];
  };

  // const drawerToBeMovedObj = drawers.filter(
  //   (item) => item._id == drawerToBeMoved
  // );
  console.log("LOOK", drawerToBeMoved);
  console.log("MILA", drawerToBeMovedObjName);

  //console.log("LOOK2", selectedDrawerId);

  // const destinationDrawerObj = drawers.filter(
  //   (item) => item._id == selectedDrawerId
  // );

  const destinationDrawerObjName = () => {
    const obj = drawers.filter((item) => item._id == selectedDrawerId);
    return obj[0]["name"];
  };

  return (
    <div id="page">
      {/* <h4 className="sort-drawer-title">
        Drawer to be moved : {drawerToBeMovedObj["name"]}---ID
        {drawerToBeMoved}
      </h4>
      <h4>Selected drawer Id : {selectedDrawerId}</h4> */}

      {/* At the moment showing only drawer icons but at least persistent on refresh */}
      <h4 className="sort-drawer-title">
        {sessionStorage.getItem("drawerToBeMoved") && drawerToBeMovedObjName}
        <Icon icon="mingcute:drawer-line" color="red" />
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && destinationDrawerObjName}
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
            // btnName="Create & Move"
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
                console.log("PassingData", passingData);
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
