import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";


function IOSDateTimePicker() {
  return (
    <View>
      <Text style={styles.text}> Start Date & Time </Text>
      <View style={styles.picker}>
        <DateTimePicker style={styles.btn} mode="date" value={new Date()} />
        <DateTimePicker
          display="inline"
          style={styles.btn}
          mode="time"
          value={new Date()}
          minuteInterval="5"
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          width: "100%",
          backgroundColor: "lightgrey",
        }}
      />
      <Text style={styles.text}> End Date & Time </Text>
      <View style={styles.picker}>
        <DateTimePicker style={styles.btn} mode="date" value={new Date()} />
        <DateTimePicker
          display="inline"
          style={styles.btn}
          mode="time"
          value={new Date()}
          minuteInterval="5"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirectionL: 'row',
  },
  btn: {
    accentColor: 'red',
    width: "40%",
    marginBottom: 10,
  },
  text: {
    paddingTop: 50,
    color: colors.darkerGrey,
    marginTop: 10,
    fontSize: 24,
    alignContent: "center",
    alignSelf: "center",
    flex: 1,
    flexDirection: 'row',
  },
});

export default IOSDateTimePicker;
