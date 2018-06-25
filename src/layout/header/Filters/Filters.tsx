import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './_filters';
import {
  Checkbox,
  DatePicker,
} from 'redux-form-material-ui';
import { RaisedButton, IconButton } from 'material-ui';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import * as moment from 'moment';
import { Field, FieldArray } from 'redux-form';
// import LablesPicker from './labelsPicker/';
import LabelFilled from 'material-ui/svg-icons/action/label';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LablesPicker from '../../../modals/AddEntry/LabelsPicker/';
import Close from 'material-ui/svg-icons/navigation/close';

export type ContainerProps = StateProps & DispatchProps & OwnProps;
interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class Filters extends React.PureComponent<ContainerProps, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelsPopoverOpen: false,
      anchorEl: null
    };
  }

  componentWillMount() {
    const {
      // auth,
      // getAllEntries,
      allEntriesLoaded,
    } = this.props;
    console.log('allEntriesLoaded', allEntriesLoaded);
    if (!allEntriesLoaded) {
      // getAllEntries(auth.user.uid);
    }
  }

  handleLablelsPopoverClose = () => {
    this.setState({
      labelsPopoverOpen: false,
    });
  }

  clearAllFilters = () => {
    const {
      filterEntries,
    } = this.props;

    const filters = {
      date: {
        from: '',
        to: '',
      },
      kind: '',
      labels: [],
      hasChecklist: null,
      hasDescription: null,
    };
    filterEntries(filters);
  }

  closeFiltersPopover = () => {
    const {
      toggleFilterDrawer,
    } = this.props;
    toggleFilterDrawer();
  }

  handleLablelsPopoverOpen = (event: any) => {
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleSubmit = (values: any) => {
    const {
      filterEntries,
      toggleFilterDrawer,
    } = this.props;

    const dateFromIsEmpty = Object.keys(values.dateFrom).length === 0 && values.dateFrom.constructor === Object;
    const dateToIsEmpty = Object.keys(values.dateTo).length === 0 && values.dateTo.constructor === Object;

    const filters = {
      date: {
        from: values.dateFrom && !dateFromIsEmpty ? values.dateFrom.getTime() : null,
        to: values.dateTo && !dateToIsEmpty ? values.dateTo.getTime() : null,
      },
      kind: '',
      labels: values.labels || [],
      hasChecklist: values.hasChecklist || null,
      hasDescription: values.hasDescription || null,
    };

    filterEntries(filters);
    toggleFilterDrawer();
  }

  render() {
    const {
      handleSubmit,
      filtersDrawerOpen,
      array: { push, insert },
      selectedLabels,
      labelsById,
    } = this.props;

    return filtersDrawerOpen ? (
      <section className="filters-wrapper">
        <IconButton
          onClick={() => this.closeFiltersPopover()}
          style={{ color: 'crimson', position: 'absolute', right: '20px' }}
        >
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          {/* <Label>Date Range</Label> */}
          <section className="date-range">
            <div className="field-wrap">
              <Field
                component={DatePicker}
                floatingLabelFixed={true}
                floatingLabelText={'From date'}
                name={`dateFrom`}
                autoOk={true}
                className="datepicker-wrapper input"
                formatDate={(date: any) => moment(date).format('ll')}
              />
            </div>
            <div className="field-wrap">
              <Field
                component={DatePicker}
                floatingLabelFixed={true}
                floatingLabelText={'To date'}
                name={`dateTo`}
                autoOk={true}
                className="datepicker-wrapper input"
                formatDate={(date: any) => moment(date).format('ll')}
              />
            </div>
          </section>

          {/* filter by labels  */}
          {/* <Label>Labels</Label> */}
          <div className="field-wrap">
            <section className="labels-select" onClick={(e: any) => this.handleLablelsPopoverOpen(e)}>
              <div className="labels-title">Contains labels</div>
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
              <div className="labels-popover">
                {/* <LablesPicker/>  */}
                <FieldArray
                  name="labels"
                  component={(props: any) => <LablesPicker {...props} selectedLabelIds={selectedLabels} />}
                  push={push}
                  insert={insert}
                />
              </div>
            </Popover>

            <div className="selectedLabelsWrapper">
              {selectedLabels && selectedLabels.map((id: any) => {
                return (
                  <section
                    key={labelsById[id].id}
                    className="selectedLabel label-single"
                  >
                    <LabelFilled className="label-filled-icon" style={{ color: labelsById[id].color }} />
                    <div className="name">
                      {labelsById[id].name}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          {/* /end filter by labels  */}

          {/* <Label>Entry properties</Label> */}
          <section className="entry-properties">
            <div className="field-wrap">
              <Field
                component={Checkbox}
                label={'With description'}
                name={`hasDescription`}
                className="checkbox-wrapper"
              />
            </div>
            <div className="field-wrap">
              <Field
                component={Checkbox}
                label={'With checklist'}
                name={`hasChecklist`}
                className="checkbox-wrapper"
              />
            </div>
          </section>

          <RaisedButton
            label="Clear filters"
            secondary={true}
            className="dangerButton"
            onClick={() => this.clearAllFilters()}
            style={{ margin: '10px 10px 0 0' }}
          />
          <RaisedButton
            label="Apply filters"
            secondary={true}
            className="successButton"
            onClick={handleSubmit(this.handleSubmit.bind(this))}
            style={{ margin: '10px 10px 0 0' }}
          />
        </form>
      </section>
    ) : null;
  }
}

// const ClearFiltersButton = styled(RaisedButton)`
//   position: absolute;
//   right: 20px;
//   top: 10px;
// `;
// const Label = styled.h5`  
//   margin-bottom: 10px;
//   margin-top: 0;
// `;
