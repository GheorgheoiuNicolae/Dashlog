import * as React from 'react';
import PersonalDetails from './personalDetails/';

export default class UserProfile extends React.Component<{}, {}> {
  render() {
    return (
      <section className="user-profile">
        <PersonalDetails />
      </section>
    );
  }
}