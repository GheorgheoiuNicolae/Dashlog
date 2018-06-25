import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../redux/reducers';
import Sidebar from '../../layout/sidebar';
import {
  getAllEntries, getEntryOnChildAdded,
  getEntriesCount, getEntriesDates
} from '../../redux/entries/creators';
import { getLabels, receiveLabel } from '../../redux/labels/creators';
import { getLocation } from '../../redux/ui/creators';

interface StateProps {
  auth: any;
  pathname: string;
}
interface DispatchProps {
  getAllEntries: Function;
  getEntryOnChildAdded: Function;
  getEntriesCount: Function;
  getEntriesDates: Function;
  getLabels: Function;
  getLocation: Function;
  receiveLabel: Function;
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
      receiveLabel,
      getLabels,
      getLocation,
      getAllEntries
    } = this.props;

    // get the initial entries
    getAllEntries(auth.user.uid);

    getEntriesCount(auth.user.uid);
    // get the array with dates of all the entries
    getEntriesDates(auth.user.uid);
    // get the newly added entry
    getEntryOnChildAdded(auth.user.uid);
    // get all labels 
    getLabels(auth.user.uid);
    // get newly added label
    receiveLabel(auth.user.uid);

    getLocation();
  }

  render() {
    const { 
      children, 
      pathname
      // auth
    } = this.props;
    return (
      <section className="Dashboard">
        <section className="App-Content">
          <div className="wallpaper" style={{ width: pathname === '/today' ? 'initial' : '200px', opacity: 1 }} />
          <div className="wallpaper-faded" style={{ width: pathname === '/today' ? 'initial' : '200px', opacity: 1 }} />
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
      pathname: state.routing.locationBeforeTransitions.pathname
    };
  },
  {
    getAllEntries,
    getEntryOnChildAdded,
    getEntriesCount,
    getEntriesDates,
    getLabels,
    getLocation,
    receiveLabel
  },
)(Dashboard);
