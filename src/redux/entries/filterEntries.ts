import * as _ from 'lodash';

const filterEntries = (days: any, filters: any): any[] => {
  console.log('filterEntries: ', days, filters);
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
    console.log('has checklist: ', days);
  }
  if (filters.hasDescription) {
    days.map((day: any) => {
      const entries = day.entries.filter((entry: any) => entry.description);
      day.entries = entries;
    });
  }
  if (filters.labels.length) {
    // days.map((day: any) => {
    //   const entries = day.entries.filter((entry: any) => {
    //     if (entry.labels) {
    //       return filters.labels.map((filterLabel: string) => {
    //         return entry.labels.find((label: any) => {
    //           if (label === filterLabel) { console.log('label: ', label, filterLabel, entry); }
    //           return label === filterLabel;
    //         });
    //       });
    //     }
    //   });
    //   day.entries = entries;
    // });
    days.map((day: any) => {
      // day.entries = day.entries.filter((entry: any) => {
      //   // console.log('each entry: ', entry);
      //   return entry.labels && entry.labels.find((label: string) => filters.labels.indexOf(label) !== -1);
      // });
      // works but does not combine labels
      // const inidvidualLabels = day.entries.find((entry: any) => {
      //   return entry.labels && entry.labels.find((label: string) => filters.labels.indexOf(label) !== -1);
      // });

      day.entries = day.entries.filter((entry: any) => {
        
        if (entry.labels) { 
          const foundLabels: string[] = [];
          filters.labels.forEach((label: string) => {
            if (entry.labels.indexOf(label) !== -1 ) {
              console.log('found label', entry);
              foundLabels.push(label);
            }
            console.log('found Lables: ', entry.id, foundLabels);
          });

          console.log('length: ', foundLabels.length, filters.labels.length, foundLabels, filters);
          if (foundLabels.length === filters.labels.length) {
            console.log('entry should be displayed: ', entry);
            return entry;
          }
        }
      });

      // console.log('a', inidvidualLabels, filters.labels);
      // console.log('combinedLabels: ', combinedLabels);
    });
  }

  days = days.filter((day: any) => day.entries.length);

  const filteredByDate = _.sortBy(days, [(o: any) => {
    return o.date;
  }]);

  return [...filteredByDate.reverse()];
};

export { filterEntries };