import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {getUsers, getDrawers, getScribbles} from "../utils/getData";

// const DataContext = createContext({drawersArray, scribblesArray});

// let drawersArray = [];
// let scribblesArray = [];
// let usersArray = [];

// async function getDrawers() {
//   await fetch("http://localhost:8080/api/drawers", {
//     method: "GET",
//     mode: "cors",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       for (let x of json.data) {
//         drawersArray.push(x);
//       }
//     });
// }

// async function getScribbles() {
//   // let obj;
//   await fetch("http://localhost:8080/api/scribbles", {
//     method: "GET",
//     mode: "cors",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       for (let x of json.data) {
//         //console.log("X is",x.title)
//         scribblesArray.push(x);
//       }
//     });
// }

// async function getUsers() {
//   await fetch("http://localhost:8080/api/users", {
//     method: "GET",
//     mode: "cors",
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       for (let x of json.data) {
//         usersArray.push(x);
//       }
//     });
// }

// getDrawers();
// getScribbles();
// getUsers();

// const DataContext = createContext({ drawersArray, scribblesArray });

const DataContext = createContext("");

export const DataProvider = (props) => {
  const [drawers, setDrawers] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingScribbles, setLoadingScribbles] = useState(true);
  const [loadingDrawers, setLoadingDrawers] = useState(true);

  // //Original rootId gets updated to match id for root drawers
  // useEffect(() => {
  //   for (let x in drawers) {
  //     if (
  //       drawers[x]["root"] == true &&
  //       drawers[x]["rootId"] != drawers[x]["_id"]
  //     ) {
  //       console.log("Mismatch", drawers[x]);
  //       updateRootId(drawers[x]["_id"]);
  //     }
  //   }
  // }, [scribbles, drawers]);

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
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/scribbles", {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setScribbles(json.data));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/drawers", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        // //Experiment one line down
        // setLoadingDrawers(false);
        setDrawers(json.data);
      });
    // }, [drawers]);
    // }, [setDrawers]);
  }, []);

  // Local Storage: setting & getting data
  const updateRootId = (drawerId) => {
    console.log("PUT - update RootID", drawerId);
    const newDrawerObj = drawers.filter((item) => item._id == drawerId);
    console.log("newDrawerObj", newDrawerObj);
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
      // //experiment
      // .then((json)=>{setLoadingDrawers(false); })
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
    //experiment
    //setDrawers(drawers)
  }, [drawers]);

  useEffect(() => {
    sessionStorage.setItem("scribblesData", JSON.stringify(scribbles));
    //experiment
    //setScribbles(scribbles)
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

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// import {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useRef,
//   useMemo,
// } from "react";
// import usePersistState from "../hooks/usePersistState";
// // import {getUsers, getDrawers, getScribbles} from "../utils/getData";

// // const DataContext = createContext({drawersArray, scribblesArray});

// // let drawersArray = [];
// // let scribblesArray = [];
// // let usersArray = [];

// // async function getDrawers() {
// //   await fetch("http://localhost:8080/api/drawers", {
// //     method: "GET",
// //     mode: "cors",
// //     // headers: {
// //     //   "Content-Type": "application/json",
// //     // },
// //   })
// //     .then((response) => response.json())
// //     .then((json) => {
// //       for (let x of json.data) {
// //         drawersArray.push(x);
// //       }
// //     });
// // }

// // async function getScribbles() {
// //   // let obj;
// //   await fetch("http://localhost:8080/api/scribbles", {
// //     method: "GET",
// //     mode: "cors",
// //     // headers: {
// //     //   "Content-Type": "application/json",
// //     // },
// //   })
// //     .then((response) => response.json())
// //     .then((json) => {
// //       for (let x of json.data) {
// //         //console.log("X is",x.title)
// //         scribblesArray.push(x);
// //       }
// //     });
// // }

// // async function getUsers() {
// //   await fetch("http://localhost:8080/api/users", {
// //     method: "GET",
// //     mode: "cors",
// //   })
// //     .then((response) => response.json())
// //     .then((json) => {
// //       for (let x of json.data) {
// //         usersArray.push(x);
// //       }
// //     });
// // }

// // getDrawers();
// // getScribbles();
// // getUsers();

// // const DataContext = createContext({ drawersArray, scribblesArray });

// const DataContext = createContext("");

// export const DataProvider = (props) => {
//   const [drawers, setDrawers] = useState([]);
//   const [scribbles, setScribbles] = useState([]);
//   const [users, setUsers] = useState([]);

//   // Local Storage: setting & getting data
//   const updateRootId = (drawerId) => {
//     console.log("PUT - update RootID", drawerId);
//     const newDrawerObj = drawers.filter((item) => item._id == drawerId);
//     console.log("newDrawerObj", newDrawerObj);
//     let dataPost = {
//       rootId: newDrawerObj[0]["_id"],
//     };
//     fetch(`http://localhost:8080/api/drawers/${drawerId}`, {
//       method: "PUT",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dataPost),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error(error.message));
//   };

//   //Original rootId gets updated to match id for root drawers
//   useEffect(() => {
//     for (let x in drawers) {
//       if (
//         drawers[x]["root"] == true &&
//         drawers[x]["rootId"] != drawers[x]["_id"]
//       ) {
//         console.log("Mismatch", drawers[x]);
//         updateRootId(drawers[x]["_id"]);
//       }
//     }
//   }, [scribbles, drawers]);

//   useEffect(() => {
//     const drawersData = JSON.parse(sessionStorage.getItem("drawersData"));
//     if (drawersData) {
//       setDrawers(drawersData);
//     }
//   }, []);

//   useEffect(() => {
//     const scribblesData = JSON.parse(sessionStorage.getItem("scribblesData"));
//     if (scribblesData) {
//       setScribbles(scribblesData);
//     }
//   }, []);

//   useEffect(() => {
//     sessionStorage.setItem("drawersData", JSON.stringify(drawers));
//     //experiment
//     //setDrawers(drawers)
//   }, [drawers]);

//   useEffect(() => {
//     sessionStorage.setItem("scribblesData", JSON.stringify(scribbles));
//     //experiment
//     //setScribbles(scribbles)
//   }, [scribbles]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/scribbles", {
//       method: "GET",
//       mode: "cors",
//     })
//       .then((response) => response.json())
//       .then((json) => setScribbles(json.data));
//     // }, [scribbles]);
//     // }, [setScribbles]);
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/drawers", {
//       method: "GET",
//       mode: "cors",
//     })
//       .then((response) => response.json())
//       .then((json) => setDrawers(json.data));
//     // }, [drawers]);
//     // }, [setDrawers]);
//   }, []);

//   return (
//     <DataContext.Provider
//       value={{ drawers, scribbles, users, setDrawers, setScribbles, setUsers }}
//     >
//       {props.children}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => {
//   return useContext(DataContext);
// };
