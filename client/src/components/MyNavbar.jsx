//////////////////WITH AUTHENTICATION//////////////////////////////////////////////////////////
import "../css/Navbar.css";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useContext } from "react";
// import AuthService from "../services/AuthService";
// import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import logo from "../assets/logo_d1.png";

export default function MyNavbar({ user, setUser }) {
  const [isExpanded, setIsExpanded] = useState(false);

  //const { isAuthenticated, user, setIsAuthenticated, setUser } =
  // useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://127.0.0.1:8080/api/users/logout", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then(() => {
        setUser({
          ...user,
          _id: "",
          username: "",
          email: "",
          password: "",
          role: "",
          isLoggedIn: false,
        });
        localStorage.setItem("user", null);
        sessionStorage.setItem("scribblesData", null);
        sessionStorage.setItem("drawersData", null);
        sessionStorage.setItem("selectedDrawer", null);
        sessionStorage.setItem("selectedScribble", null);
        sessionStorage.setItem("toBeMovedDrawer", null);
        sessionStorage.setItem("drawerToBeMoved", null);
        navigate("/");
      })
      .catch((error) => console.error(error.message));
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Container>
          <Navbar.Brand href="#home">
            <NavLink className="navbar-brand" to="/">
              <Icon icon="mingcute:drawer-line" color="black" width="50" />
            </NavLink>
            {/* <span className="navbar-text greeting">Hi TomTom!</span> */}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                gap: "10px",
              }}
            >
              <Nav.Link>
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon icon="ri:logout-box-r-fill" color="black" width="30" />
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className="nav-link"
                  to="/register"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon icon="mdi:register" color="black" width="30" />
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Container>
          <Navbar.Brand href="#home">
            <NavLink className="navbar-brand" to="/home">
              {/* <Icon icon="mingcute:drawer-line" color="black" width="50" /> */}
              <img src={logo} alt="logo" width="36rem" />
            </NavLink>
            <span className="navbar-text greeting">Hi {user.username}!</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                gap: "10px",
              }}
            >
              <Nav.Link>
                <NavLink
                  className="nav-link"
                  to="/search"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon icon="bi:search" color="black" width="30" height="30" />
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className="nav-link"
                  to="/profile"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon
                    icon="healthicons:ui-user-profile"
                    color="black"
                    width="30"
                    height="30"
                  />
                </NavLink>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <NavLink
                  className="nav-link"
                  to="/stray"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon
                    icon="game-icons:files"
                    color="black"
                    width="30"
                    height="30"
                  />
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className="nav-link"
                  color="black"
                  onClick={handleLogout}
                >
                  <Icon icon="ri:logout-box-r-fill" to="/logout" width="30" />
                </NavLink>
              </Nav.Link>
              {user.role === "admin" ? (
                <Nav.Link>
                  <NavLink
                    className="nav-link"
                    to="/admin"
                    onClick={() => setIsExpanded(false)}
                  >
                    Admin
                  </NavLink>
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </>
    );
  };
  // const authenticatedNavBar = () => {
  //   return (
  //     <>
  //       <Container>
  //         <Navbar.Brand href="#home">
  //           <NavLink className="navbar-brand" to="/home">
  //             <Icon icon="mingcute:drawer-line" color="black" width="50" />
  //           </NavLink>
  //           <span className="navbar-text greeting">Hi {user.username}!</span>
  //         </Navbar.Brand>

  //         <Button variant="dark" onClick={handleLogout}>
  //           Logout
  //         </Button>

  //         <Navbar.Toggle
  //           aria-controls="responsive-navbar-nav"
  //           onClick={() => setIsExpanded(!isExpanded)}
  //         />
  //         <Navbar.Collapse id="responsive-navbar-nav">
  //           <Nav className="me-auto"></Nav>
  //           <Nav>
  //             <Nav.Link>
  //               <NavLink
  //                 className="nav-link"
  //                 to="/search"
  //                 onClick={() => setIsExpanded(false)}
  //               >
  //                 <Icon icon="bi:search" color="black" width="30" height="30" />
  //               </NavLink>
  //             </Nav.Link>
  //             <Nav.Link>
  //               <NavLink
  //                 className="nav-link"
  //                 to="/profile"
  //                 onClick={() => setIsExpanded(false)}
  //               >
  //                 <Icon
  //                   icon="healthicons:ui-user-profile"
  //                   color="black"
  //                   width="30"
  //                   height="30"
  //                 />
  //               </NavLink>
  //             </Nav.Link>
  //             <Nav.Link eventKey={2}>
  //               <NavLink
  //                 className="nav-link"
  //                 to="/stray"
  //                 onClick={() => setIsExpanded(false)}
  //               >
  //                 <Icon
  //                   icon="game-icons:files"
  //                   color="black"
  //                   width="30"
  //                   height="30"
  //                 />
  //               </NavLink>
  //             </Nav.Link>
  //             <Nav.Link>
  //               <NavLink
  //                 className="nav-link"
  //                 color="black"
  //                 onClick={handleLogout}

  //               >
  //              <Icon icon="ri:logout-box-r-fill" to="/logout" width="30"/>
  //               </NavLink>
  //             </Nav.Link>
  //             {user.role === "admin" ? (
  //               <Nav.Link>
  //                 <NavLink
  //                   className="nav-link"
  //                   to="/admin"
  //                   onClick={() => setIsExpanded(false)}
  //                 >
  //                   Admin
  //                 </NavLink>
  //               </Nav.Link>
  //             ) : null}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </>
  //   );
  // };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary Navbar"
      expanded={isExpanded}
    >
      {!user.isLoggedIn ? unauthenticatedNavBar() : authenticatedNavBar()}
    </Navbar>
  );
}

/////////////////////////Original - Without React-Bootstrap////////////////////
// import "../css/Navbar.css";
// import { Icon } from "@iconify/react";
// import { NavLink } from "react-router-dom";

// export default function MyNavbar() {
//   return (
//     <div className="Navbar">
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <NavLink className="navbar-brand" to="/">
//             <Icon
//               icon="mingcute:drawer-line"
//               color="black"
//               width="50"
//             />
//           </NavLink>

//           <span className="navbar-text greeting">Hi TomTom!</span>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarText"
//             aria-controls="navbarText"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarText">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/profile">
//                   <Icon
//                     icon="healthicons:ui-user-profile"
//                     color="black"
//                     width="30"
//                     height="30"
//                   />
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/search">
//                   <Icon icon="bi:search" color="black" width="30" height="30" />
//                 </NavLink>
//               </li>
//             </ul>

//             <NavLink className="nav-link" to="/stray">
//               <Icon
//                 icon="game-icons:files"
//                 color="black"
//                 width="30"
//                 height="30"
//               />
//             </NavLink>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// //////////////////ORIGINAL//////////////////////////////////////////////////////////
// import "../css/Navbar.css";
// import { Icon } from "@iconify/react";
// import { NavLink } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { useState } from "react";

// export default function MyNavbar() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Navbar
//       collapseOnSelect
//       expand="lg"
//       className="bg-body-tertiary Navbar"
//       expanded={isExpanded}
//     >
//       <Container>
//         <Navbar.Brand href="#home">
//           <NavLink className="navbar-brand" to="/">
//             <Icon icon="mingcute:drawer-line" color="black" width="50" />
//           </NavLink>
//           <span className="navbar-text greeting">Hi TomTom!</span>
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="responsive-navbar-nav"
//           onClick={() => setIsExpanded(!isExpanded)}
//         />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto"></Nav>
//           <Nav>
//             <Nav.Link>
//               <NavLink
//                 className="nav-link"
//                 to="/search"
//                 onClick={() => setIsExpanded(false)}
//               >
//                 <Icon icon="bi:search" color="black" width="30" height="30" />
//               </NavLink>
//             </Nav.Link>
//             <Nav.Link>
//               <NavLink
//                 className="nav-link"
//                 to="/profile"
//                 onClick={() => setIsExpanded(false)}
//               >
//                 <Icon
//                   icon="healthicons:ui-user-profile"
//                   color="black"
//                   width="30"
//                   height="30"
//                 />
//               </NavLink>
//             </Nav.Link>
//             <Nav.Link eventKey={2}>
//               <NavLink
//                 className="nav-link"
//                 to="/stray"
//                 onClick={() => setIsExpanded(false)}
//               >
//                 <Icon
//                   icon="game-icons:files"
//                   color="black"
//                   width="30"
//                   height="30"
//                 />
//               </NavLink>
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// /////////////////////////Original - Without React-Bootstrap////////////////////
// // import "../css/Navbar.css";
// // import { Icon } from "@iconify/react";
// // import { NavLink } from "react-router-dom";

// // export default function MyNavbar() {
// //   return (
// //     <div className="Navbar">
// //       <nav className="navbar navbar-expand-lg bg-body-tertiary">
// //         <div className="container-fluid">
// //           <NavLink className="navbar-brand" to="/">
// //             <Icon
// //               icon="mingcute:drawer-line"
// //               color="black"
// //               width="50"
// //             />
// //           </NavLink>

// //           <span className="navbar-text greeting">Hi TomTom!</span>
// //           <button
// //             className="navbar-toggler"
// //             type="button"
// //             data-bs-toggle="collapse"
// //             data-bs-target="#navbarText"
// //             aria-controls="navbarText"
// //             aria-expanded="false"
// //             aria-label="Toggle navigation"
// //           >
// //             <span className="navbar-toggler-icon"></span>
// //           </button>
// //           <div className="collapse navbar-collapse" id="navbarText">
// //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">

// //               <li className="nav-item">
// //                 <NavLink className="nav-link" to="/profile">
// //                   <Icon
// //                     icon="healthicons:ui-user-profile"
// //                     color="black"
// //                     width="30"
// //                     height="30"
// //                   />
// //                 </NavLink>
// //               </li>
// //               <li className="nav-item">
// //                 <NavLink className="nav-link" to="/search">
// //                   <Icon icon="bi:search" color="black" width="30" height="30" />
// //                 </NavLink>
// //               </li>
// //             </ul>

// //             <NavLink className="nav-link" to="/stray">
// //               <Icon
// //                 icon="game-icons:files"
// //                 color="black"
// //                 width="30"
// //                 height="30"
// //               />
// //             </NavLink>
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // }
