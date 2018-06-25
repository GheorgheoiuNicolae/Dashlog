export interface Entry {
  id: string;
  name: string;
  description: string;
  date: number;
  dateTime: number;
  geo: {
    latitude: number;
    longitude: number;
  };
  labels: string[];
  checkList: ChecklistItem[];
}
interface ChecklistItem {
  text: string;
  done: boolean;
}

export interface EntriesState {
  allIds: number[] | string[];
  ui: {
    selectedEntry: any;
    didInvalidate: boolean;
    showAddModal: boolean;
    showDeleteEntryModal: boolean;
    showFiltered: boolean;
    filterBy: EntriesFilterBy;
    filteredEntries: any[];
    filtersDrawerOpen: boolean;
    error: boolean;
    view: string;
    firstLoad: boolean;
    numberOfEntries: number | null;
    isLoading: {
      loading: boolean;
      type: 'initial' | 'future' | 'past' | null;
    };
    allEntriesLoaded: boolean,
    shouldLoadOneYear: boolean;
    datesLoaded: {
      past: any,
      future: any,
    }
  };
  byId: any;
  days: any[];
  entriesCount: number;
  allDates: any[];
}

export interface EntriesFilterBy {
  date: {
    from?: Date | null;
    to?: Date | null;
  };
  kind: any;
  labels: any[];
  hasDescription: boolean | null;
  hasImages: boolean | null;
  hasChecklist: boolean | null;
}