import React from 'react';
import colors from '../config/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function EventTags({ name }) {
  return (
    <TouchableOpacity style={styles.tag}>
      <Text style={styles.tagName}>{name}</Text>
    </TouchableOpacity>
  );
}

export default EventTags;

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#CFF3ED',
    alignSelf: 'center',
    borderRadius: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  tagName: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
