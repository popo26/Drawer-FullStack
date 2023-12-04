import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";
//import { useDataContext } from "../context/DataContext";


export default function HomePage({ expandedIndex, handleExpand }) {

  //const {drawers, scribbles} = useDataContext();

    //console.log("drawers in MyAccordion", drawers)


  return (
    <div>
      <MyAccordion expandedIndex={expandedIndex} handleExpand={handleExpand} />

      <Link to="/create" className="btn btn-dark btn-lg">
        Create New Drawer
      </Link>
    </div>
  );
}
