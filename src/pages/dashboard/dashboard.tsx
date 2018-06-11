import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../redux/reducers';
import Sidebar from '../../layout/sidebar';
import {
  getInitialEntries, getEntryOnChildAdded,
  getEntriesCount, getEntriesDates
} from '../../redux/entries/creators';

interface StateProps {
  auth: any;
}
interface DispatchProps {
  getInitialEntries: Function;
  getEntryOnChildAdded: Function;
  getEntriesCount: Function;
  getEntriesDates: Function;
}
interface OwnOptionalProps {}
interface OwnProps extends Partial<OwnOptionalProps> { }

type Props = StateProps & DispatchProps & OwnProps;

class Dashboard extends React.Component<Props, {}> {
  componentWillMount() {
    const { 
      auth,
      getEntryOnChildAdded,
      getEntriesCount,
      getEntriesDates,
    } = this.props;

    getEntriesCount(auth.user.uid);
    // get the array with dates of all the entries
    getEntriesDates(auth.user.uid);
    // get the newly added entry
    getEntryOnChildAdded(auth.user.uid);
    // make initial api calls or connect to firebase
  }

  render() {
    const { 
      children, 
      // auth
    } = this.props;
    return (
      <section className="Dashboard">
        <section className="App-Content">
          <div className="wallpaper" />
          <div className="wallpaper-faded" />
          <Sidebar />
          <section className="page-wrap">
            {children}
          </section>
        </section>
      </section>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
    };
  },
  {
    getInitialEntries,
    getEntryOnChildAdded,
    getEntriesCount,
    getEntriesDates,
  },
)(Dashboard);
