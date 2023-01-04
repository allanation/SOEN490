/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function AddBtn({
  title,
  onPress,
  color = 'primary',
  disabled = false,
  style,
  icon
}) {
  return (
    <TouchableOpacity
      style={[
        {
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 0.2, // IOS
          shadowRadius: 3, //IOS
          elevation: 2, // Android
        },
        style,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={40} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});

export default AddBtn;