import { Icon } from "@iconify/react";
import "../css/ScribbleBtn.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ScribbleBtn() {
  const tooltipScribble = <Tooltip id="tooltip">New Scribble</Tooltip>;

  return (
    <div className="ScribbleBtn-div">
      <OverlayTrigger placement="right" overlay={tooltipScribble}>
        <button className="ScribbleBtn">
          <Icon icon="tabler:scribble" width="60px" />
        </button>
      </OverlayTrigger>
    </div>
  );
}
