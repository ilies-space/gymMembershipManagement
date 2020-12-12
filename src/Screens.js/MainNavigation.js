import React from 'react';
import {View, Text} from 'react-native';
import Home from './Home';
import ViewMembers from './ViewMembers';
import {createStackNavigator} from '@react-navigation/stack';
import AddMember from './AddMember';

export default function MainNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewMembers" component={ViewMembers} />
      <Stack.Screen name="AddMember" component={AddMember} />
    </Stack.Navigator>
  );
}
