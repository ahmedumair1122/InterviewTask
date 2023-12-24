import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import COLORS from '../../Assets/consts/colors';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../../Redux/Actions/UserAction';
const Login = ({onForgetPasswordPress}) => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };
   const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password,
      };

     // console.log('Request data:', loginData);

      const response = await axios.post(
        'http://182.176.169.225:19008/api/v1/users/login',
        loginData,
      );

      //console.log('API Response:', response.data);

      if (response.data.message === 'Success') {
        //Alert.alert('Login Successful');

        const token = response.data.data;
        dispatch(setLoginData({ loginData: loginData, token: token }));
        console.log('Login Data for Redux:', { loginData, token }); // Log the data after dispatching
        navigation.navigate('BottomTab');
        // Handle navigation or other actions after successful login
      } else {
        Alert.alert(
          'Login Failed',
          response.data.message || 'Invalid email or password',
        );
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
        Alert.alert('Login Failed', 'Server error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        Alert.alert('Login Failed', 'No response from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        Alert.alert('Login Failed', 'An error occurred during login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', flex: 0.12}}>
        <Text style={styles.H1}>Login to Your Account</Text>
        <Text style={styles.H2}>
          Make sure that you already have an account.
        </Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.H1}>Email Adress</Text>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={'#9EA1AE'}
          placeholder="Enter your email"
          value={email} // Bind the value to the email state
          onChangeText={text => setEmail(text)} // Update the email state on text change
        />
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
      </View>
      <View style={styles.container2}>
        <View></View>
        <TouchableOpacity onPress={onForgetPasswordPress}>
          <Text style={styles.ForgetpasswordButton}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
          <Text style={{color: '#FFFF', fontSize: 14}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
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
    flex: 0.7,
    justifyContent: 'space-evenly',
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
  container2: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  ForgetpasswordButton: {
    color: '#25388D',
  },
  container3: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginButton: {
    backgroundColor: COLORS.buttonColour,
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
