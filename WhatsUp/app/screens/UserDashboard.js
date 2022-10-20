import React from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import Search from "../components/Search";
import SmallButton from "../components/SmallButton";
import NavButton from "../components/NavButton";
import Event from "../components/Event";
import FilterButton from "../components/FilterButton";
import NotificationIcon from "../assets/Icons/icons8-notifica.png";
import LocationPin from "../assets/Icons/icons8-pin-64.png"
import SliderIcon from "../assets/Icons/icons8-slider-4.png";
import Home from "../assets/Icons/icons8-home-48.png";
import Ticket from "../assets/Icons/icons8-ticket-9.png";
import Bookmark from "../assets/Icons/icons8-bookmark.png";
import Profile from "../assets/Icons/icons8-user-48.png";
import School from "../assets/Icons/stringio.png";// Temporary Placeholder

function UserDashboard() {
  var date = new Date();
  const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  var today = "Today's " + (months[date.getMonth()]) + " " + date.getDate();
  var user = "TEMP";
  var welcome = "Welcome, " + user + "!";

  const events = [
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: {School},
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
  ];


  return (
    <Screen style={{padding: 20, marginTop: 20, backgroundColor: '#F5F5F5'}}>

      <View style={{flexDirection: 'row'}}>
        <SmallButton image = {LocationPin} title="Location, QC" onPress={() => console.log("Location")} size={15}/>
        <View style={{position: 'absolute', right: 10}}>
            <SmallButton image = {NotificationIcon} title="" onPress={() => console.log("Notification")} size={2}/>
        </View>
      </View>

      <Text style={styles.date}>{today}</Text>

      <Text style={styles.title}>{welcome}</Text>

      <View style={{flexDirection: 'row'}} >
        <Search placeholder="Search for..." />
        <FilterButton image={SliderIcon} onPress={() => console.log("Filters")}/>
      </View>

      <Text style={styles.text}>Popular Events</Text>

      <View style={{height: '63%'}}>
        <ScrollView>
            {events.map((n) => {
                return (
                <Event image={School} title={n.title} organizer={n.organizer} date={n.date} onPress={() => console.log("Event")}/>
                );
            })}
        </ScrollView>
      </View>

      <View style={styles.container}>
        <NavButton image={Home} onPress={() => console.log("Home")} position='5%'/>
        <NavButton image={Ticket} onPress={() => console.log("Ticket")} position='20%'/>
        <NavButton image={Bookmark} onPress={() => console.log("Bookmark")} position='35%'/>
        <NavButton image={Profile} onPress={() => console.log("Profile")} position='50%'/>
      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
    organizer: {
        alignItems: 'flex-start',
        width: '50%'
    },
    organizertwo: {
        alignItems: 'flex-start',
        width: '30%'
    },
    title:{
       color: '#100101',
       fontSize: 20,
    },
    date:{
       color: '#969696',
       marginTop: 20,
       fontSize: 12,
    },
    text: {
        color: '#100101',
        marginTop: 20,
        fontSize: 16,
    },
    container: {
        position: 'absolute',
        bottom: -10,
        backgroundColor: '#FFFFFF',
        borderColor: '#969696',
        paddingVertical: 7,
        paddingHorizontal: 12,
        width: '113%',
        height: 69,
        marginVertical: 10,
        borderStyle: 'solid',
        borderWidth: .25,
        shadowColor: 'black',
        flexDirection: 'row',
    }
});

export default UserDashboard;