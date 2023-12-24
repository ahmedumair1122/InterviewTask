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
import {useSelector, useDispatch} from 'react-redux';
import {saveVerificationData} from '../../Redux/Actions/UserAction';

const VerifyOtp = ({changeScreen}) => {
  const userEmail = useSelector(state => state.resetEmail);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleVerify = async () => {
    let data = JSON.stringify({
      email: userEmail,
      code: otp,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://182.176.169.225:19008/api/v1/users/verifyCode',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        const responseData = response.data;

        dispatch(saveVerificationData(responseData));
        changeScreen('resetPassword');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOtpChange = text => {
    setOtp(text);
    setOtpError('');
    setVerificationError('');
  };

  return (
    <View style={styles.verifyscreenContainer}>
      <View style={styles.verifyscreencontainer1}>
        <Image
          style={{margin: 20}}
          source={require('../../Assets/Icons/Info.png')}
        />
        <Text
          numberOfLines={2}
          style={{color: '#F0B212', fontSize: 12, width: '75%'}}>
          We have sent you a 6-digit verification code to your email. Please
          kindly check
        </Text>
      </View>
      <View style={{width: '80%'}}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChangeText={handleOtpChange}
        />
        {otpError ? <Text style={styles.errorMessage}>{otpError}</Text> : null}
        {verificationError ? (
          <Text style={styles.errorMessage}>{verificationError}</Text>
        ) : null}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleVerify}>
        <Text style={{color: '#FFFF', fontSize: 14}}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  loginButton: {
    backgroundColor: '#384DAA',
    height: 59,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    padding: 10,
    borderRadius: 30,
    width: '100%',
    color: '#090D20',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});

export default VerifyOtp;
