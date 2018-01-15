import {moduleName} from './eventReducer';

const selectEvent = state => state[moduleName];

export const selectEventId = state => selectEvent(state).eventId;
export const selectPlaceId = state => selectEvent(state).placeId;
export const selectEventTime = state => selectEvent(state).eventTime;