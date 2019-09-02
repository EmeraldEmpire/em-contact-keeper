import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => removeAlert(id), timeout);
  };

  // Remove Alert
  const removeAlert = id => dispatch({ type: REMOVE_ALERT, payload: id });

  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alerts: state
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
