import axios from "axios";

export const API_BASE_URL = "http://api.tim5.cortexakademija.com/api";

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
    return this.post("http://api.tim5.cortexakademija.com/api/login", {
      email,
      password,
      device: "Dev",
    });
  },

  async register(registrationData) {
    return this.post("register", registrationData, {
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
      },
    });
  },

  async getVehiclesList(searchQuery) {
    return this.getFilter("http://api.tim5.cortexakademija.com/api/car", {
      search: searchQuery,
    });
  },

  async deleteVehicle(id) {
    return this.delete(`cars/${id}`);
  },

  async reserveVehicle(car_id) {
    return this.post("reservation", car_id);
  },

  async deleteUser(id) {
    return this.delete(`users/${id}`);
  },

  async getUser(id) {
    const token = localStorage.getItem("auth_token");
    return this.get(`http://api.tim5.cortexakademija.com/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getReservations(auth_token) {
    return this.get("reservations", auth_token);
  },
};

export default ApiService;
