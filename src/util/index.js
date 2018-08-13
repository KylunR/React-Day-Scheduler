export function getTodaysEvents(date, events) {
  //Split string before 'T' to get yyyy-mm-dd isolated
  date = date.split('T');
  date = date[0];

  let todaysEvents = [];

  for (let event of events) {
    let eventStartTime = event.startTime;

    //Split string before 'T' to get yyyy-mm-dd isolated
    eventStartTime = eventStartTime.split('T');
    eventStartTime = eventStartTime[0];

    if (date === eventStartTime) {
      todaysEvents.push(event);
    }
  }
  return todaysEvents;
}
