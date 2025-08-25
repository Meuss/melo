<template>
  <!-- Framboises background layer -->
  <div
    ref="framboisesContainer"
    class="fixed inset-0 pointer-events-none z-0"
    style="will-change: transform"
  >
    <div
      v-for="framboise in framboises"
      :key="framboise.id"
      class="framboise absolute"
      :style="{
        left: framboise.x + '%',
        top: framboise.y + '%',
        width: framboise.size + 'px',
        height: framboise.size + 'px',
        transform: `rotate(${framboise.rotation}deg)`,
        opacity: framboise.opacity,
      }"
    >
      <img
        :src="`/images/framboises/${framboise.svg}.svg`"
        :alt="`Framboise ${framboise.svg}`"
        class="w-full h-full"
      />
    </div>
  </div>

  <!-- Main content -->
  <div class="container mx-auto flex flex-col gap-24 lg:gap-32 py-16 px-4 relative z-10">
    <section data-section="melo" class="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div class="lg:w-1/2 p-2 lg:p-8">
        <h1>Le melo</h1>
        <p>
          Sans conteste, le meilleur petit club de la région.<br />
          Situé en plein centre-ville, c'est un lieu emblématique des nuits bulloises depuis plus de
          20 ans. Rénové en 2021, il offre une atmosphère chaleureuse et feutrée sous de magnifiques
          voûtes. Résolument all style, le club accueille des dj's régionaux et se veut ouvert à
          tous, toute l'année. Convivial et branché, c'est l'endroit parfait pour simplement
          partager un verre... ou danser jusqu'au bout de la nuit.
        </p>
        <p>#framboisettesnoregrets</p>
      </div>
      <div class="lg:w-1/2 aspect-4/3">
        <NuxtImg
          provider="cloudinary"
          src="/melo/main/main-3.jpg"
          alt="Le melo"
          class="w-full h-full object-cover"
        />
      </div>
    </section>

    <section data-section="reservation" class="flex flex-col lg:flex-row-reverse gap-12">
      <div class="lg:w-1/2 p-2 lg:p-8">
        <h1>Réservation</h1>
        <p>
          Des tables hautes avec des tabourets confortables sont à disposition dans le club. Réserve
          la tienne pour toi et tes amis et profite des avantages pour une soirée réussie.
        </p>
        <p>→ Offre pour 4-5 personnes : une table, une bouteille à choix, 5 shots : 120.–</p>
        <div class="flex justify-center gap-4 mt-10">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScRVVV6GEM6zlvMMS_a4E0TFNssd4IsfBl_S2tbZcd8WPbj4w/viewform?usp=header"
            target="_blank"
            >Réserver</a
          >
        </div>
      </div>
      <div class="lg:w-1/2 aspect-4/3">
        <NuxtImg
          provider="cloudinary"
          src="/melo/main/main-8.jpg"
          alt="Réservation"
          class="w-full h-full object-cover"
        />
      </div>
    </section>

    <section data-section="privatisation" class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-1/2 p-2 lg:p-8">
        <h1>Privatisation</h1>
        <p>
          En dehors de ses heures d'ouverture, le MELO peut être privatisé pour tout type
          d'événements : anniversaire, réunion, apéro d'entreprise, assemblée, occasion spéciale,
          etc...
        </p>
        <p>
          Notre équipe se tient à disposition pour satisfaire vos demandes avec des forfaits
          boisson/nourriture clé en main ou sur mesure. De 20 à 80 personnes, notre salle est idéale
          pour un événement réussi dans un cadre original et exclusif.
        </p>
        <div class="flex flex-col items-center justify-center sm:flex-row gap-4 mt-10">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScRVVV6GEM6zlvMMS_a4E0TFNssd4IsfBl_S2tbZcd8WPbj4w/viewform?usp=header"
            target="_blank"
            >Réserver</a
          >
          <a href="/MELO_privatisation.pdf" target="_blank">Plus d'infos</a>
        </div>
      </div>
      <div class="lg:w-1/2 aspect-4/3">
        <NuxtImg
          provider="cloudinary"
          src="/melo/main/main-9.jpg"
          alt="Privatisation"
          class="w-full h-full object-cover"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const framboisesContainer = ref(null);
const framboises = ref([]);
let smoother = null;

// Generate random framboises
const generateFramboises = () => {
  const isMobile = window.innerWidth < 768;

  // Reduce count on mobile for better performance
  let maxCount, minCount;
  if (isMobile) {
    maxCount = 44;
    minCount = 36;
  } else {
    maxCount = 48;
    minCount = 40;
  }

  const count = Math.floor(Math.random() * (maxCount - minCount)) + minCount;
  const framboisesArray = [];

  for (let i = 0; i < count; i++) {
    const size = isMobile
      ? Math.random() * 40 + 40 // Mobile: 40px to 80px
      : Math.random() * 60 + 80; // Desktop: 80px to 140px

    framboisesArray.push({
      id: i,
      svg: Math.floor(Math.random() * 4) + 1, // Random between 1 and 4
      x: Math.random() * 90, // Random X position (0-90%)
      y: Math.random() * 200 + 10, // Random Y position with extra height for scrolling
      size: size,
      rotation: Math.random() * 360, // Random rotation
      opacity: Math.random() * 0.2 + 0.1, // Random opacity between 0.1 and 0.3
      speed: Math.random() * 1.2 + 0.2, // Random parallax speed
    });
  }

  framboises.value = framboisesArray;
};

onMounted(() => {
  generateFramboises();

  nextTick(() => {
    // Detect if device is mobile
    const isMobile = window.innerWidth < 768;

    // Initialize ScrollSmoother with mobile-optimized settings
    if (!isMobile) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        smoothTouch: 0.1,
        ignoreMobileResize: true, // Prevent issues with mobile viewport changes
      });
    }

    // Create parallax effects for framboises (optimized for mobile)
    if (framboisesContainer.value) {
      const framboisesElements = framboisesContainer.value.querySelectorAll('.framboise');

      framboisesElements.forEach((framboise, index) => {
        const speed = framboises.value[index]?.speed;

        // Full animation for desktop
        gsap.to(framboise, {
          yPercent: 400 * speed,
          rotate: `+=${Math.random() * 30 - 15}`,
          ease: 'none',
          scrollTrigger: {
            trigger: framboise,
            start: 'top bottom+=200px',
            end: 'bottom top-=500px',
            scrub: 3,
          },
        });

        // Floating animation for all devices
        gsap.to(framboise, {
          y: '+=20',
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: Math.random() * 2,
        });
      });
    }
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (smoother) {
    smoother.kill();
  }
});
</script>

<style scoped>
.framboise {
  will-change: transform;
  transition: opacity 0.3s ease;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: none;
}

[data-section] {
  will-change: transform, opacity;
}

/* Mobile-specific optimizations */
@media (max-width: 768px) {
  .framboise {
    /* Reduce complexity on mobile */
    transform: translate3d(0, 0, 0);
  }
}
</style>
