import { deleteFromById, deleteFromAllIds } from '../../utils';
import * as types from './types';
import { initialState } from './initialState';
import { LabelsState } from './interface';

export default function reducer(state: LabelsState = initialState, action: any) {
  switch (action.type) {

    case types.LOAD_LABELS_START: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true
        }
      };
    }

    case types.LOAD_LABELS_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload
        },
        allIds: [
          ...state.allIds,
          ...Object.keys(action.payload).map((key) => {
            return key;
          }),
        ],
        ui: {
          ...state.ui,
          isLoading: false,
          firstLoad: false,
        }
      };
    }

    case types.RECEIVE_LABEL: {
      let newLabel: any = {};
      newLabel[action.payload.id] = { ...action.payload };

      return !state.ui.firstLoad ? {
        ...state,
        byId: {
          ...state.byId,
          ...newLabel,
        },
        allIds: [
          ...state.allIds,
          action.payload.id,
        ]
      } : state;
    }

    case types.REMOVE_LABEL_SUCCESS: {
      return {
        ...state,
        byId: deleteFromById(state.byId, action.payload),
        allIds: deleteFromAllIds(state.allIds, action.payload),
      };
    }

    case types.REMOVE_LABEL_ERROR: {
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload
        }
      };
    }

    case types.EDIT_LABEL: {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload
        },
      };
    }

    case types.HIDE_MANAGE_LABELS_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showManageLabelsModal: false
        }
      };
    }

    case types.SHOW_MANAGE_LABELS_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showManageLabelsModal: true
        }
      };
    }

    default: {
      return { ...state };
    }
  }
}