<template>
  <footer class="bg-[#0056A3] text-gray-100 relative shadow-lg fixed bottom-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Divider -->
      <div class="border-t border-blue-300/40"></div>

      <!-- Copyright -->
      <p class="text-center text-xs sm:text-sm md:text-base mt-4 tracking-wide leading-relaxed">
        © 2025 <span class="font-semibold">U.S. Legal Services</span>. All Rights Reserved.
      </p>
    </div>

    <!-- Subtle gradient overlay for modern effect -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* Add extra space to the body or content above to prevent overlap */
body {
  padding-bottom: 80px; /* Adjust according to the height of your footer */
}
</style>
