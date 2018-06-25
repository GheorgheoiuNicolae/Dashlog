import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import { reduxForm, formValueSelector } from 'redux-form';
import { hideModal, showModal } from '../../redux/ui/actions';
import { editEntry, removeEntry } from '../../redux/entries/creators';
import EntrySingle from './Entry';

export interface OwnOptionalProps {
  handleSubmit: any;
  array: any;
  initialValues: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  activeModal: any;
  selectedLabels: any;
  labelsById: any;
  entriesCount: number;
  allDates: number[];
}

export interface DispatchProps {
  editEntry: (user: any, entry: any, allDates: number[]) => {};
  removeEntry: (entry: any, user: any) => {};
  hideModal: Function;
  showModal: Function;
}

export interface OwnProps {
  entry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState, ownProps: any) => {
    const {params} = ownProps;
    console.log(ownProps);
    const selector = formValueSelector('editEntry');
    const labels = selector(state, 'labels');
    // change timestamp to Date obj before sending it to component
    const entry = state.entries.byId[params.id];
    if(entry) {
      entry.date = new Date(entry.date);
      entry.dateTime = new Date(entry.dateTime);
    }

    return {
      auth: state.auth,
      activeModal: state.ui.modal,
      initialValues: entry ? state.entries.byId[entry.id] : null,
      selectedLabels: labels,
      labelsById: state.labels.byId,
      entriesCount: state.entries.entriesCount,
      allDates: state.entries.allDates,
    };
  },
  {
    editEntry,
    removeEntry,
    showModal,
    hideModal
  },
)(reduxForm({
  form: 'editEntry',
})(EntrySingle));
