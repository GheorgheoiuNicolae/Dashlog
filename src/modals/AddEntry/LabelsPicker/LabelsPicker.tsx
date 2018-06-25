import * as React from 'react';
import Label from 'material-ui/svg-icons/action/label';
import Check from 'material-ui/svg-icons/navigation/check';

import { StateProps, DispatchProps, OwnProps } from './_labelsPicker';

type Props = StateProps & OwnProps & DispatchProps;
interface LabelInterface {
  name: string;
  color: string;
  id: number;
}

export default class LabelsPicker extends React.PureComponent<Props, {}> {
  handleClick(label: any) {
    const { fields, selectedLabelIds } = this.props;
    if (selectedLabelIds && selectedLabelIds.length) {
      const labelExists = selectedLabelIds.filter((id: any) => id === label.id);
      if (labelExists.length) {
        const idx = selectedLabelIds.indexOf(label.id);
        fields.remove(idx);
      } else {
        fields.push(label.id);
      }
    } else {
      fields.push(label.id);
    }
  }

  render() {
    const { selectedLabelIds } = this.props;
    const { labels } = this.props;
    return (
      <section className="labels-picker">
        {labels && labels.map((label: LabelInterface) => {
          const isSelected = selectedLabelIds && selectedLabelIds.find((id: any) => id === label.id);
          const checkColor = isSelected ? '#4caf50' : '#c3c3c3';
          return (
            <div
              key={label.id}
              onClick={() => this.handleClick(label)}
              className={`${isSelected && 'selectedLabel' } label`}
              style={{ background: isSelected && '#E8F5E9' }}
            >
              <Label className="label-icon" style={{ color: label.color }} />
              <div className="name">{label.name}</div>
              <Check className="check-icon" style={{ color: checkColor }} />
            </div>
          );
        })}
      </section>
    );
  }
}