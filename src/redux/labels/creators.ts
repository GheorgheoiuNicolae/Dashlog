import { firebaseDb } from '../../firebase';
import * as actions from './actions';

export const getLabels = (uid: string) => {
  return function (dispatch: any) {
    dispatch(actions.loadLabelsStart());
    firebaseDb
      .ref()
      .child(`labels/${uid}`)
      .once('value', (snapshot) => {
        const labels = snapshot.val() || [];
        dispatch(actions.loadLabelsSuccess(labels));
      }
      );
  };
};

export const receiveLabel = (uid: string) => {
  return function (dispatch: any) {
    firebaseDb.ref()
      .child(`labels/${uid}`)
      .limitToLast(1)
      .on('child_added', (snapshot: any) => {
        const label = snapshot.val();
        dispatch(actions.receiveLabel(label));
      });
  };
};

export const createLabel = (data: any, uid: string) => {
  return function (dispatch: any) {
    let labelsRef: any = firebaseDb
      .ref()
      .child(`labels/${uid}`)
      .push();

    const pushkey = labelsRef.getKey();
    data.id = pushkey;
    labelsRef.set(data);
  };
};

export const editLabel = (data: any, uid: string) => {
  return function (dispatch: any) {
    firebaseDb
      .ref()
      .child(`labels/${uid}/${data.id}`)
      .update(data);
    dispatch(actions.editLabel(data));
  };
};

export const removeLabel = (data: any, uid: string) => {
  return function (dispatch: any) {
    firebaseDb
      .ref()
      .child(`labels/${uid}/${data.id}`)
      .remove()
      .then(function (res: any) {
        dispatch(actions.removeLabelSuccess(data));
      })
      .catch(function (error: any) {
        dispatch(actions.removeLabelError(error));
      });
  };
};