import { browserHistory } from 'react-router';
import * as actions from './actions';
import * as firebase from 'firebase';
import * as uiActions from '../ui/actions';
import { firebaseDb, firebaseAuth, firebaseStorage } from '../../firebase';
import { toastr } from 'react-redux-toastr';
// import * as types from './types';

export function resetPasswordByEmail(email: string) {
  return function (dispatch: any) {
    dispatch(actions.resetPasswordByEmailStart());
    firebaseAuth.sendPasswordResetEmail(email)
      .then((res) => dispatch(actions.resetPasswordByEmailSuccess(res)))
      .catch((e) => (dispatch(actions.resetPasswordByEmailError(e))));
  };
}

export function login(user: any) {
  return function (dispatch: any) {
    dispatch(actions.loginStart());
    firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        dispatch(actions.loginSuccess(res));
        browserHistory.push('/entries');
        firebaseDb.ref().child(`users/${res.uid}/info`)
          .update({
            lastLoginDate: new Date()
          });
      })
      .catch((error) => {
        toastr.error('Error', 'Login Failed');
        dispatch(actions.loginError(error));
      });
  };
}

export function register(userDetails: { email: string, password: string }) {
  return (dispatch: any) => {
    dispatch(actions.registerStart());
    firebaseAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((user: any) => {
        firebaseDb.ref().child(`users/${user.uid}/info`)
          .set({
            email: user.email,
            uid: user.uid,
            registeredOn: new Date()
          }).then((res) => {
            
            // set a default entry
            let entryRef: any = firebaseDb.ref().child(`/entries/${user.uid}/list`).push();
            let newEntryKey = entryRef.getKey();
            const defaultEntry: any = {
              title: 'Joined Dashlog',
              dateTime: new Date().getTime(),
              date: new Date().setHours(0, 0, 0, 0),
              geoPlace: {
                latitude: 0,
                longitude: 0
              }
            };

            defaultEntry.id = newEntryKey;
            // Create the data we want to update
            var updatedEntryData: any = {};
            updatedEntryData[`entries/${user.uid}/totalEntries`] = 1;
            updatedEntryData[`entries/${user.uid}/allDates`] = [defaultEntry.date];
            updatedEntryData[`entries/${user.uid}/list/${newEntryKey}`] = defaultEntry;
            // Do a deep-path update
            firebaseDb.ref().update(updatedEntryData, function (error: any) {
              if (error) {
                console.error(error);
                toastr.error('Error', 'Something went wrong while saving.');
              } else {
                browserHistory.push('/entries');
                dispatch(actions.registerSuccess(res));
              }
            });
          });
      })
      .catch((error: any) => dispatch(actions.registerError(error)));
  };
}

export function fetchUser() {
  const request = fetchUserWatcher();
  return (dispatch: any) => {
    dispatch(actions.fetchUser(request));
  };
}
export const fetchUserWatcher = () => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user: any) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  });
};

export const logoutUser = () => {
  return (dispatch: any) => {
    firebaseAuth.signOut().then(() => dispatch(actions.logout()));
  };
};

export function uploadAvatar(file: any) {
  return function (dispatch: any) {
    dispatch(actions.uploadAvatarStart());
    const user = firebaseAuth.currentUser;
    if (user) {
      var uploadTask = firebaseStorage.ref().child(`avatars/${user.uid}`).put(file, {});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot: any) {
          // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        }, function (error: any) {
          dispatch(actions.uploadAvatarError(error));
        }, function () {
          var downloadURL = uploadTask.snapshot.downloadURL || '';
          updateUserImageUrl(dispatch, {
            photoURL: downloadURL
          });
          dispatch(actions.uploadAvatarSuccess(downloadURL));
        });
    }
  };
}

export function updateUserImageUrl(dispatch: any, data: any) {
  const user = firebaseAuth.currentUser;
  if (user) {
    user.updateProfile(data).then(function () {
      dispatch(actions.upadteUserPhotoURLSuccess());
      toastr.success('Success', 'Avatar successfully updated');
    }).catch(function (error: any) {
      toastr.error('Error', 'Something went wrong while updating your avatar');
      dispatch(actions.upadteUserPhotoURLError(error));
    });
  }
}

export function updateUserDisplayName(data: any) {
  const user = firebaseAuth.currentUser;
  data.email = user ? user.email : '';
  data.emailVerified = user ? user.emailVerified : false;
  return (dispatch: any) => {
    if (user) {
      user.updateProfile(data).then(function (res: any) {
        dispatch(actions.updateUserDisplayNameSuccess());
        toastr.success('Success', 'Your name successfully updated');
      }).catch(function (error: any) {
        toastr.error('Error', 'Something went wrong while saving.');
        dispatch(actions.updateUserDisplayNameError(error));
      });
    }
  };
}

export function updateUserEmail(email: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if (user) {
      user.updateEmail(email).then(function () {
        dispatch(actions.updateUserEmailSuccess());
        toastr.success('Success', 'Your email was updated. Please click the link in the email to verify it.');
      }).catch(function (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          dispatch(actions.requestAuth('changeEmail'));
        } else {
          toastr.error('Error', 'Something went wrong while saving.');
        }
        dispatch(actions.updateUserEmailError(error));
      });
    }
  };
}

export function reauthenticateUser(email: string, password: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if (user) {
      var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      user.reauthenticateWithCredential(credential).then(function (res: any) {
        dispatch(actions.reAuthSuccess());
        dispatch(uiActions.hideModal('requestAuth'));
      }).catch((error: any) => {
        dispatch(actions.reAuthError(error));
      });
    }
  };
}

export function sendConfirmationEmail() {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if (user) {
      user.sendEmailVerification().then(function () {
        // Email sent.
        toastr.success('Success', 'An email was sent with a confirmation link.');
        dispatch(actions.sendConfirmationEmailSuccess());
      }).catch(function (error: any) {
        // An error happened.
        toastr.error('Error', 'Could not submit confirmation email.');
        dispatch(actions.sendConfirmationEmailError(error));
      });
    }
  };
}

export function changePassword(newPassword: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if (user) {
      user.updatePassword(newPassword).then(function () {
        dispatch(actions.changePasswordSuccess());
        toastr.success('Success', 'Your password was changed successfully.');
      }).catch(function (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          dispatch(actions.requestAuth('changePassword'));
        } else {
          toastr.error('Error', 'Something went wrong while changing your password');
        }
        dispatch(actions.changePasswordError(error));
      });
    }
  };
}