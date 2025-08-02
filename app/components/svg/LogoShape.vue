<template>
  <div>
    <svg height="25" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        id="shape"
        d="M119 118.7V91.2767L83.4701 118.7H119ZM0 118.7H35.5299L0 91.3768V118.8V118.7ZM59.45 45.8385L0 0V27.423L59.45 73.3616L118.9 27.423V0L59.45 45.9386V45.8385ZM0 45.6383V73.0614L59.45 119L118.9 73.0614V45.6383L59.45 91.577L0 45.6383Z"
        fill="white"
      />
      <path
        id="cross"
        d="M59.5 73L0 119V91.5L41.5 59.5L0 27.5V0L59.5 46L119 0V27.5L77.5 59.5L119 91.5V119L59.5 73Z"
        fill="white"
        style="opacity: 0"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useOffcanvas } from '~/composables/useOffcanvas';

gsap.registerPlugin(MorphSVGPlugin);

const { isOpen } = useOffcanvas();
const isMenuOpen = ref(false);
const timeline = ref(null);

const createMorphTimeline = () => {
  if (timeline.value) {
    timeline.value.kill();
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    paused: true,
  });
  timeline.value = tl;

  // Morph from shape to cross
  tl.to('#shape', {
    duration: 0.8,
    morphSVG: '#cross',
  });

  return tl;
};

watch(isOpen, (newValue) => {
  isMenuOpen.value = newValue;

  if (timeline.value) {
    if (newValue) {
      // Play forward (shape to cross)
      timeline.value.play();
    } else {
      // Play reverse (cross to shape)
      timeline.value.reverse();
    }
  }
});

onMounted(() => {
  createMorphTimeline();
});
</script>
