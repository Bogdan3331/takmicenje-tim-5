import axios from "axios";

export const API_BASE_URL = "";

export const logout = () => {
  // destroy local storage auth_token
  localStorage.removeItem("auth_token");
  // send user via react router to /signin
  window.location.href = "/signin";
};

const ApiService = {
  init() {
    axios.defaults.baseURL = API_BASE_URL;

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }

        return Promise.reject(error);
      }
    );
  },

  setHeader() {
    const token = localStorage.getItem("auth_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  async get(resource, slug = "") {
    const slugWithSlash = slug.length ? `/${slug}` : "";
    try {
      const response = await axios.get(`${resource}${slugWithSlash}`);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async getFilter(resource, params) {
    try {
      const response = await axios.get(`${resource}`, { params });
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async post(resource, params, headers) {
    try {
      const response = await axios.post(`${resource}`, params, headers);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async put(resource, params) {
    try {
      const response = await axios.put(`${resource}`, params);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async delete(resource, data = {}) {
    try {
      const response = await axios.delete(`${resource}`, { data });
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // SIGN IN AND REGISTER CALLS
  async signIn(username, password) {
    return this.post(
      "login",
      { username, password, device: "Dev" },
      {
        headers: {
          Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=", //hard coded token
        },
      }
    );
  },

  async register(registrationData) {
    return this.post("register", registrationData, {
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=", //hard coded token
      },
    });
  },
};

export default ApiService;
