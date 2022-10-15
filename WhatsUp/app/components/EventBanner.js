import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  View,
} from 'react-native';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

function EventBanner({ image, title, organizer, date, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: 'row' }, { marginTop: 16 }]}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{ position: 'absolute', left: 0, width: 120, height: 100 }}
      />
      <View style={{ marginLeft: 30 }}>
        <Text style={styles.text}>{title}</Text>
        <Text style={{ fontSize: 16, color: '#969696', marginLeft: 60 }}>
          By {organizer}
        </Text>
        <View style={styles.date}>
          <Ionicons
            name='ios-calendar-outline'
            size={20}
            color={colors.primary}
          />
          <Text style={{ marginLeft: 10 }}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  text: {
    color: '#100101',
    marginLeft: 60,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginTop: '2%',
  },
  date: {
    flexDirection: 'row',
    marginLeft: 60,
    marginTop: 8,
  },
});

export default EventBanner;
