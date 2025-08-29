import { createStore } from "vuex";
import axios from "axios";
import config from "../config";
import { useToast } from "vue-toastification";

export default createStore({
  state: {
    form: {
      username: "",
      password: "",
    },
    response: null,
    loading: false,
    error: null,
  },

  mutations: {
    SET_FIELD(state, { field, value }) {
      state.form[field] = value;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_RESPONSE(state, payload) {
      state.response = payload;
    },
  },

  actions: {
    // ✅ Client-side validation before API call
    validate({ state }) {
      const errors = {};

      if (!state.form.username) {
        errors.username = "Username is required.";
      } else if (state.form.username.length < 3) {
        errors.username = "Username must be at least 3 characters.";
      }

      if (!state.form.password) {
        errors.password = "Password is required.";
      } else if (state.form.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }

      return errors;
    },

    async submitForm({ commit, dispatch, state }) {
      const toast = useToast();
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_RESPONSE", null);

      // 🔹 Local validation
      const errors = await dispatch("validate");
      if (Object.keys(errors).length > 0) {
        commit("SET_LOADING", false);

        const combinedMsg = Object.values(errors).join("\n");
        toast.error(combinedMsg, { timeout: 5000 });

        return { success: false, errors };
      }

      try {
        // 🔹 API call
        const res = await axios.post(config.apiUrl, state.form);

        if (res.data?.status === "Failed") {
          if (res.data.errors) {
            const combinedMsg = Object.values(res.data.errors).join("\n");
            toast.error(combinedMsg, { timeout: 5000 });
          } else {
            toast.error(res.data.message || "Something went wrong", { timeout: 5000 });
          }

          commit("SET_ERROR", res.data.message);
          return { success: false, error: res.data };
        }

        // 🔹 Success
        console.log(res.data);

        commit("SET_RESPONSE", res.data);
        toast.success(res.data.message || "Login successful ✅", { timeout: 4000 });

        if (res.data.href) {
          setTimeout(() => {
            window.location.href = res.data.href;
          }, 1500);
        }

        return { success: true, data: res.data };

      } catch (err) {
        const errorMsg =
          err.response?.data?.message || err.message || "Unexpected error";
        commit("SET_ERROR", errorMsg);
        toast.error(errorMsg, { timeout: 5000 });
        return { success: false, error: errorMsg };
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});
