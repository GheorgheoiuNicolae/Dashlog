import * as React from 'react';
import { browserHistory } from 'react-router';
import { TextField, DatePicker, TimePicker } from 'redux-form-material-ui';
import { Field, FieldArray } from 'redux-form';
import { RaisedButton } from 'material-ui';
import * as moment from 'moment';
import Map from '../../modals/AddEntry/Map/Map';
import CheckList from '../../modals/AddEntry/CheckList/';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import LablesPicker from '../../modals/AddEntry/LabelsPicker';
import { StateProps, DispatchProps, OwnProps } from './_entry';
import DeleteEntryModal from '../../modals/DeleteEntry/DeleteEntry';
// icons
import Label from 'material-ui/svg-icons/action/label-outline';
import LabelFilled from 'material-ui/svg-icons/action/label';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ManageLabels from '../../modals/ManageLabels/';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class EditEntryForm extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelsPopoverOpen: false,
      anchorEl: null
    };
  }

  componentWillMount() {
    const { initialValues } = this.props;
    if(!initialValues) {
      browserHistory.push('/entries');
    }
  }

  handleLablelsPopoverClose = () => {
    this.setState({
      labelsPopoverOpen: false,
    });
  }

  handleSubmit = (values: any) => {
    const { editEntry, auth, initialValues, allDates } = this.props;
    console.log('values: ', values);
    values.dateTime = new Date(
      values.date.setHours(
        values.dateTime.getHours(),
        values.dateTime.getMinutes(),
        values.dateTime.getSeconds(),
        values.dateTime.getMilliseconds()
      )
    );
    values.date = new Date(values.date.setHours(0, 0, 0, 0));

    if (initialValues.dateTime !== values.dateTime) {
      let idx = allDates.indexOf(initialValues.dateTime.getTime());
      allDates[idx] = values.dateTime.getTime();
    }
    let entryData = { ...values };

    entryData.dateTime = values.dateTime.getTime(),
      entryData.date = values.date.getTime(),
      editEntry(auth.user.uid, entryData, allDates);
  }

  handleManageLabels() {
    const { showModal } = this.props;
    showModal('manageLabels');
    this.handleLablelsPopoverClose();
  }

  handleLablelsPopoverOpen = (event: any) => {
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  openDeleteModal = (entry: any) => {
    const { showModal } = this.props;
    showModal('deleteEntry');
  }

  preventSubmitOnEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  render() {
    const {
      auth,
      activeModal,
      handleSubmit,
      initialValues,
      array: { push, insert },
      selectedLabels,
      labelsById,
      showModal,
      hideModal,
      removeEntry,
      allDates,
      entriesCount,
    } = this.props;

    console.log('initial values:', initialValues);
    return (
      initialValues ? (
      <section className="entry-form" id="entry-single-wrap">
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} className="edit-form">
          <section className="content">
            <div className="left-side">
              <div className="field-wrap">
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Title'}
                  onKeyPress={(e: any) => this.preventSubmitOnEnter(e)}
                  fullWidth={true}
                  name={`title`}
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
                  onKeyPress={(e: any) => this.preventSubmitOnEnter(e)}
                  multiLine={true}
                  className="textarea-wrapper input"
                />
              </div>

              <FieldArray
                name="checklistItems"
                component={CheckList}
                push={push}
                insert={insert}
              />
            </div>
            <div className="right-side">
              <div className="field-wrap">
                <Field
                  component={DatePicker}
                  floatingLabelFixed={true}
                  floatingLabelText={'Date'}
                  fullWidth={true}
                  name={`date`}
                  className="datepicker-wrapper input"
                  formatDate={(date: Date) => moment(date).format('ll')}
                />
              </div>

              <div className="field-wrap">
                <Field
                  component={(props: any) => {
                    if (typeof props.input.value === 'number') {
                      props.input.value = new Date(props.input.value);
                    }
                    return <TimePicker {...props} />;
                  }}
                  autoOk={true}
                  format={null}
                  floatingLabelFixed={true}
                  floatingLabelText={'Time'}
                  fullWidth={true}
                  name={`dateTime`}
                  className="datepicker-wrapper input"
                />
              </div>

              {/* Labels start */}
              <div className="field-wrap">
                <section className="labels-select" onClick={(e: any) => this.handleLablelsPopoverOpen(e)}>
                  <Label className="label-icon" />
                  <span className="label-title">Labels</span>
                  <ArrowDropDown className="label-icon-right" />
                </section>
                <Popover
                  open={this.state.labelsPopoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={() => this.handleLablelsPopoverClose()}
                  animation={PopoverAnimationVertical}
                >
                  <section className="labels-popover">
                    <header className="labels-popover-header">
                      <strong>Assign labels</strong>
                      <small
                        onClick={() => this.handleManageLabels()}
                        style={{ cursor: 'pointer', color: '#3f51b5' }}
                      >
                        Manage
                      </small>
                    </header>
                    {/* <LablesPicker/>  */}
                    <FieldArray
                      name="labels"
                      component={(props: any) => <LablesPicker {...props} selectedLabelIds={selectedLabels} />}
                      push={push}
                      insert={insert}
                    />
                  </section>
                </Popover>

                {selectedLabels && labelsById && selectedLabels.map((id: any) => {
                  return labelsById[id] && (
                    <div
                      key={labelsById[id].id}
                      className="label-single selectedLabel"
                    >
                      <LabelFilled style={{ color: labelsById[id].color }} className="label-icon" />
                      <div className="name">
                        {labelsById[id].name}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Labels end */}

              {initialValues.geoPlace.latitude ? <div className="map">
                <div style={{ display: 'flex' }}>
                  <LocationIcon />
                  <span className="location-label">Location</span>
                </div>
                  <Map lat={initialValues.geoPlace.latitude} lng={initialValues.geoPlace.longitude} width={'100%'} />
              </div> : <div />}
            </div>
          </section>
          <footer>
            <RaisedButton
              onClick={() => this.openDeleteModal(initialValues)}
              label="Delete entry"
              secondary={true}
              className="dangerButton"
              keyboardFocused={false}
            />
            <RaisedButton
              label="Save"
              secondary={true}
              className="successButton"
              keyboardFocused={true}
              type={'submit'}
            />
          </footer>
        </form>
        <ManageLabels />
        <DeleteEntryModal
          showModal={showModal}
          hideModal={hideModal}
          removeEntry={removeEntry}
          activeModal={activeModal}
          uid={auth.user.uid}
          entry={initialValues}
          entriesCount={entriesCount}
          allDates={allDates}
        />
      </section>
      ) : (<h3>Entry not found</h3>)
    );
  }
}

/* const LocationLabel = styled.h4`
  margin: 3px 10px 10px 10px;
  font-weight: 400;
`; */
