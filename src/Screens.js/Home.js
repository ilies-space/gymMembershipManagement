import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {ProgressChart} from 'react-native-chart-kit';

export default function Home() {
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const screenWidth = Dimensions.get('window').width;
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

  var Expired =
    parseInt((expiredMembers * 100) / allMemebersStore.length) / 100;
  var active =
    parseInt(
      ((allMemebersStore.length - expiredMembers) * 100) /
        allMemebersStore.length,
    ) / 100;

  var archivied = ArchiviedMemebersStore.length;
  return (
    <View style={{flex: 1}}>
      {/* header  */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#2c3e50',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginHorizontal: 15,
              color: 'white',
            }}>
            =
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            height: 30,
            width: 30,
            backgroundColor: 'red',
            justifyContent: 'center',
            margin: 10,
          }}>
          <Text style={{color: 'white'}}>0</Text>
        </View>
      </View>

      <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{flex: 1, paddingTop: 5}}>
          <Text>ArchiviedMemebersStore : {ArchiviedMemebersStore.length}</Text>

          <View style={{marginVertical: 15}} />
        </View>

        <View style={{backgroundColor: 'white', margin: 20, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              height: 200,
              margin: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 25, color: 'black'}}>
                {allMemebersStore.length
                  ? allMemebersStore.length - expiredMembers
                  : 0}{' '}
              </Text>
              <Text style={{color: 'black'}}>Active</Text>
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
                <Text style={{fontSize: 50, marginLeft: 10, color: 'black'}}>
                  {allMemebersStore.length ? allMemebersStore.length : 0}{' '}
                </Text>
                <Text style={{fontSize: 26, color: 'grey'}}>Total</Text>
              </View>
            </TouchableWithoutFeedback>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
              }}>
              <View>
                <Text style={{color: 'black', fontSize: 25}}>
                  {expiredMembers}
                </Text>

                <Text style={{color: 'black'}}>Expired</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 15}} />

        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginLeft: 40,
          }}>
          Statistiques
        </Text>

        <ProgressChart
          data={{
            labels: ['Expired', 'active', 'archivied'], // optional
            data: [
              // allMemebersStore.length,
              active,
              Expired,
              archivied,
            ],
          }}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          hideLegend={false}
        />
        <View style={{marginHorizontal: 50}}>
          <Button
            onPress={() => {
              navigation.push('AddMember');
            }}
            title={'Add new member'}
          />
          <View style={{marginVertical: 10}} />
          {/* <Button
            onPress={() => {
              navigation.push('AddMember');
            }}
            title={'check member'}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}
