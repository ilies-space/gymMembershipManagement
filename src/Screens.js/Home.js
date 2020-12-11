import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';

export default function Home() {
  // CONST

  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  const dispatch = useDispatch();

  const [memeberName, setmemeberName] = useState('');
  const [memeberRegistritionDate, setmemeberRegistritionDate] = useState('');

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

        dispatch({
          type: 'addNewMember',
          newMemeber: newMemeber,
        });
        // success :
        setmemeberName('');

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
        onChangeText={(inputName) => {
          setmemeberName(inputName);
        }}
        value={memeberName}
      />
      <Button
        title={'add'}
        onPress={() => {
          addNewMember(memeberName);
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
