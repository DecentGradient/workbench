/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/network_connection_action_types'
import settings from 'electron-settings';

const initialState = {
  status: null
};

export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    /* SSH Connections might should be moved to EON reducer */
    case types.CONNECTED:
      return {
        ...state,
        status: "connected"
      };
    case types.DISCONNECTED:
      return {
        ...state,
        status: "disconnected"
      };
    default:
      return state;
  }
}
