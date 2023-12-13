import { useState, useEffect } from "react";
import "../css/Dropdown.css";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedDrawerContext } from "../context/SelectedDrawerContext";
import { useDrawerToBeMovedContext } from "../context/DrawerToBeMovedContext";

export default function MyDropdown() {
  const [open, setOpen] = useState(false);
  const [currentDropdown, setCurrentDropDown] = useState("Existing Drawers");
  const { drawers } = useDataContext();
  const { handleSelectedDrawerId } = useSelectedDrawerContext();
  const [drawerToBeMoved] = useDrawerToBeMovedContext();

  //++++++++++NOt sure if I need this++++++++++++++++++++
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
          //console.log(obj)
        }
      }
    }

    //console.log("NEWARRAY@@@@@@@@@@2", newArray2)

    //Remove drawers that are collected in the above forloop
    for (let p of newArray2) {
      //console.log("P", Object.values(p)[0].drawerId);
      for (let i of newArray) {
        if (i._id == Object.values(p)[0]._id) {
          //console.log("IIII", newArray.indexOf(i))
          //delete newArray[newArray.indexOf(i)]
          const newA = newArray.splice(newArray.indexOf(i), 1);
          //console.log("newA", newA)
        }
      }
    }

    //Insert collected subdrawers to the right location
    for (let k of newArray2) {
      for (let j of newArray) {
        if (Object.values(k)[0].drawerId == j._id) {
          console.log("KKKK", Object.values(k)[0]);
          console.log("index", newArray.indexOf(j));
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

    //console.log("newArray", newArray3);

    return newArray3.map((item) => {
      return (
        <div key={item._id}>
          {item._id == drawerToBeMoved ? (
            <p
              className={"sub-drawer indent-" + item.level}
              style={{ color: "red" }}
            >
              {item.name}
              <Icon icon="healthicons:stop" color="red" width="18" />
            </p>
          ) : (
            <p
              className={"sub-drawer indent-" + item.level}
              onClick={() => {
                setCurrentDropDown(item.name);
                handleSelectedDrawerId(item._id);
              }}
            >
              {item.name}
            </p>
          )}
        </div>
      );
    });
  };


  // // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  // const findSubDrawers = (id) => {
  //   let newArray = [];

  //   for (let x in drawers) {
  //     if (drawers[x].drawerId && drawers[x].rootId == id) {
  //       newArray.push(drawers[x]);
  //     }
  //   }

  //   let newArray2=[]

  //   for (let y in newArray){
  //     let i = newArray[y]['_id']
  //     //console.log("NewArray",i)
  //     for (let z of newArray){
  //       if (z['drawerId'] == i){
  //         //console.log("Z",z['drawerId'])
  //         newArray2.push(z)
  //       } else{
  //         //console.log(`No drawerId for ${i}`)
  //       }
  //     }
  //   }

  //   console.log("newArray2", newArray2)

  //   newArray.sort((a, b) => parseInt(a.level) - parseInt(b.level));

  //   return newArray.map((item) => {
  //     return (
  //       <div key={item._id}>
  //         {item._id == drawerToBeMoved ? (
  //           <p
  //             className={"sub-drawer indent-" + item.level}
  //             style={{ color: "red" }}
  //           >
  //             {item.name}
  //             <Icon icon="healthicons:stop" color="red" width="18" />
  //           </p>
  //         ) : (
  //           <p
  //             className={"sub-drawer indent-" + item.level}
  //             onClick={() => {
  //               setCurrentDropDown(item.name);
  //               handleSelectedDrawerId(item._id);
  //             }}
  //           >
  //             {item.name}
  //           </p>
  //         )}
  //       </div>
  //     );
  //   });
  // };

  const existingDrawersList = drawers.map((item) => {
    if (item.root === true) {
      return (
        <>
          {item._id == drawerToBeMoved ? (
            <div key={item._id} style={{ color: "red" }}>
              <p className="top-drawer">
                {item.name}
                <Icon icon="healthicons:stop" color="red" width="18" />
              </p>
            </div>
          ) : (
            <div
              key={item._id}
              onClick={() => {
                setCurrentDropDown(item.name);
                handleSelectedDrawerId(item._id);
              }}
            >
              <p className="top-drawer">{item.name}</p>
            </div>
          )}
          <div>
            {item["subDrawer"] === true ? (
              <>{findSubDrawers(item._id)} </>
            ) : // <>{findSubDrawers2(item._id, drawers)} </>

            null}
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
