import * as React from 'react';
import {
  TextField
} from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton, IconButton } from 'material-ui';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './_manageLabels';
import Close from 'material-ui/svg-icons/navigation/close';
import Label from 'material-ui/svg-icons/action/label';
import LabelColors from './LabelColors';

import './style.css';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  labelColor: string;
}

export default class ManageLabels extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelColor: 'cornflowerblue'
    };
  }

  componentWillMount() {
    const { setFieldValue } = this.props;
    setFieldValue('manageLabels', 'color', 'cornflowerblue');
  }

  handleSubmit = (values: any) => {
    const { destroy, createLabel, auth } = this.props;
    createLabel({ name: values.name, color: values.color.code }, auth.user.uid);
    destroy();
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  handleClick(label: any) {
    console.log('handleClick', label);
  }

  removeLabel = (label: any) => {
    const { removeLabel, auth } = this.props;
    removeLabel(label, auth.user.uid);
  }

  addLabelColor = (color: string) => {
    const { setFieldValue } = this.props;
    setFieldValue('manageLabels', 'color', color);
  }

  editLabelColor = (label: any, color: any) => {
    const { auth, editLabel } = this.props;
    label.color = color.code;
    editLabel(label, auth.user.uid);
  }

  render() {
    const { handleSubmit, showManageLabelsModal, labelsById, labelsAllIds } = this.props;
    return (
      <Dialog
        modal={true}
        open={showManageLabelsModal}
        onRequestClose={() => this.closeModal('manageLabels')}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: '0' }}
        contentStyle={{ width: '60%' }}
      >
        <ModalHeader className="modal-header">
          <h5 className="h5">Manage labels</h5>
          <Close className="close-icon" onClick={() => this.closeModal('manageLabels')} />
        </ModalHeader>
        <ModalContent>
          <form
            onSubmit={handleSubmit(this.handleSubmit.bind(this))}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <InputWrap>
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Create label'}
                fullWidth={true}
                name={'name'}
                className="input-wrapper input"
                autoFocus={false}
              />
              <Field
                component={TextField}
                floatingLabelFixed={false}
                floatingLabelText={'Color'}
                name={'color'}
                className="hidden"
                style={{ display: 'none' }}
              />
            </InputWrap>
            <LabelColors handleClick={this.addLabelColor} />
            <RaisedButton
              label="Create"
              secondary={true}
              className="successButton"
              onClick={handleSubmit(this.handleSubmit.bind(this))}
              style={{ margin: '10px 0 0 10px' }}
            />
          </form>

          <LabelList>
            {labelsAllIds.map((id: any) => {
              return (
                <LabelSingle
                  key={labelsById[id].id}
                  className="existingLabel"
                >
                  <StyledLabelIcon style={{ color: labelsById[id].color }} />
                  <LabelName
                    className="name"
                    onClick={() => this.handleClick(labelsById[id])}
                  >
                    {labelsById[id].name}
                  </LabelName>
                  <LabelColors label={labelsById[id]} handleClick={this.editLabelColor} />
                  <IconButton
                    tooltip="Delete"
                    className="deleteLabelButton"
                    onClick={() => this.removeLabel(labelsById[id])}
                  >
                    <StyledCloseIcon />
                  </IconButton>
                </LabelSingle>
              );
            })}
          </LabelList>

        </ModalContent>
        <ModalFooter>
          <FlatButton
            label="Close"
            primary={false}
            onClick={() => this.closeModal('manageLabels')}
            style={{ margin: '10px 10px 0 0' }}
          />
        </ModalFooter>
      </Dialog>
    );
  }
}

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
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const LabelList = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputWrap = styled.div`
  margin-bottom: 20px;
  margin-right: 10px;
  width: 100%;
`;
const LabelSingle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #eee;
`;
const LabelName = styled.div`
  flex: 1;
`;
const StyledLabelIcon = styled(Label) `
  width: 18px!important;
  height: 18px!important;
  padding: 5px;
`;
const StyledCloseIcon = styled(Close) `
  width: 18px!important;
  height: 18px!important;
  padding: 5px;
`;