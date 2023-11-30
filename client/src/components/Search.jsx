import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

// export default function Search({ data }) {
export default function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const data = useDataContext();
  const {drawers, scribbles} = useDataContext();

   //Testing out search results with userId1
   const searchKeywordInDb = () => {
    let searchResultArray = [];
    //console.log("Data ", data)
    let dataValues = Object.values(scribbles);
    for (let x in dataValues) {
      //console.log(dataValues[x])
      for (let y in dataValues[x]) {
        //console.log(dataValues[x][y])
        if (
          dataValues[x][y]["userId"] === 1 &&
          dataValues[x][y]["type"] == "scribble" &&
          dataValues[x][y]["title"]
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        ) {
          searchResultArray.push(dataValues[x][y]);
        }
      }
    }
    return searchResultArray;
  };

  // //Testing out search results with userId1 - ORIGINAL
  // const searchKeywordInDb = () => {
  //   let searchResultArray = [];
  //   //console.log("Data ", data)
  //   let dataValues = Object.values(data);
  //   for (let x in dataValues) {
  //     //console.log(dataValues[x])
  //     for (let y in dataValues[x]) {
  //       //console.log(dataValues[x][y])
  //       if (
  //         dataValues[x][y]["userId"] === 1 &&
  //         dataValues[x][y]["type"] == "scribble" &&
  //         dataValues[x][y]["title"]
  //           .toLowerCase()
  //           .includes(searchItem.toLowerCase())
  //       ) {
  //         searchResultArray.push(dataValues[x][y]);
  //       }
  //     }
  //   }
  //   return searchResultArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    const result = searchKeywordInDb();
    setSearchResult(result);
    // return result;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
  };

  return (
    <div className="Search">
      <div className="">
        <form >
          <input
            className="search-input"
            onChange={handleChange}
            name="search"
            id="search"
            value={searchItem}
            placeholder="Enter keyword.."
          />
          <Button variant="dark" onClick={handleSubmit}>Search</Button>
        </form>

        <div>
          {searchResult.map((item) => {
            return (
              <Link to={`/scribble/${item.id}`} key={item.id}>
                <p>
                  ID{item.id}: {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
