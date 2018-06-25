import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './_header';
import IconButton from 'material-ui/IconButton';
import ViewList from 'material-ui/svg-icons/action/view-list';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import FilterList from 'material-ui/svg-icons/content/filter-list';
// import Search from 'material-ui/svg-icons/action/search';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
}

export default class Header extends React.Component<Props, OtherProps> {
  setView(type: string) {
    const { switchEntriesView } = this.props;
    switchEntriesView(type);
  }

  toggleFilters() {
    const { toggleFilterDrawer } = this.props;
    toggleFilterDrawer();
  }

  toggleSearch() {
    const { toggleSearch } = this.props;
    toggleSearch();
  }

  render() {
    return (
      <header>
        <div className="actions">
          <section className="header-item">
            <p>View</p>
            <IconButton onTouchTap={() => this.setView('list')}>
              <ViewList />
            </IconButton>
            <IconButton onTouchTap={() => this.setView('grid')}>
              <ViewModule />
            </IconButton>
          </section>
          <section className="header-item">
            <p>Filter</p>
            <IconButton onTouchTap={() => this.toggleFilters()}>
              <FilterList />
            </IconButton>
          </section>
          {/* <HeaderItem className="header-item">
            <IconButton onTouchTap={() => this.toggleSearch()}>
              <Search />
            </IconButton>
            <p>Search</p>
          </HeaderItem> */}
        </div>
      </header>
    );
  }
}
