import axios from "axios";

export const API_BASE_URL = "https://biblioteka.simonovicp.com/api";

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
        // FIXME: if error response is 401, logout user (maybe it is 403 instead of 401)
        if (error.response && error.response.status === 401) {
          logout();
        }

        // FIXME: dummy logic here
        // if (error.response && error.response.status === 429) {
        //     setTimeout(() => {
        //         // replay request
        //         axios.request(error.config);
        //     }, 1000);
        // }

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
          Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
        },
      }
    );
  },

  async register(registrationData) {
    return this.post("register", registrationData, {
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
      },
    });
  },

  async getUser() {
    return this.post("users/me");
  },

  async deleteUser(id) {
    return this.delete("");
  },

  async getCars(searchQuery) {
    return this.getFilter("", { search: searchQuery });
  },

  async deleteCar(id) {
    return this.delete("");
  },

  async getReservations(auth_token) {
    return this.get("/reservations", auth_token);
  },
};

export default ApiService;
