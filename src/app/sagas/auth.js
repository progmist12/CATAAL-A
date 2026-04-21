import { takeLatest, call, put } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../action';
import { UserLogin } from '../api/auth';

export function* userLoginAsync(action) {
  try {
    console.log('USER_LOGIN');
    yield put({ type: USER_LOGIN_REQUEST });
    console.log('USER_LOGIN_REQUEST');

    const payload_login = action.payload;
    const result = yield call(UserLogin, payload_login);
    
    console.log('the result is', result);

    if (result) {
      if (result.ok === true) {
        const payload = { token: result.token };
        console.log('Login successful, payload:', result.token);
        console.log('USER_LOGIN_SUCCESS');
        yield put({ type: USER_LOGIN_SUCCESS, payload });
        return;
      } else {
        console.log('USER_LOGIN_FAILURE');
      }

      const message = result.error ? result.error : 'Invalid credentials';
      yield put({ type: USER_LOGIN_FAILURE, error: message });
      console.log('USER_LOGIN_FAILURE');
      return;
    }

    yield put({ type: USER_LOGIN_FAILURE, error: 'No response from server' });
    console.log('USER_LOGIN_FAILURE');
  } catch (error) {
    yield put({
      type: USER_LOGIN_FAILURE,
      error: error || 'An unexpected error occurred',
    });
    console.log('USER_LOGIN_FAILURE');
  }
}

export function* userLoginAction() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}