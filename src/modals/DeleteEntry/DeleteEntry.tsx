import * as React from 'react';
import {
  Dialog,
  RaisedButton,
} from 'material-ui';

interface Props {
  showModal: Function;
  hideModal: Function;
  removeEntry: Function;
  activeModal: any;
  entry: any;
  uid: string;
  allDates: number[];
  entriesCount: number;
}

export default class DeleteEntryModal extends React.Component<Props, {}> {
  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  deleteEntry = () => {
    const { entry, entriesCount, allDates, removeEntry, uid } = this.props;
    let idx = allDates.indexOf(entry.dateTime.getTime());
    allDates.splice(idx, 1);
    removeEntry(uid, entry, entriesCount - 1, allDates);
  }

  render() {
    const { activeModal } = this.props;
    return (
      <Dialog
        modal={true}
        open={activeModal.name === 'deleteEntry'}
        onRequestClose={() => console.log('onRequestClose')}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: '0' }}
        className="delete-entry-dialog"
      >
        <section className="content">
          <h3>Are you sure you want to permanently delete this entry?</h3>
        </section>
        <footer>
          <RaisedButton
            label="Cancel"
            keyboardFocused={true}
            style={{ marginRight: '20px' }}
            onClick={() => this.closeModal('deleteEntry')}
          />
          <RaisedButton
            onClick={() => this.deleteEntry()}
            label="Confirm"
            secondary={true}
            className="dangerButton"
            keyboardFocused={false}
          />
        </footer>
      </Dialog>
    );
  }
}