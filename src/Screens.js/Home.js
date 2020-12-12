import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Home() {
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <View>
        <Text>Numer of memebers : </Text>
        <Text> {allMemebersStore.length} </Text>
      </View>

      <Button
        onPress={() => {
          console.log('push');
          navigation.push('ViewMembers');
        }}
        title={'view all members'}
      />
      <View style={{marginVertical: 15}} />
      <Button
        onPress={() => {
          navigation.push('AddMember');
        }}
        title={'Add new member'}
      />
    </View>
  );
}
