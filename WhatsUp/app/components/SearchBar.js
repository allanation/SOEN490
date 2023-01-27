import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

  function SearchBar({ handleChange, placeholder }) {
    return (
      <View style={styles.container}>
                <View style={styles.iconContainer}>
            <Icon name="ios-search" style={styles.icon}/>
        </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={handleChange}
      />
    </View>
  );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: 40,
      width: "90%",
      borderRadius: 12,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fdfdfd",
      shadowColor:"#757575",
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    input: {
      width: "80%",
      marginLeft: 12,
      color:"#19191a",
    },
    icon:{
      fontSize:24,
      color:"gray",
      marginLeft: 10
    }
  });
  
  export default SearchBar;

