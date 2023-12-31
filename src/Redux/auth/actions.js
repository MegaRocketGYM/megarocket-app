import {
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  SET_USER_AUTH,
  UPDATE_USER,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './constants';

export const getAuthPending = () => {
  return {
    type: GET_AUTH_PENDING
  };
};

export const getAuthSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthError = (error) => {
  return {
    type: GET_AUTH_ERROR,
    payload: error
  };
};
export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const setUserAuth = (data) => {
  return {
    type: SET_USER_AUTH,
    payload: data
  };
};

export const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data
  };
};

export const signUpPending = () => {
  return {
    type: SIGN_UP_PENDING
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS
  };
};

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error
  };
};
