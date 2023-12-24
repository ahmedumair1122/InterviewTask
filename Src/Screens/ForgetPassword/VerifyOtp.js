import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

const VerifyOtp = ({changeScreen}) => {
  const [otp, setOtp] = useState(''); // State to store OTP
  const [otpError, setOtpError] = useState('');

  const handleVerify = async () => {
    // Validate OTP
    if (!otp.trim()) {
      setOtpError('Enter the 6-digit OTP');
      return;
    }

    try {
      const apiUrl = 'http://182.176.169.225:19008/api/v1/users/verifyCode';

      const response = await axios.post(apiUrl, { otp }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        },
      });

      console.log('API Response:', response);

      if (response.status === 200) {
        console.log('OTP verified successfully');
        // Handle success, maybe navigate to another screen
        // navigation.navigate('PasswordResetScreen');
      } else {
        console.error('Failed to verify OTP');
        Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      changeScreen('resetPassword')
      console.error('Error occurred while verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying OTP. Please try again.');
    }
  };

  const handleOtpChange = text => {
    setOtp(text);
    setOtpError('');
  };

  return (
    <View style={styles.verifyscreenContainer}>
      <View style={styles.verifyscreencontainer1}>
        <Image
          style={{ margin: 20 }}
          source={require('../../Assets/Icons/Info.png')}
        ></Image>
        <Text
          numberOfLines={2}
          style={{ color: '#F0B212', fontSize: 12, width: '75%' }}>
          We have sent you a 6-digit verification code to your email. Please
          kindly check
        </Text>
      </View>
      <View style={{ width: '80%' }}>
        <TextInput
          style={styles.TextInput}
          keyboardType="numeric"
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChangeText={handleOtpChange}
        />
        {otpError ? <Text style={styles.errorMessage}>{otpError}</Text> : null}
      </View>
      <TouchableOpacity style={styles.LoginButton} onPress={handleVerify}>
        <Text style={{ color: '#FFFF', fontSize: 14 }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtp;


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
  LoginButton: {
    backgroundColor: '#384DAA',
    height: 59,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    padding: 10,
    borderRadius: 30,
    width: '100%', // Modified to take up the full width
    color: '#090D20',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});
