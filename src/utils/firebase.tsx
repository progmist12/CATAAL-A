import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();
export const _signInwithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return { userInfo };
  } catch (error: any) {
    const code = error?.code;
    switch (code) {
      case statusCodes.IN_PROGRESS:
        return { userInfo: null, message: 'Sign-in already in progress' };
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return { userInfo: null, message: 'Google Play Services not available or outdated' };
      default:
        return {
          userInfo: null,
          message: error?.message ? String(error.message) : 'Google Sign-In failed',
        };
    }
  }
}