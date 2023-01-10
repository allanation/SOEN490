import React from "react";
import "./Dashboard2.css";
import EventImage from "../images/concordiaUni.jpg";
import WhatsUpLogo from "../images/w1.png";
import UserImage from "../images/george.jpeg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Dashboard2() {
  const [approvedevents, setapprovedevents] = useState([]);
  const [unapprovedevents, setunapprovedevents] = useState([]);
  const [rejectedevents, setrejectedevents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [viewApproved, clickApproved] = useState(false);
  const [viewUnapproved, clickUnapproved] = useState(false);
  const [viewRejected, clickRejected] = useState(false);
  const storage = getStorage();

  // function downloadURL(filePath){
  // if (filePath){
  // console.log(filePath);
  // getDownloadURL(ref(storage, filePath))
  // .then((url) => {
  //   // `url` is the download URL for 'images/stars.jpg'
  //   // Or inserted into an <img> element
  //   const img = document.getElementById('eventImg');
  //   img.setAttribute('src', url);
  //   console.log(url);
  // })
  // .catch((error) => {
  //   // Handle any errors
  // })}};

  // USEEFFECT TO LOAD THE UNAPPROVED EVENTS
  const getUnApprovedEvents = async () => {
    const name = "Unapproved";
    //will need to change the "isApproved" to "eventStatus" once we have more examples
    const q = query(collection(db, "events"), where("isApproved", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setunapprovedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find unapproved events at the moment");
  };

  // USEEFFECT TO LOAD THE APPROVED EVENTS
  const ApprovedEvents = async () => {
    const name = "Approved";
    const q = query(collection(db, "events"), where("isApproved", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setapprovedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find approved events at the moment");
  };

  // useeffect shows rejected events
  const RejectedEvents = async () => {
    const name = "Rejected";
    const q = query(collection(db, "events"), where("isApproved", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setrejectedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find rejected events at the moment");
  };


  // To reject function on press!
  const handleRejectEvents = async (x) => {
    const changingToReject = doc(db, "events", x);
    await updateDoc(changingToReject, {
      isApproved: "Rejected",
    });
  };

  // To accept on press function!
  const handleAcceptanceEvents = async (x) => {
    const changingToApprove = doc(db, "events", x);
    await updateDoc(changingToApprove, {
      isApproved: "Approved",
    });
  };

  //when you reject, you can add a comment
  const handleComments = async (x, suggestion) => {
    const changingToApprove = doc(db, "events", x);
    await updateDoc(changingToApprove, {
      comment: suggestion,
    });
  };

  useEffect(() => {
    ApprovedEvents();
    getUnApprovedEvents();
    RejectedEvents();
    //handleComments("riXCsVOOB7OdGIjtB46U", "TRASH");
    //handleAcceptanceEvents("BqTUaMfiUWMCEcMMlE5s");
  }, []); // should have unapprovedevents instead of empty brackets but firebase limit cause issues

  console.log(approvedevents, unapprovedevents, rejectedevents)


  return (
    <div className={modalVisible == true? 'container-blur col-12': 'container col-12'}>
      {viewUnapproved && unapprovedevents.map(unapprovedEvent => ( selectedEvent === unapprovedEvent.id &&
      <div className="event-details col-8">
        <div className="logo col-12">
          <img src={WhatsUpLogo} className="logo" alt="Whats Up Logo" />
          <p className="logo-text">WHAT'S UP ADMINISTRATOR</p>
        </div>
        <div className="event-header col-12">
          <div className="event-image col-6">
            <img id="eventImage" src={EventImage} alt="Event" />
          </div>
          <div className="main-details col-6">
            <div className="main-detail-left col-6">
              <div className="text">
                <p className="text-title">Event Name</p>
                <p className="text-content">{unapprovedEvent.eventName}</p>
              </div>
              <div className="text">
                <p className="text-title">Organizer</p>
                <p className="text-content">{unapprovedEvent.orgName}</p>
                <img
                  src={UserImage}
                  alt="George El-Hage"
                  className="user-image"
                />
              </div>
            </div>
            <div className="main-detail-right col-6">
              <div className="text">
                <p className="text-title">Organization</p>
                <p className="text-content">{unapprovedEvent.orgName}</p>
              </div>
              <div className="text">
                <p className="text-title">Point of Contact</p>
                <p className="text-content">{unapprovedEvent.pocName}</p>
                <p className="text-content">{unapprovedEvent.pocPhoneNum}</p>
                <p className="text-content">{unapprovedEvent.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="additional-container col-12">
          <div className="additional-details col-6">
            <div className="text">
              <p className="text-title">Date(s)</p>
              <p className="text-content">{unapprovedEvent.startDate}</p>
            </div>
            <div className="text">
              <p className="text-title">Time</p>
              {/* should probably change the field or change in firebase */} 
              <p className="text-content">{unapprovedEvent.startTime}</p>
            </div>
            <div className="text">
              <p className="text-title">Location</p>
              <p className="text-content">{unapprovedEvent.location}</p>
            </div>
            <div className="text">
              <p className="text-title">Description</p>
              <p className="text-content">
               {unapprovedEvent.description}
              </p>
            </div>
            <div className="text">
              <p className="text-title">Link(s)</p>
              <p className="text-content">
                <a href="www.google.com">www.google.com</a>
              </p>
            </div>
          </div>
          <div className="details-right col-6">
            <p className="text-title">Schedule</p>
            {unapprovedEvent.itinerary.map((unapprovedEventItinerary,index) =>(    
            <div className="schedule">
              <div className="text">
                {/* <p className="text-title">Schedule</p> */}
              </div>
              <div className="day">
                <p className="day-count">Day {index+1}</p>
                <div className="day-itinerary">
                  <p className="day-title">{unapprovedEventItinerary.title}</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">{unapprovedEventItinerary.location}</p>
                  </div>
                  <p className="itinerary-description">
                  {unapprovedEventItinerary.description}
                  </p>
                </div>
              </div>
            </div>
            ))}
            
            <div className="admin-approval">
              <div className="logout-btn" onClick={() => handleAcceptanceEvents(unapprovedEvent.id)}>Approve</div>
              <div className="reject-btn" onClick={() => setModalVisible(true)}>Reject</div>
            </div>
           { modalVisible && <div className="reject-comments">
            <h2>Add Comments</h2>
            <h4>For {unapprovedEvent.eventName} by {unapprovedEvent.orgName}</h4>
            <textarea className="comments" placeholder="comments"></textarea>
            <button className="comment-reject-btn" onClick={() => {setModalVisible(false); handleRejectEvents(unapprovedEvent.id)}}>
              Reject
            </button>
            </div>}
          </div>
        </div>
      </div>
))}
      {viewApproved && approvedevents.map(approvedEvent => ( selectedEvent === approvedEvent.id &&
      <div className="event-details col-8">
        <div className="logo col-12">
          <img src={WhatsUpLogo} className="logo" alt="Whats Up Logo" />
          <p className="logo-text">WHAT'S UP ADMINISTRATOR</p>
        </div>
        <div className="event-header col-12">
          <div className="event-image col-6">
            <img id= "eventImage" src={EventImage} alt="Event" />
          </div>
          <div className="main-details col-6">
            <div className="main-detail-left col-6">
              <div className="text">
                <p className="text-title">Event Name</p>
                <p className="text-content">{approvedEvent.eventName}</p>
              </div>
              <div className="text">
                <p className="text-title">Organizer</p>
                <p className="text-content">{approvedEvent.orgName}</p>
                <img
                  src={UserImage}
                  alt="George El-Hage"
                  className="user-image"
                />
              </div>
            </div>
            <div className="main-detail-right col-6">
              <div className="text">
                <p className="text-title">Organization</p>
                <p className="text-content">{approvedEvent.orgName}</p>
              </div>
              <div className="text">
                <p className="text-title">Point of Contact</p>
                <p className="text-content">{approvedEvent.pocName}</p>
                <p className="text-content">{approvedEvent.pocPhoneNum}</p>
                <p className="text-content">{approvedEvent.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="additional-container col-12">
          <div className="additional-details col-6">
            <div className="text">
              <p className="text-title">Date(s)</p>
              <p className="text-content">{approvedEvent.startDate}</p>
            </div>
            <div className="text">
              <p className="text-title">Time</p>
              {/* should probably change the field or change in firebase */} 
              <p className="text-content">{approvedEvent.startTime}</p>
            </div>
            <div className="text">
              <p className="text-title">Location</p>
              <p className="text-content">{approvedEvent.location}</p>
            </div>
            <div className="text">
              <p className="text-title">Description</p>
              <p className="text-content">
               {approvedEvent.description}
              </p>
            </div>
            <div className="text">
              <p className="text-title">Link(s)</p>
              <p className="text-content">
                <a href="www.google.com">www.google.com</a>
              </p>
            </div>
          </div>
          <div className="details-right col-6">
            <p className="text-title">Schedule</p>
            {approvedEvent.itinerary.map((approvedEventItinerary,index) =>(    
            <div className="schedule">
              <div className="text">
                {/* <p className="text-title">Schedule</p> */}
              </div>
              <div className="day">
                <p className="day-count">Day {index+1}</p>
                <div className="day-itinerary">
                  <p className="day-title">{approvedEventItinerary.title}</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">{approvedEventItinerary.location}</p>
                  </div>
                  <p className="itinerary-description">
                  {approvedEventItinerary.description}
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
))}
{viewRejected && rejectedevents.map(rejectedEvent => ( selectedEvent === rejectedEvent.id &&
      <div className="event-details col-8">
        <div className="logo col-12">
          <img src={WhatsUpLogo} className="logo" alt="Whats Up Logo" />
          <p className="logo-text">WHAT'S UP ADMINISTRATOR</p>
        </div>
        <div className="event-header col-12">
          <div className="event-image col-6">
            <img  id="eventImage" src={EventImage} alt="Event" />
          </div>
          <div className="main-details col-6">
            <div className="main-detail-left col-6">
              <div className="text">
                <p className="text-title">Event Name</p>
                <p className="text-content">{rejectedEvent.eventName}</p>
              </div>
              <div className="text">
                <p className="text-title">Organizer</p>
                <p className="text-content">{rejectedEvent.orgName}</p>
                <img
                  src={UserImage}
                  alt="George El-Hage"
                  className="user-image"
                />
              </div>
            </div>
            <div className="main-detail-right col-6">
              <div className="text">
                <p className="text-title">Organization</p>
                <p className="text-content">{rejectedEvent.orgName}</p>
              </div>
              <div className="text">
                <p className="text-title">Point of Contact</p>
                <p className="text-content">{rejectedEvent.pocName}</p>
                <p className="text-content">{rejectedEvent.pocPhoneNum}</p>
                <p className="text-content">{rejectedEvent.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="additional-container col-12">
          <div className="additional-details col-6">
            <div className="text">
              <p className="text-title">Date(s)</p>
              <p className="text-content">{rejectedEvent.startDate}</p>
            </div>
            <div className="text">
              <p className="text-title">Time</p>
              {/* should probably change the field or change in firebase */} 
              <p className="text-content">{rejectedEvent.startTime}</p>
            </div>
            <div className="text">
              <p className="text-title">Location</p>
              <p className="text-content">{rejectedEvent.location}</p>
            </div>
            <div className="text">
              <p className="text-title">Description</p>
              <p className="text-content">
               {rejectedEvent.description}
              </p>
            </div>
            <div className="text">
              <p className="text-title">Link(s)</p>
              <p className="text-content">
                <a href="www.google.com">www.google.com</a>
              </p>
            </div>
          </div>
          <div className="details-right col-6">
            <p className="text-title">Schedule</p>
            {rejectedEvent.itinerary.map((rejectedEventItinerary,index) =>(    
            <div className="schedule">
              <div className="text">
                {/* <p className="text-title">Schedule</p> */}
              </div>
              <div className="day">
                <p className="day-count">Day {index+1}</p>
                <div className="day-itinerary">
                  <p className="day-title">{rejectedEventItinerary.title}</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">{rejectedEventItinerary.location}</p>
                  </div>
                  <p className="itinerary-description">
                  {rejectedEventItinerary.description}
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
))}
      <div className="view-events col-4">
        <div className="view-nav col-12">
          <div className="event-status">
            <button className={viewApproved == true? 'active-status-btn': 'status-btn'} onClick={() => {clickApproved(true); clickUnapproved(false); clickRejected(false)}}>Approved</button>
            <button className={viewUnapproved == true? 'active-status-btn': 'status-btn'} onClick={() => {clickUnapproved(true); clickApproved(false); clickRejected(false)}}>Unapproved</button>
            <button className={viewRejected == true? 'active-status-btn': 'status-btn'} onClick={() => {clickRejected(true); clickApproved(false); clickUnapproved(false)}}>Rejected</button>
          </div>
          <div className="logout-btn">
            <p>Log Out</p>
          </div>
        </div>
        <div className="search col-12">
          <TextField
            id="input-with-icon-textfield"
            label="Search for..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            style={{ backgroundColor: "white", borderRadius: 4 }}
            fullWidth
          />
          <div className="filter-icon">
            <FilterListRoundedIcon style={{ color: "#00c0a4", fontSize: 36 }} />
          </div>
        </div>
        <div className="show-events col-12">
          { viewUnapproved && unapprovedevents && unapprovedevents.map(unapprovedEvent => (
            <div className={selectedEvent === unapprovedEvent.id ? 'active-event-banner col-12': 'event-banner col-12'} onClick={() => setSelectedEvent(unapprovedEvent.id)}>
            <div className="view-event-image">
              <img id="eventImage" src={EventImage} alt="Event" />
            </div>
            <div className="event-banner-text">
              <p className="event-banner-title">{unapprovedEvent.eventName}</p>
              <p className="time-place">{unapprovedEvent.orgName}</p>
              <div className="date">
                <div className="calendar-icon">
                  <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                </div>
                <p className="event-banner-date-text">{unapprovedEvent.startDate}</p>
              </div>
            </div>
          </div>
          ))}
          { viewApproved && approvedevents && approvedevents.map(approvedEvent => (
            <div className={selectedEvent === approvedEvent.id ? 'active-event-banner col-12': 'event-banner col-12'} onClick={() => setSelectedEvent(approvedEvent.id)}>
            <div className="view-event-image">
              <img id= "eventImage" src={EventImage} alt="Event" />
            </div>
            <div className="event-banner-text">
              <p className="event-banner-title">{approvedEvent.eventName}</p>
              <p className="time-place">{approvedEvent.orgName}</p>
              <div className="date">
                <div className="calendar-icon">
                  <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                </div>
                <p className="event-banner-date-text">{approvedEvent.startDate}</p>
              </div>
            </div>
          </div>
          ))}
          { viewRejected && rejectedevents && rejectedevents.map(rejectedEvent => (
            <div className={selectedEvent === rejectedEvent.id ? 'active-event-banner col-12': 'event-banner col-12'} onClick={() => setSelectedEvent(rejectedEvent.id)}>
            <div className="view-event-image">
              <img id="eventImage" src={EventImage} alt="Event" />
            </div>
            <div className="event-banner-text">
              <p className="event-banner-title">{rejectedEvent.eventName}</p>
              <p className="time-place">{rejectedEvent.orgName}</p>
              <div className="date">
                <div className="calendar-icon">
                  <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                </div>
                <p className="event-banner-date-text">{rejectedEvent.startDate}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      </div>



    
  );
}

export default Dashboard2;
