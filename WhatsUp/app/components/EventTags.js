import React from 'react';
import colors from '../config/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function EventTags({ tagname, id, onRemove }) {
  return (
    <View>
      <TouchableOpacity style={styles.tag} onPress={onRemove(id)}>
        <Text style={styles.tagName}>{tagname}</Text>
      </TouchableOpacity>
    </View>
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
