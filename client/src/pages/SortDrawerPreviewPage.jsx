import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../css/SortPreviewPage.css";
import { useEffect } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";
import { useUserContext } from "../context/UserContext";

export default function SortDrawerPreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { drawers, scribbles, loadingDrawers } = useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [drawerToBeMoved, setDrawerToBeMoved] = useDrawerToBeMovedContext();
  const { user, setUser } = useUserContext();

  //To persist those 2 values incase of browser refresh -- moved to context?
  const drawerToBeMovedObj = drawers.filter(
    (item) => item._id == sessionStorage.getItem("drawerToBeMoved")
  );
  const destinationObj = drawers.filter(
    (item) => item._id == sessionStorage.getItem("selectedDrawerId")
  );

  const tooltipMoveHere = <Tooltip id="tooltip">Move Here</Tooltip>;

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
        let dataPost = {
          rootId: newTopLevelDrawerId,
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
    const parentDrawerObject = drawers.filter((item) => item._id == passedId);
    let dataPost = {
      rootId: parentDrawerObject[0]["rootId"],
      drawerId: parentDrawerObject[0]["_id"],
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
    .filter((item) => item._id == sessionStorage.getItem("selectedDrawerId"))

    .map((item) => (
      <h4 className="sort-preview-drawer" key={item._id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    return scribbles
      .filter((scrb) => scrb.drawerId == x._id)
      .map((scrb) => (
        <p
          key={scrb._id}
          className={"sort-preview-scribbles scrb-indent" + scrb.level}
        >
          <span>
            <Icon icon="tabler:scribble" color="black" />
          </span>{" "}
          {scrb.title}
        </p>
      ));
  };

  const subDrawers = (x) => {
    return drawers
      .filter((sub) => sub.drawerId == x[0]._id)
      .map((sub) => (
        <p
          key={sub._id}
          className={"sort-preview-sub-drawers indent-" + sub.level}
        >
          <span>
            <Icon icon="mingcute:drawer-line" color="black" />
          </span>{" "}
          {sub.name}
        </p>
      ));
  };

  const FindSubDrawers = () => {
    const x = drawers.filter(
      (item) => item._id == sessionStorage.getItem("selectedDrawerId")
    );

    const renderedChildren =
      x["subDrawer"] === true ? (
        <>
          {scribblies(x)}
          {subDrawers(x)}
        </>
      ) : (
        <>{scribblies(x)}</>
      );

    return renderedChildren;
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
    <div className="sort-drawer-preview-div">
      <h3 className="sort-drawer-title">
        {sessionStorage.getItem("drawerToBeMoved") &&
          !loadingDrawers &&
          drawerToBeMovedObjName()}
        <Icon icon="mingcute:drawer-line" color="red" />
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && !loadingDrawers && destinationDrawerObjName()}
        <Icon icon="mingcute:drawer-line" color="red" />
      </h3>

      <div className="drawer-content-result-div">
        <div>{renderedList}</div>
        <FindSubDrawers />
      </div>
      <div>
        <OverlayTrigger placement="right" overlay={tooltipMoveHere}>
          <Button onClick={handleMoveHere} variant="dark" className="move-btn">
            <Icon icon="ic:baseline-move-down" width="30" />
          </Button>
        </OverlayTrigger>
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
