import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import AppButton from "./AppButton";
import TitleHeaders from "../components/TitleHeaders";
import { Storage } from "expo-storage";

function AndroidDateTimePicker() {
  const [date, setDate] = useState(new Date());
  const [sdate, setSDate] = useState(new Date());
  const [edate, setEDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState("");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    if (clicked == "startDate") {
      setSDate(currentDate);
      setClicked("");
    }
    if (clicked == "startTime") {
      setSDate(currentDate);
      setClicked("");
    }
    if (clicked == "endDate") {
      setEDate(currentDate);
      setClicked("");
    }
    if (clicked == "endTime") {
      setEDate(currentDate);
      setClicked("");
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const checkID = (status) => () => {
    if (status == "startDate") {
      console.log("hahahhahah");
      setClicked("startDate");
      showDatepicker();
    }
    if (status == "startTime") {
      console.log("hohohoh");
      setClicked("startTime");
      showTimepicker();
    }
    if (status == "endDate") {
      console.log("hihihihih");
      setClicked("endDate");
      showDatepicker();
    }
    if (status == "endTime") {
      console.log("huhuhuhu");
      setClicked("endTime");
      showTimepicker();
    }
  };
  const handleAddingEvent = async (sdate, edate) => {
    // !!! ADD ANDROID VALIDATION !!!
    // if (endTime.timestamp == '') {
    //   Alert.alert('Error', 'Please select a later timestamp');
    //   return;
    // }
    // if (
    //   startDate.timestamp == endDate.timestamp &&
    //   endTime.timestamp < startTime.timestamp
    // ) {
    //   Alert.alert('Error', 'Cannot end before the event starts');
    //   return;
    // }

    const eventDates = {
      startDate: sdate.toLocaleDateString(),
      startTime: sdate.toLocaleTimeString(),
      endDate: edate.toLocaleDateString(),
      endTime: edate.toLocaleTimeString(),
    };
    console.log(eventDates);
    //If every mandatory fields is filled out, store the information and go to next page
    storeDates(eventDates);
  };
  const storeDates = async (eventDates) => {
    try {
      const jsonValue = JSON.stringify(eventDates);
      await Storage.setItem({
        key: "eventDates",
        value: jsonValue,
      });
      console.log(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <View style={styles.picker}>
        <AppButton
          style={styles.btn}
          onPress={checkID("startDate")}
          title="Start Date"
          id="111"
          textStyle={{ color: colors.primary }}
        />
        <AppButton
          style={styles.btn}
          onPress={checkID("startTime")}
          title="Start Time"
          textStyle={{ color: colors.primary }}
        />
        <Text style={styles.text}>Event Starts: {sdate.toLocaleString()}</Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          width: "100%",
          backgroundColor: "lightgrey",
        }}
      />
      <View style={styles.picker}>
        <AppButton
          style={styles.btn}
          onPress={checkID("endDate")}
          title="End Date"
          textStyle={{ color: colors.primary }}
        />
        <AppButton
          style={styles.btn}
          onPress={checkID("endTime")}
          title="End Time"
          textStyle={{ color: colors.primary }}
        />
        <Text style={styles.text}>Event Ends: {edate.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      <AppButton
        title={"Confirm"}
        onPress={() => handleAddingEvent(sdate, edate)}
        style={{ backgroundColor: "white" }}
        textStyle={{ color: colors.primary }}
      ></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    // justifyContent: "center",
    alignSelf: "center",
    width: "60%",
    paddingVertical: "10%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: colors.offWhite,
    borderRadius: 11,
    marginVertical: 10,
    outline: 12,
    // borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.darkerGrey,
    fontSize: 16,
    alignContent: "center",
    alignSelf: "center",
  },
});

export default AndroidDateTimePicker;
