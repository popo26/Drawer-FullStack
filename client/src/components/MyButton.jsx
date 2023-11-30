import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDrawerNameContext } from "../context/DrawerNameContext";
//Apply color in css in progress
export default function MyButton({
  btnName,
  href,
  color,
  drawerName,
  handleNewDrawerCreate,
}) {
  //const [drawerName] = useDrawerNameContext();

  const handleClick = (e) => {
    e.preventDefault();
    handleNewDrawerCreate(drawerName);
  };

  return (
    <>
      <Link to={href}>
        {/* <button onClick={handleClick} className="btn btn-success">
          {btnName}
        </button> */}
        <Button variant="success" onClick={handleClick}>
          {" "}
          {btnName}
        </Button>{" "}
      </Link>
    </>
  );
}
