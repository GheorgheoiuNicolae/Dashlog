export const initialState = {
  ui: {
    selectedEntry: null,
    didInvalidate: false,
    showAddModal: false,
    showDeleteEntryModal: false,
    view: 'list',
    firstLoad: true,
    isLoading: {
      loading: false,
      type: null
    },
    allEntriesLoaded: false,
    numberOfEntries: null,
    shouldLoadOneYear: false,
    datesLoaded: {
      past: null,
      future: null,
    },
    filtersDrawerOpen: false,
    showFiltered: false,
    filteredEntries: [],
    filterBy: {
      date: {
        from: null,
        to: null,
      },
      kind: '',
      labels: [],
      hasDescription: null,
      hasImages: null,
      hasChecklist: null,
    },
    error: false,
  },
  byId: {},
  allIds: [],
  days: [],
  entriesCount: 0,
  allDates: [],
};