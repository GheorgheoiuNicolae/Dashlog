import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Header from './Header';
import { hideModal, showModal, switchEntriesView, toggleFilterDrawer, toggleSearch } from '../../redux/ui/actions';

export interface StateProps { }

export interface DispatchProps {
  hideModal: Function;
  showModal: Function;
  switchEntriesView: Function;
  toggleFilterDrawer: Function;
  toggleSearch: Function;
}

export interface OwnProps { }

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
    };
  },
  {
    hideModal,
    showModal,
    switchEntriesView,
    toggleFilterDrawer,
    toggleSearch,
  },
)(Header);
