<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar (fixed at top) -->
    <Navbar class="fixed top-0 left-0 w-full z-50 h-20 shadow-md bg-white" />

    <!-- Main content (with spacing for navbar + footer) -->
    <main class="flex-1 pt-20 pb-20">
      <router-view />
    </main>

    <!-- Footer (fixed at bottom) -->
    <Footer class="fixed bottom-0 left-0 w-full z-50 h-20 shadow-inner bg-[#0056A3]" />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
  name: "Layout",
  components: { Navbar, Footer },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
</style>
