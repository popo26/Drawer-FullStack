export default {
  login: (user) => {
    return fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  register: (user) => {
    return fetch("/api/users/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    return fetch("/api/users/logout")
      .then((res) => res.json())
      .then((data) => data);
  },

  isAuthenticated: async () => {
    return fetch("http://127.0.0.1:8080/api/users/authenticated").then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } else {
          return {
            isAuthenticated: false,
            user: { username: "", email: "", role: "" },
          };
        }
      }
    );
  },
};
