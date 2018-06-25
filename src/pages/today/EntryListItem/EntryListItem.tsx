import * as React from 'react';
import * as moment from 'moment';
import { InjectedRouter } from 'react-router';

import AlignLeft from 'material-ui/svg-icons/editor/format-align-left';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import PhotoCameraIcon from 'material-ui/svg-icons/image/photo-camera';
import ListIcon from 'material-ui/svg-icons/action/list';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';

// import ConfirmRemoveEntryDialog from '../../Entries/EntryListItem/confirmRemove';
import { Link } from 'react-router';

const iconStyles = { width: '18px', height: '18px' };

interface Props {
  entry: any;
  user: any;
  removeEntry: Function;
  labels: any;
  opacity?: any;
}
interface StateProps {
  router: InjectedRouter;
}

export default class EntryListItem extends React.Component<Props, StateProps> {
  removeEntry() {
    const { user, entry, removeEntry } = this.props;
    removeEntry(entry, user.uid);
  }

  render() {
    const { entry, labels, opacity } = this.props;
    const { photos, geoPlace, description, repeatEvery, checklistItems } = entry;
    const isInThePast = new Date(entry.dateTime).getTime() < new Date().getTime();

    return (
      <section
        className={`entry-list-item today-item`}
        style={{ opacity: opacity ? Number(opacity) : 1 }}
        id={entry.id}
      >
        <p onClick={() => console.log('entry', entry)} className="date" >
          {
            isInThePast
              ? moment(new Date(entry.dateTime)).format('HH:mm')
              : moment(new Date(entry.dateTime)).format('MMM Do')
          }
        </p>

        <Link to={`/entry/${entry.id}`} className="entry-link">
          <span className="button-text">
            {entry.title}
          </span>
        </Link>

        <div className="labels">
          {entry.labels && entry.labels.map((label: any, index: number) => {
            return (<div key={index} className="entry-label">
              <div className="circle" style={{ background: labels[label] && labels[label].color }} />
              <div className="label-name">{labels[label] && labels[label].name}</div>
            </div>);
          })}
        </div>

        <div className="entry-icons">
          {description && <AlignLeft style={iconStyles} />}
          {photos && photos.length && <PhotoCameraIcon style={iconStyles} />}
          {checklistItems && <ListIcon style={iconStyles} />}
          {repeatEvery && <RepeatIcon style={iconStyles} />}
          {geoPlace && geoPlace.latitude ? <LocationIcon style={iconStyles} /> : <div />}
        </div>

        {/* <ConfirmRemoveEntryDialog
          user={user}
          removeEntry={() => this.removeEntry()}
          entry={entry}
        /> */}
      </section>
    );
  }
}
