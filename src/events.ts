import flatCache from 'flat-cache';
import path from 'path';

const cache = flatCache.load('events.json', path.resolve('./'));

export const getEvents = () => {
  return cache.getKey('events') ?? [];
};

export const addEvent = (event) => {
  const events = getEvents();
  const newEvents = [...events, { id: events.length, ...event }];
  cache.setKey('events', newEvents);
  cache.save();
};
