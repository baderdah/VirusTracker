import {AsyncStorage} from 'react-native';
import {apiUrl} from '../config.json';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const apiEndpoint = apiUrl + '/authenticate';
const uploadEndPoint = apiUrl + '/VExaminator/uploadTraces';
const publicEndPoint = apiUrl + '/Spreading';
const tokenKey = 'token';

axios.interceptors.response.use(null, error => {
  const jwtExpiredError = error.response && error.response.status >= 401;
  if (jwtExpiredError) {
    console.log('expired');
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // toast.error("An unexpected error occured.");
  }
  return Promise.reject(error);
});

async function setJwt(jwt) {
  jwt = await jwt;
  console.log('JWT', jwt);
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
  }
}

async function getTrace() {
  return await http.get(publicEndPoint);
}

async function uploadTraces(jwt, traces) {
  setJwt(jwt);
  await http.post(uploadEndPoint, traces);
  console.log(jwt, traces);
}
async function login(userName, password) {
  const {data: jwt} = await http.post(apiEndpoint, {
    userName,
    password,
  });

  const user = jwtDecode(jwt.jwt);

  if (
    user.roles.filter(role => role.authority === 'VExaminator').length === 0
  ) {
    throw new Error('forbidden');
    return;
  }
  return jwt.jwt;
}

function loginWithJwt(jwt) {
  setVar(tokenKey, jwt);
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

const auth = {
  login,
  loginWithJwt,
  uploadTraces,
  getTrace,
};

export default (authHttp = {
  http,
  auth,
});
