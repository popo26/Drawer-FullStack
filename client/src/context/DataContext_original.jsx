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

let drawersArray = [];
let scribblesArray = [];
let usersArray = [];

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
  await fetch("http://localhost:8080/api/users", {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((json) => {
      for (let x of json.data) {
        usersArray.push(x);
      }
    });
}

getDrawers();
getScribbles();
getUsers();

const DataContext = createContext({ drawersArray, scribblesArray });

// const DataContext = createContext("");

export const DataProvider = (props) => {
  // const [drawers, setDrawersState] = usePersistState('drawers', drawersArray);
  // const [scribbles, setScribblesState] = usePersistState('scribbles', scribblesArray);

  // const [drawers, setDrawers] = useState(drawersArray);
  // const [scribbles, setScribbles] = useState(scribblesArray);
  // const [users, setUsers] = useState(usersArray);

  //console.log("DRAWERS in CONTEXT", drawers);
  // console.log("SCRIBBLES in CONTEXT", scribbles);
  //console.log("USERS in CONTEXT", users);

  //==============================================================
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
  //==================================================================

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // const [drawers, setDrawers] = useState(() => {
  //   if (sessionStorage.getItem("drawers")){
  //     return JSON.parse(sessionStorage.getItem("drawers"));
  //   } else {
  //     return drawersArray;
  //   }
  // });

  // const [scribbles, setScribbles] = useState(() => {
  //   if (sessionStorage.getItem("scribbles")){
  //     return JSON.parse(sessionStorage.getItem("scribbles"));
  //   } else {
  //     return scribblesArray
  //   }
  // });

  // const [users, setUsers] = useState(() => {
  //   const usersData = sessionStorage.getItem("users");
  //   return JSON.parse(usersData) ;
  // });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //DONT need?
  // useEffect(() => {
  //   setDrawers(sessionStorage.setItem("drawers", JSON.stringify(drawers)));
  //   setScribbles(sessionStorage.setItem("scribbles", JSON.stringify(scribbles)));
  //   return()=>{

  //   sessionStorage.getItem("drawers");
  //   sessionStorage.getItem("scribbles");
  //   }
  // }, []);

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
