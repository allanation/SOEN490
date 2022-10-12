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

  let emailErrorMsg = document.getElementById("email-error-msg");
  let loginErrorMsg = document.getElementById("login-error-msg");
  var mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function isValidEmail(email) {
    return mailRegex.test(email);
  }

  function emailValidator(event) {
    try {
      if (!isValidEmail(event.target.value)) {
        emailErrorMsg.style.display = "block";
      }
    } catch (err) {
      console.log("");
    }
    if (isValidEmail(event.target.value)) {
      emailErrorMsg.style.display = "none";
    }
    setEmail(event.target.value);
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Invalid email or password.");
        loginErrorMsg.style.display = "block";
      });
  };

  return (
    <div className="div">
      <span id="grey-box">
      <img src={logo} alt="WhatsUp logo" width="440" height="550" />
      </span>
      <h1 className="welcome">Welcome Back!</h1>
      <p>Please enter your credentials</p>
      <input
        placeholder="Email"
        id="email"
        onChange={emailValidator}
        autoComplete="off"
        className="input"
        type="email"
        name="email"
        data-testid="email"
      />
      <br />
      <p id="email-error-msg" className="email-error-msg">
        Please enter a valid Email address.
      </p>
      <input
        placeholder="Password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
        className="input"
        type="password"
        name="password"
        data-testid="password"
      />
      <br />
      <p className="login-error-msg" id="login-error-msg">
        Incorrect Email address or Password.
      </p>
      <button onClick={signIn} className="login" id="btn">
        Login
      </button>
    </div>
  );
}

export default Login;
