import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

export default function Search({user}) {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { drawers, scribbles } = useDataContext();

  //Testing out search results with userId1

  const searchKeywordInDb = () => {
    let searchResultArray = [];
    for (let x in scribbles) {
      if (
        (scribbles[x]["userId"] == user._id &&
          // scribbles[x]["type"] == "scribble" &&
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
            Search
          </Button>
        </form>

        <div>
          {searchResult.length != 0 ? (
            searchResult.map((item) => {
              return (
                <Link to={`/scribble/${item._id}`} key={item._id}>
                  <p>
                    ID{item._id}: {item.title}
                  </p>
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
