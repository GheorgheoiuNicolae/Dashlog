import {
  deleteFromById,
  deleteFromAllIds,
  deleteFromDays
} from '../../utils';
import * as types from './types';
import * as uiTypes from '../ui/types';
import * as authTypes from '../auth/types';
import { initialState } from './initialState';
import { EntriesState } from './interface';
import { mapEntriesToDays } from './parseEntries';
import { filterEntries } from './filterEntries';

export default function reducer(state: EntriesState = initialState, action: any) {
  switch (action.type) {
    case uiTypes.TOGGLE_FILTERS_DRAWER: {
      return {
        ...state,
        ui: {
          ...state.ui,
          filtersDrawerOpen: !state.ui.filtersDrawerOpen,
        }
      };
    }
    
    case types.SHOULD_LOAD_ONE_YEAR: {
      return {
        ...state,
        ui: {
          ...state.ui,
          shouldLoadOneYear: true,
        }
      };
    }

    case types.DISABLE_LOAD_ONE_YEAR: {
      return {
        ...state,
        ui: {
          ...state.ui,
          shouldLoadOneYear: false,
        }
      };
    }

    case types.FILTER_ENTRIES: {
      const allEntries = { ...state.byId, ...action.payload.entries };
      // const days = [...state.days];
      return {
        ...state,
        ui: {
          ...state.ui,
          showFiltered: true,
          filterBy: { ...action.payload },
          // inefficient - should be changed sometime
          filteredEntries: filterEntries(mapEntriesToDays(allEntries), action.payload),
        },
      };
    }

    case types.RECEIVE_ENTRIES: {
      console.log('receive entries: ', action.payload);
      const allEntries = { ...state.byId, ...action.payload.entries };
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.entries
        },

        allIds: [
          ...state.allIds,
          ...Object.keys(action.payload.entries).map((key) => {
            return key;
          }),
        ],

        days: mapEntriesToDays(allEntries),

        ui: {
          ...state.ui,
          firstLoad: false,
          isLoading: {
            loading: false,
            type: null,
          },
          // WARNING - not supported by IE9 or lower
          numberOfEntries: action.payload.entries ? Object.keys(action.payload.entries).length : null,
          datesLoaded: {
            past: action.payload.dates.past
              ? action.payload.dates.past
              : state.ui.datesLoaded.past,
            future: action.payload.dates.future
              ? action.payload.dates.future
              : state.ui.datesLoaded.future,
          }
        }
      };
    }

    case types.RECEIVE_ALL_ENTRIES: {
      const allEntries = { ...state.byId, ...action.payload.entries };
      return {
        ...state,
        byId: {
          ...action.payload.entries
        },

        allIds: [
          ...Object.keys(action.payload.entries).map((key) => {
            return key;
          }),
        ],

        days: mapEntriesToDays(allEntries),

        ui: {
          ...state.ui,
          firstLoad: false,
          allEntriesLoaded: true,
          isLoading: {
            loading: false,
            type: null,
          },
          // WARNING - not supported by IE9 or lower
          numberOfEntries: action.payload.entries ? Object.keys(action.payload.entries).length : null,
          // may need to remove the dates
        }
      };
    }

    case types.LOAD_ENTRIES_START: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: {
            loading: true,
            type: action.payload
          },
        }
      };
    }

    case types.RECEIVE_ENTRY: {
      const allEntries = { ...state.byId };
      allEntries[action.payload.id] = action.payload;

      return !state.ui.firstLoad ? {
        ...state,
        byId: allEntries,
        allIds: [
          ...state.allIds,
          action.payload.id,
        ],
        days: mapEntriesToDays(allEntries),
        ui: {
          ...state.ui,
          numberOfEntries: state.allIds.length + 1,
        }
      } : state;
    }

    case types.REMOVE_ENTRY_SUCCESS: {
      return {
        ...state,
        byId: deleteFromById(state.byId, action.payload),
        allIds: deleteFromAllIds(state.allIds, action.payload),
        days: deleteFromDays(state.days, action.payload),
        entriesCount: state.entriesCount - 1,
        ui: {
          ...state.ui,
          numberOfEntries: state.allIds.length + 1,
        }
      };
    }

    case types.EDIT_ENTRY: {
      let newState = { ...state };
      newState.byId[action.payload.id] = action.payload;
      // push updates to days array and to filtered days if they exist
      newState.days.forEach((day: any) => {
        let editedEntry = day.entries.find((entry: any) => entry.id === action.payload.id);
        if (editedEntry) {
          let idx = day.entries.indexOf(editedEntry);
          day.entries[idx] = action.payload;
        }
      });

      newState.ui.filteredEntries.forEach((day: any) => {
        let editedEntry = day.entries.find((entry: any) => entry.id === action.payload.id);
        if (editedEntry) {
          let idx = day.entries.indexOf(editedEntry);
          day.entries[idx] = action.payload;
        }
      });

      return {
        ...state,
        days: newState.days,
      };
    }

    case types.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        entriesCount: state.entriesCount + 1
      };
    }

    case types.LOAD_ENTRIES_COUNT_SUCCESS: {
      return {
        ...state,
        entriesCount: action.payload
      };
    }

    case types.LOAD_ENTRIES_DATES_SUCCESS: {
      return {
        ...state,
        allDates: action.payload
      };
    }

    case types.SELECT_ENTRY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntry: action.payload
        }
      };
    }
    case types.DESELECT_ENTRY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntry: null
        }
      };
    }

    case uiTypes.HIDE_MODAL: {
      switch (action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              ...state.ui,
              showAddModal: false
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case uiTypes.SHOW_MODAL: {
      switch (action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              ...state.ui,
              showAddModal: true
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case uiTypes.SWITCH_ENTRIES_VIEW: {
      return {
        ...state,
        ui: {
          ...state.ui,
          view: action.payload,
        }
      };
    }

    case authTypes.LOGOUT: {
      return {
        ...initialState
      };
    }

    default: {
      return { ...state };
    }
  }
}