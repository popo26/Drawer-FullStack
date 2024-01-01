import logo from "../assets/logo_d.png";
import "../css/LandingPage.css";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="LandingPage">
      <h1>Vite</h1>
      <img src={logo} alt="logo" onClick={()=>navigate('/login')}/>
    </div>
  );
}
