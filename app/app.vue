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
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Melocoton club - Bulle',
  ogTitle: 'Melocoton club - Bulle',
  description:
    'Sans conteste, le meilleur petit club de la région. Jeudi, vendredi et samedi de 23h00 à 04h00. +18 ans.',
  ogDescription:
    'Sans conteste, le meilleur petit club de la région. Jeudi, vendredi et samedi de 23h00 à 04h00. +18 ans.',
  ogImage: 'https://melocoton-club.ch/og-image.jpg',
});
</script>

<style scoped>
#smooth-wrapper {
  overflow: hidden;
}

#smooth-content {
  overflow: visible;
}
</style>
