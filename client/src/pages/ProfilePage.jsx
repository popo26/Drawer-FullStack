import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import InputField from "../components/InputField";
import MyButton from "../components/MyButton";
import { Icon } from "@iconify/react";
import { Button } from "react-bootstrap";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div>
      <InputField
        name="username"
        htmlFor="username"
        placeholder="Username"
        id="username"
        type="text"
      />
      <Button variant="dark">Change</Button>
      <InputField
        name="email"
        htmlFor="email"
        placeholder="Email"
        id="email"
        type="email"
      />
      <Button variant="dark">Change</Button>
      <InputField
        name="password"
        htmlFor="password"
        placeholder="Password"
        id="password"
        type="password"
      />
      <Link to="/password-reset">
        <Button variant="dark">Change</Button>
      </Link>
      <br />
      <div>
        <Icon
          className="back-btn"
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
