import axios from "axios";

export const API_BASE_URL = "http://api.tim5.cortexakademija.com:8080/api";

export const logout = () => {
  localStorage.removeItem("auth_token");
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
    // Ensure no double slashes by removing leading slashes in resource
    const resourcePath = resource.startsWith("/")
      ? resource.slice(1)
      : resource;
    const slugWithSlash = slug ? `/${slug}` : "";

    try {
      const response = await axios.get(`${resourcePath}${slugWithSlash}`);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async getFilter(resource, params) {
    const resourcePath = resource.startsWith("/")
      ? resource.slice(1)
      : resource;
    try {
      console.log(resourcePath);
      const response = await axios.get(`${resourcePath}`, { params });
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async post(resource, params, headers) {
    const resourcePath = resource.startsWith("/")
      ? resource.slice(1)
      : resource;
    try {
      const response = await axios.post(`${resourcePath}`, params, headers);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async put(resource, params) {
    const resourcePath = resource.startsWith("/")
      ? resource.slice(1)
      : resource;
    try {
      const response = await axios.put(`${resourcePath}`, params);
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async delete(resource, data = {}) {
    const resourcePath = resource.startsWith("/")
      ? resource.slice(1)
      : resource;
    try {
      const response = await axios.delete(`${resourcePath}`, { data });
      return { message: "Success", data: response.data };
    } catch (error) {
      return {
        message: "Error",
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async signIn(email, password) {
    return this.post("login", {
      email,
      password,
    });
  },

  async register(registrationData) {
    return this.post("register", registrationData, {
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
      },
    });
  },

  async showProfile() {
    return this.get("show-profile");
  },

  //admin calls

  // vehicle calls for users

  async getVehiclesList(searchQuery, page, dates) {
    console.log(searchQuery, page, dates);

    // Destructure dates to get startDate, endDate, and available
    const { startDate, endDate } = dates;

    return this.getFilter("car", {
      search: searchQuery,
      page,
      startDate, // Pass startDate directly
      endDate, // Pass endDate directly
      available: true, // Set available to true
    });
  },

  // async avaliableVehicles(dates, page) {
  //   console.log(dates);
  //   return this.getFilter("car", dates, page);
  // },

  async getVehicleData(id) {
    return this.get(`car/${id}`);
  },

  async deleteVehicle(id) {
    return this.delete(`cars/${id}`);
  },

  async reserveVehicle(values) {
    return this.post("reservation", values);
  },

  async RateReservation(id, values) {
    return this.post(`reservation/${id}/rate`, values);
  },

  //user
  async logoutUser() {
    console.log("pozvana");
    return this.post("logout");
  },

  async editUser(values) {
    return this.post("update-profile", values);
  },

  async editPassword(values) {
    return this.post("change-password", values);
  },

  async forgetPassword(email) {
    return this.post("forgot-password", email);
  },

  async resetPassword(values) {
    return this.post("reset-password", values);
  },

  async getUserReservations() {
    return this.get("reservation");
  },
};

export default ApiService;
