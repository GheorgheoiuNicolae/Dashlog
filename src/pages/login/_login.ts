import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Login from './Login';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/auth/creators';

export interface OwnOptionalProps {
  handleSubmit: any;
  pristine?: any;
  submitting?: boolean;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  reduxForm: any;
}

export interface DispatchProps {
  login: (user: any) => Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      reduxForm: state.form
    };
  },
  {
    login,
  },
)(reduxForm({
  form: 'login',
})(Login));
