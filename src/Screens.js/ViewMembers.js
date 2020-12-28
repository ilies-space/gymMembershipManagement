import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function ViewMembers() {
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  const [filtredList, setfiltredList] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  function isExpired(endDate) {
    const diff = moment.duration(moment().diff(endDate)).asDays();
    return diff < 0;
  }

  function calculatediff(endDate) {
    const diff = moment.duration(moment().diff(endDate)).asDays();
    return parseInt(diff);
  }

  function filterList(name) {
    name = name.toLowerCase();
    let filtredList = allMemebersStore.filter(function (element) {
      let ElementsName = element.fullName.toLocaleLowerCase();
      return ElementsName.includes(name);
    });
    setallMembers(filtredList);
  }
  return (
    <View style={{flex: 1}}>
      {/* remplace this with tabNavigation  */}
      {/* <View style={{flexDirection: 'row', borderBottomWidth: 0.5}}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 10,
            backgroundColor: 'grey',
          }}>
          ALL
        </Text>
        <Text style={{flex: 1, textAlign: 'center', padding: 10}}>ACTIVE</Text>
        <Text style={{flex: 1, textAlign: 'center', padding: 10}}>Expierd</Text>
      </View> */}

      <TextInput
        placeholder={'search by name'}
        onChangeText={(v) => {
          filterList(v);
        }}
      />

      {allMembers.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Text>No member signed with this name</Text>
        </View>
      ) : (
        <FlatList
          style={{}}
          data={allMembers}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            function displayMember() {
              const selectedMemeberDetails = {
                fullName: item.fullName,
                memberPicture: item.memberPicture,
                registredDay: moment(item.dateOfRegistration).format(
                  'DD MMMM YYYY',
                ),
                EndDate: moment(item.endOfRegistration).format('DD MMMM YYYY'),

                memeberShipDuration:
                  item.memberShipDuration + ',' + item.memberShipPer,

                isActive: isExpired(item.endOfRegistration),
              };

              alert(JSON.stringify(selectedMemeberDetails));
            }

            return (
              <TouchableOpacity
                onPress={() => {
                  displayMember();
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.5,
                  paddingVertical: 2,
                  padding: 5,
                  marginVertical: 5,
                }}>
                {/* <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold'}}>{item.fullName} </Text>

                 
                </View>
                <View>
                  {item.memberPicture ? (
                    <Image
                      source={item.memberPicture}
                      style={{
                        width: 70,
                        height: 70,
                        margin: 10,
                        borderRadius: 70 / 2,
                      }}
                    />
                  ) : (
                    <Text>NO-IMG</Text>
                  )}
                </View>
              </View> */}

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View style={{}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {item.fullName}
                    </Text>
                  </View>

                  {!isExpired(item.endOfRegistration) ? (
                    <Text style={{fontSize: 16, color: 'grey'}}>
                      00 days left
                    </Text>
                  ) : (
                    <Text style={{fontSize: 16, color: 'grey'}}>
                      {calculatediff(item.endOfRegistration)} days left
                    </Text>
                  )}
                </View>

                <View>
                  {item.memberPicture ? (
                    <View>
                      <Image
                        source={item.memberPicture}
                        style={{
                          width: 70,
                          height: 70,
                          margin: 10,
                          borderRadius: 70 / 2,
                        }}
                      />
                      {isExpired(item.endOfRegistration) ? (
                        <View
                          style={{
                            backgroundColor: 'green',
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}></View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                          }}></View>
                      )}
                    </View>
                  ) : (
                    <Text>NO-IMG</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
