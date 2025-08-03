<template>
  <div
    ref="offcanvasElement"
    class="bg-black h-[100svh] w-screen fixed text-white uppercase -top-[100svh] z-40"
    @click="closeOffcanvas"
  >
    <nav
      ref="navElement"
      class="flex flex-col items-center justify-center h-full gap-4 text-center pt-8 sm:pt-0"
      @click.stop
    >
      <ul class="">
        <li class="mb-4 font-sans text-7xl sm:text-8xl">
          <button
            class="uppercase cursor-pointer hover:text-purple transition-colors"
            @click="closeOffcanvas('melo')"
          >
            Le melo
          </button>
        </li>
        <li class="mb-4 font-sans text-7xl sm:text-8xl">
          <button
            class="uppercase cursor-pointer hover:text-purple transition-colors"
            @click="closeOffcanvas('reservation')"
          >
            Réservation
          </button>
        </li>
        <li class="mb-8 sm:mb-12 font-sans text-7xl sm:text-8xl">
          <button
            class="uppercase cursor-pointer hover:text-purple transition-colors"
            @click="closeOffcanvas('privatisation')"
          >
            Privatisation
          </button>
        </li>
        <li class="mb-8 font-sans">
          <div class="flex justify-center items-center gap-3">
            <a href="https://www.instagram.com/melocoton_club/">
              <SvgInstagram />
            </a>
            <a href="https://www.facebook.com/Melocotonclubbulle/">
              <SvgFacebook />
            </a>
          </div>
        </li>
        <li>
          <button
            class="uppercase cursor-pointer font-serif hover:text-purple transition-colors"
            @click="closeOffcanvas('contact')"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const { isOpen, close } = useOffcanvas();
const offcanvasElement = ref(null);
const navElement = ref(null);
let timeline = null;

onMounted(() => {
  timeline = gsap.timeline({ paused: true });

  const listItems = offcanvasElement.value.querySelectorAll('li');

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

  // Track scroll position to auto-close offcanvas
  let initialScrollY = 0;
  let isTracking = false;

  const handleScroll = () => {
    if (!isOpen.value) return;

    const currentScrollY = window.scrollY;

    if (!isTracking) {
      initialScrollY = currentScrollY;
      isTracking = true;
      return;
    }

    const scrollDelta = Math.abs(currentScrollY - initialScrollY);

    if (scrollDelta > 50) {
      closeOffcanvas();
      isTracking = false;
    }
  };

  // Reset tracking when offcanvas opens
  watch(isOpen, (newIsOpen) => {
    if (newIsOpen) {
      isTracking = false;
      initialScrollY = window.scrollY;
    } else {
      isTracking = false;
    }
  });

  document.addEventListener('keydown', handleKeyDown);
  window.addEventListener('scroll', handleScroll, { passive: true });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('scroll', handleScroll);
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

const closeOffcanvas = (section) => {
  if (section) {
    const targetElement = document.querySelector(`[data-section="${section}"]`);
    if (targetElement) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        setTimeout(() => {
          smoother.scrollTo(targetElement, true, 'top 100px');
        }, 600);
      } else {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: targetElement, offsetY: 100 },
          ease: 'power2.inOut',
        });
      }
    }
  }
  close();
};
</script>
