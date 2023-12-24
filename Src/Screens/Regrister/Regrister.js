import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const Register = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isconPasswordVisible, setIsconPasswordVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const {height: screenHeight} = Dimensions.get('window');

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleconPasswordVisibility = () => {
    setIsconPasswordVisible(prev => !prev);
  };

  const handleCheckBoxChange = newValue => {
    setToggleCheckBox(newValue);
    setIsButtonEnabled(newValue);
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      Alert.alert('Alert', 'Please fill in all fields');
      return;
    }

    const userData = {
      name,
      email,
      password,
      confirmPassword,
      country,
    };

    try {
      const response = await fetch(
        'http://182.176.169.225:19008/api/v1/users/signUp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );

      if (response.ok) {
        console.log('Registration successful!');
        const responseData = await response.json();
        console.log('API Response:', responseData);
        
      } else {
        console.log(
          'Registration failed. Server returned:',
          response.status,
          response.statusText,
        );
        const errorResponse = await response.json();
        console.log('Error Response:', errorResponse);
        setErrorMessage(
          errorResponse.message || 'An unexpected error occurred.',
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const validateFields = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== ''
    );
  };
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', flex: 0.12}}>
        <Text style={styles.H1}>Create Your Account</Text>
        <Text style={styles.H2}>Make sure your account stays secure</Text>
      </View>
      <View style={styles.container1}>
        <ScrollView style={{...styles.ScrollView, height: screenHeight * 0.7}}>
          <View
            style={{
              height: screenHeight * 0.7,
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.H1}>Name</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'#9EA1AE'}
              placeholder="Enter your name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <Text style={styles.H1}>Email Address</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'#9EA1AE'}
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
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
            <Text style={styles.H1}>Confirm Password</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.TextInput}
                keyboardType="default"
                secureTextEntry={!isconPasswordVisible}
                placeholderTextColor={'#9EA1AE'}
                placeholder="Re-Enter your Password"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={toggleconPasswordVisibility}>
                <Image
                  style={styles.image}
                  source={require('../../Assets/Icons/Hide.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.H1}>Country</Text>

            <Picker
              style={styles.TextInput}
              selectedValue={selectedCountry}
              mode="dropdown"
              dropdownIconColor={'#9EA1AE'}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCountry(itemValue)
              }>
              <Picker.Item label="Pakistan" value="Pakistan" />
              <Picker.Item label="United State of America" value="USA" />
              <Picker.Item label="India" value="India" />
              <Picker.Item label="Germanny" value="Germanny" />
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
            }}>
            <CheckBox
              tintColors={'#9EA1AE'}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={handleCheckBoxChange}
            />
            <Text style={{color: '#090D20', fontSize: 14}} numberOfLines={2}>
              I agree with the terms and conditions by creating an account
            </Text>
          </View>
        </ScrollView>
        {/* Display error message if there's an error */}
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.container3}>
        <TouchableOpacity
          style={{
            ...styles.LoginButton,
            backgroundColor: isButtonEnabled ? '#384DAA' : '#9EA1AE', // Change button color based on activation
          }}
          onPress={handleRegister}
          disabled={!isButtonEnabled} // Disable the button if not enabled
        >
          <Text style={{color: '#FFFF', fontSize: 14}}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
  },
});
