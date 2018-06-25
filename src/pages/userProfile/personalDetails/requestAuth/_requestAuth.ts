import { connect } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import RequestAuth from './RequestAuth';
import { reduxForm } from 'redux-form';
import { hideModal, showModal } from '../../../../redux/ui/actions';
import { reauthenticateUser } from '../../../../redux/auth/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
  initialValues: any;
  destroy: any;
  reset: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  activeModal: string | null;
}

export interface DispatchProps {
  createEntry: (user: any, entry: any, allDates: any[], numberOfEntries: number) => {};
  hideModal: Function;
  showModal: Function;
  resetForm: Function;
  reauthenticateUser: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {

    return {
      auth: state.auth,
      activeModal: state.ui.modal.name,
    };
  },
  {
    hideModal,
    showModal,
    reauthenticateUser,
  },
)(reduxForm({
  form: 'requestAuth',
})(RequestAuth));
