<template>
  <button class="cursor-pointer" @click="toggleOffcanvas">
    <SvgLogoShape />
  </button>
</template>

<script setup>
const { toggle } = useOffcanvas();

const toggleOffcanvas = () => {
  toggle();
};
</script>
