import * as React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './_requestAuth';
import Close from 'material-ui/svg-icons/navigation/close';

export type Props = StateProps & OwnProps & DispatchProps;

export default class RequestAuth extends React.PureComponent<Props, {}> {
  handleSubmit = (values: any) => {
    const { auth, reauthenticateUser } = this.props;
    reauthenticateUser(auth.user.email, values.password);
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  render() {
    const {
      handleSubmit,
      activeModal,
      auth,
    } = this.props;

    return (
      <Dialog
        modal={true}
        open={activeModal === 'requestAuth'}
        onRequestClose={() => this.closeModal('requestAuth')}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: '0' }}
      >
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <ModalHeader className="modal-header">
            <h5 className="h5">Authenticate</h5>
            <Close className="close-icon" onClick={() => this.closeModal('requestAuth')} />
          </ModalHeader>
          <ModalContent>
            {auth.reauthError && auth.reauthError.code === 'auth/wrong-password' &&
              <Error>
                Password is incorrect.
              </Error>
            }
            <h3 style={{ textAlign: 'center' }}>
              In order to complete this action you need to authenticate by typing your password below.
            </h3>
            <InputWrap>
              <Field
                component={TextField}
                floatingLabelFixed={true}
                type="password"
                floatingLabelText={'Password'}
                fullWidth={true}
                name={'password'}
                className="input-wrapper input"
                autoFocus={true}
              />
            </InputWrap>
          </ModalContent>
          <ModalFooter>
            <FlatButton
              label="Cancel"
              primary={false}
              onClick={() => this.closeModal('requestAuth')}
              style={{ margin: '10px 10px 0 0' }}
            />
            <RaisedButton
              label="Submit"
              secondary={true}
              className="successButton"
              onClick={handleSubmit(this.handleSubmit.bind(this))}
              style={{ margin: '10px 10px 0 0' }}
            />
          </ModalFooter>
        </form>
      </Dialog>
    );
  }
}
const InputWrap = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  color: #6b7c93;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
`;
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #6b7c93;
  text-align: center;
  border-top: 1px solid #f7f7f7;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
`;
const Error = styled.h4`
  margin-top: 0;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: crimson;
  color: #fff;
  font-size: 12px;
  padding: 5px;
`;