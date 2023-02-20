/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

function BookmarkButton({ colour = "#32bca5", id }) {
  const [Active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [docId, setDocId] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isStyled, setStyle] = useState(false);
  const [user] = useAuthState(auth);

  const getEmail = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setEmail(doc.data().email);
        setDocId(doc.id);
      });
    }
  };

  const getBookMarks = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        const bookMarksField = doc.data().bookMarks;
        setBookmarks(bookMarksField);
      });
    }
  };

  const settingStyle = () => {
    for (const bookmark of bookmarks) {
      if (bookmark == id) {
        setStyle(true);
        console.log(id);
        break;
      } else setStyle(false);
    }
  };

  useEffect(() => {
    getEmail();
    getBookMarks();
    settingStyle();
  }, []);

  const addBookMarkInUsers = async () => {
    try {
      const BookMarked = doc(db, "users", docId);
      await updateDoc(BookMarked, {
        bookMarks: arrayUnion(id),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeBookMarkInUsers = async () => {
    try {
      const BookMarked = doc(db, "users", docId);
      await updateDoc(BookMarked, {
        bookMarks: arrayRemove(id),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePress = () => {
    setActive((current) => !current);
    Active ? removeBookMarkInUsers() : addBookMarkInUsers();
  };

  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }]}
      onPress={handlePress}
    >
      <Ionicons
        name={Active || isStyled ? "ios-bookmark" : "ios-bookmark-outline"}
        size={30}
        color={"#32bca5"}
        style={{ height: 30, width: 30, top: "1%" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    marginVertical: 5,
    height: 20,
    width: 16,
    marginTop: 13,
    marginLeft: 8,
    position: "absolute",
    right: 20,
    top: 5,
  },
});

export default BookmarkButton;
