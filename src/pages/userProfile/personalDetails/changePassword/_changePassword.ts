import { connect } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import ChangePassword from './ChangePassword';
import { reduxForm } from 'redux-form';
import { uploadAvatar } from '../../../../redux/auth/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
}

export interface DispatchProps {
  uploadAvatar: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
    };
  },
  {
    uploadAvatar,
  },
)(reduxForm({
  form: 'changePassword',
})(ChangePassword));
