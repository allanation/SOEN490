/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import UtilBtn from "../components/UtilBtn";
import Event from "../components/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import { getTodayDate } from "./AttendeeDashboard";

import { format } from "date-fns";

export const convertStartDate = (number) => {
  return number ? format(new Date(number), "LLL dd, yyyy") : "";
};

function AttendeeTickets() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user] = useAuthState(auth);

  const getName = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().firstName);
      });
    }
  };

  const getTickets = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        const ticketsField = doc.data().tickets;
        setTickets(ticketsField);
      });
    }
  };

  const getEvents = async () => {
    const q = query(
      collection(db, "events"),
      where("eventStatus", "==", "Approved")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        {
          for (const item of tickets) {
            if (item == doc.id) {
              if (allEvents.length > 0)
                for (const item of allEvents) {
                  if (item.id == doc.id) {
                    break;
                  } else if (item.id == allEvents[allEvents.length - 1].id) {
                    console.log("got ya");
                    setAllEvents((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                    setMasterData((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                    setPreviousData((allEvents) =>
                      allEvents.concat({ id: doc.id, ...doc.data() })
                    );
                  } else {
                    continue;
                  }
                }
              else {
                console.log("hey there");
                setAllEvents((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
                setMasterData((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
                setPreviousData((allEvents) =>
                  allEvents.concat({ id: doc.id, ...doc.data() })
                );
              }
            }
          }
        }
      });
    }
  };

  const removeEventsNotTicketed = () => {
    console.log(tickets);
    for (const event of allEvents) {
      var count = 0;
      if (tickets.length != 0) {
        for (const ticket of tickets) {
          if (event.id != ticket && count != tickets.length - 1) {
            count++;
            continue;
          } else if (event.id != ticket && count == tickets.length - 1) {
            setAllEvents((current) =>
              current.filter((item) => item.id !== event.id)
            );
          } else {
            break;
          }
        }
      } else {
        console.log("here?");
        setAllEvents([]);
      }
    }
  };

  var welcome = "Welcome, " + userName + "!";

  async function retrieveTicketsAndgetEvents() {
    await getTickets();
    removeEventsNotTicketed();
    await getEvents();
  }

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    getName();
    retrieveTicketsAndgetEvents();
  }, []);

  const [displayedEvent, setDisplayedEvents] = useState(true);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [filteredUserData, setFilteredUserData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <Event
        image={item.coverImage}
        title={item.eventName}
        organizer={item.orgName}
        date={convertStartDate(item.startDate)}
        coverImageName={item.coverImage}
        id={item.id}
        isTicketsPage={true}
        onPress={() =>
          navigation.navigate("AttendeeView", {
            prop: item,
            fromScreen: "AttendeeTickets",
          })
        }
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = masterData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = previousData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
      displayedEvent
        ? setFilteredData(masterData)
        : setFilteredData(previousData);
      setSearch(text);
    }
  };

  const pullMe = () => {
    setRefresh(true);
    retrieveTicketsAndgetEvents();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  var tabs;
  var showEvents;

  showEvents = (
    <>
      <FlatList
        data={filteredData ? filteredData : allEvents}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      />
      <FlatList
        data={filteredUserData ? filteredUserData : []}
        renderItem={ItemView}
      />
    </>
  );

  return (
    <Screen style={{ padding: 10, backgroundColor: "#F5F5F5" }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <UtilBtn
            icon="pin"
            iconSize={18}
            title="Montreal, QC"
            onPress={() => console.log("Location")}
            testID="location"
          />
          <UtilBtn
            style={{ position: "absolute", right: 16 }}
            icon="notifications"
            iconSize={24}
            title=""
            onPress={() => navigation.navigate("AttendeeNotifications")}
            testID="notification"
          />
        </View>

        <Text style={styles.date}>{getTodayDate()}</Text>

        <Text style={styles.title}>{welcome}</Text>

        <View style={{ flexDirection: "row" }}>
          <SearchBar
            style={{ width: "85%" }}
            placeholder="Search for..."
            handleChange={(text) => {
              searchFilter(text);
            }}
          />
          <UtilBtn
            iconSize={32}
            style={[
              styles.button,
              { flexDirection: "row", marginLeft: "1%", marginTop: "0.5%" },
            ]}
            icon="ios-options"
            testID="filters"
            onPress={() => console.log("Filters")}
          />
        </View>

        <Text style={styles.text}>Tickets</Text>
        <View>{showEvents}</View>
        <Text style={styles.textCentered}>Pull Twice To Refresh...</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: "flex-start",
    width: "50%",
  },
  organizertwo: {
    alignItems: "flex-start",
    width: "30%",
  },
  title: {
    color: "#100101",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#969696",
    marginTop: "5%",
    fontSize: 12,
  },
  text: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 16,
    fontWeight: "bold",
  },
  textCentered: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    left: "2.5%",
    marginTop: "5%",
    flex: 1,
    marginBottom: "45%",
  },
});

export default AttendeeTickets;
