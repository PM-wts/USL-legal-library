import { createStore } from "vuex";
import axios from "axios";
import config from "../config";
import { useToast } from "vue-toastification";

export default createStore({
  state: {
    form: {
      username: "",
      email: "",
      password: "",
      isEnrolled: "", // radio
      state: "",
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
    validate({ state }) {
      const errors = {};

      // Username
      if (!state.form.username) {
        errors.username = "Username is required.";
      } else if (state.form.username.length < 3) {
        errors.username = "Username must be at least 3 characters.";
      }

      // Email
      if (!state.form.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          state.form.email
        )
      ) {
        errors.email = "Enter a valid email address.";
      }

      // Password
      if (!state.form.password) {
        errors.password = "Password is required.";
      }

      // Is Enrolled
      if (!state.form.isEnrolled) {
        errors.isEnrolled = "Please select an option.";
      }

      // State
      if (!state.form.state) {
        errors.state = "Please select a state.";
      }

      return errors;
    },

    async submitForm({ commit, dispatch, state }) {
      const toast = useToast();
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_RESPONSE", null);

      // --- Client-side validation ---
      const errors = await dispatch("validate");
      if (Object.keys(errors).length > 0) {
        commit("SET_LOADING", false);
        return { success: false, errors };
      }

      try {
        const res = await axios.post(config.apiUrl, state.form);

        if (res.data?.status === "Failed") {
          let fieldErrors = {};

          if (res.data.errors) {
            fieldErrors = res.data.errors;
            const firstError = Object.values(fieldErrors)[0];
            toast.error(firstError, { timeout: 5000 });
          } else {
            toast.error(res.data.message || "Something went wrong", {
              timeout: 5000,
            });
          }

          commit("SET_ERROR", res.data.message);
          commit("SET_LOADING", false); // reset only on failure
          return { success: false, errors: fieldErrors, error: res.data };
        }

        commit("SET_RESPONSE", res.data);
        toast.success(res.data.message || "Form submitted successfully ✅", {
          timeout: 4000,
        });

        if (res.data.href) {
          // 🚀 keep loading = true until redirect
          setTimeout(() => {
            window.location.href = res.data.href;
          }, 500);
        } else {
          // ✅ only reset loading when there's no redirect
          commit("SET_LOADING", false);
        }

        return { success: true, data: res.data };
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || err.message || "Unexpected error";
        commit("SET_ERROR", errorMsg);
        commit("SET_LOADING", false);
        toast.error(errorMsg, { timeout: 5000 });

        return { success: false, error: errorMsg };
      }
    },
  },
});
