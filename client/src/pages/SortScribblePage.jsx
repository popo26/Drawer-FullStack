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

export default function SortScribblePage() {
  const [newDrawerNameFieldSelected, setNewDrawerNameFieldSelected] =
    useState(true);
  const [displayMessage, setDisplayMessage] = useState(
    "Or choose from existing drawer"
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const { drawers, scribbles, loadingScribbles } = useDataContext();
  const { selectedDrawerId, handleSelectedDrawerId } =
    useSelectedDrawerContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const [drawerName, setDrawerName] = useDrawerNameContext();
  const { user } = useUserContext();

  const tooltipNext = <Tooltip id="tooltip">Next</Tooltip>;

  //To persist selected Scribble ID so browser refresh won't wipe it
  useEffect(() => {
    handleSelectedDrawerId(""); //this is still bit in quesion
  }, []);

  const addScribbleToNewSubDrawer = (passedId) => {
    let dataPost = {
      rootDrawerId: passedId,
      drawerId: passedId,
      userId: user._id,
      stray: false,
      level: 1,
    };
    fetch(`http://localhost:8080/api/scribbles/${selectedScribbleId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
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

  const handleCreate = () => {
    {
      !drawerName ? alert("The new drawer name is empty.") : createNewDrawer();
      setDrawerName("");
      navigate("/home");
    }
  };

  const handleDisplay = () => {
    setNewDrawerNameFieldSelected(!newDrawerNameFieldSelected);
    {
      displayMessage == "Or choose from existing drawer"
        ? setDisplayMessage("Or create new top level drawer")
        : setDisplayMessage("Or choose from existing drawer");
    }
  };

  const scrb = scribbles.filter((item) => item._id == selectedScribbleId);

  const destinationDrawer = drawers.find(
    (item) => item._id === selectedDrawerId
  );

  if (loadingScribbles) {
    return <div>Loading...</div>;
  }

  return (
    <div id="page">
      <h4>
        {!loadingScribbles && scrb[0].title}
        <Icon icon="tabler:scribble" color="red" />{" "}
        <Icon icon="ri:arrow-right-fill" />
        {selectedDrawerId && destinationDrawer?.name}{" "}
        <Icon icon="mingcute:drawer-line" color="red" />
      </h4>
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
            <MyButton
              href={null}
              btnName={<Icon icon="typcn:plus" />}
              handleNewDrawerCreate={handleCreate}
              drawerName={drawerName}
            />
          </>
        )}
      </div>

      <Button className="sort-msg-btn" onClick={handleDisplay} variant="dark">
        {displayMessage}
      </Button>

      {!newDrawerNameFieldSelected && (
        <div>
          <MyDropdown user={user} />
          <OverlayTrigger placement="right" overlay={tooltipNext}>
            <Button
              variant="dark"
              className="next-btn"
              onClick={(e) => {
                e.preventDefault();
                let passingData = { selectedScribbleId, selectedDrawerId };
                //console.log("PassingData", passingData);
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
