import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Accordion } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";


export default function MyAccordion({
  expandedIndex,
  setExpandedIndex,
  handleExpand,
}) {

  // const data = useDataContext();
  const {drawers, scribbles} = useDataContext();

  console.log("drawers in MyAccordion", drawers)


  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++
  const findScribbles = (id, scribbles) => {
    let scribbleArray = [];
    const scbs = Object.values(scribbles);
    //console.log(scribbles)
    for (let x in scbs) {
      if (scbs[x].drawerId == id) {
        //console.log("Scribble ID, ", scbs[x].id)
        //console.log(scbs[x])
        scribbleArray.push(scbs[x]);
      }
    }
    return scribbleArray.map((item) => (
      <Link key={item.id} to={`/scribble/${item.id}`}>
        <p className={"individual-scribble scrb-indent"+item.level}>{item.title} </p>
      </Link>
    ));
  };

  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id, array) => {
    let newArray = [];
    let values = Object.values(array);

    for (let x in values) {
      for (let y in values[x]) {
        //console.log("values[x][y]", values[x][y])
        if (values[x][y].drawerId && values[x][y].rootId==id ) {
        // if (values[x][y].drawerId == id) {
          // console.log("DrawerId: ", values[x][y].drawerId);
          // console.log("ID: ", values[x][y].id);
          newArray.push(values[x][y]);
        }
      // }
      }
    }

    newArray.sort((a, b) => parseInt(a.level) - parseInt(b.level));


    return newArray.map((item) => {
      // const scribbleList = findScribbles(item.id, data["scribbles"]);
      const scribbleList = findScribbles(item.id, scribbles);

      //console.log(data["drawers"])
      //console.log("Item ID", item.id)
      return (
        <div key={item.id} className="sub-drawer-div">
          <h3 className={"sub-drawer-name indent-"+item.level}>{item.name}</h3>
          <div>
            {scribbleList.length === 0 ? (
              <h6 className="no-scribble">No Scribbles</h6>
            ) : (
              <div className="sub-drawer-scribble-list">{scribbleList}</div>
            )}
          </div>
        </div>
      );
    });
  };

  // ++++++++++++++ Render Whole List +++++++++++++++++++++++++++++++++++++++++++++
  // const renderedList = data["drawers"].map((item) => {
    const renderedList = Array(drawers).map((item) => {

    if (!item.drawerId) {
      const isExpanded = item.id === expandedIndex;
      const triangle = (
        <div className="triangle"> {isExpanded ? <GoTriangleDown /> : <GoTriangleRight />}</div>
      );

      return (

        <AccordionItem
          key={item.id}
          triangle={triangle}
          handleExpand={() => handleExpand(item.id)}
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
