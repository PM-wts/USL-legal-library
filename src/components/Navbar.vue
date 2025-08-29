<template>
  <header class="w-full bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <nav class="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8 relative">
      
      <!-- Logo (always left) -->
      <div class="flex items-center w-1/4">
        <img 
          src="../static/Images/usllogo.png" 
          alt="USL Logo" 
          class="h-10 sm:h-12 w-auto object-contain"
        />
      </div>

      <!-- Title -->
      <h1 
        class="hidden sm:block text-xl md:text-2xl font-bold tracking-wide leading-none text-center w-1/2"
        style="font-family: 'Merriweather', serif;"
      >
        <span class="text-blue-900">U.S. Legal </span>
        <span class="text-gray-800">Library</span>
      </h1>

      <!-- Mobile Title (below logo) -->
      <h1 
        class="sm:hidden text-base font-bold tracking-wide leading-none text-center w-full mt-2"
        style="font-family: 'Merriweather', serif;"
      >
        <span class="text-blue-900">U.S. Legal </span>
        <span class="text-gray-800">Library</span>
      </h1>

      <!-- Right placeholder (for balance) -->
      <div class="w-1/4"></div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Add extra space to the body or content below to prevent overlap */
body {
  padding-top: 80px; /* Adjust according to the height of your navbar */
}
</style>
