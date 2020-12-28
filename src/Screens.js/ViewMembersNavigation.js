import React from 'react';
import {View} from 'react-native';
import ViewMembers from './ViewMembers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ViewMembers2 from './ViewMembers2';
import ViewMembers3 from './ViewMembers3';

export default function ViewMembersNavigation() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="All members" component={ViewMembers} />
        <Tab.Screen name="active member" component={ViewMembers3} />
        <Tab.Screen name="expired member" component={ViewMembers2} />
      </Tab.Navigator>
    </View>
  );
}
