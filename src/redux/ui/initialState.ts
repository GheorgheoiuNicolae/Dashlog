import { UiState } from './interface';

export const initialState: UiState = {
  scrollDirection: '',
  entryListScrollFromTop: 0,
  location: null,
  modal: {
    name: '',
    data: null
  }
};