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


export {
    getDrawers,
    getScribbles,
    getUsers,
}


