import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import ImagePicker, {launchCamera} from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';

export default function Home() {
  // CONST

  const options = {
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };
  const [avatarSource, setavatarSource] = useState(null);
  const [pic, setpic] = useState(null);

  const [date, setDate] = useState(new Date());

  const [personalizedDate, setpersonalizedDate] = useState(false);

  const DateExmple = moment();

  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);

  const dispatch = useDispatch();
  const [memberShipPer, setmemberShipPer] = useState('days');

  const [memeberName, setmemeberName] = useState('');
  const [memeberRegistritionDate, setmemeberRegistritionDate] = useState('');
  const [memberShipDuration, setmemberShipDuration] = useState(30);
  // console.log(moment().format('Do MMMM YYYY, h:mm:ss a'));
  // console.log(moment('2020-12-11T10:11:21.583Z').fromNow());

  // console.log(moment().add(30, 'days').calendar());
  // console.log(moment().calendar());
  const [newMemeberQRcodeData, setnewMemeberQRcodeData] = useState('');
  const [qrCodeModal, setqrCodeModal] = useState(false);
  // FUNCTIONS
  function addNewMember(name) {
    // checkIfMebeAlreadyexist ?
    const lookUp = allMembers.find((member) => {
      return member.name === name;
    });

    switch (lookUp) {
      case undefined:
        const memberShipDurationPerDAys =
          memberShipPer === 'days'
            ? memberShipDuration
            : memberShipDuration * 30;

        const newMemeber = {
          fullName: name,
          memberPicture: avatarSource,
          id: uniqueid(),
          dateOfRegistration: personalizedDate ? date : moment(),
          endOfRegistration: personalizedDate
            ? moment(date).add(memberShipDurationPerDAys, 'days')
            : moment().add(memberShipDurationPerDAys, 'days'),
          memberShipDuration: memberShipDuration,
          memberShipPer: memberShipPer,
        };
        console.log('TO ADD ' + JSON.stringify(newMemeber));

        dispatch({
          type: 'addNewMember',
          newMemeber: newMemeber,
        });
        // success :
        setmemeberName('');
        setnewMemeberQRcodeData({
          fullName: name,
          dateOfRegistration: personalizedDate ? date : moment(),
          endOfRegistration: personalizedDate
            ? moment(date).add(memberShipDurationPerDAys, 'days')
            : moment().add(memberShipDurationPerDAys, 'days'),
        });
        setqrCodeModal(true);

        break;

      default:
        alert('this member already exist');
        break;
    }
  }

  const memberExmple = {
    dateOfRegistration: '2020-12-11T19:15:57.271Z',
    endOfRegistration: '2021-01-10T19:15:57.271Z',
    fullName: 'mimo',
    memberShipDuration: 30,
    memberShipPer: 'days',
  };

  return (
    <View style={{}}>
      <Modal transparent visible={qrCodeModal}>
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.5,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            margin: 20,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              padding: 20,
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                console.log('close');
                setqrCodeModal(false);
              }}>
              <Text style={{color: 'red'}}>CLOSE</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 20}}>
              <QRCode value={JSON.stringify(newMemeberQRcodeData)} />
            </View>
            <View>
              <Text>
                SCAN THIS QRCOED FROM CLIENT APP VESION TO STAY UPDATED FROM
                YOUR PHONE
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        source={avatarSource}
        style={{width: 50, height: 50, margin: 10}}
      />

      <Text>member info : </Text>
      <TouchableOpacity
        style={{backgroundColor: 'green', margin: 10, padding: 10}}
        onPress={() => {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('Image Picker Error: ', response.error);
            } else {
              let source = {uri: response.uri};
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              setavatarSource(source);
              setpic(response.data);
            }
          });

          // launchCamera(options, callback);
        }}>
        <Text style={{color: '#fff'}}>Select Image</Text>
      </TouchableOpacity>
      <TextInput
        placeholder={'member name'}
        onChangeText={(inputName) => {
          setmemeberName(inputName);
        }}
        value={memeberName}
      />
      <Text>memberShip Duration / per days</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={'member name'}
          onChangeText={(input) => {
            setmemberShipDuration(input);
          }}
          value={memberShipDuration.toString()}
          keyboardType={'decimal-pad'}
        />
        <View style={{width: 120}}>
          <Picker
            mode={'dropdown'}
            selectedValue={memberShipPer}
            // style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              setmemberShipPer(itemValue)
            }>
            <Picker.Item label="days" value="days" />
            <Picker.Item label="months" value="months" />
          </Picker>
        </View>
      </View>

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
        <DatePicker date={date} onDateChange={setDate} mode="date" />
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
    </View>
  );
}
