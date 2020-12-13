import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Home() {
  useEffect(() => {
    calculateExpiredMembers();
  }, []);

  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);

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
      // must find 5 :

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
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 25}}>
              {allMemebersStore.length
                ? allMemebersStore.length - expiredMembers
                : 0}{' '}
            </Text>
            <Text>Active</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 30}}>
              {allMemebersStore.length ? allMemebersStore.length : 0}{' '}
            </Text>
            <Text>Total</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Text style={{color: 'black', fontSize: 25}}>
                {expiredMembers}
              </Text>
              <Text style={{color: 'black'}}>Expired</Text>
            </View>
          </View>
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
    </View>
  );
}
