<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
};
</script>
