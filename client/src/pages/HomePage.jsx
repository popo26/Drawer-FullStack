import MyAccordion from "../components/MyAccordion";
import { Link } from "react-router-dom";
//import { useDataContext } from "../context/DataContext";
import { useEffect, useHistory } from "react";
import { useFileContext } from "../context/FileContext";
import { useUserContext } from "../context/UserContext";
//import { session } from "../../../backend/passport";
import { Icon } from "@iconify/react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function HomePage({
  expandedIndex,
  handleExpand,
  user,
  setUser,
}) {
  // const {user} = useUserContext();
  console.log("user Home", user);

  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    if (userInBrowser) {
      console.log("user in browser", userInBrowser);
      setUser(userInBrowser);
    }
  }, []);

  const tooltipCreate = <Tooltip id="tooltip">Create New Drawer</Tooltip>;

  return (
    <div>
      <MyAccordion
        expandedIndex={expandedIndex}
        handleExpand={handleExpand}
        user={user}
      />
      <OverlayTrigger placement="bottom" overlay={tooltipCreate}>
        <Link to="/create" className="btn btn-dark btn-lg">
          <Icon icon="typcn:plus" />
          <Icon icon="mingcute:drawer-line" color="white" width="30" />
        </Link>
      </OverlayTrigger>
    </div>
  );
}
