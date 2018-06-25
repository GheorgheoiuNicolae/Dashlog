import { AuthState } from './interface';

export const authInitialState: AuthState = {
  isLoading: false,
  user: null,
  loginError: null,
  registerError: null,
  requestedPasswordReset: false,
  avatarValid: true,
  avatarUploadInProgress: false,
  requestAuth: false,
  requestAuthReason: '',
  reauthError: null,
  updateEmailError: null,
  updatePasswordError: null,
  updatePasswordSuccess: null,
};