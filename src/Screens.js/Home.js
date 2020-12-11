import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput, Button, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

export default function Home() {
  // CONST

  const [date, setDate] = useState(new Date());

  const [personalizedDate, setpersonalizedDate] = useState(false);

  const DateExmple = moment();

  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  const dispatch = useDispatch();

  const [memeberName, setmemeberName] = useState('');
  const [memeberRegistritionDate, setmemeberRegistritionDate] = useState('');
  const [memberShipDuration, setmemberShipDuration] = useState(30);
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
          dateOfRegistration: personalizedDate ? date : moment(),
          endOfRegistration: personalizedDate
            ? moment(date).add(memberShipDuration, 'days')
            : moment().add(memberShipDuration, 'days'),
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
    <View style={{}}>
      <Text>All members</Text>
      <TextInput
        placeholder={'member name'}
        onChangeText={(inputName) => {
          setmemeberName(inputName);
        }}
        value={memeberName}
      />
      <Text>setmemberShipDuration / per days</Text>
      <TextInput
        placeholder={'member name'}
        onChangeText={(input) => {
          setmemberShipDuration(input);
        }}
        value={memberShipDuration.toString()}
        keyboardType={'decimal-pad'}
      />

      <View style={{alignItems: 'flex-end'}}>
        <Switch
          style={{height: 30}}
          trackColor={{false: '#bdc3c7', true: '#bdc3c7'}}
          thumbColor={personalizedDate ? '#2ed573' : '#ff3f34'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setpersonalizedDate(!personalizedDate)}
          value={personalizedDate}
        />
        <Text>personalized date</Text>
      </View>

      {personalizedDate ? (
        <DatePicker date={date} onDateChange={setDate} />
      ) : (
        <Text>start day : {moment().format('DD/MMMM/YYYY')} </Text>
      )}

      <Button
        title={'add'}
        onPress={() => {
          addNewMember(memeberName);
        }}
      />
      <View style={{height: 200}}>
        <FlatList
          style={{}}
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
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text>FullNAme : {item.fullName} </Text>
                    <Text>
                      Registred day
                      {JSON.stringify(
                        moment(item.dateOfRegistration).format('DD MMMM YYYY'),
                      )}
                    </Text>
                    <Text>
                      End Date :
                      {JSON.stringify(
                        moment(item.endOfRegistration).format('DD MMMM YYYY'),
                      )}
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
    </View>
  );
}
