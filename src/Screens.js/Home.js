import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

export default function Home() {
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);

  useEffect(() => {
    calculateExpiredMembers();
  }, [allMemebersStore]);

  var ArchiviedMemebersStore = useSelector(
    (state) => state.DataReducer.archiviedMembers,
  );

  function isExpired(endDate) {
    const diff = moment.duration(moment().diff(endDate)).asDays();
    return diff < 0;
  }

  const [expiredMembers, setexpiredMembers] = useState(0);
  function calculateExpiredMembers() {
    if (allMemebersStore.length == 0) {
      console.log('empty list');
    } else {
      var counter = 0;

      allMemebersStore.forEach((member) => {
        if (!isExpired(member.endOfRegistration)) counter++;
      });
      setexpiredMembers(counter);
    }
  }

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 15}}>
          =
        </Text>
      </TouchableOpacity>

      <View style={{flex: 1, paddingTop: 50}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 200,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 25}}>
              {allMemebersStore.length
                ? allMemebersStore.length - expiredMembers
                : 0}{' '}
            </Text>
            <Text>Active</Text>
          </View>

          <TouchableWithoutFeedback
            style={{}}
            onPress={() => {
              navigation.push('ViewMembers');
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 150,
                width: 150,
                borderRadius: 150 / 2,
                borderWidth: 5,
                borderColor: '#52A8FB',
              }}>
              <Text style={{fontSize: 50, marginLeft: 10}}>
                {allMemebersStore.length ? allMemebersStore.length : 0}{' '}
              </Text>
              <Text style={{fontSize: 26, color: 'grey'}}>Total</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Text style={{color: 'black', fontSize: 25}}>
                {expiredMembers}
              </Text>

              <Text style={{color: 'black'}}>Expired</Text>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 15}} />

        <Text>ArchiviedMemebersStore : {ArchiviedMemebersStore.length}</Text>

        <View style={{marginVertical: 15}} />

        <Button
          onPress={() => {
            navigation.push('AddMember');
          }}
          title={'Add new member'}
        />
        <View style={{marginVertical: 10}} />
        <Button
          onPress={() => {
            navigation.push('AddMember');
          }}
          title={'check member'}
        />
      </View>
    </View>
  );
}
