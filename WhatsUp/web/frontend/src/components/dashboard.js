import { useAuthState } from "react-firebase-hooks/auth";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from "../firebase";
import searchloop from '../images/searchloop.png';
import filter from '../images/filter.png';
import "./dashboard.css";

function Dashboard() {
  const [user] = useAuthState(auth); 
  const [isApproved, setColorApproved] = useState(false);
  const [isUnApproved, setColorUnapproved] = useState(false);
  const navigate = useNavigate();

  function logOut(){
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="div">
      <span id="grey-box">
        <div className="buttons">
        <button className="Approved" onClick={()=>{setColorApproved(true); setColorUnapproved(false)}} style={{textDecoration: isApproved==true?"underline":"",textDecorationColor:isApproved==true?"#3acfb7":"",
         textDecorationThickness: isApproved==true?"1.5px":"", textUnderlineOffset: isApproved==true?"1em":"", color: isApproved==true?"black":""}}>Approved</button>
        <button className="Unapproved" onClick={()=>{setColorUnapproved(true); setColorApproved(false)}} style={{textDecoration: isUnApproved==true?"underline":"",textDecorationColor:isUnApproved==true?"#3acfb7":"",
         textDecorationThickness: isUnApproved==true?"1.5px":"", textUnderlineOffset: isUnApproved==true?"1em":"", color: isUnApproved==true?"black":""}}>Unapproved</button>
         <button className="logOut" onClick={logOut}>Log Out</button>
        </div>
        <div class="container">
          <form id="search">
            <input type="text" placeholder="Search for..." className="searchBar"></input>
            <button type="submit" className="searchLoop"><img src={searchloop} width="40" height="40"></img></button>
            </form>
            <button className="filter"><img src={filter}></img></button>
        </div>
      </span>
    </div>
  );
}

export default Dashboard;
