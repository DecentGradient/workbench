import * as types from '../constants/thermal_action_types';

export function update(data) {
  const temp10th = "cpu0,cpu1,cpu2,cpu3,gpu";
  const temp1000th = "bat";
  temp10th.split(',').forEach((temp) => {
    data[`${temp}friendly`] = `${Math.round(data[temp]/10)}°C`;
  });
  temp1000th.split(',').forEach((temp) => {
    data[`${temp}friendly`] = `${Math.round(data[temp]/1000)}°C`;
  });

  data['usedSpace'] = 1-data.freeSpace;
  data['freeSpaceFriendly'] = `${Math.round(data.freeSpace*100)}%`;
  data['usedSpaceFriendly'] = `${Math.round(data.usedSpace*100)}%`;
  return {
    type: types.UPDATE,
    payload: data
  }
};