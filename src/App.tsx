import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './AppContainer';
import ReduxToastr from 'react-redux-toastr';
import './assets/styles/App.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export type Props = StateProps & OwnProps & DispatchProps;

export default class App extends React.PureComponent<Props, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { calculateResponsiveState } = this.props;
    calculateResponsiveState(window);

    requestAnimationFrame(() => {
      this.setState({ appIsMounted: true });
    });

    window.addEventListener('resize', () => calculateResponsiveState(window));
  }

  componentWillUnmount() {
    const { calculateResponsiveState } = this.props;
    window.removeEventListener('resize', () => calculateResponsiveState(window));
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
        <ReduxToastr
          timeOut={0}
          newestOnTop={false}
          preventDuplicates={true}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar={false}
        />
      </div>
    );
  }
}
