import {moduleName} from './eventNotificationsReducer';

export const selectEventNotificationsById = state => state.entities[moduleName];