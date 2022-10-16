import React from 'react';
import './dashboard.css'
import concordia from '../images/concordiaUni.jpg';
import searchloop from '../images/searchloop.png';
import filter from '../images/filter.png';
import calendar from '../images/calendar.png';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard2() {
    const [isApproved, setColorApproved] = useState(false);
    const [isUnApproved, setColorUnapproved] = useState(false);
    const [showEventsUnapproved, setShowUnapproved] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='admin-dashboard-container'>
        <div className='admin-dashboard-left'>
        {showDetails && <div className='bigDaddy'>
        <div className='container-row-1-left'>
                <div className='imgDiv'>
                <img className="Concordia" src={concordia}></img>
                </div>
                <div className='details'>
                <h2>Title</h2>
                <h2 >Account</h2>
                <h2>Organization</h2>
                <h2>Point of Contact</h2>
                </div>
            </div>
            <div className='container-row-2-left'>
                <div className='moreDetails'>
                <h2>Date(s)</h2>
                <h2 >Time</h2>
                <h2>Location</h2>
                <h2>Description</h2>
                </div>
                <div className='scheduleAndButtons'>
                <div className='schedule'>
                <h2>Schedule</h2>
                </div>
                <div className='approveReject'>
                <button className='approve'>Approve</button>
                <button className='reject'>Reject</button>
                </div>
                </div>
            </div>
            </div>}
        </div>
        <div className='admin-dashboard-right'>
        <div className='container-row-1-right'>
            <div className='mainButtons'>
                <div className='eventButtons'>
                <button className='Approved' onClick={()=>{setColorApproved(true); setColorUnapproved(false); setShowUnapproved(false)}} style={{textDecoration: isApproved==true?"underline":"",textDecorationColor:isApproved==true?"#3acfb7":"",
         textDecorationThickness: isApproved==true?"1.5px":"", textUnderlineOffset: isApproved==true?"1em":"", color: isApproved==true?"black":""}}>Approved</button>
                <button className='Unapproved' onClick={()=>{setColorUnapproved(true); setColorApproved(false); setShowUnapproved(true)}} style={{textDecoration: isUnApproved==true?"underline":"",textDecorationColor:isUnApproved==true?"#3acfb7":"",
         textDecorationThickness: isUnApproved==true?"1.5px":"", textUnderlineOffset: isUnApproved==true?"1em":"", color: isUnApproved==true?"black":""}}>Unapproved</button>
                </div>
                <button className='LogOut'>Log Out</button>
            </div>
        </div>
        <div className='container-row-2-right'>
        <div className='searchbar-loop'>
        <form id="search">
            <input type="text" placeholder="Search for..." className="searchBar"></input>
            <button type="submit" className="searchLoop"><img src={searchloop} width="40" height="40"></img></button>
        </form>
        </div>
        <button type="submit" className="filter"><img src={filter}></img></button>
        </div>
        {showEventsUnapproved &&<Container className="container-row-3-right">
          <Row className="eventRow">
          <Col md={{ span: 4, offset: 1 }} className="eventColumn" onClick={()=> {setShowDetails(true)}}>
            <img src={concordia} className="eventImg"></img>
            <div className='eventPreview'>
            <p className="eventTitle">Orientation Week</p>
            <p className="eventOrg">By Concordia University</p>
            <img src={calendar} className="calendar"></img>
            <p className="eventDate">May 21,2022</p>
            </div>
          </Col>
          <Col md={{ span: 4, offset: 1 }} className="eventColumn">
            <img src={concordia} className="eventImg"></img>
            <div className='eventPreview'>
            <p className="eventTitle">Orientation Week</p>
            <p className="eventOrg">By Concordia University</p>
            <img src={calendar} className="calendar"></img>
            <p className="eventDate">May 21,2022</p>
            </div>
          </Col>
          </Row>
        </Container>}
        </div>
    </div>
  )
}

export default Dashboard2;