import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import Checkbox from 'expo-checkbox';

function SignUpScreen() {
  return (
    <Screen style={{padding: 20, marginTop: 20}}>
      <ScreenTitle title="Sign Up" />
      <ScreenSubtitle subtitle="Please fill the following information" />
      <AppTextInput placeholder="First Name" />
      <AppTextInput placeholder="Last Name" />
      <AppTextInput placeholder="Email" />
      <AppTextInput placeholder="Password" />
      <AppTextInput placeholder="Confirm Password" />
      <View style={{flexDirection: 'row', paddingTop: 16}}>
        <View style={styles.organizer}>
            <Text>Are you an organizer?</Text>
        </View>
        <View style={styles.organizertwo}>
            <Checkbox />
        </View>
      </View>
      <AppButton style title="Sign Up" onPress={() => console.log("ur gay")}/>  
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.text}>Already have an account? 
            <Links style={styles.link} link="Login" onPress={() => console.log("ur gay")} />
          </Text>
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
        alignItems: 'flex-end',
        width: '50%'
    },
    text: {

    },
    link: {
        
    }
});

export default SignUpScreen;
