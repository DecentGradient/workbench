import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/eon_detail_action_types';
import * as actions from '../actions/car_state_actions';

function* handleUpdate(action) {
  const { payload } = action;
  const { carState } = payload;
  if (carState) {
    yield put(actions.update(carState));
  }
}

export function* carStateSagas() {
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    takeEvery(types.MESSAGE, handleUpdate)
  ]);
}