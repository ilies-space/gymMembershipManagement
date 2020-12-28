import React from 'react';
import {View, Text} from 'react-native';
import Home from './Home';
import ViewMembers from './ViewMembers';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from './Settings';

import AddMember from './AddMember';
import ViewMembersNavigation from './ViewMembersNavigation';

export default function MainNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={StackNav} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

const StackNav = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewMembers"
        component={ViewMembersNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddMember"
        component={AddMember}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
