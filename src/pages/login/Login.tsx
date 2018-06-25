import * as React from 'react';

import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { StateProps, DispatchProps, OwnProps } from './_login';
import { browserHistory } from 'react-router';
const logo = require('../../assets/logo/complete-white.svg');

export type Props = StateProps & OwnProps & DispatchProps;
interface State {
  emailError: boolean;
  passwordError: boolean;
}

export default class Login extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({ 
      emailError: false,
      passwordError: false
    });
  }
  submitForm = (v: any) => {
    const { login } = this.props;
    const user = {
      email: v.email,
      password: v.password
    };
    login(user);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.user) {
      browserHistory.push('/authentication');
    }

    // add field errors to state
    const { reduxForm } = this.props;
    this.setState({
      emailError: reduxForm.login && reduxForm.login.syncErrors && reduxForm.login.syncErrors.email ? true : false,
      passwordError: reduxForm.login &&
        reduxForm.login.syncErrors && reduxForm.login.syncErrors.password ? true : false,
    });
  }

  render() {
    const { handleSubmit, auth, submitting } = this.props;
    const { emailError, passwordError } = this.state;

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
        <div className="login">
          <div className="logo-wrap">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="box-content">
            <div className="box-header">
              <h6 className="h6">Log into your account</h6>
            </div>
            <form onSubmit={handleSubmit(this.submitForm)}>
              {auth.loginError && (
                <div>
                  {auth.loginError.code === 'auth/wrong-password' ? (
                    <h5 className="error">
                      Wrong password
                    </h5>
                  ) : (
                      <h5 className="error">
                        {auth.loginError.message}
                      </h5>
                    )}
                </div>
              )}
              <div className={`input-wrap ${emailError ? 'has-error' : ''}`}>
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Email'}
                  fullWidth={true}
                  name="email"
                  className="input-wrapper input"
                  validate={[
                    (v: any) => required(v,'Email is required'),
                    (v: any) => email(v),
                  ]}
                />
              </div>
              <div className={`input-wrap ${passwordError ? 'has-error' : ''}`}>
                <Field
                  type="password"
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Password'}
                  fullWidth={true}
                  name="password"
                  className="input-wrapper input"
                  validate={[
                    (v: any) => required(v, 'Password is required')
                  ]}
                />
              </div>
              <RaisedButton
                fullWidth={true}
                disabled={emailError || passwordError || submitting || auth.isLoading}
                type="submit"
                label="Sign in"
                primary={true}
                style={{ marginTop: '20px' }}
              />
            </form>
          </div>
          <footer>
            <Link to="/register" activeClassName="active">Register</Link>
            <Link to="/resetPassword" activeClassName="active">*Reset password</Link>
          </footer>
        </div>
      </section>
    );
  }
}
