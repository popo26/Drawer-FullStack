import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";
//import { useDataContext } from "../context/DataContext";
import { useEffect, useHistory, useContext } from "react";
import { useFileContext } from "../context/FileContext";
import { AuthContext } from "../context/AuthContext";

export default function HomePage({ expandedIndex, handleExpand }) {

  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  console.log(user)
  console.log(isAuthenticated)



  return (
    <div>
      <MyAccordion expandedIndex={expandedIndex} handleExpand={handleExpand} />

      <Link to="/create" className="btn btn-dark btn-lg">
        Create New Drawer
      </Link>
    </div>
  );
}
