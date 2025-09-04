<template>
  <transition name="modal-fade">
    <div
      v-if="modal.visible"
      class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full animate-modalEnter border border-gray-100"
      >
        <!-- Icon -->
        <div
          :class="[
            'flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-md',
            modal.type === 'success' ? 'bg-green-500' :
            modal.type === 'error' ? 'bg-red-500' :
            modal.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          ]"
        >
          <svg
            v-if="modal.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else-if="modal.type === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg
            v-else-if="modal.type === 'warning'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 5.5l7.5 13H4.5l7.5-13z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>

        <!-- Message -->
        <div class="px-2">
          <h2 class="text-lg font-semibold text-gray-800 leading-snug mb-2 break-words">
            {{ modal.message }}
          </h2>
          <p class="text-gray-500 text-sm">This will close automatically</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex"
import { computed } from "vue"

export default {
  name: "SuccessModal",
  setup() {
    const store = useStore()
    const modal = computed(() => store.state.modal)

    return { modal }
  },
}
</script>

<style scoped>
/* Fade for background */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Attractive modal animation */
@keyframes modalEnter {
  0% {
    opacity: 0;
    transform: scale(0.85) translateY(40px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-6px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}
.animate-modalEnter {
  animation: modalEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
