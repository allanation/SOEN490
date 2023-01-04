/* eslint-disable react/prop-types */
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';

function AppButton({
  title,
  onPress,
  color = 'primary',
  disabled = false,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: !disabled ? colors[color] : colors.lightGrey },
        styles.shadow,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    width: '90%',
    marginVertical: 40,
    marginLeft: "1%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  shadow: {
    shadowColor: "black", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 4, // Android
  },
});

export default AppButton;
