import * as React from 'react';
import { FlatButton, Divider, RaisedButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './_sidebar';
import { Link } from 'react-router';
import AddEntryForm from '../../modals/AddEntry/';
import UserCard from './UserCard/';

import Dashboard from 'material-ui/svg-icons/action/dashboard';
import List from 'material-ui/svg-icons/action/list';
import MyLocation from 'material-ui/svg-icons/maps/my-location';
import Add from 'material-ui/svg-icons/content/add';

const logo = require('../../assets/logo/full-dark.svg');

export type Props = StateProps & OwnProps & DispatchProps;

export default class Sidebar extends React.Component<Props, {}> {

  render() {
    const { showModal } = this.props;
    return (
      <aside className="sidebar">
        <div className="menu-toggle" >
          <div className="logo-wrap">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </div>
        <UserCard />
        <Divider style={{ background: '#232527' }} />
        <FlatButton
          className="flat-button"
          style={{ maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px' }}
          children={
            <Link to="/today" className="menu-button">
              <Dashboard color="#c1c4ce" />
              <span className="button-text">Today</span>
            </Link>
          }
        />
        <FlatButton
          className="flat-button"
          style={{ maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px' }}
          children={
            <Link to="/entries" className="menu-button">
              <List color="#c1c4ce" />
              <span className="button-text">Entry List</span>
            </Link>
          }
        />

        <FlatButton
          className="flat-button"
          style={{ maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px' }}
          children={
            <Link to="/goals" className="menu-button">
              <MyLocation color="#c1c4ce" />
              <span className="button-text">Goals</span>
            </Link>
          }
        />

        <Divider style={{ background: '#232527' }} />

        <AddEntryForm />

        <div className="button-wrapper">
          <RaisedButton
            style={{ color: '#fff' }}
            primary={true}
            label="Add Entry"
            labelPosition="after"
            onTouchTap={() => showModal('addEntry')}
            icon={<Add style={{ color: '#fff' }} />}
          />
        </div>
      </aside>
    );
  }
}
