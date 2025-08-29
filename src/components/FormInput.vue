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

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, ref } from "vue"

export default {
  name: "FormInput",
  setup() {
    const store = useStore()
    const errors = ref({})

    const form = computed(() => store.state.form)

    const updateField = (field, value) => {
      store.commit("SET_FIELD", { field, value })
    }

    const handleSubmit = async () => {
      const result = await store.dispatch("submitForm")
      if (!result.success) {
        errors.value = result.errors || {}
      } else {
        errors.value = {}

        // ✅ Redirect user if href exists
        if (result.data?.href) {
          window.location.href = result.data.href
        }

        console.log("Form Data:", form.value)
      }
    }
    
    return {
      form,
      errors,
      updateField,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
/* Input fields with focus animation */
input {
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

input:focus {
  border-color: #6366f1; /* Indigo color */
  box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
}

/* Button hover state */
button:hover {
  background-color: #4f46e5; /* Darker indigo on hover */
}

/* Form container adjustments */
form {
  max-width: 600px;
  margin-top: 2rem;
}
</style>
