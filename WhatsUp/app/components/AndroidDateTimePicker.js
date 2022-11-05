import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import AppButton from "./AppButton";

function AndroidDateTimePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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
  return (
    <View>
      <View style={styles.picker}>
        <AppButton
          style={styles.btn}
          onPress={showDatepicker}
          title="Pick a Start Date"
        />
        <AppButton
          style={styles.btn}
          onPress={showTimepicker}
          title="Pick a Start Time"
        />
      <Text style= {styles.text}>Event Starts: {date.toLocaleString()}</Text>
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
          onPress={showDatepicker}
          title="Pick a End Date"
        />
        <AppButton
          style={styles.btn}
          onPress={showTimepicker}
          title="Pick a End Time"
        />
         <Text style= {styles.text}>Event Ends: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
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
    borderRadius: 11,
    marginVertical: 10,
    backgroundColor: 'gray'
  },
  text: {
    color: colors.darkerGrey,
    fontSize: 16,
    alignContent: "center",
    alignSelf: 'center',
  },
});

export default AndroidDateTimePicker;
