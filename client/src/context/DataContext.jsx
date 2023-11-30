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

async function getDrawers() {
  let obj;
  const response = await fetch("http://localhost:8080/api/drawers", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  obj = await response.json()
  return obj;
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

  obj = await response.json()
  return obj;
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

  obj = await response.json()
  return obj;
}



export const DataProvider = (props) => {
  // store the current user in state at the top level
  //const [data, setData] = useState("");

  const drawers = getDrawers();
  const scribbles = getScribbles();
  const users = getUsers();

  // const data = { drawers: drawers, scribbles: scribbles, users: users };
  console.log("DATA in CONTEXT", typeof drawers);

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
