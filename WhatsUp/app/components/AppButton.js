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
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 12,
    width: '90%',
    marginVertical: 40,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});

export default AppButton;
