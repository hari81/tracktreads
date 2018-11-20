/* eslint-disable */
import * as axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = serverURL;
instance.defaults.timeout = 20000;

export { instance as default };
