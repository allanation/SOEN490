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

function Dashboard() {
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
                <img className="Concordia" src={concordia} alt="Concordia Event"></img>
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
                <button className={isApproved? 'onClickButton': ''} onClick={()=>{setColorApproved(true); setColorUnapproved(false); setShowUnapproved(false)}}>Approved</button>
                <button className={isUnApproved? 'onClickButton': ''} onClick={()=>{setColorUnapproved(true); setColorApproved(false); setShowUnapproved(true)}}>Unapproved</button>
                </div>
                <button className='LogOut'>Log Out</button>
            </div>
        </div>
        <div className='container-row-2-right'>
        <div className='searchbar-loop'>
        <form id="search">
            <input type="text" id="searchFor" placeholder="Search for..." className="searchBar"></input>
            <button type="submit" className="searchLoop"><img src={searchloop} alt="Search Icon"></img></button>
        </form>
        </div>
        <button type="submit" className="filter"><img src={filter} alt="Filter Icon"></img></button>
        </div>
        {showEventsUnapproved &&<Container className="container-row-3-right">
          <Row className="eventRow">
          <Col md={{ span: 4, offset: 1 }} className="eventColumn" onClick={()=> {setShowDetails(true)}}>
            <img src={concordia} className="eventImg" alt="Concordia Event"></img>
            <div className='eventPreview'>
            <p className="eventTitle">Orientation Week</p>
            <p className="eventOrg">By Concordia University</p>
            <img src={calendar} className="calendar" alt="Calendar Icon"></img>
            <p className="eventDate">May 21,2022</p>
            </div>
          </Col>
          <Col md={{ span: 4, offset: 1 }} className="eventColumn">
            <img src={concordia} className="eventImg" alt="Concordia Event"></img>
            <div className='eventPreview'>
            <p className="eventTitle">Orientation Week</p>
            <p className="eventOrg">By Concordia University</p>
            <img src={calendar} className="calendar" alt="Calendar Icon"></img>
            <p className="eventDate">May 21,2022</p>
            </div>
          </Col>
          </Row>
        </Container>}
        </div>
    </div>
  )
}

export default Dashboard;