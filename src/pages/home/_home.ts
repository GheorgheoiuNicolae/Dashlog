import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import { 
  logoutUser,
  removeEntry,
  loadMoreEntries,
  loadOneYear,
  onListScroll
} from '../../redux/actions';
import { currentDay } from './selectors';
import { Entry } from '../../redux/entries/interface';
import Home from './Home';

export interface StateProps {
  entries: Entry[];
  filteredEntries: any;
  user: any;
  numberOfEntries: number | null;
  view: String;
  isLoading: any;
  shouldLoadOneYear: boolean;
  labelsById: any;
  uiState: any;
  selectedEntry: any;
  showFiltered: boolean;
  currentDay: any;
  datesLoaded: {
    past: any,
    future: any,
  };
}
export interface DispatchProps {
  logoutUser: () => Function;
  removeEntry: any;
  loadMoreEntries: any;
  loadOneYear: Function;
  onListScroll: Function;
  selectEntry: Function;
  deselectEntry: Function;
}
export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      filteredEntries: state.entries.ui.filteredEntries,
      entries: state.entries.days,
      numberOfEntries: state.entries.ui.numberOfEntries,
      user: state.auth.user,
      view: state.entries.ui.view,
      showFiltered: state.entries.ui.showFiltered,
      currentDay: currentDay,
      datesLoaded: state.entries.ui.datesLoaded,
      isLoading: state.entries.ui.isLoading,
      shouldLoadOneYear: state.entries.ui.shouldLoadOneYear,
      labelsById: state.labels.byId,
      uiState: state.ui,
      selectedEntry: state.entries.ui.selectedEntry,
    };
  },
  {
    logoutUser,
    removeEntry,
    loadMoreEntries,
    loadOneYear,
    onListScroll
  },
)(Home);
