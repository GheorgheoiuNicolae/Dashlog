var map: any = require('react-google-maps');
const withScriptjs = map.withScriptjs;
const withGoogleMap = map.withGoogleMap;
const GoogleMap = map.GoogleMap;
const Marker = map.Marker;
import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../../redux/reducers';

interface StateProps { }
interface RequiredProps {
  lat: any;
  lng: any;
  width?: number | string;
  height?: number;
}
interface OptionalProps { }
type Props = StateProps & RequiredProps & OptionalProps;

const RenderMap = withScriptjs(withGoogleMap((props: any) => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: props.coords.lat, lng: props.coords.lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.coords.lat, lng: props.coords.lng }} />}
    </GoogleMap>);
}));

class Map extends React.Component<Props, {}> {
  render() {
    const { lat, lng, width, height } = this.props;
    const appKey = 'AIzaSyAuq9VzQwFBkeIxceLbC_bsskc0IocQZW4';
    let mapUrl = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=';
    return (
      <RenderMap
        isMarkerShown={true}
        coords={{ lat: lat, lng: lng }}
        googleMapURL={mapUrl + appKey}
        loadingElement={<div style={{ height: `100%` }}>Loading map</div>}
        containerElement={(
          <div style={{ height: height ? `${height}px` : '200px', width: width ? `${width}px` : '200px' }} />
        )}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default connect<StateProps, {}, RequiredProps & OptionalProps>(
  (state: ApplicationState) => {
    return {
    };
  },
  {
  },
)(Map);
