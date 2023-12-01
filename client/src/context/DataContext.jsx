import { createContext, useState, useContext } from "react";

const DataContext = createContext("");

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

//=================================================================================================
let drawers = [];
let scribbles = [];
let users = [];

// let drawers={};
// let scribbles={};
// let users={};

async function getDrawers() {
  // let obj;
  // const response = await fetch("http://localhost:8080/api/drawers", {
    await fetch("http://localhost:8080/api/drawers", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
  .then((response)=>response.json())
  .then((json)=> {
    for (let x of json.data){
      drawers.push(x)
    }
  })
  ;

  // obj = await response.json();
  // console.log("obj", obj.data);
  // drawers.push(obj.data);
// drawers.data = obj.data;

  // console.log("array", drawerTest);
  // return obj.data;
}

async function getScribbles() {
  // let obj;
  const response = await fetch("http://localhost:8080/api/scribbles", {
    method: "GET",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
  .then((response)=>response.json())
  .then((json)=> {
    for (let x of json.data){
      //console.log("X is",x.title)
      scribbles.push(x)
    }
  })
  ;

  // obj = await response.json();
  // scribbles.push(obj.data);
  // scribbles.data=obj.data;

  // return obj.data;

  

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
  // users.data=obj.data;

  // return obj.data;
}
getDrawers();
getScribbles();
getUsers();


// const DataContext = createContext({ drawers, scribbles, users });



export const DataProvider = (props) => {
  // store the current user in state at the top level
  //const [data, setData] = useState("");


  // const data = { drawers: drawers, scribbles: scribbles, users: users };
  console.log("DRAWERS in CONTEXT", drawers);
  console.log("SCRIBBLES in CONTEXT", scribbles);
  //console.log("USERS in CONTEXT", users);


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
