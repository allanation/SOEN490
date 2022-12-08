import React from 'react';
import './Dashboard2.css';
import EventImage from '../images/concordiaUni.jpg';
import WhatsUpLogo from '../images/w1.png';

function Dashboard2() {
  const approvedEvents = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Fashion Week',
      organizer: 'Lasalle College',
      date: 'May 21, 2020',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'ETS',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'FROSH',
      organizer: 'Concordia Universityyyyyy',
      date: 'May 21, 2023',
    },
    {
      image: { EventImage },
      title: 'Film Festival',
      organizer: 'Cinema',
      date: 'May 21, 2024',
    },
    {
      image: { EventImage },
      title: 'Anime Film Festival',
      organizer: 'Cinema',
      date: 'June 24, 2024',
    },
  ];

  const unapprovedEvents = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Sports Weekend',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Music Festival',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Film Festival',
      organizer: 'Cinema',
      date: 'May 21, 2024',
    },
    {
      image: { EventImage },
      title: 'Jazz Festival',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'F1 ',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
  ];

  return (
    <div class='container col-12'>
      <div class='event-details col-6'>
        <div class='logo col-12'>
          <img src={WhatsUpLogo} class='logo' />
          <p class='logo-text'>WHAT'S UP</p>
        </div>
        <div class='event-header col-12'>
          <div class='event-image col-6'>
            <img src={EventImage} />
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
              {/* <img src={EventImage} alt='' /> */}
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
          <div class='schedule col-6'>
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
        </div>
      </div>
      <div class='view-events col-6'>
        <p>view-events</p>
      </div>
    </div>
  );
}

export default Dashboard2;
