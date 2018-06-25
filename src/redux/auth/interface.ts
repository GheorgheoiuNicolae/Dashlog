export interface User {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
}

export interface AuthState {
  isLoading: boolean;
  user: null | User;
  requestedPasswordReset: boolean;
  avatarValid: boolean;
  avatarUploadInProgress: boolean;
  requestAuth: boolean;
  requestAuthReason: 'changeEmail' | 'changePassword' | '';
  reauthError: any;
  updateEmailError: any;
  updatePasswordSuccess: boolean | null;
  updatePasswordError: any;
  loginError: any;
  registerError: any;
}