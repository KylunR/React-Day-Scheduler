import { timeData } from '../data/TimeData';

export function getCurrentEvents(date, events) {
  let currentEvents = [];

  // Split string before 'T' to get YYYY-MM-DD isolated
  date = date.split('T');
  date = date[0];

  for (let event of events) {
    let startTime = event.startTime;
    // Split string before 'T' to get YYYY-MM-DD isolated
    startTime = startTime.split('T');
    startTime = startTime[0];

    if (date === startTime) {
      currentEvents.push(event);
    }
  }
  return currentEvents;
}

export function findIndex(time) {
  for (let i = 0; i < timeData.length; i++) {
    if (time === timeData[i].iso) {
      return i;
    }
  }
}
