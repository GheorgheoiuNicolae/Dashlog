import * as React from 'react';
import {
  TextField
} from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton, IconButton } from 'material-ui';
import { Field } from 'redux-form';
import { StateProps, DispatchProps, OwnProps } from './_manageLabels';
import Close from 'material-ui/svg-icons/navigation/close';
import Label from 'material-ui/svg-icons/action/label';
import LabelColors from './LabelColors';

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
    createLabel({ 
      name: values.name, 
      color: values.color.code ? values.color.code : this.state.labelColor
    }, auth.user.uid);
    destroy();
  }

  closeModal = () => {
    const { hideManageLabelsModal } = this.props;
    hideManageLabelsModal();
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
    const { 
      handleSubmit, 
      hideManageLabelsModal, 
      showManageLabelsModal, 
      labelsById, 
      labelsAllIds,
      pristine,
      submitting
    } = this.props;
    const required = (value: any, message?: string) => {
      return value ? undefined :
        (message
          ? (<small className="input-error">{message}</small>)
          : (<small className="input-error">'Required'</small>)
        );
    };

    return (
      <Dialog
        modal={true}
        open={showManageLabelsModal}
        onRequestClose={() => hideManageLabelsModal()}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: '0' }}
        contentStyle={{ width: '60%' }}
        className="manage-labels dialog"
      >
        <section className="modal-header">
          <h5 className="h5">Manage labels</h5>
          <Close className="close-icon" onClick={() => hideManageLabelsModal()} />
        </section>
        <section className="modal-content">
          <form
            className="create-label-form"
            onSubmit={handleSubmit(this.handleSubmit.bind(this))}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className="field-wrap">
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Create label'}
                fullWidth={true}
                name={'name'}
                validate={[(v: any) => required(v, 'Label name is required')]}
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
            </div>
            <LabelColors handleClick={this.addLabelColor} />
            <RaisedButton
              type="submit"
              label="Create"
              secondary={true}
              className="successButton"
              onClick={handleSubmit(this.handleSubmit.bind(this))}
              style={{ margin: '10px 0 0 10px' }}
              disabled={pristine || submitting}
            />
          </form>

          <div className="created-labels-list">
            {labelsAllIds.map((id: any) => {
              return (
                <div
                  key={labelsById[id].id}
                  className="existingLabel"
                >
                  <Label className="label-icon" style={{ color: labelsById[id].color }} />
                  <div
                    className="label-name"
                    onClick={() => this.handleClick(labelsById[id])}
                  >
                    {labelsById[id].name}
                  </div>
                  <LabelColors label={labelsById[id]} handleClick={this.editLabelColor} />
                  <IconButton
                    tooltip="Delete"
                    className="deleteLabelButton"
                    onClick={() => this.removeLabel(labelsById[id])}
                  >
                    <Close className="close-icon" />
                  </IconButton>
                </div>
              );
            })}
          </div>

        </section>
        <section className="modal-footer">
          <FlatButton
            label="Close"
            primary={false}
            onClick={() => hideManageLabelsModal()}
            style={{ margin: '10px 10px 0 0' }}
          />
        </section>
      </Dialog>
    );
  }
}
