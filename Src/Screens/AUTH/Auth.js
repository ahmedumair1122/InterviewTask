import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Login from '../Login/Login';
import Regrister from '../Regrister/Regrister';
import Forgetpassword from '../ForgetPassword/Forgetpassword';
import COLORS from '../../Assets/consts/colors';

const Auth = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [loginButtonActive, setLoginButtonActive] = useState(true);
  const [registerButtonActive, setRegisterButtonActive] = useState(false);

  const loginButtonPress = () => {
    setCurrentScreen('Login');
    setLoginButtonActive(true);
    setRegisterButtonActive(false);
  };

  const registerButtonPress = () => {
    setCurrentScreen('register');
    setLoginButtonActive(false);
    setRegisterButtonActive(true);
  };

  const forgetPasswordButtonPress = () => {
    setCurrentScreen('forgetPassword');
    setLoginButtonActive(true);
    setRegisterButtonActive(false);
  };

  const handleForgetPasswordPress = () => {
    forgetPasswordButtonPress();
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.TextView}>
          <Text style={styles.h1}> Hello, There</Text>
          <Text style={styles.h2}>Welcome Back</Text>
        </View>
        <View style={styles.toggleButtonView}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              loginButtonActive && styles.activeButton,
            ]}
            onPress={loginButtonPress}
          >
            <Text style={styles.toggleButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.registerButton,
              registerButtonActive && styles.activeButton,
            ]}
            onPress={registerButtonPress}
          >
            <Text style={styles.toggleButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        {currentScreen === 'Login' ? (
          <Login onForgetPasswordPress={handleForgetPasswordPress} />
        ) : currentScreen === 'register' ? (
          <Regrister></Regrister>
        ) : (
          <Forgetpassword back={loginButtonPress}></Forgetpassword>
        )}
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundcolour,
    justifyContent: 'space-between',
  },
  header: {
    height: '20%',
    backgroundColor:COLORS.cardBackgroundcolour,
    borderRadius: 30,
    flex: 0.25,
    width: '80%',
    justifyContent: 'space-evenly',
    marginHorizontal: '10%',
    top: '5%',
  },
  TextView: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 0.25,
  },
  h1: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  h2: {
    fontSize: 20,
    color: '#FFFF',
  },
  
  toggleButtonView: {
    backgroundColor: '#384DAA',
    marginHorizontal: '5%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    borderRadius: 30,
    flexDirection: 'row',
    flex: 0.25,
    padding:2,  },
  loginButton: {
    paddingVertical:12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 5,
  },
  registerButton: {
    paddingVertical:12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 5,
  },
  toggleButtonText: {
    color: '#090D20',
  },
  activeButton: {
    backgroundColor: '#FFFF', 
  },
  footer: {
    flex: 0.65,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
