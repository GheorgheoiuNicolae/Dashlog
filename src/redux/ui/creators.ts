import { reset, change } from 'redux-form';

export const resetForm = (formName: any) => {
  return function (dispatch: any) {
    dispatch(reset(formName));
  };
};

export const setFieldValue = (formName: string, field: string, value: any) => {
  return function (dispatch: any) {
    dispatch(change('manageLabels', field, value));
  };
};