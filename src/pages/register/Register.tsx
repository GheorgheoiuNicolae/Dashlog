import * as React from 'react';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { StateProps, DispatchProps, OwnProps } from './_register';
import { browserHistory } from 'react-router';
import PrivacyPolicyModal from '../../modals/PrivacyPolicy';
import TermsAndConditionsModal from '../../modals/TermsAndConditions';
const logo = require('../../assets/logo/complete-white.svg');

export type Props = StateProps & OwnProps & DispatchProps;
interface State {
  emailError: boolean;
  passwordError: boolean;
  termsAndConditionsError: boolean;
  privacyPolicyError: boolean;
}

export default class Login extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({
      emailError: false,
      passwordError: false,
      termsAndConditionsError: false,
      privacyPolicyError: false,
    });
  }

  submitForm = (v: any) => {
    const { register } = this.props;
    const user = {
      email: v.email,
      password: v.password,
    };
    register(user);
  }
  
  componentWillReceiveProps(next: any) {
    if (next.auth.user) {
      browserHistory.push('/entries');
    }

    // add field errors to state
    const { reduxForm } = this.props;
    this.setState({
      emailError: reduxForm.register && 
        reduxForm.register.syncErrors && reduxForm.register.syncErrors.email ? true : false,
      passwordError: reduxForm.register &&
        reduxForm.register.syncErrors && reduxForm.register.syncErrors.password ? true : false,
      termsAndConditionsError: reduxForm.register && 
        reduxForm.register.registeredFields.termsAndConditions.touched && 
        reduxForm.register.values && reduxForm.register.values.termsAndConditions !== true ? true : false,
      privacyPolicyError: reduxForm.register &&
        reduxForm.register.syncErrors && reduxForm.register.syncErrors.privacyPolicy ? true : false,
    });
  }

  render() {
    const { handleSubmit, auth, submitting, reduxForm, showModal, hideModal, activeModal } = this.props;
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

    const minLength = (value: any, min: number) => {
      return value && value.length < min 
        ? <small className="input-error">Password must contain at least {min} characters.</small> 
        : undefined;
    };

    const requireThruthy = (value: any, errText: string) => {
      return !value
        ? <small className="input-error">{errText}</small>
        : undefined;
    };

    return (
      <section className="public-pages">
        <div className="register">
          <div className="logo-wrap">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="box-content">
            <div className="box-header">
              <h6 className="h6">Register</h6>
            </div>
            <form onSubmit={handleSubmit(this.submitForm)}>
              {auth.registerError && (
                <h5 className="error">
                  {auth.registerError.message}
                </h5>
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
                    (v: any) => required(v, 'Email is required'),
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
                    (v: any) => required(v, 'Password is required'),
                    (v: any) => minLength(v, 6)
                  ]}
                />
              </div>

              <div className={`input-wrap checkbox`}>
                <Field
                  component={Checkbox}
                  // label={'I agree to terms and conditions.'}
                  name={`termsAndConditions`}
                  className="checkbox-wrapper"
                  validate={[
                    (v: any) => requireThruthy(v, 'Agreement required.')
                  ]}
                />
                <span>I agree to 
                  <b 
                    className="fake-link"
                    onClick={() => showModal('termsAndConditions')}
                  > terms and conditions
                  </b>.
                </span>
              </div>

              <div className={`input-wrap checkbox`}>
                <Field
                  component={Checkbox}
                  // label={'I agree to the privacy policy.'}
                  name={`privacyPolicy`}
                  className="checkbox-wrapper"
                  validate={[
                    (v: any) => requireThruthy(v, 'Agreement required.')
                  ]}
                />
                <span>I agree to 
                  <b className="fake-link" onClick={() => showModal('privacyPolicy')} > terms and conditions</b>.</span>
              </div>

              <RaisedButton
                fullWidth={true}
                disabled={emailError || passwordError || submitting || auth.isLoading 
                  || (reduxForm && reduxForm.register && 
                      reduxForm.register.values && !reduxForm.register.values.privacyPolicy)
                  || (reduxForm && reduxForm.register && 
                      reduxForm.register.values && !reduxForm.register.values.termsAndConditions)
                }
                type="submit"
                label="Register"
                primary={true}
                style={{ marginTop: '20px' }}
              />
            </form>
          </div>
          <footer>
            <Link className="styledRouterLink" to="/login" activeClassName="active">Login</Link>
          </footer>
        </div>

        <TermsAndConditionsModal 
          showModal={showModal}
          hideModal={hideModal}
          activeModal={activeModal}
        />
        <PrivacyPolicyModal
          showModal={showModal}
          hideModal={hideModal}
          activeModal={activeModal}
        />
      </section>
    );
  }
}