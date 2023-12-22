import { Link } from "react-router-dom";
import "../css/PageNotFound.css";
import { useEffect } from "react";

export function PageNotFound({ user, setUser }) {
  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    console.log("user in Scribble List", userInBrowser);
    if (userInBrowser) {
      setUser(userInBrowser);
    }
  }, []);

  return (
    <div className="PageNotFound">
      <h1 className="PageNotFound-msg">Page Not Found</h1>
      {/* <p>
        What were you looking for? Maybe going back <Link to="/">home</Link>
        will help you find it.
      </p> */}
      <img
        src="https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif"
        alt="page-not-found"
      />
    </div>
  );
}
