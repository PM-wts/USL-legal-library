<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
    <GlobalModal /> <!-- 👈 always available -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import GlobalModal from "./components/GlobalModal.vue"

export default {
  name: "App",
  components: { Navbar, Footer, GlobalModal }
}
</script>
