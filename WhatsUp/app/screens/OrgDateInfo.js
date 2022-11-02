import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import BottomImg from '../components/ImgOrgBottom';
import ScreenTitle from '../components/ScreenTitle';
import ScreenSubtitle from '../components/ScreenSubtitle';
import BackBtn from '../components/BackBtn';
import IOSDateTimePicker from '../components/IOSDateTimePicker';
import AndroidDateTimePicker from '../components/AndroidDateTimePicker';

function OrganizerDateInfo() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Screen>
          <View style={{ width: '100%', display: 'flex' }}>
            <ScreenTitle
              style={{ alignSelf: 'center' }}
              title='Set Date Information'
            />
            <ScreenSubtitle
              style={{ alignSelf: 'center' }}
              subtitle='Please fill the following information'
            />
          </View>
          <BackBtn />
          <View>
            {Platform.OS === 'ios' ? (
              <IOSDateTimePicker />
            ) : (
              <AndroidDateTimePicker />
            )}
          </View>
          <View>
            <AppButton title={'Next'}></AppButton>
          </View>
          {/* <BottomImg /> */}
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
});

export default OrganizerDateInfo;
