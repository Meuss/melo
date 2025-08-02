<template>
  <div
    ref="offcanvasElement"
    class="bg-black h-screen w-screen fixed text-white uppercase -top-[calc(100vh-64px)] z-10"
    @click="closeOffcanvas"
  >
    <nav
      ref="navElement"
      class="flex flex-col items-center justify-center h-full gap-4 text-center"
      @click.stop
    >
      <ul>
        <li class="mb-4 font-sans text-8xl"><a href="#" @click="closeOffcanvas">Le melo</a></li>
        <li class="mb-4 font-sans text-8xl"><a href="#" @click="closeOffcanvas">Réservation</a></li>
        <li class="mb-4 font-sans text-8xl">
          <a href="#" @click="closeOffcanvas">Privatisation</a>
        </li>
        <li class="mb-4 font-sans text-8xl">
          <div class="flex justify-center items-center gap-2">
            <SvgInstagram />
            <SvgFacebook />
          </div>
        </li>
        <li>
          <a href="#" class="font-serif" @click="closeOffcanvas">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const { isOpen, close } = useOffcanvas();
const offcanvasElement = ref(null);
const navElement = ref(null);
let timeline = null;

onMounted(() => {
  timeline = gsap.timeline({ paused: true });

  // Get all li elements for staggered animation
  const listItems = offcanvasElement.value.querySelectorAll('li');

  // Set initial state for list items
  gsap.set(listItems, {
    opacity: 0,
    y: 40,
  });

  timeline
    .to(offcanvasElement.value, {
      top: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    })
    .to(
      listItems,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
      },
      '-=0.2'
    );

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
      closeOffcanvas();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
});

onUnmounted(() => {
  if (timeline) {
    timeline.kill();
  }
});

watch(isOpen, (newIsOpen) => {
  if (!timeline) return;

  if (newIsOpen) {
    timeline.timeScale(1).play();
  } else {
    timeline.timeScale(1.5).reverse();
  }
});

const closeOffcanvas = () => {
  close();
};
</script>
