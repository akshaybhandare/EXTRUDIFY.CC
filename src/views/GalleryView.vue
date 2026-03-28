<template>
  <div class="flex flex-col flex-grow">
    <div class="site-grid"></div>
    <!-- Hero Header -->
    <header class="max-w-screen-2xl mx-auto px-8 pt-48 pb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
      <div class="md:col-span-8">
        <h1 class="font-headline text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] font-bold tracking-tighter mb-6 uppercase text-on-surface">
          Deep<br><span class="text-primary">Dimensions.</span>
        </h1>
        <p class="font-headline text-xl text-on-surface-variant tracking-widest uppercase">A gallery of filament-printed art.</p>
      </div>
      <div class="md:col-span-4 text-right hidden md:block">
        <span class="text-xs font-label uppercase tracking-[0.3em] text-secondary">Est. 2026 / Filament-Based Sculpture</span>
      </div>
    </header>

    <!-- Featured Piece -->
    <section class="max-w-screen-2xl mx-auto px-8 mb-32 relative z-10">
      <div class="bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-12 relative group shadow-sm">
        <div class="lg:col-span-8 overflow-hidden aspect-[16/9]">
          <img src="/src/assets/images/gallery-hero.jpg" alt="The Geometry of Silence" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div class="lg:col-span-4 p-12 flex flex-col justify-center bg-surface-container-low border-l border-outline-variant/10">
          <div class="mb-8">
            <span class="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-primary mb-2 block">Featured Work 001</span>
            <h2 class="font-headline text-3xl font-bold uppercase leading-none mb-4 text-on-surface">The Geometry of Silence</h2>
            <div class="h-px w-12 bg-primary mb-6"></div>
            <p class="text-secondary leading-relaxed mb-8">
              A study in mathematical stillness. Layered through 200 hours of filament deposition, this piece explores the intersection of algorithmic noise and physical resonance.
            </p>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between py-2 border-b border-outline-variant/20">
              <span class="text-[10px] uppercase tracking-widest text-on-surface-variant">Material</span>
              <span class="text-[10px] uppercase tracking-widest font-bold text-on-surface">Matte White PLA Filament</span>
            </div>
            <div class="flex justify-between py-2 border-b border-outline-variant/20">
              <span class="text-[10px] uppercase tracking-widest text-on-surface-variant">Layer Height</span>
              <span class="text-[10px] uppercase tracking-widest font-bold text-on-surface">0.12mm (Fine)</span>
            </div>
          </div>
          
          <button class="mt-12 bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest self-start transition-all hover:bg-primary-container">
            View Details
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="max-w-screen-2xl mx-auto px-8 pb-32 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <!-- Item 1 -->
        <div class="relative aspect-square group bg-surface-container cursor-none">
          <img src="/src/assets/images/gallery-1.jpg" alt="Kinetic Flow" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-on-primary/70 uppercase tracking-[0.2em] mb-2">PLA Silk Collection</p>
            <h3 class="font-headline text-2xl font-bold text-on-primary uppercase leading-none">Kinetic Flow</h3>
          </div>
        </div>
        
        <!-- Item 2 -->
        <div class="relative aspect-square group bg-surface-container cursor-none lg:mt-24">
          <img src="/src/assets/images/gallery-2.jpg" alt="Vector Void" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-on-surface/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-2">Recycled PETG</p>
            <h3 class="font-headline text-2xl font-bold text-white uppercase leading-none">Vector Void</h3>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="relative aspect-square group bg-surface-container cursor-none">
          <img src="/src/assets/images/gallery-3.jpg" alt="Liquid Logic" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-on-primary/70 uppercase tracking-[0.2em] mb-2">Translucent Series</p>
            <h3 class="font-headline text-2xl font-bold text-on-primary uppercase leading-none">Liquid Logic</h3>
          </div>
        </div>

        <!-- Item 4 -->
        <div class="relative aspect-square group bg-surface-container cursor-none md:-mt-12">
          <img src="/src/assets/images/gallery-4.jpg" alt="Brutalist Bloom" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-on-surface/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-2">Matte Texture</p>
            <h3 class="font-headline text-2xl font-bold text-white uppercase leading-none">Brutalist Bloom</h3>
          </div>
        </div>

        <!-- Item 5 -->
        <div class="relative aspect-square group bg-surface-container cursor-none">
          <img src="/src/assets/images/gallery-5.jpg" alt="Fractal Faith" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-on-primary/70 uppercase tracking-[0.2em] mb-2">Metallic Composite</p>
            <h3 class="font-headline text-2xl font-bold text-on-primary uppercase leading-none">Fractal Faith</h3>
          </div>
        </div>

        <!-- Item 6 -->
        <div class="relative aspect-square group bg-surface-container cursor-none lg:-mt-24">
          <img src="/src/assets/images/gallery-6.jpg" alt="Prism Path" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute inset-0 bg-on-surface/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <p class="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-2">Multicolor Silk</p>
            <h3 class="font-headline text-2xl font-bold text-white uppercase leading-none">Prism Path</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
