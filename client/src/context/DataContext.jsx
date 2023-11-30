import { createContext, useState, useContext } from "react";

const DataContext = createContext();

// const getDrawers = () => {
//   fetch('http://localhost:8080/api/drawers'
//   , {
//     method: "GET",
//     mode: "cors",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   }
//   )
//     .then((response) => console.log(response.json()))
//     .then((json) => json)
//     .catch((error) => console.error(error.message));
// };

// const getScribbles = () => {
//   fetch("http://localhost:8080/api/scribbles", {
//     method: "GET",
//     mode: "cors",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   })
//     .then((response) => console.log(response.json()))
//     .then((json) => json)
//     .catch((error) => console.error(error.message));
// };

// const getUsers = () => {
//   fetch("http://localhost:8080/api/users", {
//     method: "GET",
//     mode: "cors",
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//   })
//     .then((response) => console.log(response.json()))
//     .then((json) => json)
//     .catch((error) => console.error(error.message));
// };

let drawers = [];
let scribbles = [];
let users = [];

async function getDrawers() {
  let obj;
  const response = await fetch("http://localhost:8080/api/drawers", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  obj = await response.json();
  //console.log("obj", obj.data);
  drawers.push(obj.data);
  // console.log("array", drawerTest);
  // return obj.data;
}

async function getScribbles() {
  let obj;
  const response = await fetch("http://localhost:8080/api/scribbles", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  obj = await response.json();
  return obj.data;
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
  return obj.data;
}

export const DataProvider = (props) => {
  // store the current user in state at the top level
  //const [data, setData] = useState("");

  // const drawers = getDrawers();
  // const scribbles = getScribbles();
  // const users = getUsers();
  getDrawers();
  getScribbles();
  getUsers();

  // const data = { drawers: drawers, scribbles: scribbles, users: users };
  console.log("DATA in CONTEXT", drawers);

  return (
    <DataContext.Provider value={{ drawers, scribbles, users }}>
      {props.children}
    </DataContext.Provider>
  );
};
// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useDataContext = () => {
  return useContext(DataContext);
};
// Save as UserContext.jsx in a separate 'context' folder
