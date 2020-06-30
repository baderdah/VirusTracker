import {createStackNavigator} from '@react-navigation/stack';
import News from './News';
import Login from './Login';
import UploadData from './UploadData';
import React from 'react';

const myStack = createStackNavigator();

class Stack extends React.Component {
  render() {
    return (
      <myStack.Navigator>
        <myStack.Screen
          options={{headerShown: false}}
          name="News"
          component={News}
        />
        <myStack.Screen
          options={{headerShown: false}}
          name="Authentification"
          component={Login}
        />
        <myStack.Screen
          options={{headerShown: false}}
          name="UploadData"
          component={UploadData}
        />
      </myStack.Navigator>
    );
  }
}
export default Stack;
