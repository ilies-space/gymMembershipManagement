import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function ViewMembers() {
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  return (
    <View>
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
                  <Text>
                    memeberShip Duration : {item.memberShipDuration} ,{' '}
                    {item.memberShipPer}
                  </Text>
                </View>
                <View>
                  {item.memberPicture ? (
                    <Image
                      source={item.memberPicture}
                      style={{width: 50, height: 50, margin: 10}}
                    />
                  ) : (
                    <Text>NO-IMG</Text>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}