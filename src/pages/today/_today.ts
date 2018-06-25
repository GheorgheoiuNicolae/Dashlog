import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Today from './Today';
import { Entry } from '../../redux/entries/interface';
import { getTodayEntries, getUpcomingEntries } from './selectors';
import { removeEntry } from '../../redux/entries/creators';
import { Quote } from '../../redux/quotes/interface';

export interface OwnOptionalProps { }

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  user: any;
  entries: Entry[];
  upcomingEntries: Entry[];
  labelsById: any;
  quotes: Quote[];
}

export interface DispatchProps {
  removeEntry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
      entries: getTodayEntries(state),
      upcomingEntries: getUpcomingEntries(state),
      labelsById: state.labels.byId,
      quotes: state.quotes.all
    };
  },
  {
    removeEntry
  },
)(Today);
