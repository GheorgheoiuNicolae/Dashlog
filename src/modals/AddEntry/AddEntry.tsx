import * as React from 'react';
import {
  TextField,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { Field, FieldArray } from 'redux-form';

import { StateProps, DispatchProps, OwnProps } from './_addEntry';
import LabelsPicker from './LabelsPicker';
import * as moment from 'moment';

import Close from 'material-ui/svg-icons/navigation/close';
import Label from 'material-ui/svg-icons/action/label-outline';
import LabelFilled from 'material-ui/svg-icons/action/label';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class AddEntryForm extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelsPopoverOpen: false,
      anchorEl: null
    };
  }

  handleLablelsPopoverClose = () => {
    this.setState({
      labelsPopoverOpen: false,
    });
  }

  handleLablelsPopoverOpen = (event: any) => {
    event.preventDefault();
    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleSubmit = (values: any) => {
    const { createEntry } = this.props;
    createEntry(values);
    console.log('handle submit', values);
    this.closeModal('addEntry');
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  handleManageLabels() {
    const { showModal } = this.props;
    showModal('manageLabels');
    this.handleLablelsPopoverClose();
  }

  render() {
    const { 
      handleSubmit,
      activeModal,
      array: { push, insert },
      selectedLabels,
      labelsById
    } = this.props;
    return (
      <Dialog
        modal={true}
        open={activeModal === 'addEntry'}
        onRequestClose={() => this.closeModal('addEntry')}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: '0' }}
        style={{ padding: '0!important' }}
        className="AddEntry"
      >
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <div className="modal-header">
            <h5 className="h5">Add new Entry</h5>
            <Close className="close-icon" onClick={() => this.closeModal('addEntry')} />
          </div>
          <section className="modal-content">
            <div className="left">
              <div className="field-wrap">
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Title'}
                  fullWidth={true}
                  name={'title'}
                  className="input-wrapper input"
                />
              </div>

              <div className="field-wrap">
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Description'}
                  fullWidth={true}
                  name={'description'}
                  className="textarea-wrapper input"
                  multiLine={true}
                />
              </div>

              {/* <FieldArray
                name="checklistItems"
                component={CheckList}
                push={push}
                insert={insert}
              /> */}
            </div>
            <div className="right">
              <div className="field-wrap">
                <Field
                  component={DatePicker}
                  floatingLabelFixed={true}
                  floatingLabelText={'Date'}
                  fullWidth={true}
                  name={`date`}
                  autoOk={true}
                  className="datepicker-wrapper input"
                  formatDate={(date: any) => moment(date).format('ll')}
                />
              </div>
              <div className="field-wrap">
                <Field
                  component={(props: any) => <TimePicker {...props} />}
                  autoOk={true}
                  format={null}
                  floatingLabelFixed={true}
                  floatingLabelText={'Time'}
                  fullWidth={true}
                  name={`date`}
                  className="datepicker-wrapper input"
                />
              </div>

              <div className="field-wrap">
                <div className="labels-select-area" onClick={(e: any) => this.handleLablelsPopoverOpen(e)}>
                  <Label className="label-icon" color="#673AB7" />
                  <span className="labels-heading">Labels</span>
                  <ArrowDropDown className="label-icon-right" />
                </div>
                <Popover
                  open={this.state.labelsPopoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={() => this.handleLablelsPopoverClose()}
                  animation={PopoverAnimationVertical}
                >
                  <section className="labels-popover">
                    <div className="labels-popover-header">
                      <strong>Assign labels</strong>
                      <small
                        onClick={() => this.handleManageLabels()}
                        style={{ cursor: 'pointer', color: '#3f51b5' }}
                      >
                        Manage
                      </small>
                    </div>
                    {labelsById ? (
                      <FieldArray
                        name="labels"
                        component={(props: any) => <LabelsPicker {...props} selectedLabelIds={selectedLabels} />}
                        push={push}
                        insert={insert}
                      />
                    ) : <span>Please create labels.</span>}
                  </section>
                </Popover>

                {selectedLabels && selectedLabels.map((id: any) => {
                  return (
                    <div 
                      className="label-single selectedLabel"
                      key={labelsById[id].id}
                    >
                      <LabelFilled className="label-filled-icon" style={{ color: labelsById[id].color }} />
                      <div
                        className="name label-name"
                      >
                        {labelsById[id].name}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* { location && <div className="map">
                <div style={{display: 'flex'}}>
                  <StyledLocationIcon />
                  <LocationLabel>Location</LocationLabel>
                </div>
                <Map lat={location.coords.latitude} lng={location.coords.longitude} />
              </div> } */}
            </div>
          </section>
          <section className="modal-footer">
            <FlatButton
              label="Cancel"
              primary={false}
              onClick={() => this.closeModal('addEntry')}
              style={{ margin: '10px 10px 0 0' }}
            />
            <RaisedButton
              label="Add"
              secondary={true}
              className="successButton"
              onClick={handleSubmit(this.handleSubmit.bind(this))}
              style={{ margin: '10px 10px 0 0' }}
            />
          </section>
        </form>
        {/* <ManageLabels /> */}
      </Dialog>
    );
  }
}
