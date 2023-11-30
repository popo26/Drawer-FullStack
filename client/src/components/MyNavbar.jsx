import "../css/Navbar.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";

export default function MyNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary Navbar"
      expanded={isExpanded}
    >
      <Container>
        <Navbar.Brand href="#home">
          <NavLink className="navbar-brand" to="/">
            <Icon icon="mingcute:drawer-line" color="black" width="50" />
          </NavLink>
          <span className="navbar-text greeting">Hi TomTom!</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
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
