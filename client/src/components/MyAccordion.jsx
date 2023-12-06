import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Accordion } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";

export default function MyAccordion({
  expandedIndex,
  setExpandedIndex,
  handleExpand,
}) {
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();


  // useEffect(() => {
  //   setDrawers(drawers);
  //   setScribbles(scribbles);
  // }, []);



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
        <p className={"individual-scribble scrb-indent" + item.level}>
          {item.title}{" "}
        </p>
      </Link>
    ));
  };

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
      const scribbleList = findScribbles(item._id);
      return (
        <div key={item._id} className="sub-drawer-div">
          <h3 className={"sub-drawer-name indent-" + item.level}>
            {item.name}
          </h3>
          <div>
            {scribbleList.length == 0 ? (
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
  const renderedList = drawers.map((item) => {
    if (!item.drawerId) {
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
