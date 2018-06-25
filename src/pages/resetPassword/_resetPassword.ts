import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import ResetPassword from './ResetPassword';
import { reduxForm } from 'redux-form';
import { resetPasswordByEmail } from '../../redux/auth/creators';

export interface OwnOptionalProps {
  handleSubmit: any;
  submitting: boolean;
}
export interface OwnProps extends Partial<OwnOptionalProps> { }
export interface StateProps {
  requestedPasswordReset: boolean;
  reduxForm: any;
  auth: any;
}

export interface DispatchProps {
  resetPasswordByEmail: (email: string) => {};
}

export interface OwnProps { }

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      requestedPasswordReset: state.auth.requestedPasswordReset,
      reduxForm: state.form
    };
  },
  {
    resetPasswordByEmail,
  },
)(reduxForm({
  form: 'resetPassword',
})(ResetPassword));
