import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { Icon } from "@iconify/react";
import "../css/SearchPage.css";
import { useUserContext } from "../context/UserContext";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { scribbles } = useDataContext();
  const { user } = useUserContext();

  const searchKeywordInDb = () => {
    let searchResultArray = [];
    for (let x in scribbles) {
      if (
        (scribbles[x]["userId"] == user._id &&
          scribbles[x]["title"]
            .toLowerCase()
            .includes(searchItem.toLowerCase())) ||
        scribbles[x]["content"].toLowerCase().includes(searchItem.toLowerCase())
      ) {
        searchResultArray.push(scribbles[x]);
      }
    }
    return searchResultArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = searchKeywordInDb();
    setSearchResult(result);
  };

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="Search">
      <div className="">
        <form>
          <input
            className="search-input"
            onChange={handleChange}
            name="search"
            id="search"
            value={searchItem}
            placeholder="Enter keyword.."
          />
          <Button variant="dark" onClick={handleSubmit}>
            <Icon icon="bi:search" color="white" width="30" height="30" />
          </Button>
        </form>

        <div className="search-result-div">
          {searchResult.length != 0 ? (
            searchResult.map((item) => {
              return (
                <Link to={`/scribble/${item._id}`} key={item._id}>
                  <p>{item.title}</p>
                </Link>
              );
            })
          ) : (
            <p>No Result.</p>
          )}
        </div>
      </div>
    </div>
  );
}
