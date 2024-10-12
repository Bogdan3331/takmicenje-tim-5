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

  async getUserData() {
    return this.get("show-profile");
  },

  //admin calls

  async getUsers() {
    return this.get("admin/user");
  },

  async deleteUser(id) {
    return this.delete(`admin/user/${id}`);
  },

  async editUserData(id, values) {
    return this.put(`/user/${id}`, values);
  },

  async getUsersNames(id) {
    return this.get(`user/${id}`);
  },

  async getAllReservations() {
    return this.get("admin/reservation");
  },

  async getUserReservations(id) {
    console.log("ova funkcija");
    console.log(id);
    return this.get(`admin/user/${id}/reservation`);
  },

  async deleteCar(id) {
    return this.delete(`admin/car/${id}`);
  },

  async updateCar(id, values) {
    return this.post(`admin/car/${id}`, values);
  },

  async createCar(values) {
    console.log(values);
    return this.post("admin/car", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // vehicle calls for users

  async getVehiclesList(page, searchQuery, data) {
    let search = { search: searchQuery, page };
    try {
      const { startDate, endDate, available, filter } = data;
      const { type, fuelType, gear, passengers} = filter;
      const brand = filter.manufacturer
      search = {
        page,
        search: searchQuery,
        startDate,
        endDate,
        available,
        type, brand, fuelType, gear, passengers
      };
    } catch (error) {}

    return this.getFilter("car", search);
  },

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

  async getUsersReservations() {
    return this.get("reservation");
  },
};

export default ApiService;
