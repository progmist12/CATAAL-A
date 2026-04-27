import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';

// 1. Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../app/action'; // Verified path based on your file tree

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

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 2. Select data from Redux State
  // We use state.auth because that is the key you used in combineReducers
  const { isLoading, error, token } = useSelector((state: any) => state.auth);

  // 3. Monitor login status
  useEffect(() => {
    if (token) {
      // Navigate to Home or Main app once token is present
      // navigation.navigate(ROUTES.HOME); 
      Alert.alert('Success', 'Login successful!');
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  const handleLogin = () => {
    if (emailAdd === '' || password === '') {
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid email address and password'
      );
      return;
    }

    // 4. Dispatch the action to trigger Redux-Saga
    // Note: mapping 'emailAdd' UI state to 'username' which the API expects
    dispatch(authLogin({ username: emailAdd, password: password }));
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
          backgroundColor: '#eee' // Placeholder color until image source is fixed
        }}
      />

      <View style={{ width: '100%' }}>
        <CustomTextInput
          label="Email Address"
          placeholder="Enter Email Address" // Added to satisfy TS requirement
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
          placeholder="Enter Password" // Added to satisfy TS requirement
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

      {/* 5. Conditional Rendering for Loader */}
      {isLoading ? (
        <ActivityIndicator size="large" color="skyblue" style={{ marginVertical: 20 }} />
      ) : (
        <CustomButton
          label="SIGN IN"
          containerStyle={{
            backgroundColor: 'skyblue',
            borderRadius: 10,
            marginVertical: 20,
            width: '80%',
          }}
          textStyle={{ // Added to satisfy TS requirement
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
          onPress={handleLogin}
        />
      )}

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