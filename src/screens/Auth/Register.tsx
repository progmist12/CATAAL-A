import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, Image } from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { RegisterUser } from '../../app/api/auth';

interface RootStackParamList {
  [key: string]: any;
}

const Register = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (
      emailAdd.trim() === '' ||
      password.trim() === '' ||
      username.trim() === '' ||
      firstName.trim() === '' ||
      lastName.trim() === ''
    ) {
      Alert.alert(
        'Invalid Credentials',
        'Please fill in all registration fields.'
      );
      return;
    }

    const payload = {
      email: emailAdd.trim(),
      password: password.trim(),
      username: username.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      created_at: new Date().toISOString(),
    };

    const result = await RegisterUser(payload);

    if (result?.status === 'ok') {
      Alert.alert('Success', 'Registration successful!', [
        {
          text: 'Continue to Login',
          onPress: () => navigation.navigate(ROUTES.LOGIN),
        },
      ]);
      return;
    }

    const errorMessage =
      result?.data?.message || result?.error || 'Registration failed';

    Alert.alert('Registration failed', errorMessage);
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
          label="Username"
          placeholder="Enter Username"
          value={username}
          onChangeText={(val: string) => setUsername(val)}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
          }}
        />

        <CustomTextInput
          label="First Name"
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={(val: string) => setFirstName(val)}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
          }}
        />

        <CustomTextInput
          label="Last Name"
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={(val: string) => setLastName(val)}
          containerStyle={{ padding: 5 }}
          textStyle={{
            borderRadius: 10,
            color: 'black',
            marginLeft: 10,
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

        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
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
