import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(({ type, msg, id }) => (
      <div key={id} className={`alert alert-${type}`}>
        <i className="fas fa-info-circle"> {msg}</i>
      </div>
    ))
  );
};

export default Alerts;
