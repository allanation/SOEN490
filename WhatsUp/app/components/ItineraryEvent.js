import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import colors from '../config/colors';

function ItineraryEvent({ title, startTime, endTime, location, id, onRemove }) {
  return (
    <TouchableOpacity style={styles.itineraryButton} onPress={onRemove(id)}>
      <View>
        <Text style={styles.itineraryTitle} numberOfLines={1}>
          {title.length < 30 ? `${title}` : `${title.substring(0, 28)}...`}
        </Text>
      </View>
      <View style={styles.itineraryDetails}>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {startTime}-{endTime}
        </Text>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {location.length < 16
            ? `${location}`
            : `${location.substring(0, 14)}...`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ItineraryEvent;

const styles = StyleSheet.create({
  itineraryButton: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 22,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  itineraryTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itineraryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.lightGrey,
  },
});
