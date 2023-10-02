import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    token: localStorage.getItem("jwtToken") || null,
    isAuthenticated: !!localStorage.getItem("jwtToken"),
    userData: JSON.parse(localStorage.getItem("user")) || {},
    permissions: localStorage.getItem("permissions") || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserPermissions(state, permissions) {
      state.permissions = permissions;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    loginState(state, user) {
      state.isAuthenticated = true;
      state.userData = user;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.token = null;
      state.permissions = null;
    },
  },
  actions: {
    // Define actions for logging in, logging out, and fetching user data

    resetAutoLogoutTimer({ dispatch }) {
      // clear the existing timer
      clearInterval(this.timerId);

      this.timerId = setInterval(() => {
        dispatch("logout");
        alert("!Running out of session. You need to login again");
        window.location.reload();
      }, 6000); // Set the timer interval (e.g., 600,000 ms = 1 hour)
    },

    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post("auth/login/", {
          email: email,
          password: password,
        });
        const token = response.data.token["access"];
        console.log(token);
        localStorage.setItem("jwtToken", token);
        commit("setToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await this.dispatch("fetchUserData");
        // Reset the auto-logout timer
        this.dispatch("resetAutoLogoutTimer");
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
    async fetchUserData({ commit }) {
      try {
        const response = await axios.get("auth/login/");
        const userData = response.data["user"];
        commit("loginState", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("permissions", userData.type);
        commit("setUserPermissions", userData.type);
        commit("setUserData", userData);
      } catch (error) {
        console.error("Login error", error);
      }
    },
    logout({ commit }) {
      localStorage.clear();
      console.log("local storage clear");
      commit("logOut");
      console.log("committed");
      delete axios.defaults.headers.common["Authorization"];
      console.log("axio header cleared!");
    },
  },
  getters: {
    userData: (state) => state.userData,
    isAuthenticated: (state) => state.isAuthenticated,
    userPermissions: (state) => state.permissions,
  },
});

export default store;
