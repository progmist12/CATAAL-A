import React, { useState } from 'react';
import { 
  Alert, Text, TouchableOpacity, View, Image, 
  StyleSheet, Animated, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { RegisterUser } from '../../app/api/auth';

// Reuse the FloatingShape component logic for consistency
const FloatingShape = ({ type, top, left }: { type: 'play' | 'square', top: any, left: any }) => {
  const floatAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  return (
    <Animated.View style={[
      styles.shape, 
      { top, left, transform: [{ translateY }] },
      type === 'play' ? styles.playShape : styles.squareShape
    ]} />
  );
};

const Register = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = async () => {
    if (!emailAdd.trim() || !password.trim() || !username.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Invalid Credentials', 'Please fill in all registration fields.');
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
        { text: 'Continue to Login', onPress: () => navigation.navigate(ROUTES.LOGIN) },
      ]);
      return;
    }

    const errorMessage = result?.data?.message || result?.error || 'Registration failed';
    Alert.alert('Registration failed', errorMessage);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Background Decorations */}
        <FloatingShape type="square" top="5%" left="10%" />
        <FloatingShape type="play" top="15%" left="80%" />

        <Image
          source={require('../../assets/prime.png')} 
          style={styles.logo}
        />

        <View style={styles.authCard}>
          <Text style={styles.authTitle}>Create Account</Text>

          <View style={{ width: '100%' }}>
            <Text style={styles.inputLabel}>First Name</Text>
            <CustomTextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              placeholderTextColor="rgba(255,255,255,0.3)"
            />

            <Text style={styles.inputLabel}>Last Name</Text>
            <CustomTextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              placeholderTextColor="rgba(255,255,255,0.3)"
            />

            <Text style={styles.inputLabel}>Email Address</Text>
            <CustomTextInput
              placeholder="email@example.com"
              value={emailAdd}
              onChangeText={setEmailAdd}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              placeholderTextColor="rgba(255,255,255,0.3)"
            />

            <Text style={styles.inputLabel}>Username</Text>
            <CustomTextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              placeholderTextColor="rgba(255,255,255,0.3)"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <CustomTextInput
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>

          <CustomButton
            label="SIGN UP"
            containerStyle={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={handleRegister}
          />

          <View style={styles.footer}>
            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Have an account already? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  shape: { position: 'absolute', opacity: 0.15 },
  playShape: {
    width: 0, height: 0,
    borderTopWidth: 15, borderBottomWidth: 15, borderLeftWidth: 25,
    borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: '#2ecc71',
  },
  squareShape: {
    width: 30, height: 30, borderWidth: 3, borderColor: '#2ecc71', borderRadius: 6,
  },
  logo: { width: 150, height: 50, resizeMode: 'contain', marginBottom: 30 },
  authCard: {
    width: '100%', maxWidth: 420, backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 20, padding: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  authTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 20 },
  inputLabel: {
    color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold',
    textTransform: 'uppercase', marginBottom: 6, letterSpacing: 1,
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 10, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', marginBottom: 12, paddingHorizontal: 10,
  },
  inputText: { color: '#fff', height: 40 },
  submitBtn: {
    backgroundColor: '#00ff88', borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', marginTop: 10, marginBottom: 20,
  },
  submitBtnText: { color: '#000', fontWeight: '800', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  signInText: { color: '#2ecc71', fontWeight: 'bold' },
});

export default Register;