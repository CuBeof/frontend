"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
const AUTH_TOKEN = localStorage.getItem('token')?localStorage.getItem('token'):"";
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://localhost:8090/restapi';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || 'http://localhost:8090/restapi',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    console.log(error.response)
    if (error.response.status === 401 && error.response.config) {
      router.push("/login")
    } else {
      return Promise.reject(error);
    }
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
