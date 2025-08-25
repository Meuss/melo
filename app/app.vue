<template>
  <div class="font-serif">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <AppHeader />
        <AppOffcanvas />
        <AppSlider />
        <AppMain />
        <AppFooter />
      </div>
    </div>
    <ScrollTopButton />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'MELOCOTON CLUB à Bulle',
  ogTitle: 'MELOCOTON CLUB à Bulle',
  description: 'Votre club préféré tous les week-end de 23h à 4h, +18ans',
  ogDescription: 'Votre club préféré tous les week-end de 23h à 4h, +18ans',
  ogImage: 'https://melocoton-club.ch/og-image.jpg',
});
</script>

<style scoped>
#smooth-wrapper {
  overflow: hidden;
  /* Mobile scroll optimization */
  -webkit-overflow-scrolling: touch;
  /* Prevent mobile bounce */
  overscroll-behavior: none;
}

#smooth-content {
  overflow: visible;
  /* GPU acceleration for better performance */
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
