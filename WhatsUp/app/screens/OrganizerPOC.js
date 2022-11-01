import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

function OrganizerPOC() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Screen>
          <View style={styles.newEventHeader}>
            <View style={styles.headerContent}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Point of Contact Information
              </Text>
              <Text style={{ color: colors.darkGrey }}>
                <Text style={styles.paragraph}>
                  Please fill the following information
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={
              (styles.shadow,
              {
                position: 'absolute',
                alignSelf: 'flex-start',
                marginLeft: 12,
                marginTop: 36,
                backgroundColor: 'white',
                borderRadius: 32,
                width: 32,
                height: 32,
                justifyContent: 'center',
              })
            }
          >
            <Ionicons
              name='chevron-back-outline'
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View>
            <View>
              <AppTextInput>Event Title</AppTextInput>
              <AppTextInput>Organization Name</AppTextInput>
              <AppTextInput>Location</AppTextInput>
            </View>
            <View style={{ height: 350 }}>
              <Text></Text>
            </View>
            <View style={styles.bottom}>
              <AppButton style={styles.bottom} title='Next'></AppButton>
            </View>
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newEventHeader: {
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  headerContent: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  icon: {
    marginLeft: 'auto',
  },
  coverPage: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  paragraph: { textAlign: 'center' },
  shadow: {
    justifyContent: 'center',
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 2, // Android
  },
  bottom: { flex: 1, justifyContent: 'flex-end', marginBottom: 36 },
});

export default OrganizerPOC;
