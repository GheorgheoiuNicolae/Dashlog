import * as React from 'react';

import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { StateProps, DispatchProps, OwnProps } from './_resetPassword';
const logo = require('../../assets/logo/complete-white.svg');
export type Props = StateProps & OwnProps & DispatchProps;

interface State { emailError: boolean; }

export default class ResetPasword extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({
      emailError: false
    });
  }
  submitForm = (v: any) => {
    const { resetPasswordByEmail } = this.props;
    resetPasswordByEmail(v.email);
  }

  componentWillReceiveProps(next: any) {
    // add field errors to state
    const { reduxForm } = this.props;
    this.setState({
      emailError: reduxForm.resetPassword &&
        reduxForm.resetPassword.syncErrors && reduxForm.resetPassword.syncErrors.email ? true : false
    });
  }

  render() {
    const { handleSubmit, requestedPasswordReset } = this.props;
    const { emailError } = this.state;

    const required = (value: any, message?: string) => {
      return value ? undefined :
        (message
          ? (<small className="input-error">{message}</small>)
          : (<small className="input-error">'Required'</small>)
        );
    };

    const email = (value: any) => {
      return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? <small className="input-error">Invalid email address.</small>
        : undefined;
    };
    return (
      <section className="public-pages">
        <div className="reset-password">
          <div className="logo-wrap">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="box-content">
            <div className="box-header">
              <h6 className="h6">Reset Password</h6>
            </div>
            {!requestedPasswordReset
              ? <form onSubmit={handleSubmit(this.submitForm)}>
                <div className={`input-wrap ${emailError ? 'has-error' : ''}`}>
                  <Field
                    component={TextField}
                    floatingLabelFixed={true}
                    floatingLabelText={'Email'}
                    fullWidth={true}
                    name="email"
                    className="input-wrapper input"
                    validate={[
                      (v: any) => required(v, 'Email is required'),
                      (v: any) => email(v),
                    ]}
                  />
                </div>
                <RaisedButton
                  fullWidth={true}
                  type="submit"
                  label="Reset"
                  primary={true}
                  style={{ marginTop: '20px' }}
                />
              </form>
              : <p>Follow the link we sent via email to reset your password.</p>}
          </div>
          <footer>
            <Link to="/login" className="styledRouterLink" activeClassName="active">Login</Link>
          </footer>
        </div>
      </section>
    );
  }
}
