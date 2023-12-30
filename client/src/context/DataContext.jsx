import { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext("");

export const DataProvider = (props) => {
  const [drawers, setDrawers] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingScribbles, setLoadingScribbles] = useState(true);
  const [loadingDrawers, setLoadingDrawers] = useState(true);

  //retrieve data from sessionStorage on mount or refresh
  useEffect(() => {
    const drawersData = JSON.parse(sessionStorage.getItem("drawersData"));
    if (drawersData) {
      setDrawers(drawersData);
    }
  }, []);

  useEffect(() => {
    const scribblesData = JSON.parse(sessionStorage.getItem("scribblesData"));
    if (scribblesData) {
      setScribbles(scribblesData);
    }
  }, []);

  //Fetch data from the server
  useEffect(() => {
    fetch("http://localhost:8080/api/scribbles", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        setLoadingScribbles(false);
        setScribbles(json.data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/drawers", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        setLoadingDrawers(false);
        setDrawers(json.data);
      });
  }, []);

  // Local Storage: setting & getting data
  const updateRootId = (drawerId) => {
    const newDrawerObj = drawers.filter((item) => item._id == drawerId);
    let dataPost = {
      rootId: newDrawerObj[0]["_id"],
    };
    fetch(`http://localhost:8080/api/drawers/${drawerId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error.message));
  };

  //Original rootId gets updated to match id for root drawers
  useEffect(() => {
    for (let x in drawers) {
      if (
        drawers[x]["root"] == true &&
        drawers[x]["rootId"] != drawers[x]["_id"]
      ) {
        console.log("Mismatch", drawers[x]);
        updateRootId(drawers[x]["_id"]);
      }
    }
  }, [drawers, scribbles]);


  useEffect(() => {
    sessionStorage.setItem("drawersData", JSON.stringify(drawers));
  }, [drawers]);

  useEffect(() => {
    sessionStorage.setItem("scribblesData", JSON.stringify(scribbles));
  }, [scribbles]);

  return (
    <DataContext.Provider
      value={{
        drawers,
        scribbles,
        users,
        setDrawers,
        setScribbles,
        setUsers,
        loadingScribbles,
        setLoadingScribbles,
        loadingDrawers,
        setLoadingDrawers,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
