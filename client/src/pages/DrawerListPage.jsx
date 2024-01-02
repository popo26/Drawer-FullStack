import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";
import { useUserContext } from "../context/UserContext";

export default function DrawerListPage({ expandedIndex }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerNameToEdit, setDrawerNameToEdit] = useState("");
  const [drawerIdToEdit, setDrawerIdToEdit] = useState("");
  const [updateIconIndex, setUpdateIconIndex] = useState(-1);
  const { drawers, scribbles } = useDataContext();
  const { selectedDrawerId } = useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();
  const text = useRef(drawerNameToEdit);
  const { user } = useUserContext();

  // ++++++++Delete Drawer and its sub-drawers and scribbles
  const deleteScribbles = (drawerId) => {
    const associatedScribbles = scribbles.filter(
      (scrb) => scrb.drawerId == drawerId
    );
    for (let t of associatedScribbles) {
      fetch(`http://localhost:8080/api/scribbles/${t._id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((error) => console.error(error.message));
    }
  };

  const deleteSelectedDrawer = (id) => {
    fetch(`http://localhost:8080/api/drawers/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error.message))
      .then(deleteSubDrawers(id));
  };

  const deleteSubDrawers = (id) => {
    for (let x of drawers) {
      if (x.root === true) {
        //delete all rootId
        const sameRootIdDrawers = drawers.filter((item) => item.rootId == id);
        for (let y of sameRootIdDrawers) {
          fetch(`http://localhost:8080/api/drawers/${y._id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .catch((error) => console.error(error.message));
          deleteScribbles(y._id);
        }
      } else if (x.root === false && x["subDrawer"] === true) {
        //delete all subdrawers whose drawerId is id
        const subDrawers = drawers.filter((item) => item.drawerId == id);
        for (let y of subDrawers) {
          fetch(`http://localhost:8080/api/drawers/${y._id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .catch((error) => console.error(error.message));
          deleteScribbles(y._id);
        }
      }
    }
  };

  const handleDelete = (id) => {
    const response = confirm(
      `Are you sure to delete this drawer and all the content? -ID:${id}`
    );
    if (response == true) {
      deleteSelectedDrawer(id);
      navigate("/home");
      navigate(0);
    }
  };

  const showUpdateIcon = (id) => {
    const isEditing = id == updateIconIndex;
    if (isEditing) {
      return (
        <Icon
          className="icon10"
          icon="material-symbols:update"
          color="red"
          width="26"
          onClick={update}
        />
      );
    }
  };

  //top
  const handleUpdateIcon = (passedIndex) => {
    setUpdateIconIndex((currentExpandedIndex) => {
      if (currentExpandedIndex == passedIndex) {
        return -1;
      } else {
        return passedIndex;
      }
    });
  };

  const detectClickedInnerText = (id) => {
    document
      .getElementById(`targetDrawerId${id}`)
      .addEventListener("input", function () {
        setDrawerNameToEdit(
          document.getElementById(`targetDrawerId${id}`).innerText
        );
      });
  };

  const handleSelectedDrawer = (clickedId) => {
    handleUpdateIcon(clickedId);
    setUpdateIconIndex(clickedId);
    detectClickedInnerText(clickedId);
    const drawerName = drawers.filter((item) => item._id == clickedId);
    setDrawerNameToEdit(drawerName["name"]);
    setDrawerIdToEdit(clickedId);

    text.current = document.getElementById(
      `targetDrawerId${clickedId}`
    ).innerText;
  };

  const update = () => {
    updateDrawerName(drawerIdToEdit);
    setUpdateIconIndex(-1);
    navigate(0);
  };

  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++

  const findScribbles = (id) => {
    let scribbleArray = [];
    for (let x in scribbles) {
      if (scribbles[x].drawerId == id) {
        scribbleArray.push(scribbles[x]);
      }
    }
    return scribbleArray.map((item) => (
      <Link key={item._id} to={`/scribble/${item._id}`}>
        <p className="individual-scribble">{item.title} </p>
      </Link>
    ));
  };

  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id) => {
    let newArray = [];
    let newArray2 = [];
    let newArray3 = [];

    //Collect all sub-drawers
    for (let x in drawers) {
      if (drawers[x].drawerId && drawers[x].rootId == id) {
        newArray.push(drawers[x]);
      }
    }

    // Collect subdrawers that are subdrawers that have parent in this array
    for (let y of newArray) {
      const id = y._id;
      for (let z of newArray) {
        if (z.drawerId == id) {
          let obj = { [`${id}`]: z };
          newArray2.push(obj);
        }
      }
    }

    //Remove drawers that are collected in the above forloop
    for (let p of newArray2) {
      for (let i of newArray) {
        if (i._id == Object.values(p)[0]._id) {
          newArray.splice(newArray.indexOf(i), 1);
        }
      }
    }

    //Insert collected subdrawers to the right location
    for (let k of newArray2) {
      for (let j of newArray) {
        //Something wrong around here
        if (Object.values(k)[0].drawerId == j._id) {
          const index = newArray.indexOf(j);
          const obj = Object.values(k)[0];

          if (!newArray.includes(obj)) {
            newArray3 = [
              ...newArray.slice(0, index + 1),
              obj,
              ...newArray.slice(index + 1),
            ];
          }

          newArray = newArray3;
        }
      }

      for (let j of newArray) {
        //Something wrong around here
        if (
          Object.values(k)[0].drawerId !== j._id ||
          Object.values(k)[0].rootId == j.rootId
        ) {
          const index = newArray.indexOf(j);
          const obj = Object.values(k)[0];

          if (!newArray.includes(obj)) {
            newArray3 = [
              ...newArray.slice(0, index + 1),
              obj,
              ...newArray.slice(index + 1),
            ];
          }

          newArray = newArray3;
        }
      }
    }

    return newArray.map((item) => {
      const scribbleList = findScribbles(item._id);
      return (
        <div key={item._id} className="sub-drawer-header">
          <div className="sub-drawer-header-div">
            <h3
              id={`targetDrawerId${item._id}`}
              style={{ display: "inline-block" }}
              className={"sub-drawer indent-" + item.level}
              onClick={() => {
                handleSelectedDrawer(item._id);
              }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              ref={text}
            >
              {item.name}
            </h3>
            <Icon
              onClick={() => handleDelete(item._id)}
              icon="ion:trash-outline"
              color="black"
              width="18"
              className="icon10"
            />
            <Icon
              className="icon10"
              icon="mingcute:drawer-line"
              color="black"
              width="18"
              onClick={() => {
                let passingData = { selectedDrawerId, drawerToBeMoved };
                navigate("/sort-drawer", { state: passingData });
                sessionStorage.setItem("drawerToBeMoved", item._id);
              }}
            />
            {showUpdateIcon(item._id)}
          </div>
          {scribbleList.length === 0 ? (
            <h6 className={"no-scribble scrb-indent" + item.level}>
              No Scribbles
            </h6>
          ) : (
            <div
              className={"sub-drawer-scribble-list scrb-indent" + item.level}
            >
              {scribbleList}
            </div>
          )}
        </div>
      );
    });
  };

  ///////++++++++Update Drawer Name in DB+++++++++++++
  const updateDrawerName = (id) => {
    // const drawerToBeUpdated = drawers.filter((item) => item._id == id);
    // const newName = text.current.innerText;
    setDrawerNameToEdit(text.current.innerText);

    let dataPost = {
      name: drawerNameToEdit,
    };
    fetch(`http://localhost:8080/api/drawers/${id}`, {
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

  const renderedList = drawers.map((item) => {
    if (id == item._id && item.userId === user._id) {
      return (
        <div key={item._id}>
          <div className="rendered-drawers">
            <h2
              id={`targetDrawerId${item._id}`}
              style={{ display: "inline-block" }}
              onClick={() => {
                handleSelectedDrawer(item._id);
              }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              ref={text}
            >
              {item.name}
            </h2>
            <Icon
              onClick={() => handleDelete(item._id)}
              icon="ion:trash-outline"
              color="black"
              width="18"
              className="icon10"
            />
            <Icon
              className="icon10"
              icon="mingcute:drawer-line"
              color="black"
              width="18"
              onClick={() => {
                setDrawerToBeMoved(item._id);
                let passingData = { selectedDrawerId, drawerToBeMoved };
                navigate("/sort-drawer", { state: passingData });
                sessionStorage.setItem("drawerToBeMoved", item._id);
              }}
            />

            {showUpdateIcon(item._id)}
          </div>

          {item["subDrawer"] === true ? (
            <div>
              <div className="no-subfolder">{findScribbles(item._id)}</div>
              <div>{findSubDrawers(item._id)} </div>
            </div>
          ) : (
            <div>{findScribbles(item._id)}</div>
          )}
        </div>
      );
    }
  });

  return (
    <div>
      <div className="drawer-list">{renderedList}</div>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
          className="back-btn"
        />
      </div>
    </div>
  );
}
