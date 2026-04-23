import React, { useState } from 'react';
import {Alert, Text, TouchableOpacity, View, Image,} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

interface RootStackParamList {
  [key: string]: any;
}

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    if (emailAdd === '' || password === '') {
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid email address and password'
      );
      return;
    }

    
    Alert.alert('Success', 'Login successful!');
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
        // source={require('../../../utils/images.js/Hard.jpg')}
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
          onChangeText={(val: string) => setEmailAdd(val)}
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
          onChangeText={(val: string) => setPassword(val)}
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
        label="SIGN IN"
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
        onPress={handleLogin}
      />

      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Create an account?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.REGISTER as any)}
        >
          <Text
            style={{
              color: 'blue',
              marginLeft: 10,
              fontWeight: 'bold',
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;