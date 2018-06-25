export interface UiState {
  entryListScrollFromTop: number;
  scrollDirection: string;
  location: null | {};
  modal: {
    name: string;
    data: any
  };
}