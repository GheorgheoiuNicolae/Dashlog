// import * as types from './types';
import { initialState } from './initialState';
import { QuotesState } from './interface';

export default function reducer(state: QuotesState = initialState, action: any) {
  switch (action.type) {

    // case types.SHOW_MANAGE_LABELS_MODAL: {
    //   return {
    //     ...state,
    //     ui: {
    //       ...state.ui,
    //       showManageLabelsModal: true
    //     }
    //   };
    // }

    default: {
      return { ...state };
    }
  }
}