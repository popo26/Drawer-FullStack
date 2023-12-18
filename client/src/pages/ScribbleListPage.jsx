import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../css/ScribbleListPage.css";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useFileContext } from "../context/FileContext";
import { AuthContext } from "../context/AuthContext";


// export default function ScribbleListPage({ files }) {
export default function ScribbleListPage() {
  const navigate = useNavigate();
  const { drawers, scribbles, setDrawers, setScribbles } = useDataContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  // const [files] = useFileContext();
  const { files } = useFileContext();
  const {user, isAuthenticated} = useContext(AuthContext);


  // console.log("SCRIBBLES", scribbles);

  // for (let x in scribbles){
  //   console.log(scribbles[x]['files'])
  // }

  const deleteScribble = (id) => {
    fetch(`http://localhost:8080/api/scribbles/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      // .then(() => {
      //   const updatedScribbles = scribbles.filter((item) => item._id != id);
      //   setScribbles(updatedScribbles);
      // })
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (id) => {
    const response = confirm(`Are you sure to delete? -ID:${id}`);
    if (response == true) {
      deleteScribble(id);
    }
  };

  //console.log("files length", files.length);

  const renderedList = scribbles.map(
    (item) =>
      (item.stray === true && item.userId ===user._id) && (
        <p key={item._id}>
          {/* <a
            
            onClick={() => {
              setSelectedScribbleId(item._id);
              sessionStorage.setItem("selectedScribble", item._id);
              navigate(`/scribble/${item._id}` , { state: { id: item._id } });
            }}
          > */}
          <Link
            to={`/scribble/${item._id}`}
            onClick={() => {
              setSelectedScribbleId(item._id);
              sessionStorage.setItem("selectedScribble", item._id);
            }}
          >
            {item.attachment && (
              <Icon
                className="icon5"
                icon="ic:outline-attachment"
                color="orange"
                width="18"
              />
            )}
            ID:{item._id}, {item.title}
          </Link>{" "}
          {/* </a>{" "} */}
          <a
            onClick={() => {
              handleDelete(item._id);
              navigate(0);
            }}
          >
            <Icon
              className="icon10"
              icon="ion:trash-outline"
              color="black"
              width="20"
            />
          </a>
          <Icon
            className="icon10"
            icon="mingcute:drawer-line"
            color="black"
            width="22"
            onClick={() => {
              setSelectedScribbleId(item._id);
              sessionStorage.setItem("selectedScribble", item._id);
              navigate("/sort", { state: { id: item._id } });
            }}
          />
        </p>
      )
  );

  return (
    <div>
      <h2>Stray scribbles</h2>
      <div className="stray-list">{renderedList}</div>
      <div>
        {" "}
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
