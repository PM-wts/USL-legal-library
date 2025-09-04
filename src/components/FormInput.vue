<template>
  <div class="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-xl mt-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Username -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          Username <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.username"
          type="text"
          placeholder="Enter your username"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          @input="updateField('username', form.username)"
        />
        <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
      </div>

      <!-- Password -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          Password <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          @input="updateField('password', form.password)"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          Email <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          @input="updateField('email', form.email)"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Is Enrolled -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          Are you currently enrolled in one of our plans? <span class="text-red-500">*</span>
        </label>
        <div class="flex items-center space-x-6">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="enrolled"
              value="Yes"
              :checked="form.isEnrolled === 'Yes'"
              @change="updateField('isEnrolled', 'Yes')"
              class="hidden peer"
            />
            <span class="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition">
              <span class="w-2.5 h-2.5 bg-white rounded-full"></span>
            </span>
            <span class="ml-2 text-gray-700">Yes</span>
          </label>

          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="enrolled"
              value="No"
              :checked="form.isEnrolled === 'No'"
              @change="updateField('isEnrolled', 'No')"
              class="hidden peer"
            />
            <span class="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition">
              <span class="w-2.5 h-2.5 bg-white rounded-full"></span>
            </span>
            <span class="ml-2 text-gray-700">No</span>
          </label>
        </div>
        <p v-if="errors.isEnrolled" class="text-red-500 text-sm mt-1">{{ errors.isEnrolled }}</p>
      </div>

      <!-- Select State -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          The Legal Document Library forms are state specific. Please select the State that you need.
          <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.state"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          @change="updateField('state', form.state)"
        >
          <option value="" disabled>Select your state</option>
          <option v-for="s in states" :key="s.shortName" :value="s.shortName">
            {{ s.name }}
          </option>
        </select>
        <p v-if="errors.state" class="text-red-500 text-sm mt-1">{{ errors.state }}</p>
      </div>

      <!-- Submit -->
      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-md 
            hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 
            transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div v-if="loading" class="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>{{ loading ? "Submitting..." : "Submit" }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, ref } from "vue"
import statesJson from "../assets/states.json"

export default {
  name: "FormInput",
  setup() {
    const store = useStore()
    const errors = ref({})
    const states = ref(statesJson)

    const form = computed(() => store.state.form)
    const loading = computed(() => store.state.loading)

    const updateField = (field, value) => {
      store.commit("SET_FIELD", { field, value })
    }

    const handleSubmit = async () => {
      const result = await store.dispatch("submitForm")
      if (!result.success) {
        errors.value = result.errors || {}
      } else {
        errors.value = {}
      }
    }

    return {
      form,
      errors,
      states,
      updateField,
      handleSubmit,
      loading,
    }
  },
}
</script>
