import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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

  const tooltipCreateAndSave = <Tooltip id="tooltip">Create & Save</Tooltip>;

  return (
    <>
      <OverlayTrigger placement="right" overlay={tooltipCreateAndSave}>
        <Link to={href}>
          {/* <button onClick={handleClick} className="btn btn-success">
          {btnName}
        </button> */}
          <Button variant="dark" onClick={handleClick}>
            {" "}
            {btnName}
          </Button>{" "}
        </Link>
      </OverlayTrigger>
    </>
  );
}
