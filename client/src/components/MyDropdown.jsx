import { useState, useEffect } from "react";
import "../css/Dropdown.css";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";

export default function MyDropdown() {
  const [open, setOpen] = useState(false);
  const [currentDropdown, setCurrentDropDown] = useState("Existing Drawers");
  const { drawers, scribbles, setDrawers } = useDataContext();
  const { handleSelectedDrawerId } = useSelectedDrawerContext();

  //++++++++++NOt sure if I ened this++++++++++++++++++++
  const handleOpen = () => {
    setOpen(!open);
  };

  // const existingDrawersList = data["drawers"].map((item) => {
  //   return item["drawerId"] ? (
  //     <li
  //       key={item.id}
  //       onClick={() => {
  //         setCurrentDropDown(item.name);
  //         setSelectedDrawerId(item.id);
  //         console.log("SelectedId", item.id);
  //       }}
  //       className={"indent-" + item.level}
  //     >
  //       <a className="dropdown-item" href="#">
  //         {item.name}
  //       </a>
  //     </li>
  //   ) : (
  //     <li
  //       key={item.id}
  //       onClick={() => {
  //         setCurrentDropDown(item.name);
  //         setSelectedDrawerId(item.id);
  //         console.log("SelectedId", item.id);
  //       }}
  //     >
  //       <a className="dropdown-item" href="#">
  //         {item.name}
  //       </a>
  //     </li>
  //   );
  // });

  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id) => {
    let newArray = [];

    for (let x in drawers) {
      if (drawers[x].drawerId && drawers[x].rootId == id) {
        newArray.push(drawers[x]);
      }
    }
    newArray.sort((a, b) => parseInt(a.level) - parseInt(b.level));

    return newArray.map((item) => {
      return (
        <p
          className={"sub-drawer indent-" + item.level}
          key={item._id}
          onClick={() => {
            setCurrentDropDown(item.name);
            // setSelectedDrawerId(item.id);
            handleSelectedDrawerId(item._id);
          }}
        >
          {item.name}
        </p>
      );
    });
  };

  const existingDrawersList = drawers.map((item) => {
    if (item.root === true) {
      return (
        <>
          <div
            key={item._id}
            onClick={() => {
              setCurrentDropDown(item.name);
              // setSelectedDrawerId(item.id);
              handleSelectedDrawerId(item._id);
            }}
          >
            <p className="top-drawer">{item.name}</p>
          </div>
          <div>
            {item["subDrawer"] === true ? (
              <>{findSubDrawers(item._id)} </>
            ) : null}
          </div>
        </>
      );
    }
  });

  //   return (
  //     <div>
  //       <div className="dropdown">
  //         <button
  //           className="btn btn-secondary dropdown-toggle"
  //           type="button"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false"
  //           onClick={handleOpen} //Not sure why this is needed
  //         >
  //           {currentDropdown}
  //         </button>
  //         <div className="dropdown-menu">{existingDrawersList}</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {currentDropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>{existingDrawersList}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* ORIGINAL without React-BOOTSTRAP */}
      {/* <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={handleOpen} //Not sure why this is needed
      >
        {currentDropdown}
      </button>
      <div className="dropdown-menu">{existingDrawersList}</div>
    </div> */}
    </div>
  );
}
