import dateFormat from 'dateformat';
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

export function formatHeader(date) {
  // Get YYYY-MM-DD
  date = date.split('T');

  // Format date to Day, Month Day Year Format
  date = dateFormat(date[0], 'fullDate');

  // Store first 3 characters of day to match spec
  let day = date.substring(0, 3);
  date = date.split(', ');

  let header = day + ', ' + date[1];
  return header;
}
