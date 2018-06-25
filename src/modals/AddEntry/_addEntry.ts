import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import AddEntryForm from './AddEntry';
import { reduxForm, formValueSelector } from 'redux-form';
import { createEntry } from '../../redux/entries/creators';
import { showManageLabelsModal, hideManageLabelsModal } from '../../redux/labels/actions';
import { hideModal, showModal } from '../../redux/ui/actions';
import { resetForm } from '../../redux/ui/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  pristine?: any;
  submitting?: boolean;
  array: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  activeModal: string;
  selectedLabels: any;
  labelsById: any;
  location: any;
  allDates: number[];
  entriesCount: number;
}

export interface DispatchProps {
  createEntry: Function;
  hideModal: Function;
  showModal: Function;
  resetForm: Function;
  showManageLabelsModal: Function;
  hideManageLabelsModal: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    // get the selected labels from the form state
    const selector = formValueSelector('addEntry');
    const labels = selector(state, 'labels');

    return {
      auth: state.auth,
      selectedLabels: labels,
      activeModal: state.ui.modal.name,
      labelsById: state.labels.byId,
      location: state.ui.location,
      allDates: state.entries.allDates,
      entriesCount: state.entries.entriesCount,
    };
  },
  {
    createEntry,
    hideModal,
    showModal,
    showManageLabelsModal,
    hideManageLabelsModal,
    resetForm
  },
)(reduxForm({
  form: 'addEntry',
  initialValues: {
    date: new Date(),
  }
})(AddEntryForm));
