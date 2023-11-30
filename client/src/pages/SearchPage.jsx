import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import "../css/SearchPage.css";
import { Icon } from "@iconify/react";

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="SearchPage">
      <Search />

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
