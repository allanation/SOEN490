import React from 'react';
import { TextInput, View, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function Search({ ...stuff }) {
  return (
    <View style={styles.container}>
      <Ionicons name='ios-search' size={20} color={colors.lightgrey} />
      <TextInput style={styles.text} {...stuff} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: '85%',
    height: 36,
    marginVertical: 12,
    shadowColor: 'black',
    flexDirection: 'row',
  },
  text: {
    color: colors.lightGrey,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginLeft: 5,
  },
});

export default Search;
