import axios from "axios";
import { TokenService } from "@/services/storage.service";
import Vue from "vue";

const setAuthHeader = async () => {
  let accessToken = await Vue.prototype.$auth.getAccessToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },

  async get(resource) {
    await setAuthHeader();
    return axios.get(resource);
  },

  async post(resource, data) {
    setAuthHeader();
    return axios.post(resource, data);
  },

  async put(resource, data) {
    setAuthHeader();
    return axios.put(resource, data);
  },

  async delete(resource) {
    setAuthHeader();
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  }
};

export default ApiService;
