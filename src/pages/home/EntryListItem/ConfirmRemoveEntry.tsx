import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

interface DispatchProps {
  removeEntry: any;
  entry: any;
  user: any;
}
interface OwnProps {
  open: boolean;
}

export default class ConfirmRemoveEntryDialog extends React.Component<DispatchProps, OwnProps> {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  confirm = () => {
    this.props.removeEntry();
    this.setState({ open: false });
  }

  render() {
    const { title } = this.props.entry;
    const actions = [(
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />),(
      < FlatButton
          label="Discard"
          primary={true}
          onTouchTap={this.confirm}
      />),
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to remove the entry <b>{title} ?</b>
        </Dialog>
      </div>
    );
  }
}