import * as types from '../constants/network_scanner_action_types';

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}
export function BEGIN_scanNetwork() {
  return {
    type: types.SCAN_NETWORK
  };
}

export function RESULT_scanNetwork(result) {
  let randomId = revisedRandId();
  let newEon = {
  }
  if (result.status !== "open") {
    return {
      type: types.SCAN_RESULT_ERROR
    }
  }
  newEon[randomId] = {
    ...result,
    id: randomId
  }
  return {
    type: types.SCAN_NETWORK_RESULT,
    payload: {
      eon: newEon
    }
  };
}

export function MAC_ADDRESS_REQUEST() {
  return {
    type: types.MAC_ADDRESS_REQUEST
  };
}

export function MAC_ADDRESS_SUCCESS(data) {
  return {
    type: types.MAC_ADDRESS_SUCCESS,
    payload: {
      eon: data
    }
  };
}

export function MAC_ADDRESS_ERROR(error) {
  return {
    type: types.MAC_ADDRESS_ERROR,
    payload: {
      error
    }
  };
}

export function PROGRESS_scanNetwork() {
  return {
    type: types.SCAN_NETWORK_PROGRESS,
  };
}

// SUCCESSFUL SCAN
export function SUCCESS_scanNetwork(results,state) {
  return {
    type: types.SCAN_NETWORK_SUCCESS,
    payload: {
      results
    }
  };
}

// COMPLETES THE SEARCH
export function COMPLETE_scanNetwork() {
  return {
    type: types.SCAN_NETWORK_COMPLETE
  };
}

export function FAIL_scanNetwork(err) {
  return {
    type: types.SCAN_NETWORK_FAIL,
    payload: {
      err
    }
  };
}

export function resetScanNetwork() {
  return {
    type: types.SCAN_NETWORK_RESET
  };
}

export function REMOVE_SCANNED_RESULT(id) {
  return {
    type: types.REMOVE_SCANNED_RESULT,
    payload: {
      id
    }
  };
}
