import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";
//import { useDataContext } from "../context/DataContext";
import { useEffect, useHistory } from "react";
import { useFileContext } from "../context/FileContext";
import { useUserContext } from "../context/UserContext";
//import { session } from "../../../backend/passport";

export default function HomePage({ expandedIndex, handleExpand, user, setUser }) {

  // const {user} = useUserContext();
  // console.log("user in context", user)


  useEffect(()=>{
    const userInBrowser = JSON.parse(localStorage.getItem('user'))
    console.log("user in browser", userInBrowser)
    setUser(userInBrowser)
  }, [])

  return (
    <div>
      <MyAccordion expandedIndex={expandedIndex} handleExpand={handleExpand} user={user}/>

      <Link to="/create" className="btn btn-dark btn-lg">
        Create New Drawer
      </Link>
    </div>
  );
}
