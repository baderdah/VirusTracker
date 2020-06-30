import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import * as backgroundGeo from './res/utils/BackgroundGeolocationUtils';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Diagnostic from './res/screens/Diagnostic';
import Map from './res/screens/Map';
import News from './res/screens/News';
import Stack from './res/screens/Stack';

import MapIcon from './res/assets/pin.png';
import DiagnosticIcon from './res/assets/profession.png';
import NewsIcon from './res/assets/virus.png';
export const Tab = createBottomTabNavigator();
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

class App extends React.Component {
  componentDidMount() {
    backgroundGeo.backgroundConfig();
    backgroundGeo.checkStatusAndStart();
    backgroundGeo.logAllLestner();
  }

  componentWillUnmount() {
    backgroundGeo.removeAllListner();
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Map') {
                iconName = MapIcon;
              } else if (route.name === 'Diagnostic') {
                iconName = DiagnosticIcon;
              } else if (route.name === 'Stack') {
                iconName = NewsIcon;
              }

              // You can return any component that you like here!
              return (
                <Image style={{height: size, width: size}} source={iconName} />
              );
            },
          })}>
          <Tab.Screen name="Stack" component={Stack} />
          <Tab.Screen name="Diagnostic" component={Diagnostic} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
