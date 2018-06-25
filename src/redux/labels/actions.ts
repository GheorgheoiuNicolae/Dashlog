import * as types from './types';

export const loadLabelsStart = () => ({
  type: types.LOAD_LABELS_START
});

export const loadLabelsSuccess = (labels: any[]) => ({
  type: types.LOAD_LABELS_SUCCESS,
  payload: labels
});

export const loadLabelsError = (e: any) => ({
  type: types.LOAD_LABELS_ERROR,
  payload: e
});

export const receiveLabel = (label: any) => ({
  type: types.RECEIVE_LABEL,
  payload: label
});

export const editLabel = (data: any) => ({
  type: types.EDIT_LABEL,
  payload: data,
});

export const removeLabelSuccess = (data: any) => ({
  type: types.REMOVE_LABEL_SUCCESS,
  payload: data,
});

export const removeLabelError = (e: any) => ({
  type: types.REMOVE_LABEL_ERROR,
  payload: e,
});

export const showManageLabelsModal = () => ({
  type: types.SHOW_MANAGE_LABELS_MODAL
});
export const hideManageLabelsModal = () => ({
  type: types.HIDE_MANAGE_LABELS_MODAL
});
