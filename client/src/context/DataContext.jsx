import { createContext, useState, useContext, useEffect, useRef } from "react";
import usePersistState from "../hooks/usePersistState";
//import {getUsers, getDrawers, getScribbles} from "../utils/getData";

// const DataContext = createContext({drawersArray, scribblesArray});

let drawersArray = [];
let scribblesArray = [];
let users = [];

async function getDrawers() {
  await fetch("http://localhost:8080/api/drawers", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => response.json())
    .then((json) => {
      for (let x of json.data) {
        drawersArray.push(x);
      }
    });
}

async function getScribbles() {
  // let obj;
  await fetch("http://localhost:8080/api/scribbles", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => response.json())
    .then((json) => {
      for (let x of json.data) {
        //console.log("X is",x.title)
        scribblesArray.push(x);
      }
    });
}

async function getUsers() {
  let obj;
  const response = await fetch("http://localhost:8080/api/users", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  obj = await response.json();
  users.push(obj.data);
}

getDrawers();
getScribbles();
getUsers();

const DataContext = createContext({drawersArray, scribblesArray});


export const DataProvider = (props) => {
  // const [drawers, setDrawersState] = usePersistState('drawers', drawersArray);
  // const [scribbles, setScribblesState] = usePersistState('scribbles', scribblesArray);

  // const [drawers, setDrawers] = useState(drawersArray);
  // const [scribbles, setScribbles] = useState(scribblesArray);

  const [drawers, setDrawers] = useState(() => {
    const drawersData = sessionStorage.getItem("drawers");
    return JSON.parse(drawersData);
  });

  const [scribbles, setScribbles] = useState(() => {
    const scribblesData = sessionStorage.getItem("scribbles");
    return JSON.parse(scribblesData);
  });

  const [users, setUsers] = useState(() => {
    const usersData = sessionStorage.getItem("users");
    return JSON.parse(usersData) ;
  });

  //DONT need?
  // useEffect(() => {
  //   sessionStorage.getItem("drawers", JSON.stringify(drawers));
  //   sessionStorage.getItem("scribbles", JSON.stringify(scribbles));
  // }, [drawers, scribbles]);

  // useEffect(()=>{
  //    setDrawers(() => {
  //      sessionStorage.getItem("drawers", JSON.stringify(drawers));
  //   });
  //   setScribbles(() => {
  //     sessionStorage.getItem("scribbles", JSON.stringify(scribbles));
  //   });
  // }, [])

  // useEffect(() => {
  //   setDrawers(drawersArray);
  //   setScribbles(scribblesArray);
  // }, []);

  // setDrawersState(drawers);
  // setScribblesState(scribbles)

  // console.log("drawersState", drawers)

  // useEffect(() => {
  //   const storedDrawersState = sessionStorage.getItem("drawers");
  //   if (storedDrawersState) {
  //     setDrawers(JSON.parse(storedDrawersState));
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedScribblesState = sessionStorage.getItem("scribbles");
  //   if (storedScribblesState) {
  //     setScribbles(JSON.parse(storedScribblesState));
  //   }
  // }, []);

  // useEffect(() => {

  //   sessionStorage.setItem("drawers", JSON.stringify(drawersArray));
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("scribbles", JSON.stringify(scribblesArray));
  // }, []);

  //console.log("DRAWERS in CONTEXT", drawers);
  // console.log("SCRIBBLES in CONTEXT", scribbles);
  //console.log("USERS in CONTEXT", users);

  return (
    // <DataContext.Provider value={{ drawers, scribbles, users }}>
    <DataContext.Provider
      value={{ drawers, scribbles, users, setDrawers, setScribbles }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
