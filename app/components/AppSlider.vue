<template>
  <div class="w-full h-[calc(100vh-64px)] bg-black">
    <Swiper
      :modules="[EffectFade, Autoplay]"
      :slides-per-view="1"
      :effect="'fade'"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :loop="true"
      :fade-effect="{
        crossFade: true,
      }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <NuxtImg :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  { src: '/images/MELO_photo_site_1.jpg', alt: 'MELO photo 1' },
  { src: '/images/MELO_photo_site_2.jpg', alt: 'MELO photo 2' },
  { src: '/images/MELO_photo_site_3.jpg', alt: 'MELO photo 3' },
  { src: '/images/MELO_photo_site_4.jpg', alt: 'MELO photo 4' },
  { src: '/images/MELO_photo_site_5.jpg', alt: 'MELO photo 5' },
  { src: '/images/MELO_photo_site_6.jpg', alt: 'MELO photo 6' },
  { src: '/images/MELO_photo_site_7.jpg', alt: 'MELO photo 7' },
];
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
