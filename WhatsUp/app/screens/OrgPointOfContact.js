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
import BottomImg from '../components/ImgOrgBottom';
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import BackBtn from '../components/BackBtn';
import { useNavigation } from "@react-navigation/native";

function OrganizerPOC() {
  const navigation = useNavigation();
  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Point of Contact Information'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please fill the following information'
        />
      </View>
      <BackBtn onPress={() => navigation.navigate('NewEvent')}/>
      <ScrollView>
            <View>
              <AppTextInput>Event Title</AppTextInput>
              <AppTextInput>Organization Name</AppTextInput>
              <AppTextInput>Location</AppTextInput>
            </View>
            <View style={{ height: 350 }}>
              <Text></Text>
            </View>
          </ScrollView>
            <AppButton title={'Next'} onPress={() => navigation.navigate('DateInfo')}></AppButton>
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
