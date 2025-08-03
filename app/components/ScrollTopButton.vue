<template>
  <button
    ref="scrollToTopButton"
    class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-black bg-opacity-90 hover:bg-opacity-100 rounded-full outline outline-white/10 flex items-center justify-center transition-all duration-300 opacity-0 pointer-events-none cursor-pointer"
    style="will-change: transform, opacity"
    @click="scrollToTop"
  >
    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scrollToTopButton = ref(null);
let smoother: ScrollSmoother | null = null;

const scrollToTop = () => {
  if (smoother) {
    smoother.scrollTo(0, true, 'power2.out');
  }
};

onMounted(() => {
  nextTick(() => {
    // Get the smoother instance from AppMain
    smoother = ScrollSmoother.get() || null;

    if (scrollToTopButton.value) {
      ScrollTrigger.create({
        trigger: '[data-section="melo"]',
        start: 'top center',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(scrollToTopButton.value, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onEnterBack: () => {
          gsap.to(scrollToTopButton.value, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(scrollToTopButton.value, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    }
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars?.trigger === '[data-section="melo"]') {
      trigger.kill();
    }
  });
});
</script>
