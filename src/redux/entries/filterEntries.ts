import * as _ from 'lodash';

const filterEntries = (days: any, filters: any): any[] => {
  if (filters.date.from) {
    days = days.filter((day: any) => new Date(day.date).getTime() >= filters.date.from);
  }
  if (filters.date.to) {
    days = days.filter((day: any) => new Date(day.date).getTime() <= filters.date.to);
  }
  if (filters.hasChecklist) {
    days.map((day: any) => {
      const entries = day.entries.filter((entry: any) => entry.checklistItems);
      day.entries = entries;
    });
  }
  if (filters.hasDescription) {
    days.map((day: any) => {
      const entries = day.entries.filter((entry: any) => entry.description);
      day.entries = entries;
    });
  }
  if (filters.labels.length) {
    days.map((day: any) => {
      const entries = day.entries.filter((entry: any) => {
        if (entry.labels) {
          return filters.labels.map((filterLabel: string) => {
            return entry.labels.find((label: any) => {
              return label === filterLabel;
            });
          });
        }
      });
      day.entries = entries;
    });
  }

  days = days.filter((day: any) => day.entries.length);

  const filteredByDate = _.sortBy(days, [(o: any) => {
    return o.date;
  }]);

  return [...filteredByDate.reverse()];
};

export { filterEntries };