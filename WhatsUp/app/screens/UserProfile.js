import React from "react";
import { View, Image } from "react-native";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import { Ionicons } from "@expo/vector-icons";
import logo from "../Images/w3.png";
import ImgOrgBottom from "../components/ImgOrgBottom";
import ScreenSubtitle from "../components/ScreenSubtitle";
import Links from "../components/Links";
import colors from "../config/colors";

function UserProfile() {
  return (
    <Screen style={{ padding: 20, backgroundColor: "#F5F5F5" }}>
      <View style={{ left: "1.5%", marginTop: "5%" }}>
        <ScreenTitle title="Profile" style={{ marginBottom: "2%" }} />

        <Image
          source={logo}
          style={{
            width: 166,
            height: 212,
            alignSelf: "center",
            marginTop: "5%",
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <ScreenTitle
          title="Name"
          style={{ marginBottom: "2%", fontSize: "20px", marginTop: "10%" }}
        />
        <Ionicons
          name="pencil"
          size={20}
          color={colors.primary}
          style={{ marginBottom: "2%", marginTop: "10%", alignSelf: "flex-end", marginLeft: 'auto' }}
          //onPress={() => navigation.navigate("NewEvent")}
        />
      </View>
      <View>
        <ScreenSubtitle
          subtitle="Georges El-Hage"
          style={{ marginBottom: "2%", marginTop: "0.5%", marginLeft: "1%", fontSize: '16px' }}
        />
        </View>
        <View style={{flexDirection: 'row'}}>
        <ScreenTitle
          title="Email"
          style={{ marginBottom: "2%", fontSize: "20px", marginTop: "5%" }}
        />
        <Ionicons
          name="pencil"
          size={20}
          color={colors.primary}
          style={{ marginBottom: "2%", marginTop: "5%", alignSelf: "flex-end", marginLeft: 'auto' }}
          //onPress={() => navigation.navigate("NewEvent")}
        />
        </View>
        <View>
        <ScreenSubtitle
          subtitle="georgeselhage98@gmail.com"
          style={{ marginBottom: "2%", marginTop: "0.5%", marginLeft: "1%", fontSize: '16px' }}
        />
        <ScreenTitle
          title="Password"
          style={{ marginBottom: "2%", fontSize: "20px", marginTop: "5%" }}
        />
        <Links
          style={{ marginLeft: "1%", marginTop: '0.5%', fontSize: '16px' }}
          link="Change Password"
          //onPress={ResetPassword}
        />
      </View>
      <ImgOrgBottom resizeMode="contain" />
    </Screen>
  );
}

export default UserProfile;
