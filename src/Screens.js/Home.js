import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';

export default function Home() {
  // CONST

  var allMemebersStore = useSelector((state) => state.DataReducer);
  const [allMembers, setallMembers] = useState(allMemebersStore.test);

  console.log(allMemebersStore.test);
  //   const allMembers = [
  //     {
  //       id: 'AA01',
  //       name: 'ilies',
  //     },
  //     {
  //       id: 'AA02',
  //       name: 'mohamed',
  //     },
  //   ];

  // FUNCTIONS
  function addNewMember(name) {
    // checkIfMebeAlreadyexist ?
    const lookUp = allMembers.find((member) => {
      return member.name === name;
    });

    switch (lookUp) {
      case undefined:
        const newMemeber = {
          name: name,
          id: uniqueid(),
        };
        console.log('TO ADD ' + JSON.stringify(newMemeber));

        break;

      default:
        alert('this member already exist');
        break;
    }
  }
  return (
    <View>
      <Text>All members</Text>
      <TextInput
        placeholder={'member name'}
        onSubmitEditing={(input) => {
          addNewMember(input.nativeEvent.text);
        }}
      />
      <FlatList
        data={allMembers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <View>
              <Text> {item.name} </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
