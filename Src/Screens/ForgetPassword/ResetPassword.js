import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isconPasswordVisible, setIsconPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleconPasswordVisibility = () => {
    setIsconPasswordVisible((prev) => !prev);
  };

  const resetPassword = async () => {
    // Validate passwords
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please enter both password and confirm password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please re-enter.');
      return;
    }

    try {
      // Replace with the actual API endpoint for resetting the password
      const apiUrl = 'http://182.176.169.225:19008/api/v1/users/resetPassword';

      // Make the API call to reset the password
      const response = await axios.post(apiUrl, { newPassword: password }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password reset successfully.');
        // Handle success, you might want to navigate to a login screen or another screen
      } else {
        // Handle errors, show an error message
        Alert.alert('Error', 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while resetting password:', error);
      Alert.alert('Error', 'An error occurred while resetting password. Please try again.');
    }
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.H1}>Password</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.TextInput}
          keyboardType="default"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <Image style={styles.image} source={require('../../Assets/Icons/Hide.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.H1}>Confirm Password</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.TextInput}
          keyboardType="default"
          secureTextEntry={!isconPasswordVisible}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Re-Enter your Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={toggleconPasswordVisibility}>
          <Image style={styles.image} source={require('../../Assets/Icons/Hide.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.Button} onPress={resetPassword}>
          <Text style={{ color: '#FFFF', fontSize: 14 }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;

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
    flex: 1,
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
  Button: {
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
