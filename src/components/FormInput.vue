<template>
  <div class="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-xl mt-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <!-- Username -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">Username</label>
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
        <label class="block text-gray-800 font-semibold mb-2">Password</label>
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
        <label class="block text-gray-800 font-semibold mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          @input="updateField('email', form.email)"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Is Enrolled (Radio Buttons) -->
      <div>
        <label class="block text-gray-800 font-semibold mb-2">
          Are you currently enrolled in one of our plans?
        </label>
        <div class="flex items-center space-x-6">
          
          <!-- Yes -->
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="enrolled"
              value="Yes"
              :checked="form.isEnrolled === 'Yes'"
              @change="updateField('isEnrolled', 'Yes')"
              class="hidden peer"
            />
            <span
              class="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition"
            >
              <span class="w-2.5 h-2.5 bg-white rounded-full"></span>
            </span>
            <span class="ml-2 text-gray-700">Yes</span>
          </label>

          <!-- No -->
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="enrolled"
              value="No"
              :checked="form.isEnrolled === 'No'"
              @change="updateField('isEnrolled', 'No')"
              class="hidden peer"
            />
            <span
              class="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition"
            >
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

    <!-- Submit Button with Professional Loader -->
    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-md 
              hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 
              transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <!-- Modern Spinner -->
        <div
          v-if="loading"
          class="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"
        ></div>
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
    const loading = computed(() => store.state.loading) // ✅ add loading

    const updateField = (field, value) => {
      store.commit("SET_FIELD", { field, value })
    }

    const handleSubmit = async () => {
      const result = await store.dispatch("submitForm")
      if (!result.success) {
        errors.value = result.errors || {}
      } else {
        errors.value = {}
        if (result.data?.href) {
          window.location.href = result.data.href
        }
        console.log("Form Data:", form.value)
      }
    }
    
    return {
      form,
      errors,
      states,
      updateField,
      handleSubmit,
      loading, // ✅ expose to template
    }
  },
}
</script>

<style scoped>
/* Smooth professional loader */
button div {
  border-width: 3px;
}

/* Input and select fields with focus animation */
input,
select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.5rem; /* rounded-md */
  font-size: 1rem;
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  appearance: none;
  background-color: #fff;
}

/* Custom dropdown arrow */
select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
  padding-right: 2.5rem;
  cursor: pointer;
}

input:focus,
select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.4);
  outline: none;
}

::placeholder {
  color: #9ca3af;
}

.text-red-500 {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

button {
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
}

form {
  max-width: 600px;
  margin-top: 2rem;
}
</style>
