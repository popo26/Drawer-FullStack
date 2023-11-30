import InputField from "../components/InputField";
import { useState } from "react";
import "../css/PasswordResetPage.css";
import { Button } from "react-bootstrap";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setEmail(e.target.value);
    console.log("email is: ", email);
    setIsSent(true);
  };

  return (
    <div className="PasswordResetPage">
      <form onSubmit={handleSubmit}>
        <InputField
          htmlFor="email"
          name="email"
          type="email"
          placeholder="Your email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <br />
        <Button variant="dark">Send Password Reset Link</Button>
        {isSent && <div>Please check your email.</div>}
      </form>
    </div>
  );
}
