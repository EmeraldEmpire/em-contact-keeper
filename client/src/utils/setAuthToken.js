import axios from 'axios';

const setAuthToken = token => {
  if (!token) {
    delete axios.defaults.headers.common['x-auth-token'];
    return;
  }

  axios.defaults.headers.common['x-auth-token'] = token;
};

export default setAuthToken;
