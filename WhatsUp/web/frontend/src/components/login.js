import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import logo from "../images/w5.png";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="div">
    
    <img src={logo} alt="WhatsUp logo" width="350" height="440"/>
      <h1 className="welcome">Welcome Back!</h1>
      <p>Please enter your credentials</p>
      <input
        placeHolder="Email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="off"
        className="input"
        type="email"
        name="email"
      />
      <br />
      <br />
      <input
        placeHolder="Password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
        className="input"
        type="password"
        name="password"
      />
      <br />
      <button onClick={signIn} className="login" id="btn">
        Login
      </button>
    </div>
  );
}

export default Login;
