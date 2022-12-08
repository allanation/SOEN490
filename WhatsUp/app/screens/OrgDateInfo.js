import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import BottomImg from '../components/ImgOrgBottom';
import ScreenTitle from '../components/ScreenTitle';
import ScreenSubtitle from '../components/ScreenSubtitle';
import BackBtn from '../components/BackBtn';
import IOSDateTimePicker from '../components/IOSDateTimePicker';
import AndroidDateTimePicker from '../components/AndroidDateTimePicker';
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'expo-storage';

function OrganizerDateInfo() {
  const navigation = useNavigation();
  const validateEventDate = async (tags) => {
    try {
      //Get NewEvent object
      const newDateInformation = await Storage.getItem({
        key: 'eventDates',
      });
      const newEventDates = JSON.parse(newDateInformation);
      if (!newEventDates) {
        Alert.alert('Error', "Please confirm your event's date information.");
        return;
      } else {
        navigation.navigate('OrgDay');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Set Date Information'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please pick the dates for your event'
        />
      </View>
      <BackBtn onPress={() => navigation.navigate('POC')} />
      <ScrollView style={{ paddingTop: 20 }}>
        <View>
          {Platform.OS === 'ios' ? (
            <IOSDateTimePicker />
          ) : (
            <AndroidDateTimePicker />
          )}
        </View>
      </ScrollView>
      <View>
        <AppButton title={'Next'} onPress={validateEventDate}></AppButton>
      </View>
    </Screen>
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
});

export default OrganizerDateInfo;
