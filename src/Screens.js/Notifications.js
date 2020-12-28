import React from 'react';
import {Text, View} from 'react-native';

export default function Notifications() {
  return (
    <View style={{flex: 1}}>
      <NotficationTemplate name={'ilies oldm'} />
      <NotficationTemplate name={'jhon bs'} />
    </View>
  );
}

const NotficationTemplate = ({name}) => {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        a member has been expired today
      </Text>
      <Text style={{color: 'white'}}>name : {name}</Text>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
          }}
        />
        <Text style={{color: 'blue'}}>more info</Text>
      </View>
    </View>
  );
};
