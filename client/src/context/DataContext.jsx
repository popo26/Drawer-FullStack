import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from "react";
import usePersistState from "../hooks/usePersistState";
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
  let drawersArray = [];
  let scribblesArray = [];
  let usersArray = [];
  const [drawers, setDrawers] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [users, setUsers] = useState([]);

  //console.log("DRAWERS in CONTEXT", drawers);
  // console.log("SCRIBBLES in CONTEXT", scribbles);
  //console.log("USERS in CONTEXT", users);

  // Local Storage: setting & getting data
  useEffect(() => {
    const drawersData = JSON.parse(sessionStorage.getItem("drawersData"));
    if (drawersData) {
      setDrawers(drawersData);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("drawersData", JSON.stringify(drawers));
  }, [drawers]);

  useEffect(() => {
    sessionStorage.setItem("scribblesData", JSON.stringify(scribbles));
  }, [scribbles]);

  // Local Storage: setting & getting data
  useEffect(() => {
    const scribblesData = JSON.parse(sessionStorage.getItem("scribblesData"));
    if (scribblesData) {
      setDrawers(scribblesData);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/scribbles", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => setScribbles(json.data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/drawers", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => setDrawers(json.data));
  }, []);

  // useEffect(() => {
  //     fetch("http://localhost:8080/api/drawers", {
  //       method: "GET",
  //       mode: "cors",
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         for (let x of json.data) {
  //           drawersArray.push(x);
  //         }
  //       }).then(setDrawers((prevItems => [...prevItems, scribblesArray])));
  //   }, []);

  // useEffect(() => {
  //     fetch("http://localhost:8080/api/scribbles", {
  //       method: "GET",
  //       mode: "cors",
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         for (let x of json.data) {
  //           scribblesArray.push(x);
  //         }
  //       }).then(setScribbles(prevItems => [...prevItems, scribblesArray]));
  //   }, []);

  return (
    // <DataContext.Provider value={{ drawers, scribbles, users }}>
    <DataContext.Provider
      value={{ drawers, scribbles, users, setDrawers, setScribbles, setUsers }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
