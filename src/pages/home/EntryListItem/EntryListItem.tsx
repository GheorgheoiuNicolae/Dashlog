import * as React from 'react';
import * as moment from 'moment';
import { InjectedRouter } from 'react-router';
import { browserHistory } from 'react-router';
import ConfirmRemoveEntryDialog from './ConfirmRemoveEntry';
// import { Link } sfrom 'react-router';

import AlignLeft from 'material-ui/svg-icons/editor/format-align-left';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import PhotoCameraIcon from 'material-ui/svg-icons/image/photo-camera';
import ListIcon from 'material-ui/svg-icons/action/list';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';

import EmojiIcon from 'material-ui/svg-icons/social/mood';
import EntryDefaultIcon from 'material-ui/svg-icons/maps/beenhere';

const iconStyles = { width: '18px', height: '18px' };
const mainLabelIconStyles = { width: '18px', height: '18px', color: '#fff' };

interface Props {
  entry: any;
  user: any;
  removeEntry: Function;
  labels: any;
}
interface StateProps {
  router: InjectedRouter;
}

export default class EntryListItem extends React.PureComponent<Props, StateProps> {
  removeEntry() {
    const { user, entry, removeEntry } = this.props;
    removeEntry(user.uid, entry, 0, []);
  }

  selectEntry() {
    const { entry } = this.props;
    browserHistory.push(`/entry/${entry.id}`);
  }

  render() {
    const { entry, user, labels } = this.props;
    const {
      photos, 
      geoPlace,
      description,
      repeatEvery,
      checklistItems,
      id
    } = entry;
    return (
      <section
        className={`entry-list-item ${id === 'injectedEntry' ? 'injectedEntry' : ''}`}
        id={entry.id}
      >
        {id !== 'injectedEntry' && (
          <p 
            className="time"
            onClick={() => this.selectEntry()}
          > {moment(new Date(entry.dateTime)).format('hh:mm')}
          </p>
        )}

        {id === 'injectedEntry' &&
          <div className="main-label icon icon-warn">
            <EmojiIcon style={mainLabelIconStyles} />
          </div>
        }
        {!description &&
          !photos &&
          !repeatEvery &&
          !checklistItems &&
          id !== 'injectedEntry' &&
          <div className="main-label icon icon-regular">
            <EntryDefaultIcon style={mainLabelIconStyles} />
          </div>
        }
        {description &&
          !photos &&
          !repeatEvery &&
          !checklistItems &&
          <div className="main-label icon icon-content">
            <AlignLeft style={mainLabelIconStyles} />
          </div>}
        {photos && photos.length && !checklistItems && !repeatEvery &&
          <div className="main-label icon icon-photo">
            <PhotoCameraIcon style={mainLabelIconStyles} />
          </div>}
        {checklistItems && checklistItems.length && !repeatEvery && <div className="main-label icon icon-list">
            <ListIcon style={mainLabelIconStyles}/>
          </div>}
        {repeatEvery && <div className="main-label icon icon-repeat">
          <RepeatIcon style={mainLabelIconStyles} />
        </div>}

        {id !== 'injectedEntry'
          ? (<p className="no-link" onClick={() => this.selectEntry()}>
            <span className="button-text">
              {entry.title}
            </span>
          </p>)
          : (<p className="no-link">
            <span className="button-text">
              {entry.title}
            </span>
          </p>)
        }

        <div className="labels">
          {entry.labels && entry.labels.map((label: any, index: number) => {
            return (<section className="entry-label" key={index}>
              <div className="circle" style={{ background: labels[label] && labels[label].color }} />
              <div className="label-name">{labels[label] && labels[label].name}</div>
            </section>);
          })}
        </div>

        <div className="entry-icons">
          {description && <AlignLeft style={iconStyles} />}
          {photos && photos.length && <PhotoCameraIcon style={iconStyles} />}
          {checklistItems && <ListIcon style={iconStyles} />}
          {repeatEvery && <RepeatIcon style={iconStyles} />} 
          {geoPlace && geoPlace.latitude ? <LocationIcon style={iconStyles} /> : <div/>}
        </div>

        <ConfirmRemoveEntryDialog
          user={user}
          removeEntry={() => this.removeEntry()}
          entry={entry}
        />
      </section>
    );
  }
}