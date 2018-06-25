import * as types from './types';
import { AuthState } from './interface';
import { authInitialState } from './initialState';

export default function reducer(state: AuthState = authInitialState, action: any) {
  switch (action.type) {

    case types.LOGIN_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        loginError: null,
      };
    }
    case types.LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        user: null,
        loginError: action.payload,
      };
    }

    case types.LOGOUT: {
      return {
        ...state,
        isLoading: false,
        user: null,
      };
    }

    case types.FETCH_FIREBASE_USER: {
      return { ...state, user: action.payload };
    }

    case types.REGISTER_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    }
    case types.REGISTER_ERROR: {
      return {
        ...state,
        isLoading: false,
        user: null,
        registerError: action.payload,
      };
    }

    case types.RESET_PASSWORD_BY_EMAIL_SUCCESS: {
      return {
        ...state,
        requestedPasswordReset: true,
      };
    }

    case types.CHECK_AUTH: {
      return {
        ...state,
        user: action.payload,
      };
    }
    // user profile
    case types.UPLOAD_AVATAR_START: {
      return {
        ...state,
        avatarUploadInProgress: true,
      };
    }
    case types.UPDATE_USER_PHOTO_URL_SUCCESS: {
      return {
        ...state,
        avatarValid: false,
      };
    }
    case types.VALIDATE_AVATAR: {
      return {
        ...state,
        avatarValid: true,
        avatarUploadInProgress: false,
      };
    }

    case types.REQUEST_AUTH: {
      return {
        ...state,
        requestAuthReason: action.payload
      };
    }

    case types.REAUTH_SUCCESS: {
      return {
        ...state,
        requestAuth: false,
        requestAuthReason: '',
        reauthError: null,
      };
    }
    case types.REAUTH_ERROR: {
      return {
        ...state,
        reauthError: action.payload,
      };
    }

    case types.UPDATE_USER_EMAIL_ERROR: {
      return {
        ...state,
        updateEmailError: action.payload
      };
    }

    case types.UPDATE_USER_EMAIL_SUCCESS: {
      return {
        ...state,
        updateEmailError: null,
        reauthError: null,
      };
    }

    case types.UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        updatePasswordError: action.payload,
      };
    }

    case types.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordSuccess: true,
      };
    }

    default: {
      return state;
    }
  }
}