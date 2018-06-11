import * as React from 'react';
import styled from 'styled-components';
import colors from './colors';

interface OwnProps {
  selected: string;
}

export default class LabelColors extends React.PureComponent<{ handleClick: Function, label?: any }, OwnProps> {
  constructor() {
    super();
    this.state = {
      selected: ''
    };
  }

  handleClick(color: any) {
    this.setState({
      selected: color
    });
    const { handleClick, label } = this.props;
    label ? handleClick(label, color) : handleClick(color);
  }

  render() {
    const { label } = this.props;
    return (
      <Wrap className={label && 'existingLabelColors'}>
        {colors.map((color: any, index: number) => {
          const selected = this.state.selected === color;
          return (
            <Color
              key={index}
              style={{
                background: color.code,
                width: selected ? '15px' : '10px',
                height: selected ? '15px' : '10px',
              }}
              onClick={() => this.handleClick(color)}
            />
          );
        })}
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;
const Color = styled.span`
  display: block;
  margin: 10px;
  border-radius: 100%;
  margin: 5px;
  transition: all .1s linear;
`;
