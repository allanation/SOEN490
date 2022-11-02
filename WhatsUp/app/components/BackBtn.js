import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function BackBtn({
  title,
  onPress,
  color = 'primary',
  disabled = false,
  style,
}) {
  return (

<TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-start',
              marginLeft: 22,
              marginTop: 28,
              backgroundColor: 'white',
              borderRadius: 20,
              width: 32,
              height: 32,
              justifyContent: 'center',
              shadowColor: 'black', // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 0.2, // IOS
              shadowRadius: 3, //IOS
              elevation: 2, // Android
            }}
          >
            <Ionicons
              name='chevron-back-outline'
              size={32}
              color={colors.primary}
            />
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

export default BackBtn;
