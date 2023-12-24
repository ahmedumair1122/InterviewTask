import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SendEmail from './SendEmail';
import VerifyOtp from './VerifyOtp';
import ResetPassword from './ResetPassword';
const Forgetpassword = ({back}) => {
  const [currentScreen, setCurrentScreen] = useState('SendEmailScreen');
  const [verifyscreen, setverifyscreen] = useState(false);
  const [resetpasswordscreen, setresetpasswordscreen] = useState(false);
  const [sendemail, setsendemail] = useState(true);


  const changeScreen = (newScreen) => {
    setCurrentScreen(newScreen);
  };


  const SendButton = () => {
    setCurrentScreen('verifycode');
    setverifyscreen(true);
    setRegisterButtonActive(false);
    setsendemail(false);
  };

  const verifybutton = () => {
    setCurrentScreen('resetpassword');
    setverifyscreen(false);
    setresetpasswordscreen(true);
    setsendemail(false);
  };

  const Resetpasswordbutton = () => {
    setCurrentScreen('SendEmailScreen');
    setverifyscreen(false);
    setRegisterButtonActive(false);
    setsendemail(true);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={back}
        style={{
          alignContent: 'flex-start',
          alignItems: 'center',
          flex: 0.12,
          flexDirection: 'row',
        }}>
        <Image
          style={{height: 20, width: 25}}
          source={require('../../Assets/Icons/arrow.png')}
        />
        <Text style={styles.H1}> Forgot Password</Text>
      </TouchableOpacity>
      
      {/* send email screen  */}
      {/* <SendEmail changeScreen={changeScreen}></SendEmail> */}
      {currentScreen === 'SendEmailScreen' && <SendEmail changeScreen={changeScreen} />}
      
      {currentScreen === 'VerifyOTP' && <VerifyOtp changeScreen={changeScreen} />}
      
      {currentScreen === 'resetPassword' && <ResetPassword changeScreen={changeScreen} />}
      {/* verify screen */}
      {/* <VerifyOtp></VerifyOtp> */}

      {/* reset password sceen */}
      {/* <ResetPassword></ResetPassword> */}
      
    </View>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginVertical: '5%',
    width: '90%',
  },
  H1: {
    fontWeight: '700',
    color: '#090D20',
    fontSize: 16,
  },
  H2: {
    fontWeight: '400',
    color: '#9EA1AE',
    fontSize: 12,
  },
  container1: {
    flex: 0.3,
    justifyContent: 'space-evenly',

    alignContent: 'center',
  },
  ScrollView: {
    flex: 1,
    marginTop: 10,
    alignContent: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    padding: 10,
    borderRadius: 30,
    width: '95%',
    marginHorizontal: '5%',
    color: '#090D20',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  container3: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginButton: {
    backgroundColor: '#384DAA',

    height: 59,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 20,
    width: 25,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },

  verifyscreenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
  verifyscreencontainer1: {
    flex: 0.28,
    backgroundColor: '#FFF5DD',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
