import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';
import moment from 'moment';

export default function Home() {
  // CONST

  const DateExmple = moment();

  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  const dispatch = useDispatch();

  const [memeberName, setmemeberName] = useState('');
  const [memeberRegistritionDate, setmemeberRegistritionDate] = useState('');

  // console.log(moment().format('Do MMMM YYYY, h:mm:ss a'));
  // console.log(moment('2020-12-11T10:11:21.583Z').fromNow());

  // console.log(moment().add(30, 'days').calendar());
  // console.log(moment().calendar());

  // FUNCTIONS
  function addNewMember(name) {
    // checkIfMebeAlreadyexist ?
    const lookUp = allMembers.find((member) => {
      return member.name === name;
    });

    switch (lookUp) {
      case undefined:
        const newMemeber = {
          fullName: name,
          id: uniqueid(),
          dateOfRegistration: moment(),
          endOfRegistration: moment().add(30, 'days'),
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
            <View
              style={{
                backgroundColor: '#fef',
                padding: 10,
                borderBottomWidth: 1,
              }}>
              {console.log(moment(item.dateOfRegistration).fromNow())}

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text>FullNAme : {item.fullName} </Text>
                  <Text>
                    Registred day {JSON.stringify(item.dateOfRegistration)}
                  </Text>
                  <Text>
                    End Date : {JSON.stringify(item.endOfRegistration)}
                  </Text>
                  <Text>
                    Active since : {moment(item.dateOfRegistration).fromNow()}
                  </Text>
                </View>
                <View>{/* <Text>IMG GOES HERE</Text> */}</View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
