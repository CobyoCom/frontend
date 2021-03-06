import { AttendeeDefaultProps } from './AttendeesListItem/AttendeesListItem';
import { types } from '../eventUserActions_old';

export const moduleName = 'attendees';

const initialState = {};

export default function attendees(state = initialState, { type, payload }) {
  switch (type) {
    case types.getAttendeesSuccess: {
      const { attendees } = payload;
      return attendees.reduce(
        (byId, attendee) => {
          byId[attendee.userName] = {
            ...AttendeeDefaultProps,
            ...(byId[attendee.userName] || {}),
            ...attendee,
            lastUpdated: parseInt(attendee.lastUpdated, 10)
          };

          return byId;
        },
        { ...state }
      );
    }
    default:
      return state;
  }
}
