import React from 'react';
import './Dashboard2.css';
import EventImage from '../images/concordiaUni.jpg';
import WhatsUpLogo from '../images/w1.png';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
function Dashboard2() {
  return (
    <div class='container col-12'>
      <div class='event-details col-6'>
        <div class='logo col-12'>
          <img src={WhatsUpLogo} class='logo' alt='Whats Up Logo' />
          <p class='logo-text'>WHAT'S UP</p>
        </div>
        <div class='event-header col-12'>
          <div class='event-image col-6'>
            <img src={EventImage} alt='Event' />
          </div>
          <div class='main-details col-6'>
            <div class='text'>
              <p class='text-title'>Event Name</p>
              <p class='text-content'>Orientation Week</p>
            </div>
            <div class='text'>
              <p class='text-title'>Organizer</p>
              <p class='text-content'>George El-Hage</p>
            </div>
            <div class='text'>
              <p class='text-title'>Organization</p>
              <p class='text-content'>Concordia University</p>
            </div>
            <div class='text'>
              <p class='text-title'>Point of Contact</p>
              <p class='text-content'>Max Clonet</p>
              <p class='text-content'>(514)971-9610</p>
              <p class='text-content'>maxclonet@gmail.com</p>
            </div>
          </div>
        </div>
        <div class='additional-container col-12'>
          <div class='additional-details col-6'>
            <div class='text'>
              <p class='text-title'>Date(s)</p>
              <p class='text-content'>January 31, 2023</p>
            </div>
            <div class='text'>
              <p class='text-title'>Time</p>
              <p class='text-content'>9:00PM - 10:00PM</p>
            </div>
            <div class='text'>
              <p class='text-title'>Location</p>
              <p class='text-content'>JMSB 2.230</p>
            </div>
            <div class='text'>
              <p class='text-title'>Description</p>
              <p class='text-content'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                rhoncus nibh eget mauris placerat facilisis. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Mauris facilisis nibh nisl, ut dignissim leo
                condimentum vel. Suspendisse nec odio at turpis hendrerit
                tincidunt nec ut magna. Praesent ut volutpat lorem, sit amet
                porttitor felis. Pellentesque purus turpis, bibendum vel erat
                vel, tempus cursus massa. Donec varius vel ipsum sit amet
                laoreet.
              </p>
            </div>
            <div class='text'>
              <p class='text-title'>Link(s)</p>
              <p class='text-content'>
                <a href='www.google.com'>www.google.com</a>
              </p>
            </div>
          </div>
          <div class='details-right col-6'>
            <div class='schedule'>
              <div class='text'>
                <p class='text-title'>Schedule</p>
              </div>
              <div class='day'>
                <p class='day-count'>Day 1</p>
                <div class='day-itinerary'>
                  <p class='day-title'> Round Table with William</p>
                  <div class='time-place'>
                    <p class='time'>7:00PM - 8:00PM</p>
                    <p className='place'>Auditorium 860</p>
                  </div>
                  <p class='itinerary-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos.
                  </p>
                </div>

                <div class='day-itinerary'>
                  <p class='day-title'> Round Table with William</p>
                  <div class='time-place'>
                    <p class='time'>7:00PM - 8:00PM</p>
                    <p className='place'>Auditorium 860</p>
                  </div>

                  <p class='itinerary-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos.
                  </p>
                </div>
                <p class='day-count'>Day 2</p>
                <div class='day-itinerary'>
                  <p class='day-title'> Round Table with William</p>
                  <div class='time-place'>
                    <p class='time'>7:00PM - 8:00PM</p>
                    <p className='place'>Auditorium 860</p>
                  </div>
                  <p class='itinerary-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos.
                  </p>
                </div>
                <div class='day-itinerary'>
                  <p class='day-title'> Round Table with William</p>
                  <div class='time-place'>
                    <p class='time'>7:00PM - 8:00PM</p>
                    <p className='place'>Auditorium 860</p>
                  </div>
                  <p class='itinerary-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    rhoncus nibh eget mauris placerat facilisis. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos.
                  </p>
                </div>
              </div>
            </div>
            <div class='admin-approval'>
              <div class='logout-btn'>Approve</div>
              <div class='reject-btn'>Reject</div>
            </div>
          </div>
        </div>
      </div>
      <div class='view-events col-6'>
        <div class='view-nav col-12'>
          <div class='event-status'>
            <p class='inactive-status-btn'>Approved</p>
            <p class='active-status-btn'>Unapproved</p>
          </div>
          <div class='logout-btn'>
            <p>Log Out</p>
          </div>
        </div>
        <div class='search col-12'>
          <TextField
            id='input-with-icon-textfield'
            label='Search for...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
            variant='outlined'
            style={{ backgroundColor: 'white', borderRadius: 4 }}
            fullWidth
          />
          <div class='filter-icon'>
            <FilterListRoundedIcon style={{ color: '#00c0a4', fontSize: 36 }} />
          </div>
        </div>
        <div class='show-events col-12'>
          <div class='active-event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
          <div class='event-banner'>
            <div class='view-event-image'>
              <img src={EventImage} alt='Event' />
            </div>
            <div class='event-banner-text'>
              <p class='event-banner-title'>Orientation Week</p>
              <p class='time-place'>By Concordia University</p>
              <div class='date'>
                <div class='calendar-icon'>
                  <CalendarMonthRoundedIcon style={{ color: '#00c0a4' }} />
                </div>
                <p class='event-banner-date-text'>January 31, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard2;
