import React, {useState} from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import { Ionicons } from "@expo/vector-icons";
import logo from "../Images/w3.png";
import ImgOrgBottom from "../components/ImgOrgBottom";
import ScreenSubtitle from "../components/ScreenSubtitle";
import Links from "../components/Links";
import colors from "../config/colors";
import AppModal from "../components/AppModal";
import BackBtn from "../components/BackBtn";
import AppTextInput from "../components/AppTextInput";

function UserProfile() {
  const [modalVisibleName, setModalVisibleName] = useState(false);
  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");


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
          onPress={() => setModalVisibleName(true)}
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
          onPress={() => setModalVisibleEmail(true)}
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
      <AppModal
        animationType="slide"
        transparent={true}
        visible={modalVisibleName}
        onRequestClose={() => {
          setModalVisibleName(!modalVisible);
        }}
      >
        <View  style={styles.modalView}>
            <BackBtn style={styles.backModal} onPress={() => setModalVisibleName(!modalVisibleName)}/>
            <View style={styles.inputView}>
          <ScrollView keyboardDismissMode="interactive" style= {{width: "100%", }}>
              <ScreenTitle style={{ alignSelf: "center" }} title={"Name"} />
              <AppTextInput
                placeholder="Name"
                onChangeText={(currentName) => setNewName(currentName)}
              />
          </ScrollView>
            </View>
        </View>
      </AppModal>
      <AppModal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEmail}
        onRequestClose={() => {
          setModalVisibleName(!modalVisible);
        }}
      >
        <View  style={styles.modalView}>
            <BackBtn style={styles.backModal} onPress={() => setModalVisibleEmail(!modalVisibleEmail)}/>
            <View style={styles.inputView}>
          <ScrollView keyboardDismissMode="interactive" style= {{width: "100%", }}>
              <ScreenTitle style={{ alignSelf: "center" }} title={"Email"} />
              <AppTextInput
                placeholder="Email"
                onChangeText={(currentEmail) => setNewEmail(currentEmail)}
              />
          </ScrollView>
            </View>
        </View>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 270,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    // height: "62%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
  },
  backModal: {
    backgroundColor: 'black',
  },
});

export default UserProfile;
