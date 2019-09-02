import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = ({ history }) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  });

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { name, email, password, password_confirm } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'Email is already taken') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const bindInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const submitRegister = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill up the fields', 'danger');
      return;
    }

    if (password !== password_confirm) {
      setAlert('Passwords do not match', 'danger');
      return;
    }

    register({ name, email, password });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={submitRegister}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={bindInput} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={bindInput} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={bindInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirm">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            value={password_confirm}
            onChange={bindInput}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
