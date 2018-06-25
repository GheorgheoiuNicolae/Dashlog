import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import { reduxForm, formValueSelector } from 'redux-form';
import { resetForm } from '../../../redux/ui/creators';
import { EntriesFilterBy } from '../../../redux/entries/interface';
import { filterEntries } from '../../../redux/entries/actions';
import { getAllEntries } from '../../../redux/entries/creators';
import { toggleFilterDrawer } from '../../../redux/ui/actions';
import Filters from './Filters';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
  initialValues: any;
  destroy: any;
  reset: any;
}
export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  filtersDrawerOpen: boolean;
  selectedLabels: any;
  labelsById: any;
  filterBy: EntriesFilterBy;
  allEntriesLoaded: boolean;
}
export interface DispatchProps {
  resetForm: Function;
  filterEntries: Function;
  getAllEntries: Function;
  toggleFilterDrawer: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    // get the selected labels from the form state
    const selector = formValueSelector('filtersForm');
    const labels = selector(state, 'labels');

    return {
      auth: state.auth,
      filtersDrawerOpen: state.entries.ui.filtersDrawerOpen,
      selectedLabels: labels,
      labelsById: state.labels.byId,
      filterBy: state.entries.ui.filterBy,
      allEntriesLoaded: state.entries.ui.allEntriesLoaded,
    };
  },
  {
    resetForm,
    filterEntries,
    getAllEntries,
    toggleFilterDrawer,
  },
)(reduxForm({
  form: 'filtersForm',
  initialValues: {
    dateTo: {},
    dateFrom: {},
  }
})(Filters));