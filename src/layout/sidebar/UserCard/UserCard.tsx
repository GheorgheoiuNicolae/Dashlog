import * as React from 'react';
import { Menu, MenuItem, IconButton } from 'material-ui';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { StateProps, DispatchProps, OwnProps } from './_userCard';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
const defaultAvatar = require('../../../assets/defaultAvatar-square.jpg');
import Settings from 'material-ui/svg-icons/action/settings';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  open: boolean;
  anchorEl: any;
  heightLarger: boolean;
}

export default class UserCard extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      heightLarger: true,
    };
  }

  logoutUser = () => {
    const { auth, logoutUser } = this.props;
    logoutUser(auth.user);
  }

  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.auth.user) {
      browserHistory.push('/login');
    }
  }

  handleTouchTap = (event: any) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  goToProfile = () => {
    browserHistory.push('/account');
  }

  onLoad = (item: any) => {
    const { validateAvatar } = this.props;
    this.setState({
      heightLarger: item.target.clientHeight >= item.target.clientWidth
    });
    validateAvatar();
  }

  renderAvatarImage() {
    const { auth } = this.props;
    const { heightLarger } = this.state;
    var maxWidth = {
      maxWidth: '100%'
    };
    var maxHeight = {
      maxHeight: '100%',
    };
    return auth.user.photoURL ? (
      <img
        className="avatar"
        src={auth.user.photoURL}
        onLoad={(e: any) => this.onLoad(e)}
        style={heightLarger ? maxWidth : maxHeight}
      />) : (
        <img 
          src={defaultAvatar}
          alt="defaultAvatar"
          className="defaultAvatar"
          style={heightLarger ? maxWidth : maxHeight}
        />
      );
  }

  render() {
    const { open, anchorEl, heightLarger } = this.state;
    const { auth } = this.props;
    return (
      <section className="User-Card">
        <div className="avatar-wrap">
          {/* <Avatar className="avatar" src={`${userAvatar}`} size={100} /> */}
          <Avatar className="avatarWrap" style={{ flexDirection: heightLarger ? 'column' : 'row' }}>
            {this.renderAvatarImage()}
          </Avatar>
        </div>
        <IconButton
          className="settings-button"
          onTouchTap={this.handleTouchTap}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            background: '#000',
          }}
        >
          <Settings color="#fff" width="20px" scale="80%" style={{height: '20px', width: '20px'}} />
        </IconButton>
        <div className="username">
          {auth.user.displayName
            ? <p> {auth.user.displayName} </p>
            : <p>{auth.user.email}</p>
          }
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.handleRequestClose()}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Settings" onClick={() => this.goToProfile()} />
            <MenuItem primaryText="Sign out" onClick={() => this.logoutUser()} />
          </Menu>
        </Popover>
      </section>
    );
  }
}
