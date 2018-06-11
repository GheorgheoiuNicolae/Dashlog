import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import ManageLabels from './ManageLabels';
import { reduxForm } from 'redux-form';
import { createLabel, editLabel, removeLabel } from '../../redux/labels/creators';
import { hideModal } from '../../redux/ui/actions';
import { setFieldValue } from '../../redux/ui///creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
  initialValues: any;
  destroy: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> { }

export interface StateProps {
  auth: any;
  showManageLabelsModal: boolean;
  labelsById: any;
  labelsAllIds: any;
}

export interface DispatchProps {
  createLabel: (label: any, user: any) => {};
  editLabel: Function;
  removeLabel: Function;
  hideModal: Function;
  setFieldValue: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      showManageLabelsModal: state.labels.ui.showManageLabelsModal,
      labelsById: state.labels.byId,
      labelsAllIds: state.labels.allIds,
    };
  },
  {
    createLabel,
    editLabel,
    removeLabel,
    hideModal,
    setFieldValue,
  },
)(reduxForm({
  form: 'manageLabels'
})(ManageLabels));
