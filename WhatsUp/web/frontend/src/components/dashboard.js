/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./dashboard.css";
import WhatsUpLogo from "../images/w1.png";
import { useNavigate } from "react-router-dom";
import UserImage from "../images/Empty-User.jpg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import dateformat from "dateformat";

function Dashboard() {
  const navigate = useNavigate();
  const [approvedevents, setapprovedevents] = useState([]);
  const [unapprovedevents, setunapprovedevents] = useState([]);
  const [rejectedevents, setrejectedevents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [viewApproved, clickApproved] = useState(true);
  const [viewUnapproved, clickUnapproved] = useState(false);
  const [viewRejected, clickRejected] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApprovedEvents = approvedevents.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.orgName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const filteredUnapprovedEvents = unapprovedevents.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.orgName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const filteredRejectedEvents = rejectedevents.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.orgName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // useEffect to load unapproved events
  const UnApprovedEvents = async () => {
    const name = "Unapproved";
    const q = query(collection(db, "events"), where("eventStatus", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setunapprovedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find unapproved events at the moment");
  };

  // useEffect to load approved events
  const ApprovedEvents = async () => {
    const name = "Approved";
    const q = query(collection(db, "events"), where("eventStatus", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setapprovedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find approved events at the moment");
  };

  // useEffect to load rejected events
  const RejectedEvents = async () => {
    const name = "Rejected";
    const q = query(collection(db, "events"), where("eventStatus", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setrejectedevents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else console.error("Cant find rejected events at the moment");
  };

  var date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var statusChangeDate =
    months[date.getMonth()].substring(0, 3) + " " + date.getDate();

  // Rejects the event onClick
  const handleRejectEvents = async (x) => {
    const changingToReject = doc(db, "events", x);
    await updateDoc(changingToReject, {
      eventStatus: "Rejected",
      adminComment: adminComment,
      statusChangeDate: statusChangeDate,
    });
  };

  // Accepts the event onClick
  const handleAcceptanceEvents = async (x) => {
    const changingToApprove = doc(db, "events", x);
    await updateDoc(changingToApprove, {
      eventStatus: "Approved",
      statusChangeDate: statusChangeDate,
    });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      alert("You have been signed out.");
      navigate("/");
    });
  };

  useEffect(() => {
    ApprovedEvents();
    UnApprovedEvents();
    RejectedEvents();
  }, []); // should have unapprovedevents instead of empty brackets but firebase limit cause issues

  return (
    <div className='container col-12'>
      {viewUnapproved &&
        unapprovedevents.map(
          (unapprovedEvent) =>
            selectedEvent === unapprovedEvent.id && (
              <div className='event-details col-8'>
                <div className='logo col-12'>
                  <img src={WhatsUpLogo} className='logo' alt='Whats Up Logo' />
                  <p className='logo-text'>WHAT'S UP ADMINISTRATOR</p>
                </div>
                <div className='event-header col-12'>
                  <div className='event-image col-6'>
                    <img
                      id='details-eventImage'
                      src={require("../cover images/" +
                        unapprovedEvent.coverImage +
                        ".jpg")}
                      alt='Event'
                    />
                  </div>
                  <div className='main-details col-6'>
                    <div className='main-detail-left col-6'>
                      <div className='text'>
                        <p className='text-title'>Event Name</p>
                        <p className='text-content'>
                          {unapprovedEvent.eventName}
                        </p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Organizer</p>
                        <p className='text-content'>
                          {unapprovedEvent.orgName}
                        </p>
                        <img
                          src={UserImage}
                          alt='George El-Hage'
                          className='user-image'
                        />
                      </div>
                    </div>
                    <div className='main-detail-right col-6'>
                      <div className='text'>
                        <p className='text-title'>Organization</p>
                        <p className='text-content'>
                          {unapprovedEvent.orgName}
                        </p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Point of Contact</p>
                        <p className='text-content'>
                          {unapprovedEvent.pocName}
                        </p>
                        <p className='text-content'>
                          {unapprovedEvent.pocPhoneNum}
                        </p>
                        <p className='text-content'>
                          {unapprovedEvent.pocEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='additional-container col-12'>
                  <div className='additional-details col-6'>
                    <div className='text'>
                      <p className='text-title'>Date(s)</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(unapprovedEvent.startDate).toString(),
                          "dddd, mmmm dS, yyyy"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Time</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(unapprovedEvent.startDate).toString(),
                          "h:MM:ss TT"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Location</p>
                      <p className='text-content'>{unapprovedEvent.location}</p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Description</p>
                      <p className='text-content'>
                        {unapprovedEvent.description}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Link(s)</p>
                      <p className='text-content'>
                        <a href=''>{unapprovedEvent.link}</a>
                      </p>
                    </div>
                  </div>
                  <div className='details-right col-6'>
                    <p className='text-title'>Schedule</p>
                    {unapprovedEvent.itinerary.map(
                      (unapprovedEventItinerary) => (
                        <div className='schedule'>
                          <div className='text'></div>
                          <div className='day'>
                            <p className='day-count'>
                              Day {unapprovedEventItinerary.day}
                            </p>
                            {unapprovedEventItinerary.schedule.map(
                              (unapprovedEventSchedule) => (
                                <div className='day-itinerary'>
                                  <p className='day-title'>
                                    {unapprovedEventSchedule.title}
                                  </p>
                                  <div className='time-place'>
                                    <p className='time'>
                                      {unapprovedEventSchedule.startTime} -{" "}
                                      {unapprovedEventSchedule.endTime}
                                    </p>
                                    <p className='place'>
                                      {unapprovedEventSchedule.location}
                                    </p>
                                  </div>
                                  <p className='itinerary-description'>
                                    {unapprovedEventSchedule.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}

                    <div className='admin-approval'>
                      <div
                        className='approve-btn'
                        onClick={() =>
                          handleAcceptanceEvents(unapprovedEvent.id)
                        }
                        data-testid='Approve'
                      >
                        Approve
                      </div>
                      <div
                        className='reject-btn'
                        onClick={() => setModalVisible(true)}
                      >
                        Reject
                      </div>
                    </div>
                    {modalVisible && (
                      <div className='reject-comments'>
                        <div className='btn-title-comments'>
                          <div className='backButton'>
                            <ChevronLeftIcon
                              style={{
                                color: "#00c0a4",
                                left: "20px",
                                fontSize: "35",
                              }}
                              onClick={() => setModalVisible(false)}
                            ></ChevronLeftIcon>
                          </div>
                          <h2 className='rejection-comments-title'>
                            Reason for Rejection
                          </h2>
                        </div>
                        <h4>
                          For {unapprovedEvent.eventName} by{" "}
                          {unapprovedEvent.orgName}
                        </h4>
                        <textarea
                          className='comments'
                          placeholder='Add a comment explaining why the event was rejected...'
                          onChange={(event) =>
                            setAdminComment(event.target.value)
                          }
                        ></textarea>
                        <button
                          className='comment-reject-btn'
                          onClick={() => {
                            setModalVisible(false);
                            handleRejectEvents(unapprovedEvent.id);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      {viewApproved &&
        approvedevents.map(
          (approvedEvent) =>
            selectedEvent === approvedEvent.id && (
              <div className='event-details col-8'>
                <div className='logo col-12'>
                  <img src={WhatsUpLogo} className='logo' alt='Whats Up Logo' />
                  <p className='logo-text'>WHAT'S UP ADMINISTRATOR</p>
                </div>
                <div className='event-header col-12'>
                  <div className='event-image col-6'>
                    <img
                      id='details-eventImage'
                      src={require("../cover images/" +
                        approvedEvent.coverImage +
                        ".jpg")}
                      alt='Event'
                    />
                  </div>
                  <div className='main-details col-6'>
                    <div className='main-detail-left col-6'>
                      <div className='text'>
                        <p className='text-title'>Event Name</p>
                        <p className='text-content'>
                          {approvedEvent.eventName}
                        </p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Organizer</p>
                        <p className='text-content'>{approvedEvent.orgName}</p>
                        <img
                          src={UserImage}
                          alt='George El-Hage'
                          className='user-image'
                        />
                      </div>
                    </div>
                    <div className='main-detail-right col-6'>
                      <div className='text'>
                        <p className='text-title'>Organization</p>
                        <p className='text-content'>{approvedEvent.orgName}</p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Point of Contact</p>
                        <p className='text-content'>{approvedEvent.pocName}</p>
                        <p className='text-content'>
                          {approvedEvent.pocPhoneNum}
                        </p>
                        <p className='text-content'>{approvedEvent.pocEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='additional-container col-12'>
                  <div className='additional-details col-6'>
                    <div className='text'>
                      <p className='text-title'>Date(s)</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(approvedEvent.startDate).toString(),
                          "dddd, mmmm dS, yyyy"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Time</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(approvedEvent.startDate).toString(),
                          "h:MM:ss TT"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Location</p>
                      <p className='text-content'>{approvedEvent.location}</p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Description</p>
                      <p className='text-content'>
                        {approvedEvent.description}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Link(s)</p>
                      <p className='text-content'>
                        <a href=''>{approvedEvent.link}</a>
                      </p>
                    </div>
                  </div>
                  <div className='details-right col-6'>
                    <p className='text-title'>Schedule</p>
                    {approvedEvent.itinerary.map((approvedEventItinerary) => (
                      <div className='schedule'>
                        <div className='text'></div>
                        <div className='day'>
                          <p className='day-count'>
                            Day {approvedEventItinerary.day}
                          </p>
                          {approvedEventItinerary.schedule.map(
                            (approvedEventSchedule) => (
                              <div className='day-itinerary'>
                                <p className='day-title'>
                                  {approvedEventSchedule.title}
                                </p>
                                <div className='time-place'>
                                  <p className='time'>
                                    {approvedEventSchedule.startTime}-{" "}
                                    {approvedEventSchedule.endTime}
                                  </p>
                                  <p className='place'>
                                    {approvedEventSchedule.location}
                                  </p>
                                </div>
                                <p className='itinerary-description'>
                                  {approvedEventSchedule.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
        )}
      {viewRejected &&
        rejectedevents.map(
          (rejectedEvent) =>
            selectedEvent === rejectedEvent.id && (
              <div className='event-details col-8'>
                <div className='logo col-12'>
                  <img src={WhatsUpLogo} className='logo' alt='Whats Up Logo' />
                  <p className='logo-text'>WHAT'S UP ADMINISTRATOR</p>
                </div>
                <div className='event-header col-12'>
                  <div className='event-image col-6'>
                    <img
                      id='details-eventImage'
                      src={require("../cover images/" +
                        rejectedEvent.coverImage +
                        ".jpg")}
                      alt='Event'
                    />
                  </div>
                  <div className='main-details col-6'>
                    <div className='main-detail-left col-6'>
                      <div className='text'>
                        <p className='text-title'>Event Name</p>
                        <p className='text-content'>
                          {rejectedEvent.eventName}
                        </p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Organizer</p>
                        <p className='text-content'>{rejectedEvent.orgName}</p>
                        <img
                          src={UserImage}
                          alt='George El-Hage'
                          className='user-image'
                        />
                      </div>
                    </div>
                    <div className='main-detail-right col-6'>
                      <div className='text'>
                        <p className='text-title'>Organization</p>
                        <p className='text-content'>{rejectedEvent.orgName}</p>
                      </div>
                      <div className='text'>
                        <p className='text-title'>Point of Contact</p>
                        <p className='text-content'>{rejectedEvent.pocName}</p>
                        <p className='text-content'>
                          {rejectedEvent.pocPhoneNum}
                        </p>
                        <p className='text-content'>{rejectedEvent.pocEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='additional-container col-12'>
                  <div className='additional-details col-6'>
                    <div className='text'>
                      <p className='text-title'>Date(s)</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(rejectedEvent.startDate).toString(),
                          "dddd, mmmm dS, yyyy"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Time</p>
                      <p className='text-content'>
                        {dateformat(
                          new Date(rejectedEvent.startDate).toString(),
                          "h:MM:ss TT"
                        )}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Location</p>
                      <p className='text-content'>{rejectedEvent.location}</p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Description</p>
                      <p className='text-content'>
                        {rejectedEvent.description}
                      </p>
                    </div>
                    <div className='text'>
                      <p className='text-title'>Link(s)</p>
                      <p className='text-content'>
                        <a href=''>{rejectedEvent.link}</a>
                      </p>
                    </div>
                  </div>
                  <div className='details-right col-6'>
                    <p className='text-title'>Schedule</p>
                    {rejectedEvent.itinerary.map((rejectedEventItinerary) => (
                      <div className='schedule'>
                        <div className='text'></div>
                        <div className='day'>
                          <p className='day-count'>
                            Day {rejectedEventItinerary.day}
                          </p>
                          {rejectedEventItinerary.schedule.map(
                            (rejectedEventSchedule) => (
                              <div className='day-itinerary'>
                                <p className='day-title'>
                                  {rejectedEventSchedule.title}
                                </p>
                                <div className='time-place'>
                                  <p className='time'>
                                    {rejectedEventSchedule.startTime} -{" "}
                                    {rejectedEventSchedule.endTime}
                                  </p>
                                  <p className='place'>
                                    {rejectedEventSchedule.location}
                                  </p>
                                </div>
                                <p className='itinerary-description'>
                                  {rejectedEventSchedule.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
        )}
      <div className='event-details col-8'></div>
      <div className='view-events col-4'>
        <div className='view-nav col-12'>
          <div className='event-status'>
            <button
              data-testid='unbutton'
              className={
                viewUnapproved === true ? "active-status-btn" : "status-btn"
              }
              onClick={() => {
                clickUnapproved(true);
                clickApproved(false);
                clickRejected(false);
              }}
            >
              Unapproved
            </button>
            <button
              data-testid='abutton'
              className={
                viewApproved === true ? "active-status-btn" : "status-btn"
              }
              onClick={() => {
                clickApproved(true);
                clickUnapproved(false);
                clickRejected(false);
              }}
            >
              Approved
            </button>
            <button
              data-testid='rejectbutton'
              className={
                viewRejected === true ? "active-status-btn" : "status-btn"
              }
              onClick={() => {
                clickRejected(true);
                clickApproved(false);
                clickUnapproved(false);
              }}
            >
              Rejected
            </button>
          </div>
          <button onClick={logOut} className='logout-btn'>
            <p>Log Out</p>
          </button>
        </div>
        <div className='search col-12'>
          <TextField
            id='input-with-icon-textfield'
            label='Search for...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
            variant='outlined'
            style={{ backgroundColor: "white", borderRadius: 4 }}
            fullWidth
          />
          <div className='filter-icon'>
            <FilterListRoundedIcon style={{ color: "#00c0a4", fontSize: 36 }} />
          </div>
        </div>
        <div className='show-events col-12' data-testid='show-events'>
          {viewUnapproved &&
            unapprovedevents &&
            filteredUnapprovedEvents.map((unapprovedEvent) => (
              <div
                className={
                  selectedEvent === unapprovedEvent.id
                    ? "active-event-banner col-12"
                    : "event-banner col-12"
                }
                data-testid='unapproved-event'
                onClick={() => setSelectedEvent(unapprovedEvent.id)}
              >
                <div className='view-event-image'>
                  <img
                    id='eventImage'
                    src={require("../cover images/" +
                      unapprovedEvent.coverImage +
                      ".jpg")}
                    alt='Event'
                  />
                </div>
                <div className='event-banner-text'>
                  <p className='event-banner-title'>
                    {unapprovedEvent.eventName}
                  </p>
                  <p className='time-place'>{unapprovedEvent.orgName}</p>
                  <div className='date'>
                    <div className='calendar-icon'>
                      <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                    </div>
                    <p className='event-banner-date-text'>
                      {dateformat(
                        new Date(unapprovedEvent.startDate).toString(),
                        "mmmm dS, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {/* {filteredUnapprovedEvents.length === 0 ? (
            <>
              <div className={"event-banner col-12"}>
                <div className='view-event-image'></div>
                <div className='event-banner-text'></div>
              </div>
            </>
          ) : (
            <></>
          )}
          {filteredApprovedEvents.length === 0 ? (
            <>
              <div className={"event-banner col-12"}>
                <div className='view-event-image'></div>
                <div className='event-banner-text'></div>
              </div>
            </>
          ) : (
            <></>
          )} */}
          {viewApproved &&
            approvedevents &&
            filteredApprovedEvents.map((approvedEvent) => (
              <div
                data-testid='approved'
                className={
                  selectedEvent === approvedEvent.id
                    ? "active-event-banner col-12"
                    : "event-banner col-12"
                }
                onClick={() => setSelectedEvent(approvedEvent.id)}
              >
                <div className='view-event-image'>
                  <img
                    id='eventImage'
                    src={require("../cover images/" +
                      approvedEvent.coverImage +
                      ".jpg")}
                    alt='Event'
                  />
                </div>
                <div className='event-banner-text' data-testid='approved-event'>
                  <p className='event-banner-title'>
                    {approvedEvent.eventName}
                  </p>
                  <p className='time-place'>{approvedEvent.orgName}</p>
                  <div className='date'>
                    <div className='calendar-icon'>
                      <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                    </div>
                    <p className='event-banner-date-text'>
                      {dateformat(
                        new Date(approvedEvent.startDate).toString(),
                        "mmmm dS, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {viewRejected &&
            rejectedevents &&
            filteredRejectedEvents.map((rejectedEvent) => (
              <div
                className={
                  selectedEvent === rejectedEvent.id
                    ? "active-event-banner col-12"
                    : "event-banner col-12"
                }
                data-testid='Rejected'
                onClick={() => setSelectedEvent(rejectedEvent.id)}
              >
                <div className='view-event-image'>
                  <img
                    id='eventImage'
                    src={require("../cover images/" +
                      rejectedEvent.coverImage +
                      ".jpg")}
                    alt='Event'
                  />
                </div>
                <div className='event-banner-text'>
                  <p className='event-banner-title'>
                    {rejectedEvent.eventName}
                  </p>
                  <p className='time-place'>{rejectedEvent.orgName}</p>
                  <div className='date'>
                    <div className='calendar-icon'>
                      <CalendarMonthRoundedIcon style={{ color: "#00c0a4" }} />
                    </div>
                    <p className='event-banner-date-text'>
                      {dateformat(
                        new Date(rejectedEvent.startDate).toString(),
                        "mmmm dS, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
