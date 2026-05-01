import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, TouchableOpacity, View, Image, ActivityIndicator, 
  StyleSheet, Animated, Dimensions, StatusBar
} from 'react-native';

// Redux & Navigation
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, clearAuthError } from '../../app/action'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Components & Utils
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { showError, showSuccess } from '../../components/alert_message';
import { ROUTES } from '../../utils';

// Google & Firebase Service
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { _signInwithGoogle } from '../../utils/firebase';

const { width } = Dimensions.get('window');

/**
 * 1. ANIMATED BACKGROUND SHAPES
 */
const FloatingShape = ({ type, top, left }: { type: 'play' | 'square', top: any, left: any }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
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
      { 
        top: top, 
        left: left, 
        transform: [{ translateY: translateY }] 
      },
      type === 'play' ? styles.playShape : styles.squareShape
    ]} />
  );
};

/**
 * 2. MAIN LOGIN COMPONENT
 */
const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  // Select data from Redux State
  const { isLoading, error, token } = useSelector((state: any) => state.auth);

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Handle successful login
  useEffect(() => {
    if (token) {
      showSuccess({
        title: 'Success',
        message: 'Login successful!',
      });
    }
  }, [token]);

  // Handle standard login errors
  useEffect(() => {
    if (error) {
      showError({
        title: 'Login Failed',
        message: error,
      });
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const handleLogin = () => {
    if (emailAdd === '' || password === '') {
      showError({
        title: 'Invalid Credentials',
        message: 'Please enter valid email address and password',
      });
      return;
    }
    dispatch(authLogin({ username: emailAdd, password: password }));
  };

  /**
   * GOOGLE SIGN-IN HANDLER
   */
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await _signInwithGoogle();

      if (result && result.userInfo) {
        const userEmail = (result.userInfo as any).user?.email;
        showSuccess({
          title: 'Welcome!',
          message: `Signed in as ${userEmail || 'Google User'}`,
        });
        // dispatch(authGoogleSuccess(result.userInfo));
      } else if (result && result.message) {
        showError({
          title: 'Google Sign-In',
          message: result.message,
        });
      }
    } catch (err) {
      showError({
        title: 'Connection Error',
        message: 'Failed to connect to Google services.',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Decorations */}
      <FloatingShape type="play" top="15%" left="10%" />
      <FloatingShape type="square" top="70%" left="15%" />
      <FloatingShape type="play" top="45%" left="82%" />
      <FloatingShape type="square" top="12%" left="78%" />

      <Image
        source={require('../../assets/prime.png')} 
        style={styles.logo}
      />

      <View style={styles.authCard}>
        <Text style={styles.authTitle}>Sign In</Text>

        <View style={{ width: '100%' }}>
          <Text style={styles.inputLabel}>Email or Username</Text>
          <CustomTextInput
            placeholder="e.g. lance or lance@example.com"
            value={emailAdd}
            onChangeText={(val: string) => setEmailAdd(val)}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            placeholderTextColor="rgba(255,255,255,0.3)"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <CustomTextInput
            placeholder="Enter password"
            value={password}
            onChangeText={(val: string) => setPassword(val)}
            secureTextEntry={true}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            placeholderTextColor="rgba(255,255,255,0.3)"
          />
        </View>

        <TouchableOpacity style={styles.helpRow}>
          <Text style={styles.helpText}>Need help?</Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff88" style={{ marginVertical: 20 }} />
        ) : (
          <CustomButton
            label="LOG IN"
            containerStyle={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={handleLogin}
          />
        )}

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR SECURE LOG WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {isGoogleLoading ? (
          <ActivityIndicator size="small" color="#00ff88" style={{ marginVertical: 10 }} />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <GoogleSigninButton
              style={{ width: '100%', height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleLogin}
            />
          </View>
        )}

        <View style={styles.footer}>
          <Text style={{ color: 'rgba(255,255,255,0.5)' }}>New to PrimeStage? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER as any)}>
            <Text style={styles.signUpText}>Get started now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  shape: {
    position: 'absolute',
    opacity: 0.15,
  },
  playShape: {
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderLeftWidth: 25,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#2ecc71',
  },
  squareShape: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderColor: '#2ecc71',
    borderRadius: 6,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  authCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputText: {
    color: '#fff',
    height: 45,
  },
  helpRow: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  helpText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  submitBtn: {
    backgroundColor: '#00ff88',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitBtnText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.2)',
    marginHorizontal: 10,
    fontSize: 9,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signUpText: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});

export default Login;