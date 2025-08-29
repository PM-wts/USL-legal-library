import { createStore } from "vuex"

export default createStore({
  state: {
    form: {
      username: "",
      password: "",
      email: "",
      enrolled: "",
    },
    response: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_FIELD(state, { field, value }) {
      state.form[field] = value
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    SET_RESPONSE(state, payload) {
      state.response = payload
    },
  },
  actions: {
    validate({ state }) {
      const errors = {}

      if (!state.form.username) {
        errors.username = "Username is required."
      } else if (state.form.username.length < 3) {
        errors.username = "Username must be at least 3 characters."
      }

      if (!state.form.password) {
        errors.password = "Password is required."
      } else if (state.form.password.length < 6) {
        errors.password = "Password must be at least 6 characters."
      }

      if (!state.form.email) {
        errors.email = "Email is required."
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.form.email)) {
        errors.email = "Please enter a valid email."
      }

      if (!state.form.enrolled) {
        errors.enrolled = "Please select an option."
      }

      return errors
    },

    async submitForm({ commit, dispatch, state }) {
      commit("SET_LOADING", true)
      commit("SET_ERROR", null)
      commit("SET_RESPONSE", null)

      const errors = await dispatch("validate")
      if (Object.keys(errors).length > 0) {
        commit("SET_LOADING", false)
        return { success: false, errors }
      }

      try {
        const res = await fetch("https://example.com/api/endpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.form),
        })
        if (!res.ok) throw new Error("API error")
        const data = await res.json()
        commit("SET_RESPONSE", data)
        return { success: true, data }
      } catch (err) {
        commit("SET_ERROR", err.message)
        return { success: false, error: err.message }
      } finally {
        commit("SET_LOADING", false)
      }
    },
  },
})
