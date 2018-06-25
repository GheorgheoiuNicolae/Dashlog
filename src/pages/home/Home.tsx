import * as React from 'react';
import * as moment from 'moment';
import { StateProps, DispatchProps, OwnProps } from './_home';
import EntryListItem from './EntryListItem/EntryListItem';
import Header from '../../layout/header';
import Filters from '../../layout/header/Filters/';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TargetIcon from 'material-ui/svg-icons/device/gps-fixed';

// import './loader.css';

export type Props = StateProps & OwnProps & DispatchProps;
interface ComponentProps {
  firstScrollRequest: boolean;
  shouldAutoScroll: boolean;
}

export default class Entries extends React.PureComponent<Props, ComponentProps> {
  constructor() {
    super();
    this.state = {
      firstScrollRequest: true,
      shouldAutoScroll: true,
    };
  }

  // public shouldComponentUpdate(nextProps: any, nextState: any) {
  //   // Consider here updating after edited entry

  //   return nextProps.numberOfEntries === this.props.numberOfEntries ? false : true;
  // }

  loadMore() {
    const { loadMoreEntries, user, datesLoaded, uiState } = this.props;
    const { firstScrollRequest } = this.state;
    const scrollDirection = uiState.scrollDirection;

    this.setState({ firstScrollRequest: false });

    if (firstScrollRequest === false) {
      loadMoreEntries(user.uid,
        scrollDirection === 'up' ? 'future' : 'past',
        scrollDirection === 'up' ? datesLoaded.future : datesLoaded.past);
    }
  }

  setScrollToDate() {
    const wrap = document.getElementById('entries-page-wrap');
    setTimeout(() => {
      const todayEntry = document.getElementById('scrollTarget');
      if (wrap && todayEntry) {
        wrap.scrollTop = todayEntry.offsetTop;
        this.setState({ shouldAutoScroll: false });
      }
    }, 200);
  }

  detectScrollDirection(prev: number, next: number) {
    const { onListScroll } = this.props;
    if (prev < next) {
      onListScroll({ scrollDirection: 'down' });
    } else {
      onListScroll({ scrollDirection: 'up' });
    }
  }

  handleScroll() {
    const { isLoading, uiState, onListScroll } = this.props;
    const wrap = document.getElementById('entries-page-wrap');

    if (wrap && !isLoading.loading) {
      this.detectScrollDirection(uiState.entryListScrollFromTop, wrap.scrollTop);

      if (wrap.scrollTop === 0 && uiState.scrollDirection === 'up') {
        this.loadMore();
      }
      if (wrap.scrollTop + wrap.offsetHeight === wrap.scrollHeight) {
        this.loadMore();
      }

      onListScroll({ entryListScrollFromTop: wrap.scrollTop });
    }
  }

  mapEntriesToDays = () => {
    const { entries, user, removeEntry,
      labelsById, currentDay,
      showFiltered, filteredEntries,
    } = this.props;
    const { firstScrollRequest, shouldAutoScroll } = this.state;

    const entriesToMap = showFiltered ? filteredEntries : entries;

    return (
      entriesToMap.map((day: any, index: any) => {
        let mappedEntries = day.entries.map((entry: any) => {
          return (
            <EntryListItem
              user={user}
              entry={entry}
              key={entry.id}
              labels={labelsById}
              removeEntry={removeEntry}
            />
          );
        });
        if (currentDay === day.date.getTime() && firstScrollRequest && shouldAutoScroll) {
          this.setScrollToDate();
        }
        return (
          <section 
            key={day.date}
            id={`${currentDay === day.date.getTime() && 'scrollTarget'}`}
            className="day"
          >
            <p className="date">{moment(day.date).format('dddd, D')} {moment(day.date).format('MMMM YYYY')}</p>
            {mappedEntries}
          </section>
        );
      })
    );
  }

  render() {
    const { entries, view, isLoading, selectedEntry } = this.props;
    const shouldDisplayLoader = isLoading.loading && isLoading.type === 'initial';

    return (
      <div id="entries-page-wrap" onScroll={() => this.handleScroll()} >
        <Header />
        <Filters />

        {!selectedEntry &&
          <FloatingActionButton 
            onClick={() => this.setScrollToDate()}
            className="floating-action-button"
          >
            <TargetIcon />
          </FloatingActionButton>
        }

        <section className={`entry-list view-boxes ${view}`}>
          <div className={`loader-wrapper ${shouldDisplayLoader ? 'loader-shown' : 'loader-hidden'}`}>
            <div className="loader">
              <div className="item item-1" />
              <div className="item item-2" />
              <div className="item item-3" />
              <div className="item item-4" />
            </div>
          </div>

          <div className="timeline-bar" />
          {entries && this.mapEntriesToDays()}
        </section>
      </div>
    );
  }
}