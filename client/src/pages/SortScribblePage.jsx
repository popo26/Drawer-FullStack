import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import MyDropdown from "../components/MyDropdown";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useDrawerNameContext } from "../context/DrawerNameContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";

// export default function SortScribblePage({ user, setUser }) {
export default function SortScribblePage() {
  const [newDrawerNameFieldSelected, setNewDrawerNameFieldSelected] =
    useState(true);
  const [displayMessage, setDisplayMessage] = useState(
    "Or choose from existing drawer"
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    drawers,
    scribbles,
    setDrawers,
    setScribbles,
    loadingDrawers,
    setLoadingDrawers,
    loadingScribbles,
  } = useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();
  const { user, setUser } = useUserContext();

  const tooltipNext = <Tooltip id="tooltip">Next</Tooltip>;

  //console.log("State", state.id);
  console.log("user id", user);

  // //To persist selected Scribble ID so browser refresh won't wipe it
  // useEffect(() => {
  //   //setSelectedScribbleId(state.id);
  //   handleSelectedDrawerId(""); //this is still bit in quesion
  // }, []);

  //To persist selected Scribble ID so browser refresh won't wipe it
  useEffect(() => {
    // const userInBrowser = JSON.parse(localStorage.getItem("user"));
    // console.log("user in browser", userInBrowser);
    // setUser(userInBrowser);
    handleSelectedDrawerId(""); //this is still bit in quesion
  }, []);

  console.log("Sccribleid is", selectedScribbleId);

  const addScribbleToNewSubDrawer = (passedId) => {
    // const scribbleObject = scribbles.filter(
    //   (item) => item._id == selectedScribbleId
    // );

    let dataPost = {
      rootDrawerId: passedId,
      drawerId: passedId,
      userId: user._id,
      // title: scribbleObject[0]["title"],
      // content: scribbleObject[0]["content"],
      // type: "scribble",
      stray: false,
      level: 1,
      // attachment: scribbleObject[0]["attachment"],
      // files: [scribbleObject[0]["files"]],
    };
    fetch(`http://localhost:8080/api/scribbles/${selectedScribbleId}`, {
      // fetch(`http://localhost:8080/api/scribbles/${state.id}`, {

      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      // .then((json) => {
      //   setScribbles((prevItems) => [...prevItems, json.data]);
      // })
      .then(() => navigate(0))

      .catch((error) => console.error(error.message));
  };

  const createNewDrawer = () => {
    let dataPost = {
      rootId: drawers.length + 1,
      userId: user._id,
      name: drawerName.toUpperCase(),
      type: "drawer",
      subDrawer: false,
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
        addScribbleToNewSubDrawer(json.data._id);
      })
      .catch((error) => console.error(error.message));
  };

  const handleChange = (value) => {
    console.log(value);
    //somehow need a spot to set this state
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
    setDrawerName("");
    navigate("/home");
    //navigate(0);
  };

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage == "Or choose from existing drawer"
        ? setDisplayMessage("Or create new top level drawer")
        : setDisplayMessage("Or choose from existing drawer");
    }
  };

  // const tooltipCreate = <Tooltip id="tooltip">Create & Save</Tooltip>;

  const scrb = scribbles.filter((item) => item._id == selectedScribbleId);
  console.log("scrb", scrb);

  const destinationDrawer = drawers.find(
    (item) => item._id === selectedDrawerId
  );

  if (loadingScribbles) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div id="page">
      {/* <h4>Scribble ID: {selectedScribbleId}</h4>
      <h4>Selected Drawer Id: {selectedDrawerId}</h4> */}
      <h4>
        {/* {!loadingScribbles && scrb[0].title} */}
        <Icon icon="tabler:scribble" color="red" />{" "}
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && destinationDrawer?.name}{" "}
        <Icon icon="mingcute:drawer-line" color="red" />
      </h4>
      {/* <div className="scrb-createNewDrawer-div"> */}
      <div>
        {newDrawerNameFieldSelected && (
          <>
            <InputField
              type="text"
              name="create-new-drawer"
              id="create-new-drawer"
              placeholder="Enter new drawer name"
              value={drawerName}
              handleNewDrawerChange={handleChange}
            />
            <br />
            {/* <OverlayTrigger placement="bottom" overlay={tooltipCreate}> */}
            <MyButton
              href={null}
              // btnName="Create & Save"
              btnName={<Icon icon="typcn:plus" />}
              handleNewDrawerCreate={handleCreate}
              drawerName={drawerName}
            />
            {/* </OverlayTrigger> */}
          </>
        )}
      </div>

      {/* <button className="sort-msg-btn" onClick={handleDisplay}>
        {displayMessage}
      </button> */}

      <Button className="sort-msg-btn" onClick={handleDisplay} variant="dark">
        {displayMessage}
      </Button>

      {!newDrawerNameFieldSelected && (
        // <div className="scrb-createNewDrawer-div">
        <div>
          <MyDropdown
            // data={data}
            // selectedDrawerId={selectedDrawerId}
            // setSelectedDrawerId={setSelectedDrawerId}
            user={user}
          />
          <OverlayTrigger placement="right" overlay={tooltipNext}>
            <Button
              variant="dark"
              className="next-btn"
              onClick={(e) => {
                e.preventDefault();
                let passingData = { selectedScribbleId, selectedDrawerId };
                console.log("PassingData", passingData);
                {
                  !selectedDrawerId
                    ? alert("Please select destination drawer")
                    : navigate("/sort-preview", { state: passingData });
                }
              }}
            >
              <Icon icon="tabler:player-track-next-filled" />
            </Button>
          </OverlayTrigger>
        </div>
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
