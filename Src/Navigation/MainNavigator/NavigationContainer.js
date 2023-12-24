import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Auth from '../../Screens/AUTH/Auth';
import Dashboard from '../BottomTabs/Dashbord/Dashbord';
import AddBlog from '../BottomTabs/AddBlog/AddBlog';
import ProfileScreen from '../BottomTabs/Profile/profile';
import {hideNavigationBar} from 'react-native-navigation-bar-color';

import {Image, StatusBar, View, Text} from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: 100,
       
      },
    }}>
    <Tab.Screen
      name="Home"
      component={Dashboard}
      options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => (
          <View style={{height:80,justifyContent:"space-evenly",alignItems:'center'}}>
            <Image
              source={require('../../Assets/Icons/home.png')}
              style={{width: size + 10, height: size + 10, tintColor: color}}
            />
            <Text style={{fontWeight:700}}>Home</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="AddBlog"
      component={AddBlog}
      options={{
        headerShown: false,
        tabBarLabel: '', // Set an empty label/text for the AddBlog tab
        tabBarIcon: ({color, size}) => (
          <View
            style={{
              width: size + 50,
              height: size + 50,
              backgroundColor: '#CDD4F1',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../Assets/Icons/icon.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => (
          <View style={{height:80,justifyContent:"space-evenly",alignItems:'center'}}>
            <Image
              source={require('../../Assets/Icons/profile.png')}
              style={{width: size , height: size , tintColor: color}}
            />
            <Text style={{fontWeight:700}}>Profile</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  useEffect(() => {
    StatusBar.setHidden(true);
    // Hide navigation bar color when the component mounts
    hideNavigationBar();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
