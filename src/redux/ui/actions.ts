import * as types from './types';

export const hideModal = (modalName: string) => ({
  type: types.HIDE_MODAL,
  payload: modalName,
});

export const showModal = (modalName: string, data?: any) => ({
  type: types.SHOW_MODAL,
  payload: {
    name: modalName,
    data
  },
});

export const switchEntriesView = (type: string) => ({
  type: types.SWITCH_ENTRIES_VIEW,
  payload: type,
});

export const onListScroll = (obj: any) => ({
  type: types.LIST_SCROLL,
  payload: obj,
});

export const getLocationSuccess = (location: any) => ({
  type: types.GET_LOCATION_SUCCESS,
  payload: location,
});
export const getLocationError = (err: any) => ({
  type: types.GET_LOCATION_ERROR,
  payload: err,
});

export const toggleFilterDrawer = () => ({
  type: types.TOGGLE_FILTERS_DRAWER
});
export const toggleSearch = () => ({
  type: types.TOGGLE_SEARCH
});