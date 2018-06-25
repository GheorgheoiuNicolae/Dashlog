import * as React from 'react';
import { RaisedButton } from 'material-ui';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './_changePassword';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps { }

export default class ChangePassword extends React.PureComponent<Props, OtherProps> {
  handleSubmit = (values: any) => {
    console.log('handle submit');
  }

  render() {
    const { auth, handleSubmit } = this.props;
    console.log(auth);

    return (
      <Wrap>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'Current Password'}
              fullWidth={true}
              name={'currentPassword'}
              className="input-wrapper input"
            />
          </InputWrap>

          <RaisedButton
            label="Add"
            secondary={true}
            className="successButton"
            onClick={handleSubmit(this.handleSubmit.bind(this))}
            style={{ margin: '10px 10px 0 0' }}
          />
        </form>
      </Wrap>
    );
  }
}

const Wrap = styled.section`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;
const InputWrap = styled.div`
margin-bottom: 10px;
width: 100%;
`;