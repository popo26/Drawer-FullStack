import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/ScribbleListPage.css";
import { useDataContext } from "../context/DataContext";

export default function ScribbleListPage({ files }) {
  const navigate = useNavigate();
  // const data = useDataContext();
  const {drawers, scribbles, setDrawers, setScribbles} = useDataContext();

    const strayScribbles = scribbles;



  const deleteScribble = (id) => {
    // console.log("drawer length: ", Object.values(data["scribbles"]).length);
      fetch(`http://localhost:8080/api/scribbles/${id}`, {

      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedScribbles = scribbles.filter((item) => item._id != id);
        setScribbles(updatedScribbles);
      })
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (id) => {
    alert(`Are you sure to delete? -ID:${id}`);
    deleteScribble(id);
  };

  console.log("files length", files.length);

  const renderedList = strayScribbles.map(
    (item) =>
      item.stray === true && (
        <p key={item._id}>
          <Link to={`/scribble/${item._id}`}>
            {item.attachment && (
              <Icon icon="ic:outline-attachment" color="lightpink" width="36" />
            )}
            ID:{item._id}, {item.title}
          </Link>{" "}
          <a onClick={() => handleDelete(item._id)}>
            <Icon icon="ion:trash-outline" color="black" width="20" />
          </a>
          <Icon
            icon="mingcute:drawer-line"
            color="black"
            width="22"
            onClick={() => {
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
