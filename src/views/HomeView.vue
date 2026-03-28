<template>
  <div class="flex flex-col flex-grow">
    <div class="site-grid"></div>
    <!-- Hero Section -->
    <section class="relative pt-32 min-h-[90vh] flex flex-col wireframe-bg">
      <div class="max-w-screen-2xl mx-auto px-8 w-full flex-grow flex flex-col md:flex-row items-center justify-between gap-12 pb-24">
        <!-- Hero Content -->
        <div class="md:w-1/2 z-10">
          <div class="mb-6 flex items-center gap-4">
            <div class="h-px w-12 bg-primary"></div>
            <span class="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">Premium Filament Printing</span>
          </div>
          <h1 class="font-headline text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            Adding depth to your <span class="text-primary italic">dimension.</span>
          </h1>
          <p class="font-body text-secondary text-lg max-w-md mb-12 leading-relaxed">
            Transforming digital blueprints into physical masterpieces. We specialize in high-resolution, industrial-grade filament extrusion for artists, architects, and visionaries.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/quote" class="bg-primary text-on-primary font-label text-sm uppercase tracking-widest px-10 py-5 hover:bg-primary-container transition-all duration-300 active:scale-95 shadow-xl shadow-primary/10 inline-block text-center">
              Get a Quote
            </router-link>
            <router-link to="/gallery" class="border border-outline-variant text-on-surface font-label text-sm uppercase tracking-widest px-10 py-5 hover:bg-surface-container-high transition-all duration-300 active:scale-95 inline-block text-center">
              View Portfolio
            </router-link>
          </div>
        </div>

        <!-- Hero Visual -->
        <div class="md:w-1/2 relative group">
          <div class="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
          <div class="relative aspect-square w-full max-w-xl mx-auto flex items-center justify-center">
            <img src="/src/assets/images/home-hero.jpg" alt="Abstract 3D Shape" class="w-full h-full object-contain mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105" />
            <div class="absolute top-0 right-0 p-6 border-l border-t border-outline-variant/30 backdrop-blur-sm bg-white/20">
              <div class="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">Layer Resolution</div>
              <div class="text-xl font-headline font-bold">0.4 MM</div>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8">
        <span class="text-vertical font-label text-[10px] uppercase tracking-[0.5em] text-zinc-300">ESTABLISHED TWENTY TWENTY FOUR</span>
        <div class="w-px h-32 bg-zinc-200"></div>
      </div>
    </section>

    <!-- The Layered Approach (Process Section) -->
    <section class="bg-surface-container-low py-32 relative overflow-hidden">
      <div class="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div class="md:w-2/3">
            <span class="font-label text-xs uppercase tracking-[0.3em] text-primary mb-4 block">The Process</span>
            <h2 class="font-headline text-5xl font-bold tracking-tight">The Layered Approach</h2>
          </div>
          <div class="md:w-1/3 text-right">
            <p class="font-body text-secondary text-sm italic">"Depth is our middle name."</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div class="p-12 border-l border-outline-variant/20 hover:bg-surface-container transition-colors duration-500 group">
            <div class="text-5xl font-headline font-bold text-outline-variant/30 mb-8 transition-colors group-hover:text-primary/20">01</div>
            <h3 class="font-headline text-xl font-bold mb-4 uppercase tracking-wider">Digital Details</h3>
            <p class="font-body text-secondary text-sm leading-relaxed mb-8">
              Provide your vision and STL files. We analyze your digital blueprint to ensure flawless structural integrity for the printing phase.
            </p>
            <img src="/src/assets/images/process-1.jpg" alt="3D Scanning Process" class="w-full aspect-[4/3] object-cover grayscale brightness-110 contrast-125" />
          </div>

          <div class="p-12 border-l border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container transition-colors duration-500 group relative">
            <div class="text-5xl font-headline font-bold text-outline-variant/30 mb-8 transition-colors group-hover:text-primary/20">02</div>
            <h3 class="font-headline text-xl font-bold mb-4 uppercase tracking-wider">Precision Quoting</h3>
            <p class="font-body text-secondary text-sm leading-relaxed mb-8">
              Receive a detailed price breakdown based on material and complexity. Our industrial filament selection offers diverse strength and finish options.
            </p>
            <img src="/src/assets/images/process-2.jpg" alt="3D Printer Nozzle" class="w-full aspect-[4/3] object-cover grayscale brightness-110 contrast-125" />
          </div>

          <div class="p-12 border-l border-r border-outline-variant/20 hover:bg-surface-container transition-colors duration-500 group">
            <div class="text-5xl font-headline font-bold text-outline-variant/30 mb-8 transition-colors group-hover:text-primary/20">03</div>
            <h3 class="font-headline text-xl font-bold mb-4 uppercase tracking-wider">Print & Deliver</h3>
            <p class="font-body text-secondary text-sm leading-relaxed mb-8">
              Upon your agreement, we extrude your vision and deliver it to your door. Your physical masterpiece arrives, ready for its new environment.
            </p>
            <img src="/src/assets/images/process-3.jpg" alt="Post Processing" class="w-full aspect-[4/3] object-cover grayscale brightness-110 contrast-125" />
          </div>
        </div>
      </div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 border border-primary/10 rotate-45 pointer-events-none"></div>
    </section>

    <!-- Feature Bento Grid -->
    <section class="py-32 bg-surface">
      <div class="max-w-screen-2xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div class="md:col-span-2 md:row-span-2 bg-zinc-900 flex flex-col justify-end p-12 relative overflow-hidden group">
            <img src="/src/assets/images/bento.jpg" alt="Finished Model" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" />
            <div class="relative z-10">
              <div class="text-primary font-headline text-sm uppercase tracking-widest mb-4">Filament Mastery</div>
              <h3 class="text-white font-headline text-4xl font-bold mb-6">Large Scale <br>Artistic Extrusion</h3>
              <router-link to="/gallery" class="inline-block bg-primary text-white font-label text-xs uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-primary transition-colors duration-300">
                Explore Collection
              </router-link>
            </div>
          </div>

          <div class="md:col-span-2 bg-surface-container p-12 flex items-center justify-between group overflow-hidden">
            <div class="max-w-[240px]">
              <h3 class="font-headline text-2xl font-bold mb-4">Industrial Filaments</h3>
              <p class="font-body text-secondary text-sm">Carbon fiber, wood-fill, and high-performance polymers for every unique vision.</p>
            </div>
            <div class="w-32 h-32 bg-primary rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
          </div>

          <div class="bg-primary flex flex-col items-center justify-center p-8 text-center">
            <span class="material-symbols-outlined text-white text-4xl mb-4">rocket_launch</span>
            <div class="text-white font-headline text-lg font-bold uppercase tracking-tighter">Fast <br>Turnaround</div>
          </div>

          <div class="bg-white border border-outline-variant/20 flex flex-col items-center justify-center p-8 text-center">
            <span class="material-symbols-outlined text-primary text-4xl mb-4">precision_manufacturing</span>
            <div class="font-headline text-lg font-bold uppercase tracking-tighter">Micron <br>Accuracy</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-32 bg-surface border-y border-outline-variant/10">
      <div class="max-w-4xl mx-auto px-8 text-center">
        <h2 class="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-8 uppercase">Ready to <span class="text-primary">extrude?</span></h2>
        <p class="font-body text-secondary text-lg mb-12">Join 5,000+ artists and engineers who choose EXTRUDE.ART for their most complex dimensions. Don't let your ideas stay flat.</p>
        <div class="flex flex-col md:flex-row justify-center gap-6">
          <router-link to="/quote" class="bg-on-surface text-surface font-label text-sm uppercase tracking-widest px-12 py-6 hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-4">
            Get Started <span class="material-symbols-outlined">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
