import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import "../css/SearchPage.css";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

export default function SearchPage({user, setUser}) {
  const navigate = useNavigate();

  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    if (userInBrowser) {
      setUser(userInBrowser);
    }
  }, []);

  return (
    <div className="SearchPage">
      <Search user={user} />

      <div className="back-btn">
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
