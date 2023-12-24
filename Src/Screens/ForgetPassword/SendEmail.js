import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SendEmail = ({ changeScreen }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
    // Clear email error when the user starts typing
    setEmailError('');
  };

  const handleSend = async () => {
    // Validate email
    if (!email.trim()) {
      setEmailError('Enter the email');
      return;
    }

    try {
      // Replace with the actual API endpoint for password reset
      const apiUrl = 'http://182.176.169.225:19008/api/v1/users/forgotPassword';

      const response = await axios.post(apiUrl, { email });

      // Log the API response to the console
      console.log('API Response:', JSON.stringify(response));

      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        // Handle success, maybe show a success message or navigate to another screen
        console.log('Password reset email sent successfully');
        changeScreen('VerifyOTP');
      } else {
        // Handle errors, maybe show an error message
        console.error('Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error occurred while sending password reset request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.H1}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}
      </View>

      <View style={styles.container3}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSend}>
          <Text style={{ color: '#FFFF', fontSize: 14 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  H1: {
    fontWeight: '700',
    color: '#090D20',
    fontSize: 16,
  },
  container1: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    padding: 10,
    borderRadius: 30,
    width: '95%',
    marginHorizontal: '5%',
    color: '#090D20',
  },
  container3: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#384DAA',
    height: 59,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});

export default SendEmail;
