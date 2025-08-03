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
  <div class="container mx-auto flex flex-col gap-32 py-16 px-4 relative z-10">
    <section data-section="melo" class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-1/2 p-8">
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
      <div class="lg:w-1/2 p-8">
        <h1>Réservation</h1>
        <p>
          Des tables hautes avec des tabourets confortables sont à disposition dans le club. Réserve
          la tienne pour toi et tes amis et profite des avantages pour une soirée réussie.
        </p>
        <p>→ Offre pour 4-5 personnes : une table, une bouteille à choix, 5 shots : 120.–</p>
        <div class="flex justify-center gap-4 mt-10">
          <a href="#">Réserver</a>
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
      <div class="lg:w-1/2 p-8">
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
        <div class="flex justify-center gap-4 mt-10">
          <a href="#">Réserver</a>
          <a href="#">Plus d'infos</a>
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
  const count = Math.floor(Math.random() * 8) + 40; // Random between 40 and 48
  const framboisesArray = [];

  for (let i = 0; i < count; i++) {
    framboisesArray.push({
      id: i,
      svg: Math.floor(Math.random() * 4) + 1, // Random between 1 and 4
      x: Math.random() * 90, // Random X position (0-90%)
      y: Math.random() * 200 + 10, // Random Y position with extra height for scrolling
      size: Math.random() * 60 + 80, // Random size between 80px and 140px
      rotation: Math.random() * 360, // Random rotation
      opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1 and 0.5
      speed: Math.random() * 1.2 + 0.2, // Random parallax speed
    });
  }

  framboises.value = framboisesArray;
};

onMounted(() => {
  generateFramboises();

  nextTick(() => {
    // Initialize ScrollSmoother
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    // Create parallax effects for framboises
    if (framboisesContainer.value) {
      const framboisesElements = framboisesContainer.value.querySelectorAll('.framboise');

      framboisesElements.forEach((framboise, index) => {
        const speed = framboises.value[index]?.speed;

        gsap.to(framboise, {
          yPercent: 300 * speed,
          rotate: `+=${Math.random() * 30 - 15}`,
          ease: 'none',
          scrollTrigger: {
            trigger: framboise,
            start: 'top bottom+=200px',
            end: 'bottom top-=500px',
            scrub: 2,
          },
        });

        // Add subtle floating animation
        gsap.to(framboise, {
          y: '+=20',
          rotation: `+=${Math.random() * 20 - 10}`,
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
}

[data-section] {
  will-change: transform, opacity;
}
</style>
