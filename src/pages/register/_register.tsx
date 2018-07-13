import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Register from './Register';
import { reduxForm } from 'redux-form';
import { register } from '../../redux/auth/creators';
import { showModal, hideModal } from '../../redux/ui/actions';

export interface OwnOptionalProps {
  handleSubmit: any;
  submitting: boolean;
}
export interface OwnProps extends Partial<OwnOptionalProps> { }
export interface StateProps {
  auth: any;
  reduxForm: any;
  activeModal: any;
}
export interface DispatchProps {
  register: (user: any) => Function;
  showModal: Function;
  hideModal: Function;
}

export interface OwnProps { }

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      activeModal: state.ui.modal,
      reduxForm: state.form
    };
  },
  {
    register,
    showModal,
    hideModal,
  },
)(reduxForm({
  form: 'register',
})(Register));
