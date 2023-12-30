import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useUserContext } from "../context/UserContext";

export default function MyAccordion({ expandedIndex, handleExpand }) {
  const { drawers, scribbles, loadingDrawers } = useDataContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const { user } = useUserContext();

  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++

  const findScribbles = (id) => {
    let scribbleArray = [];
    for (let x in scribbles) {
      if (scribbles[x].drawerId == id) {
        scribbleArray.push(scribbles[x]);
      }
    }
    return scribbleArray.map((item) => (
      <Link
        key={item._id}
        to={`/scribble/${item._id}`}
        onClick={() => setSelectedScribbleId(item._id)}
      >
        <p className="individual-scribble">
          {item.title}{" "}
        </p>
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
        <div key={item._id} className="sub-drawer-div">
          <h3 className={"sub-drawer-name indent-" + item.level}>
            {item.name}
          </h3>
          <div>
            {scribbleList.length == 0 ? (
              <h6 className={"no-scribble scrb-indent" + item.level}>
                No Scribbles
              </h6>
            ) : (
              <div
                className={"sub-drawer-scribble-list scrb-indent" + item.level}
              >
                {scribbleList}
              </div>
              // <div className={"sub-drawer-scribble-list"}>{scribbleList}</div>
            )}
          </div>
        </div>
      );
    });
  };

  ///DONT delete this till confirm other partterns//////////////////////////////////////////////
  // // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  // const findSubDrawers = (id) => {
  //   let newArray = [];
  //   let newArray2 = [];
  //   let newArray3 = [];

  //   //Collect all sub-drawers
  //   for (let x in drawers) {
  //     if (drawers[x].drawerId && drawers[x].rootId == id) {
  //       newArray.push(drawers[x]);
  //     }
  //   }

  //   // Collect subdrawers that are subdrawers that have parent in this array
  //   for (let y of newArray) {
  //     const id = y._id;
  //     for (let z of newArray) {
  //       if (z.drawerId == id) {
  //         let obj = { [`${id}`]: z };
  //         newArray2.push(obj);
  //       }
  //     }
  //   }

  //   console.log("newArray", newArray)

  //   //Remove drawers that are collected in the above forloop
  //   for (let p of newArray2) {
  //     for (let i of newArray) {
  //       if (i._id == Object.values(p)[0]._id) {
  //         newArray.splice(newArray.indexOf(i), 1);
  //       }
  //     }
  //   }

  //   //Insert collected subdrawers to the right location
  //   for (let k of newArray2) {
  //     for (let j of newArray) {
  //       if (Object.values(k)[0].drawerId == j._id) {
  //         const index = newArray.indexOf(j);
  //         const obj = Object.values(k)[0];
  //         newArray3 = [
  //           ...newArray.slice(0, index + 1),
  //           obj,
  //           ...newArray.slice(index + 1),
  //         ];
  //         newArray = newArray3;
  //       }
  //     }
  //   }

  //   //console.log("newArray", newArray)

  //   return newArray.map((item) => {
  //     const scribbleList = findScribbles(item._id);
  //     return (
  //       <div key={item._id} className="sub-drawer-div">
  //         <h3 className={"sub-drawer-name indent-" + item.level}>
  //           {item.name}
  //         </h3>
  //         <div>
  //           {scribbleList.length == 0 ? (
  //             <h6 className={"no-scribble scrb-indent" + item.level}>
  //               No Scribbles
  //             </h6>
  //           ) : (
  //             <div className="sub-drawer-scribble-list">{scribbleList}</div>
  //           )}
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  // ++++++++++++++ Render Whole List +++++++++++++++++++++++++++++++++++++++++++++
  const renderedList = drawers.map((item) => {
    if (!item.drawerId && item.userId === user._id) {
      const isExpanded = item._id == expandedIndex;
      const triangle = (
        <div className="triangle">
          {" "}
          {isExpanded ? <GoTriangleDown /> : <GoTriangleRight />}
        </div>
      );

      return (
        <AccordionItem
          key={item._id}
          triangle={triangle}
          handleExpand={() => handleExpand(item._id)}
          findSubDrawers={findSubDrawers}
          findScribbles={findScribbles}
          item={item}
          isExpanded={isExpanded}
        />
      );
    }
  });

  return <div className="Accordion">{renderedList}</div>;
}
