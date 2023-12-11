import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";
//import { useDataContext } from "../context/DataContext";
import { useEffect, useHistory } from "react";
import { useFileContext } from "../context/FileContext";

export default function HomePage({ expandedIndex, handleExpand }) {



  return (
    <div>
      <MyAccordion expandedIndex={expandedIndex} handleExpand={handleExpand} />

      <Link to="/create" className="btn btn-dark btn-lg">
        Create New Drawer
      </Link>
    </div>
  );
}
