import React, { useState } from 'react';
import {Alert, Text, TouchableOpacity, View, Image,} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const Register = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    if (emailAdd === '' || password === '') {
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid email address and password'
      );
      return;
    }

    
    Alert.alert('Success', 'Registration successful!');
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      
      <Image
        source={require('../../../assets/images/falcon.jpg')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          marginBottom: 30,
        }}
      />

      
      <View style={{ width: '100%' }}>
        <CustomTextInput
          label="Email Address"
          placeholder="Enter Email Address"
          value={emailAdd}
          onChangeText={val => setEmailAdd(val)}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
            fontWeight: 'bold',
          }}
        />

        <CustomTextInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={val => setPassword(val)}
          secureTextEntry={true}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
          }}
        />
      </View>

      
      <CustomButton
        label="SIGN UP"
        containerStyle={{
          backgroundColor: 'skyblue',
          borderRadius: 10,
          marginVertical: 20,
          width: '80%',
        }}
        textStyle={{
          color: 'black',
          fontWeight: 'bold',
        }}
        onPress={handleRegister}
      />

      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Have an account already?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          <Text
            style={{
              color: 'blue',
              marginLeft: 10,
              fontWeight: 'bold',
            }}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
