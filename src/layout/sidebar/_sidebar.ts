import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Sidebar from './Sidebar';
import { hideModal, showModal } from '../../redux/ui/actions';

export interface StateProps { }

export interface DispatchProps {
  hideModal: Function;
  showModal: Function;
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
  },
)(Sidebar);
