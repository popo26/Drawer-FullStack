import { Link } from "react-router-dom";
import "../css/PageNotFound.css";

export function PageNotFound() {
  return (
    <div className="PageNotFound">
      <h1 className="PageNotFound-msg">Page Not Found</h1>
      <p>
        Back to <Link to="/">Home</Link>
      </p>
      <img
        src="https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif"
        alt="page-not-found"
      />
    </div>
  );
}
