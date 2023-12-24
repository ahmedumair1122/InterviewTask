import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

const ResetPassword = () => {
  const token = useSelector(state => state.verificationData.data);
  console.log(token);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prev => !prev);
  };

  const resetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please enter both password and confirm password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please re-enter.');
      return;
    }

    let data = JSON.stringify({
      "password": password,
      "confirmPassword": confirmPassword,
    });
    
    let config = {
      method: 'Patch',
      maxBodyLength: Infinity,
      url: 'http://182.176.169.225:19008/api/v1/users/resetPassword',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  };
  return (
    <View style={styles.container1}>
      <Text style={styles.H1}>Password</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.TextInput}
          keyboardType="default"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}>
          <Image
            style={styles.image}
            source={require('../../Assets/Icons/Hide.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.H1}>Confirm Password</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.TextInput}
          keyboardType="default"
          secureTextEntry={!isConfirmPasswordVisible}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Re-Enter your Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={toggleConfirmPasswordVisibility}>
          <Image
            style={styles.image}
            source={require('../../Assets/Icons/Hide.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.Button} onPress={resetPassword}>
          <Text style={{color: '#FFFF', fontSize: 14}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  H1: {
    fontWeight: '700',
    color: '#090D20',
    fontSize: 16,
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
});
