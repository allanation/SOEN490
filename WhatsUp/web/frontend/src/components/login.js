import { useState } from 'react';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './login.css';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(auth => {navigate('/dashboard')})
        .catch(error => console.error(error));
    }

    return (
        <div className="div">
            <h1 className="h1">Sign-In</h1>
            <label className="label">E-mail</label>
            <input onChange={(event)=>setEmail(event.target.value)} autoComplete="off" className="input" type="email" name="email"/>
            <label>Password</label>
            <input onChange={(event)=>setPassword(event.target.value)} autoComplete="off" className="input" type="password" name="password" /><br/>
            <button onClick={signIn} className="button">Sign In</button>
        </div>
    )
}

export default Login;