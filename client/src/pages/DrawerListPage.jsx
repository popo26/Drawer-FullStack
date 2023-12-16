import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
// import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";

export default function DrawerListPage({ expandedIndex }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerNameToEdit, setDrawerNameToEdit] = useState("");
  const [drawerIdToEdit, setDrawerIdToEdit] = useState("");
  const [updateIconIndex, setUpdateIconIndex] = useState(-1);
  //const [isContentEditableDisabled, setIsContentEditableDisabled] = useState(true);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();
  const { selectedDrawerId } = useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();
  const text = useRef(drawerNameToEdit);

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

  //+++++++++++++++++++Get feedback from Anthony++++++++++++++++++++++++++++++++
  // const sanitizeConf = {
  //   allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
  //   allowedAttributes: { a: ["href"] },
  // };

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

  //experiement
  const test = (id) => {
    //with sanitization - GET FEEDBACK from ANTHONY
    // document
    // .getElementById(`targetDrawerId${id}`)
    // .addEventListener("input", function () {
    //   setDrawerNameToEdit(
    //     sanitizeHtml(document.getElementById(`targetDrawerId${id}`).innerText, sanitizeConf
    //     )
    //   );
    // });

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
    console.log("update icon index", updateIconIndex);
    setUpdateIconIndex(clickedId);
    test(clickedId);
    console.log("clickedId", clickedId);
    const drawerName = drawers.filter((item) => item._id == clickedId);
    // setDrawerNameToEdit(drawerName[0]["name"]);
    // setDrawerIdToEdit(drawerName[0]["idd"]);
    setDrawerNameToEdit(drawerName["name"]);
    // setDrawerIdToEdit(drawerName["_id"]);
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

  // const save = (id) => {
  //   setDrawerNameToEdit(
  //     document.getElementById(`targetDrawerId${id}`).innerText
  //   );
  // };

  // const handleChange3 = (id) => {
  //   //can't access changed value with e.target.value
  //   text.current = document.getElementById(`targetDrawerId${id}`).innerText;
  //   // setDrawerNameToEdit(
  //   //   document.getElementById(`targetDrawerId${id}`).innerText
  //   // );
  // };

  // const onContentChange = useCallback((evt) => {
  //   const sanitizeConf = {
  //     allowedTags: ["b", "i", "a", "p"],
  //     allowedAttributes: { a: ["href"] },
  //   };
  //   setDrawerNameToEdit(
  //     sanitizeHtml(evt.currentTarget.innerText, sanitizeConf)
  //     // sanitizeHtml(evt.target.value, sanitizeConf)
  //   );
  // }, []);

  const handleEdit = (e, id) => {
    handleSelectedDrawer(id);
    console.log("Edit clicked");
    //setIsContentEditableDisabled(!isContentEditableDisabled);
    //setIsContentEditable(!isContentEditable);
    console.log(e.target.value);
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
  ///////////////////////////////////////////////////

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
        if (Object.values(k)[0].drawerId == j._id) {
          const index = newArray.indexOf(j);
          const obj = Object.values(k)[0];
          newArray3 = [
            ...newArray.slice(0, index + 1),
            obj,
            ...newArray.slice(index + 1),
          ];
          newArray = newArray3;
        }
      }
    }

    return newArray.map((item) => {
      const scribbleList = findScribbles(item._id);

      return (
        <div key={item._id} className="sub-drawer-header">
          {/* ADDED */}
          <div className="sub-drawer-header-div">
            <h3
              id={`targetDrawerId${item._id}`}
              style={{ display: "inline-block" }}
              className={"sub-drawer indent-" + item.level}
              onClick={() => {
                handleSelectedDrawer(item._id);
              }}
              contentEditable="true"
              // contentEditable={isContentEditable}
              suppressContentEditableWarning={true}
              //onChange={() => handleChange3(item.id)}
              ref={text}
            >
              {item.name}

              {/* <ContentEditable
                onChange={onContentChange}
                // onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}
                // value={drawerNameToEdit}
              /> */}
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
                // drawerToBeMoved = item.id;
                // setDrawerToBeMoved(drawerToBeMoved);
                setDrawerToBeMoved(item.idd);
                let passingData = { selectedDrawerId, drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
                // sessionStorage.setItem("drawerToBeMoved", drawerToBeMoved);
                sessionStorage.setItem("drawerToBeMoved", item._id);
              }}
            />
            {showUpdateIcon(item._id)}
            {/* added */}
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

  console.log("Ref", text);

  ///////++++++++Update Drawer Name in DB+++++++++++++
  const updateDrawerName = (id) => {
    const drawerToBeUpdated = drawers.filter((item) => item._id == id);
    const newName = text.current.innerText;
    console.log("newName", newName);
    setDrawerNameToEdit(text.current.innerText);

    let dataPost = {
      // rootId: drawerToBeUpdated[0]["rootId"],
      // userId: 1,
      // drawerId: drawerToBeUpdated[0]["drawerId"],
      name: drawerNameToEdit,
      // type: "drawer",
      // ["subDrawer"]: drawerToBeUpdated[0]["subDrawer"],
      // root: drawerToBeUpdated[0]["root"],
      // level: drawerToBeUpdated[0]["level"],
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
    if (id == item._id) {
      return (
        <div key={item._id}>
          <div className="rendered-drawers">
            {/* <h2 contentEditable={isContentEditable} style={{display:"inline-block"}} value={drawerNameToEdit}>
            {item.name}
            </h2>             */}
            <h2
              id={`targetDrawerId${item._id}`}
              // contentEditable={isContentEditable}
              style={{ display: "inline-block" }}
              onClick={() => {
                handleSelectedDrawer(item._id);
              }}
              contentEditable="true"
              // contentEditable={isContentEditable}
              suppressContentEditableWarning={true}
              // onChange={handleChange3}
              //onChange={() => handleChange3(item.id)}
              ref={text}
              //ref={`text${item.id}`}
            >
              {item.name}

              {/* <ContentEditable
                // onChange={onContentChange}
                onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}
                disabled={isContentEditableDisabled}
                // value={drawerNameToEdit}
              /> */}
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
                // drawerToBeMoved = item.id;
                // setDrawerToBeMoved(drawerToBeMoved);
                setDrawerToBeMoved(item._id);
                let passingData = { selectedDrawerId, drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
                // sessionStorage.setItem("drawerToBeMoved", drawerToBeMoved);
                sessionStorage.setItem("drawerToBeMoved", item._id);
              }}
            />
            {/* <Icon
              icon="uiw:edit"
              color="black"
              width="22"
              // onClick={handleEdit}
              onClick={(e) => handleEdit(e, item.id)}
            /> */}
            {/* temp */}
            {/* {updateIconIndex && (
              <Icon
                icon="material-symbols:update"
                color="black"
                width="22"
                onClick={update}
              />
            )} */}

            {showUpdateIcon(item._id)}

            {/* <Icon
              icon="material-symbols:update"
              color="black"
              width="48"
              height="48"
              // onClick={()=>{
              //   save(item.id)
              //   return ()=>update
              // }}
              onClick={update}
            /> */}
            {/* <button onClick={() => save(item.id)}>Save</button> */}
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
        />
      </div>
    </div>
  );
}
