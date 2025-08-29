<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 py-8" style="margin-top: 55px;">
    <div class="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 sm:p-12 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      <!-- Title -->
      <h3 class="text-3xl font-semibold text-center text-gray-900 mb-6 leading-tight" style="font-family: 'Poppins', sans-serif;">
        Welcome to <span class="text-indigo-700">U.S. Legal Library</span>
      </h3>

      <!-- Form Section -->
      <FormInput />
    </div>
  </div>
</template>

<script>
import FormInput from "../components/FormInput.vue";

export default {
  name: "Home",
  components: { FormInput },
};
</script>

<style scoped>
/* Smooth fade-in animation */
div {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
