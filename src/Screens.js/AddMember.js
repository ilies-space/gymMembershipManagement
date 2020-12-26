import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {uniqueid} from '../utility/uniqueid';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {launchCamera} from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import RNSmtpMailer from 'react-native-smtp-mailer';
import {mailInfo} from '../utility/smtpCredential';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export default function AddMember() {
  // CONST
  var allMemebersStore = useSelector((state) => state.DataReducer.allMembers);
  const [allMembers, setallMembers] = useState(allMemebersStore);

  useEffect(() => {
    setallMembers(allMemebersStore);
  }, [allMemebersStore]);
  const navigation = useNavigation();

  const options = {
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };
  const [avatarSource, setavatarSource] = useState(
    require('../assets/profileimgplaceholder.png'),
  );

  const [date, setDate] = useState(new Date());

  const [personalizedDate, setpersonalizedDate] = useState(false);

  const dispatch = useDispatch();
  const [memberShipPer, setmemberShipPer] = useState('days');

  const [memeberName, setmemeberName] = useState('');
  const [memberShipDuration, setmemberShipDuration] = useState(30);

  const [newMemeberQRcodeData, setnewMemeberQRcodeData] = useState('');
  const [qrCodeModal, setqrCodeModal] = useState(false);
  // FUNCTIONS

  function closeForm() {
    setqrCodeModal(false);
    setmemeberName('');
    setavatarSource(require('../assets/profileimgplaceholder.png'));
    navigation.goBack();
  }
  function addNewMember(name) {
    // check if data is not empty

    if (name === '') {
      alert('pleas inter a valide name ! ');
      return;
    } else {
      if (
        memberShipDuration === '' ||
        memberShipDuration === '0' ||
        isNaN(memberShipDuration)
      ) {
        alert('pleas inter a valide Subscription duration ! ');
        return;
      } else {
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
              dateOfRegistration: date,
              endOfRegistration: moment(date).add(
                memberShipDurationPerDAys,
                'days',
              ),
              memberShipDuration: memberShipDuration,
              memberShipPer: memberShipPer,
            };
            dispatch({
              type: 'addNewMember',
              newMemeber: newMemeber,
            });
            setnewMemeberQRcodeData({
              fullName: name,
              dateOfRegistration: personalizedDate ? date : moment(),
              endOfRegistration: personalizedDate
                ? moment(date).add(memberShipDurationPerDAys, 'days')
                : moment().add(memberShipDurationPerDAys, 'days'),
            });

            Alert.alert('alert', 'chosse an action from these options', [
              {
                text: 'display invitation modal',
                onPress: () => {
                  setqrCodeModal(true);
                },
              },
              {
                text: 'return to home',
                onPress: () => {
                  closeForm();
                },
              },
            ]);

            break;

          default:
            alert('this member already exist');
            break;
        }
      }
    }
  }

  function uploadImage() {
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        setavatarSource(source);
      }
    });
  }

  function sendInvitaionMail(mail) {
    console.log(mailInfo.email + mailInfo.password);
    console.log(mail);
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '587',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: mailInfo.email,
      password: mailInfo.password,
      recipients: mail,
      subject: 'Gym membership registration',
      htmlBody:
        '<h1>welcome ' +
        memeberName +
        ' to the gym</h1><p>You have successfully subscribed to the gym.' +
        'You can scan the following code to see how long you have left in the subscription period' +
        ' by using /<a title="Customer application version" href="https://lh3.googleusercontent.com/proxy/F2uQ-hD4QG5lw95pZ21DLixhhad8ApSFn1D5IhsJ1DUcEO5B9RLODlmAZNL5SszHAwUI6xiZn1JntY3np-6ap9Fx" target="_blank" rel="noopener">Customer application version</a>  </p>' +
        'QR CODE CONETNT : ' +
        JSON.stringify(newMemeberQRcodeData) +
        '<p><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="W3Schools" width="200" height="&quot;200" border="0" /></p>',
      attachmentNames: [],
    })
      .then((success) => {
        if (success.status === 'SUCCESS') {
          console.log('mail was sent succesfully to : ' + mail);
          closeForm();
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  return (
    <ScrollView
      style={{
        paddingHorizontal: 10,
        paddingTop: 25,
        backgroundColor: '#F2F8FF',
      }}>
      <Modal transparent visible={qrCodeModal}>
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.7,
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
                closeForm();
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
              <Text style={{alignSelf: 'center'}}>OR</Text>
              <View style={{alignItems: 'center', margin: 10}}>
                <TextInput
                  keyboardType={'email-address'}
                  placeholder={'invite by Mail'}
                  style={{borderWidth: 1, padding: 10, width: '70%'}}
                  onSubmitEditing={(input) => {
                    const memberMail = input.nativeEvent.text;
                    console.log(memberMail);
                    sendInvitaionMail(memberMail);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{color: 'blue'}}>Return</Text>
      </TouchableOpacity>
      {/* image picker area  */}
      <View>
        <TouchableOpacity
          onPress={() => {
            uploadImage();
          }}
          style={{}}>
          <Image
            source={avatarSource}
            style={{
              width: 115,
              height: 115,
              alignSelf: 'center',
              margin: 10,
              borderRadius: 115 / 2,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            uploadImage();
          }}
          style={{}}>
          <Text
            style={{
              borderRadius: 20,
              borderWidth: 0.7,
              alignSelf: 'center',
              paddingHorizontal: 60,
              paddingVertical: 8,
              borderColor: '#bdc3c7',
              color: '#6785AC',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 18,
          marginVertical: 15,
          color: '#041726',
        }}>
        Full name <Text style={{color: '#6785AC'}}>*</Text>
      </Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          color: '#6785AC',
          padding: 15,
          fontSize: 18,
        }}
        placeholder={'eg . ilies ouldmenouer'}
        onChangeText={(inputName) => {
          setmemeberName(inputName);
        }}
        value={memeberName}
        placeholderTextColor={'#bdc3c7'}
      />

      <Text
        style={{
          fontSize: 18,
          marginVertical: 15,
          color: '#041726',
          fontSize: 16,
          marginVertical: 15,
        }}>
        Start day
      </Text>

      <TouchableOpacity
        onPress={() => {
          setpersonalizedDate(!personalizedDate);
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 15,
          fontSize: 18,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#6785AC',
          }}>
          {moment(date).format('DD/MMMM/YYYY')}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={personalizedDate}>
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.7,
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
            <DatePicker date={date} onDateChange={setDate} mode="date" />

            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 15,
                marginTop: 30,
                borderWidth: 0.5,
                borderColor: 'grey',
              }}
              onPress={() => {
                setpersonalizedDate(false);
              }}>
              <Text style={{color: 'green'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text
        style={{
          fontSize: 18,
          marginVertical: 15,
          color: '#041726',
          fontSize: 16,
          marginVertical: 15,
        }}>
        Subscription duration
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 16,
            width: 120,
            color: '#6785AC',
          }}
          placeholder={'00'}
          onChangeText={(input) => {
            setmemberShipDuration(input);
          }}
          value={memberShipDuration.toString()}
          keyboardType={'decimal-pad'}
          placeholderTextColor={'#bdc3c7'}
        />
        <View style={{width: 120}}>
          <Picker
            dropdownIconColor={'#6785AC'}
            mode={'dropdown'}
            selectedValue={memberShipPer}
            onValueChange={(itemValue) => setmemberShipPer(itemValue)}>
            <Picker.Item color={'#6785AC'} label="days" value="days" />
            <Picker.Item color={'#6785AC'} label="months" value="months" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          addNewMember(memeberName);
        }}
        style={{
          backgroundColor: '#6785AC',
          alignItems: 'center',
          borderRadius: 15,
          marginVertical: 30,
        }}>
        <Text
          style={{
            padding: 15,
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Confirme
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
