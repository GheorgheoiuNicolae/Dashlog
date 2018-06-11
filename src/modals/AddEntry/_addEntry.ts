import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import AddEntryForm from './AddEntry';
import { reduxForm, formValueSelector } from 'redux-form';
import { createEntry } from '../../redux/entries/creators';
import { hideModal, showModal } from '../../redux/ui/actions';
import { resetForm } from '../../redux/ui/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  activeModal: string;
  selectedLabels: any;
  labelsById: any;
}

export interface DispatchProps {
  createEntry: (entry: any) => {};
  hideModal: Function;
  showModal: Function;
  resetForm: Function;
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
    };
  },
  {
    createEntry,
    hideModal,
    showModal,
    resetForm
  },
)(reduxForm({
  form: 'addEntry',
  initialValues: {
    date: new Date(),
  }
})(AddEntryForm));
