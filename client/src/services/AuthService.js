export default {

  login: async (user) => {
    return await fetch("http://127.0.0.1:8080/api/users/login",{
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  
  }).then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } 
        else {
          return {
            isAuthenticated: false,
            user: { username: "", email: "", role: "" },
          };
        }
      }
    );
  },



  // login: async (user) => {
  //   return await fetch("http://127.0.0.1:8080/api/users/login", {
  //     method: "post",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data)
  //     .catch((error)=>console.error(error.message))
  // },


  register: async (user) => {
    return await fetch("http://127.0.0.1:8080/api/users/register",{
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } 
        // else {
        //   return {
        //     // isAuthenticated: false,
        //     user: { username: "", email: "", role: "" },
        //   };
        // }
      }
    ).catch((error)=>console.error(error.message))
  },


  // register: async (user) => {
  //   return fetch("http://127.0.0.1:8080/api/users/register", {
  //     method: "post",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data)
  //     .catch((error) => console.error(error.message));
  // },

  logout: () => {
    
    return fetch("http://localhost:8080/api/users/logout"
    // ,
    // {
    //   method:"GET",
    //   credentials:"include",
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   },
    //   'Content-Type':"application/json",
    // }
    )
      // .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error(error.message));
  },
  

  // logout: async () => {
  //   return fetch("http://127.0.0.1:8080/api/users/logout").then(
  //     (res) => {
  //       if (res.status !== 401) {
  //         return res.json().then((data) => data);
  //       } 
  //       else {
  //         return {
  //           success:false
  //         };
  //       }
  //     }
  //   );
  // },



  isAuthenticated: async () => {
    return fetch("http://127.0.0.1:8080/api/users/authenticated").then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } 
        else {
          return {
            isAuthenticated: false,
            user: { username: "", email: "", role: "" },
          };
        }
      }
    );
  },
};
