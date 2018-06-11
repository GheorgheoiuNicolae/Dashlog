export function deleteFromById(state: any, data: any) {
  console.log('state:', state, data);
  const newState = Object.assign({}, state);
  delete newState[data.id];
  return newState;
}

export function deleteFromAllIds(state: any, data: any) {
  const newState = [...state];
  const idx = newState.indexOf(data.id);
  newState.splice(idx, 1);
  return newState;
}

export function deleteFromDays(state: any, data: any) {
  const newState = [...state];
  const today = new Date().setHours(0, 0, 0, 0);

  const relevantDay = newState.find((day: any) => day.date.getTime() === data.date.getTime());
  // if deleting last entry from any day other than today
  if (relevantDay.entries.length === 1 && relevantDay.date.getTime() !== today) {
    const i = newState.indexOf(relevantDay);
    newState.splice(i, 1);
  }
  // if deleting last entry from today
  if (relevantDay.entries.length === 1 && relevantDay.date.getTime() === today) {
    relevantDay.entries.push({
      id: 'injectedEntry',
      date: new Date().setHours(0, 0, 0, 0),
      dateTime: new Date().getTime(),
      title: 'Nothing is happening today? Make sure you add your entries.'
    });
  }

  const entryToRemove = relevantDay.entries.find((entry: any) => entry.id === data.id);
  const idx = relevantDay.entries.indexOf(entryToRemove);
  relevantDay.entries.splice(idx, 1);
  return newState;
}