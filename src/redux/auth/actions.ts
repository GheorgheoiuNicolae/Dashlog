import * as types from './types';

export function resetPasswordByEmailStart() {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_START,
  };
}
export function resetPasswordByEmailError(error: any) {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_ERROR,
    payload: error
  };
}
export function resetPasswordByEmailSuccess(res: any) {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_SUCCESS
  };
}

export function loginStart() {
  return {
    type: types.LOGIN_START
  };
}
export function loginSuccess(res: any) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: res
  };
}
export function loginError(e: any) {
  return {
    type: types.LOGIN_ERROR,
    payload: e
  };
}

export function registerStart() {
  return {
    type: types.REGISTER_START
  };
}
export function registerSuccess(res: any) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: res
  };
}
export function registerError(e: any) {
  return {
    type: types.REGISTER_ERROR,
    payload: e
  };
}

export function fetchUser(request: any) {
  return {
    type: types.FETCH_FIREBASE_USER,
    payload: request,
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function uploadAvatarStart() {
  return {
    type: types.UPLOAD_AVATAR_START
  };
}
export function uploadAvatarSuccess(downloadUrl: string) {
  return {
    type: types.UPLOAD_AVATAR_SUCCESS,
    payload: downloadUrl
  };
}
export function uploadAvatarError(e: any) {
  return {
    type: types.UPLOAD_AVATAR_ERROR,
    payload: e
  };
}
export function upadteUserPhotoURLSuccess() {
  return {
    type: types.UPDATE_USER_PHOTO_URL_SUCCESS
  };
}
export function upadteUserPhotoURLError(e: any) {
  return {
    type: types.UPDATE_USER_PHOTO_URL_ERROR,
    payload: e
  };
}
export function validateAvatar() {
  return {
    type: types.VALIDATE_AVATAR
  };
}
export function updateUserDisplayNameSuccess() {
  return {
    type: types.UPDATE_USER_DISPLAY_NAME_SUCCESS
  };
}
export function updateUserDisplayNameError(e: any) {
  return {
    type: types.UPDATE_USER_DISPLAY_NAME_ERROR,
    payload: e
  };
}
export function updateUserEmailSuccess() {
  return {
    type: types.UPDATE_USER_EMAIL_SUCCESS
  };
}
export function updateUserEmailError(e: any) {
  return {
    type: types.UPDATE_USER_EMAIL_ERROR,
    payload: e
  };
}

export function requestAuth(reason: string) {
  return {
    type: types.REQUEST_AUTH,
    payload: reason
  };
}
export function reAuthSuccess() {
  return {
    type: types.REAUTH_SUCCESS
  };
}
export function reAuthError(e: any) {
  return {
    type: types.REAUTH_ERROR,
    payload: e,
  };
}

export function sendConfirmationEmailSuccess() {
  return {
    type: types.SEND_CONFIRMATION_EMAIL_SUCCESS
  };
}
export function sendConfirmationEmailError(e: any) {
  return {
    type: types.SEND_CONFIRMATION_EMAIL_ERROR,
    payload: e,
  };
}

export function changePasswordSuccess() {
  return {
    type: types.UPDATE_PASSWORD_SUCCESS
  };
}
export function changePasswordError(e: any) {
  return {
    type: types.UPDATE_PASSWORD_ERROR,
    payload: e,
  };
}
