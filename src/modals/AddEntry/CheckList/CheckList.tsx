import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './_checkList';
import { TextField } from 'redux-form-material-ui';
import {
  IconButton,
  List, ListItem, Checkbox
} from 'material-ui';
import { Field } from 'redux-form';
import Delete from 'material-ui/svg-icons/action/delete';
import Add from 'material-ui/svg-icons/content/add';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  fields: any;
  push: any;
  itemInEdit: number | null;
}

export default class Entries extends React.PureComponent<Props & OtherProps, {}> {

  toggleCheck(index: number) {
    const { fields } = this.props;
    const items = fields.getAll();
    items[index].completed = !items[index].completed;
    fields.remove(index);
    fields.insert(index, items[index]);
  }

  createNewItem() {
    const { fields } = this.props;
    const items = fields.getAll();
    if (!items || items.length === 0 || items && items.length > 0 && items[items.length - 1].text) {
      fields.push({ completed: false, text: '' });
    }
  }

  removeEmptyTodo(index: number) {
    const { fields } = this.props;
    const items = fields.getAll();
    if (!items[index].text) {
      fields.remove(index);
    }
  }

  render() {
    const { fields } = this.props;
    const items = fields.getAll();

    return (
      <section className="check-list-wrapper">
        <div onClick={() => this.createNewItem()} >
          <h5 className="subheader">
            <Add />
            <p>Add checklist</p>
          </h5>
        </div>
        <List>
          {fields.map((member: any, index: any) => (
            <div key={index}>
              <ListItem
                primaryText={items[index].text}
                className="checklist-item"
                rightIconButton={
                  <IconButton
                    onClick={() => fields.remove(index)}
                    className="checklist-item-remove"
                    style={{ marginRight: '20px', color: 'crimson' }}
                    iconStyle={{ color: 'crimson' }}
                  >
                    <Delete />
                  </IconButton>
                }
                leftCheckbox={
                  <Checkbox
                    onCheck={() => this.toggleCheck(index)}
                    className="checklist-item-checkbox"
                  />}
              >
                {items.length - 1 === index && !items[items.length - 1].text && (
                  <Field
                    name={`${member}.text`}
                    type="text"
                    component={TextField}
                    label="Todo"
                    onKeyDown={(e: any) => {
                      if (e.keyCode === 13) {
                        e.preventDefault();
                        fields.push({ completed: false, text: '' });
                      }
                    }}
                    onBlur={() => this.removeEmptyTodo(index)}
                    autoFocus={true}
                    className="input-wrapper no-label checklist-input"
                  />
                )}
              </ListItem>
            </div>
          ))}
        </List>
      </section>
    );
  }
}