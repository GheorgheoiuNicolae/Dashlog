import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './_today';
import EntryListItem from './EntryListItem';
import TimeWidget from './TimeWidget/';

// import FlipMove from 'react-flip-move';

export type Props = StateProps & OwnProps & DispatchProps;

export default class Today extends React.Component<Props, {}> {
  renderTodayEntries = () => {
    const { entries, user, labelsById, removeEntry } = this.props;
    return entries.length ? (
        entries.map((entry: any, index: any) => {
          return (
            <div key={index}>
              <EntryListItem
                user={user}
                entry={entry}
                key={entry.id}
                removeEntry={removeEntry}
                labels={labelsById}
              />
            </div>
          );
        })

    ) : (<h4 className="no-entries-message">Nothing is happening today? Don't forget to add your entries.</h4>);
  }
  renderUpcomingEntries = () => {
    const { upcomingEntries, user, labelsById, removeEntry } = this.props;
    return upcomingEntries.length && (
      upcomingEntries.map((entry: any, index: any) => {
        return (
          <div key={index}>
            <EntryListItem
              user={user}
              entry={entry}
              key={entry.id}
              removeEntry={removeEntry}
              labels={labelsById}
              opacity={`0.${7 - index}`}
            />
          </div>
        );
      })
    );
  }

  render() {
    const { entries, user, upcomingEntries } = this.props;
    return (
      <section id="today">
        <div className="container">
          <div className="entry-list">
            {entries && <h4>Today</h4>}
            {entries && (
              this.renderTodayEntries()
            )}
            {entries && upcomingEntries.length && <h4>Upcoming</h4>}
            {entries && this.renderUpcomingEntries()}
          </div>
          <TimeWidget user={user} quotes={this.props.quotes} />
        </div>
      </section>
    );
  }
}