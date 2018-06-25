import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { FormState } from 'redux-form';
import { createResponsiveStateReducer } from 'redux-responsive';

import auth from './auth/reducer';
import { AuthState } from './auth/interface';

import ui from './ui/reducer';
import { UiState } from './ui/interface';

import labels from './labels/reducer';
import { LabelsState } from './labels/interface';

import entries from './entries/reducer';
import { EntriesState } from './entries/interface';

import quotes from './quotes/reducer';
import { QuotesState } from './quotes/interface';

export interface ApplicationState {
  routing: RouterState;
  form: FormState;
  browser: any;
  auth: AuthState;
  ui: UiState;
  labels: LabelsState;
  entries: EntriesState;
  quotes: QuotesState;
}

export const appReducers = combineReducers<ApplicationState>({
  form: formReducer,
  toastr: toastrReducer,
  auth,
  routing,
  ui,
  labels,
  entries,
  quotes,
  browser: createResponsiveStateReducer({
    xs: 500,
    sm: 700,
    md: 1000,
    lg: 1280,
    xl: 1400,
  }),
});
