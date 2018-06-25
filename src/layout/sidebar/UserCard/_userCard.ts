import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import UserCard from './UserCard';
import { logoutUser } from '../../../redux/auth/creators';
import { validateAvatar } from '../../../redux/auth/actions';

export interface StateProps {
  auth: any;
  avatarValid: boolean;
}

export interface DispatchProps {
  logoutUser: (user: any) => {};
  validateAvatar: Function;
}

export interface OwnProps { }

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      avatarValid: state.auth.avatarValid
    };
  },
  {
    logoutUser,
    validateAvatar
  },
)(UserCard);
