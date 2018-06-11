import { firebaseDb } from '../../firebase';
import * as actions from './actions';
import { browserHistory } from 'react-router';

export const getInitialEntries = (uid: string) => {
  const today = new Date().setHours(0, 0, 0, 0);

  const dates = {
    past: today - 1000 * 60 * 60 * 24 * 14,
    future: today + 1000 * 60 * 60 * 24 * 14,
  };

  return function (dispatch: any) {
    dispatch(actions.loadEntriesStart('initial'));
    firebaseDb.ref()
      .child(`entries/${uid}/list`)
      .orderByChild('date')
      // .startAt(dates.past)
      // .endAt(dates.future)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        if (entries) {
          dispatch(actions.loadEntriesSuccess(entries, dates));

          // check length for initial load
          var size = 0;
          for (let key in entries) {
            if (entries.hasOwnProperty(key)) {
              size++;
            }
          }
          if (size < 10) {
            dispatch(loadMoreEntries(uid, 'past', dates.past));
          }
        } else {
          dispatch(actions.loadEntriesSuccess([], dates));
        }
      });
  };
};

export const getEntriesCount = (uid: string) => {
  return function (dispatch: any) {
    dispatch(actions.loadEntriesCountStart());
    firebaseDb.ref()
      .child(`entries/${uid}/totalEntries`)
      .once('value', (snapshot) => {
        const entriesCount = snapshot.val();
        if (entriesCount) {
          dispatch(actions.loadEntriesCountSuccess(entriesCount));
        } else {
          dispatch(actions.loadEntriesCountSuccess(0));
        }
      });
  };
};

export const getEntriesDates = (uid: string) => {
  return function (dispatch: any) {
    dispatch(actions.loadEntriesDatesStart());
    firebaseDb.ref()
      .child(`entries/${uid}/allDates`)
      .once('value', (snapshot) => {
        const allDates = snapshot.val();
        if (allDates) {
          dispatch(actions.loadEntriesDatesSuccess(allDates));
        } else {
          dispatch(actions.loadEntriesDatesSuccess([]));
        }
      });
  };
};

export const loadMoreEntries = (uid: string, direction: any, date: any) => {
  const fifteenDays = 1000 * 60 * 60 * 24 * 14;

  if (direction === 'future') {
    // load more future entries
    return function (dispatch: any) {
      dispatch(actions.loadEntriesStart('future'));

      firebaseDb.ref()
        .child(`entries/${uid}/list`)
        .orderByChild('date')
        .startAt(date + 24 * 60 * 60 * 1000)
        .endAt(date + fifteenDays)
        .once('value', (snapshot) => {
          const entries = snapshot.val();
          // console.log('FUTURE - Getting entries for the period: ', 
          // new Date(date + fifteenDays), date + fifteenDays, ' - ', 
          // new Date(date + 24 * 60 * 60 * 1000), date + 24 * 60 * 60 * 1000);
          if (entries) {
            dispatch(actions.loadEntriesSuccess(entries, { future: date + fifteenDays }));
          } else {
            dispatch(actions.loadEntriesSuccess([], { future: date + fifteenDays }));
          }
        });
    };
  } else {
    // load more entries from the past
    return function (dispatch: any) {
      dispatch(actions.loadEntriesStart('past'));
      firebaseDb.ref()
        .child(`entries/${uid}/list`)
        .orderByChild('date')
        .startAt(date - fifteenDays)
        .endAt(date - 24 * 60 * 60 * 1000)
        .once('value', (snapshot) => {
          const entries = snapshot.val();
          if (entries) {
            dispatch(actions.loadEntriesSuccess(entries, { past: date - fifteenDays }));
          } else {
            dispatch(actions.loadEntriesSuccess([], { past: date - fifteenDays }));
          }
        });
    };
  }
};

// load one year in the past to make sure the user does not have entries
export const loadOneYear = (uid: string, direction: any, date: any) => {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  return function (dispatch: any) {
    dispatch(actions.loadEntriesStart('past'));
    dispatch(actions.disableLoadOneYear());
    firebaseDb.ref()
      .child(`entries/${uid}/list`)
      .orderByChild('date')
      .startAt(date - oneYear)
      .endAt(date -
        24 * 60 * 60 * 1000)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        if (entries) {
          dispatch(actions.loadEntriesSuccess(entries, { past: date - oneYear }));
        } else {
          dispatch(actions.loadEntriesSuccess([], { past: date - oneYear }));
        }
      });
  };
};

export const getEntryOnChildAdded = (uid: string) => {
  return function (dispatch: any) {
    firebaseDb.ref()
      .child(`entries/${uid}/list`)
      .limitToLast(1)
      .on('child_added', (snapshot: any) => {
        const entry = snapshot.val();
        dispatch(actions.receiveEntry(entry));
      });
  };
};

export const removeAllCollections = () => {
  firebaseDb.ref().remove();
};

export const createEntry = (uid: string, data: any, allDates: any[], entriesCount: number) => {

  // for (let i = 0; i < 1000; i++) {
  //   const entry = {
  //     date: 1548585280775,
  //     dateTime: 1548585280775,
  //     geoPlace: {
  //       latitude: 45.6579755,
  //       longitude: 25.6011977
  //     },
  //     labels: ['LEREGdqfHnxEOstXcJ7'],
  //     title: `Entry ${i}`,
  //     name: `Entry ${i}`,
  //   };
  //   let entryRef: any = firebaseDb
  //     .ref()
  //     .child(`entries/${uid}/list`)
  //     .push();
  //   let newEntryKey = entryRef.getKey();
  //   data.id = newEntryKey;

  //   firebaseDb.ref().child(`entries/${uid}/list/${newEntryKey}`).set(entry, function(err: any) {
  //     if (err) {
  //       console.log('err saving: ', err);
  //     } else {
  //       console.log('successfully saved');
  //     }
  //   });

  // }

  return function (dispatch: any) {
    let entryRef: any = firebaseDb
      .ref()
      .child(`entries/${uid}/list`)
      .push();
    let newEntryKey = entryRef.getKey();
    data.id = newEntryKey;
    // Create the data we want to update
    var updatedEntryData: any = {};
    updatedEntryData[`entries/${uid}/totalEntries`] = entriesCount;
    updatedEntryData[`entries/${uid}/allDates`] = allDates;
    updatedEntryData[`entries/${uid}/list/${newEntryKey}`] = data;
    // Do a deep-path update
    firebaseDb.ref().update(updatedEntryData, function (error: any) {
      if (error) {
        console.log('Error updating data:', error);
      } else {
        dispatch(actions.createEntrySuccess(data.dateTime));
      }
    });
  };
};

export const editEntry = (uid: string, data: any, allDates: number[]) => {
  return function (dispatch: any) {
    var updatedEntryData: any = {};
    updatedEntryData[`entries/${uid}/allDates`] = allDates;
    updatedEntryData[`entries/${uid}/list/${data.id}`] = data;
    // Do a deep-path update
    firebaseDb.ref().update(updatedEntryData, function (error: any) {
      if (error) {
        console.log('Error updating data:', error);
      } else {
        dispatch(actions.saveEntryEdits(data));
      }
    });
  };
};

export const removeEntry = (uid: any, data: any, entriesCount: number, allDates: any[]) => {
  return function (dispatch: any) {
    var updates: any = {};
    updates[`entries/${uid}/totalEntries`] = entriesCount;
    updates[`entries/${uid}/allDates`] = allDates;
    updates[`entries/${uid}/list/${data.id}`] = null;

    // Do a deep-path update
    firebaseDb.ref().update(updates, function (error: any) {
      if (error) {
        console.log('Error updating data:', error);
      } else {
        dispatch(actions.removeEntrySuccess(data));
        browserHistory.push('/entries');
      }
    });
  };
};

export const getAllEntries = (uid: string) => {
  return function (dispatch: any) {
    dispatch(actions.loadEntriesStart('initial'));
    firebaseDb.ref()
      .child(`entries/${uid}/list`)
      .orderByChild('date')
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        if (entries) {
          dispatch(actions.loadAllEntriesSuccess(entries));
        }
      });
  };
};
