import React, { useState } from 'react';
import { Text, View,Button } from 'react-native';
import CustomeTextInput from '../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils';
import CustomButton from '../../components/CustomButton'

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation()


  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
      }}
    >
      
      <Text>{ username || "Empty " }</Text>
      <Text>{ password  || "Empty " }</Text>
      
      <CustomeTextInput
        label={"Username"}
        placeholder={"Enter your username"}
        onChangeText={setUsername}
        textStyle={{ color: 'white' }}
        TextInputStyle={{
          borderWidth: 1,
          borderColor: 'gray',
        }}
      />
      
      <CustomeTextInput
        label={"Password"}
        placeholder={"Enter your Password"}
        onChangeText={setPassword}
        textStyle={{ color: 'white' }}
        TextInputStyle={{
          borderWidth: 1,
          borderColor: 'gray',
        }}
      />
      
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Button
          title='Navigate To Home'
          onPress={() => navigation.navigate(ROUTES.HOME)}
          style={{
            marginBottom: 10,
          }}
        />
        <Button
          title='Navigate To Profle'
          onPress={()=>navigation.navigate(ROUTES.PROFILE)}
        />
        
        <CustomButton
          label={"Home"}
          mainStyle={{
            alignItems: "center",
            justifyContent: "center",
            color: 'red',
            backgroundColor: 'blue'
          }}
          route={ROUTES.HOME}
        />
      </View>
      
    </View>
  );
}