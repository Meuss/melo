<template>
  <div class="container mx-auto flex flex-col gap-32 py-16 px-4">
    <section data-section="melo" class="flex flex-col lg:flex-row gap-16">
      <div class="lg:w-1/2">
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
        <NuxtImg src="/images/main-3.jpg" alt="Le melo" class="w-full h-full object-cover" />
      </div>
    </section>

    <section data-section="reservation" class="flex flex-col lg:flex-row-reverse gap-16">
      <div class="lg:w-1/2">
        <h1>Réservation</h1>
        <p>
          Des tables hautes avec des tabourets confortables sont à disposition dans le club. Réserve
          la tienne pour toi et tes amis et profite des avantages pour une soirée réussie.
        </p>
        <p>→ Offre pour 4-5 personnes : une table, une bouteille à choix, 5 shots : 120.–</p>
        <div>
          <a href="#">Réserver</a>
        </div>
      </div>
      <div class="lg:w-1/2 aspect-4/3">
        <NuxtImg src="/images/main-8.jpg" alt="Réservation" class="w-full h-full object-cover" />
      </div>
    </section>

    <section data-section="privatisation" class="flex flex-col lg:flex-row gap-16">
      <div class="lg:w-1/2">
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
        <div>
          <a href="#">Réserver</a>
          <a href="#">Plus d'infos</a>
        </div>
      </div>
      <div class="lg:w-1/2 aspect-4/3">
        <NuxtImg src="/images/main-9.jpg" alt="Privatisation" class="w-full h-full object-cover" />
      </div>
    </section>
  </div>
</template>
