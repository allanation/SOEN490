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
function Dashboard2() {
  const [approvedevents, setapprovedevents] = useState([]);
  const [unapprovedevents, setunapprovedevents] = useState([]);
  const [rejectedevents, setrejectedevents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

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
        setapprovedevents(
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
    //handleComments("riXCsVOOB7OdGIjtB46U", "TRASH");
    //handleAcceptanceEvents("BqTUaMfiUWMCEcMMlE5s");
  }, [unapprovedevents]);


  return (
    <div className="container col-12">
      {unapprovedevents.map(unapprovedEvent => ( selectedEvent === unapprovedEvent.id &&
      <div className="event-details col-8">
        <div className="logo col-12">
          <img src={WhatsUpLogo} className="logo" alt="Whats Up Logo" />
          <p className="logo-text">WHAT'S UP ADMINISTRATOR</p>
        </div>
        <div className="event-header col-12">
          <div className="event-image col-6">
            <img src={EventImage} alt="Event" />
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
            <div className="schedule">
              <div className="text">
                <p className="text-title">Schedule</p>
              </div>
              <div className="day">
                <p className="day-count">Day 1</p>
                <div className="day-itinerary">
                  <p className="day-title"> Round Table with William</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">Auditorium 860</p>
                  </div>
                  <p className="itinerary-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. className
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </p>
                </div>

                <div className="day-itinerary">
                  <p className="day-title"> Round Table with William</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">Auditorium 860</p>
                  </div>

                  <p className="itinerary-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. className
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </p>
                </div>
                <p className="day-count">Day 2</p>
                <div className="day-itinerary">
                  <p className="day-title"> Round Table with William</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">Auditorium 860</p>
                  </div>
                  <p className="itinerary-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. className
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </p>
                </div>
                <div className="day-itinerary">
                  <p className="day-title"> Round Table with William</p>
                  <div className="time-place">
                    <p className="time">7:00PM - 8:00PM</p>
                    <p className="place">Auditorium 860</p>
                  </div>
                  <p className="itinerary-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. className
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos.
                  </p>
                </div>
              </div>
            </div>
            <div className="admin-approval">
              <div className="logout-btn" onClick={() => handleAcceptanceEvents(unapprovedEvent.id)}>Approve</div>
              <div className="reject-btn" onClick={() => handleRejectEvents(unapprovedEvent.id)}>Reject</div>
            </div>
          </div>
        </div>
      </div>
))} 
      <div className="view-events col-4">
        <div className="view-nav col-12">
          <div className="event-status">
            <p className="inactive-status-btn">Approved</p>
            <p className="active-status-btn">Unapproved</p>
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
          { unapprovedevents && unapprovedevents.map(unapprovedEvent => (
            <div className={selectedEvent === unapprovedEvent.id ? 'active-event-banner col-12': 'event-banner col-12'} onClick={() => setSelectedEvent(unapprovedEvent.id)}>
            <div className="view-event-image">
              <img src={EventImage} alt="Event" />
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
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard2;
