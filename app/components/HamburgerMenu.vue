<template>
  <button
    aria-label="Menu"
    id="hamburger"
    class="opacity-0 cursor-pointer focus:outline-0"
    @click="toggleOffcanvas"
  >
    <SvgLogoShape />
  </button>
</template>

<script setup>
const { toggle } = useOffcanvas();

const toggleOffcanvas = () => {
  toggle();
};
</script>
