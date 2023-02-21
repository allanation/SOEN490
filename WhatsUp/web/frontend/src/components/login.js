/* eslint-disable no-useless-escape */
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
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        alert("Incorrect Email address or Password.");
      });
  };

  return (
    <div className="div">
      <span id="grey-box">
      <img className="whatsupLogo" src={logo} alt="WhatsUp logo" width="325" height="385" />
      </span>
      <h1 className="welcome">Welcome Back!</h1>
      <p className="enterCredentials">Please enter your credentials</p>
      <input
        placeholder="Email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="off"
        className="inputEmail"
        type="email"
        name="email"
        data-testid="email"
      />
      <br />
      <input
        placeholder="Password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
        className="inputPassword"
        type="password"
        name="password"
        data-testid="password"
      />
      <br />
      <button onClick={signIn} className="loginButton" id="btn">
        Login
      </button>
    </div>
  );
}

export default Login;
