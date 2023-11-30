import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";

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
