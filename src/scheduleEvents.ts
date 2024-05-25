import fs from 'fs';

let events = null;

const persistEvents = () => {
  fs.writeFile(__dirname + '/events.json', JSON.stringify(events), (err) => {
    if (err) {
      console.error('Error persisting events:', err);
    } else {
      console.log('Events persisted successfully.');
    }
  });
};

export const getEvents = () => {
  if (events === null) {
    initEvents();
  }

  return events;
};

export const addEvent = (event) => {
  if (events === null) {
    initEvents();
  }

  events.push({ id: events.length, ...event });
  persistEvents();
};

const initEvents = () => {
  if (events === null) {
    try {
      const data = fs.readFileSync(__dirname + '/events.json', 'utf8');
      events = JSON.parse(data);
    } catch (err) {
      console.error('Error reading events:', err);
      events = [];
    }
  }
};
