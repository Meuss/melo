<template>
  <div class="w-full h-[calc(100svh-64px)] bg-black relative slider-container">
    <Swiper
      ref="swiperRef"
      :modules="[EffectFade, Autoplay]"
      :slides-per-view="1"
      :effect="'fade'"
      :autoplay="autoplayConfig"
      :loop="true"
      :fade-effect="{
        crossFade: true,
      }"
      :speed="1000"
      :allow-touch-move="false"
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <picture class="w-full h-full">
          <!-- Mobile crop 1200x1400 -->
          <source
            media="(max-width: 767px)"
            :srcset="`https://res.cloudinary.com/dljgq8ek2/image/upload/f_auto,q_auto:good,c_fill,w_1200,h_1400/v1754207934${image.src}`"
          />
          <!-- Desktop -->
          <img
            :src="`https://res.cloudinary.com/dljgq8ek2/image/upload/f_auto,q_auto:good/v1754207934${image.src}`"
            :alt="image.alt"
            :class="
              image.position === 'top'
                ? 'w-full h-full object-cover object-top slide-image'
                : 'w-full h-full object-cover slide-image'
            "
          />
        </picture>
      </SwiperSlide>
    </Swiper>

    <div
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 scale-50 md:scale-75 lg:scale-100"
    >
      <LogoAnimation v-if="showLogo" />
    </div>

    <p
      id="opening-hours"
      class="text-white opacity-0 absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center uppercase z-20"
    >
      Jeudi<br />
      Vendredi & Samedi<br />
      23h00 – 04h00<br />
      + 18 ans<br />
    </p>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { nextTick, ref } from 'vue';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  { src: '/melo/MELO_photo_site_1.jpg', alt: 'MELO photo 1' },
  { src: '/melo/MELO_photo_site_2.jpg', alt: 'MELO photo 2' },
  { src: '/melo/MELO_photo_site_3.jpg', alt: 'MELO photo 3' },
  { src: '/melo/MELO_photo_site_4.jpg', alt: 'MELO photo 4' },
  { src: '/melo/MELO_photo_site_5.jpg', alt: 'MELO photo 5' },
  { src: '/melo/MELO_photo_site_6.jpg', alt: 'MELO photo 6' },
  { src: '/melo/MELO_photo_site_7.jpg', alt: 'MELO photo 7', position: 'top' },
];

const swiperRef = ref();
const swiperInstance = ref();
const overlayOpacity = ref(1);
const showLogo = ref(false);

const autoplayConfig = ref({
  delay: 4000,
  disableOnInteraction: false,
}); // Always provide config object

const onSwiperInit = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  // Start autoplay right away
  swiper.autoplay.start();
  animateCurrentSlide();

  // Fade overlay so images are visible
  gsap.to(overlayOpacity, {
    value: 0.2,
    duration: 1,
    ease: 'power2.inOut',
  });

  // Start logo animation after 1s by mounting the component
  setTimeout(() => {
    showLogo.value = true;
  }, 1000);
};

const animateCurrentSlide = () => {
  const activeSlide = document.querySelector('.swiper-slide-active .slide-image') as HTMLElement;
  if (activeSlide) {
    // Reset scale and animate
    gsap.set(activeSlide, { scale: 1 });
    gsap.to(activeSlide, {
      scale: 1.05,
      duration: 5,
      ease: 'linear',
    });
  }
};

const onSlideChange = () => {
  nextTick(() => {
    animateCurrentSlide();
  });
};
</script>

<style scoped>
.slider-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  pointer-events: none;
  z-index: 10;
  opacity: v-bind(overlayOpacity);
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
