import * as _ from 'lodash';

const getTodayEntries = (state: any): any[] => {
  const entries = state.entries.allIds ? state.entries.allIds.map((id: string) => state.entries.byId[id]) : [];
  const entryList: any = [];
  const t = new Date();
  const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());

  entries.map((entry: any) => {
    if (entry) {
      const date = new Date(entry.date);
      const YMD = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (today.getTime() === YMD.getTime()) {
        entryList.push(entry);
      }
    }
  });

  const filteredByDate = _.sortBy(entryList, [(o: any) => {
    return o.dateTime;
  }]);

  return filteredByDate.reverse();
};

const getUpcomingEntries = (state: any): any[] => {
  const entries = state.entries.allIds ? state.entries.allIds.map((id: string) => state.entries.byId[id]) : [];
  const filteredByDate = _.sortBy(entries, [(o: any) => {
    return o.dateTime;
  }]);

  const entryList: any = [];
  const t = new Date().getTime();

  filteredByDate.map((entry: any) => {
    // if the entry is in the future save the closest maximum 5 entries
    if (entry.dateTime > t && entryList.length < 5) {
      entryList.push(entry);
    }
  });

  return entryList.reverse();
};

export {
  getTodayEntries,
  getUpcomingEntries,
};
