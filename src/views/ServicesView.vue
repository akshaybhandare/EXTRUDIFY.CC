<template>
  <div class="flex flex-col flex-grow">
    <div class="site-grid"></div>
    <!-- Hero Section -->
    <section class="relative px-8 pt-48 pb-24 md:py-48 overflow-hidden bg-surface-container-lowest">
      <div class="wireframe-grid absolute inset-0 pointer-events-none"></div>
      
      <div class="max-w-screen-2xl mx-auto relative z-10">
        <div class="flex flex-col md:flex-row items-start justify-between gap-12">
          <div class="max-w-3xl">
            <span class="font-label text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Professional 3D Printing Services</span>
            <h1 class="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-none text-on-surface mb-8">
              Layer by Layer.
            </h1>
            <p class="text-xl text-secondary max-w-xl leading-relaxed">
              Premium Filament Extrusion services. We decompose digital dreams into physical realities through advanced industrial 3D printing technology.
            </p>
          </div>
          
          <div class="hidden md:block w-px h-64 bg-outline-variant/30 self-center"></div>
          
          <div class="flex flex-col gap-4 self-end">
            <router-link to="/quote" class="bg-primary p-6 inline-block cursor-pointer hover:bg-surface-tint transition-colors">
              <span class="text-on-primary font-label text-sm uppercase tracking-widest font-bold">Start a Project</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Bento Grid -->
    <section class="px-8 py-24 bg-surface">
      <div class="max-w-screen-2xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <!-- Filament Mastery Card -->
          <div class="md:col-span-12 bg-surface-container-low p-12 relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-8 opacity-10">
              <span class="material-symbols-outlined text-9xl">architecture</span>
            </div>
            
            <span class="material-symbols-outlined text-primary text-4xl mb-8">precision_manufacturing</span>
            <h2 class="font-headline text-4xl font-bold mb-4 uppercase tracking-tight">Filament Extrusion Specialists</h2>
            <p class="text-on-surface-variant text-lg max-w-2xl mb-8">
              We specialize exclusively in high-fidelity filament extrusion. From biodegradable PLA for rapid prototyping to aerospace-grade Carbon Fiber and aesthetic Wood-fills for final products.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div class="border-l-2 border-primary pl-6">
                <h3 class="font-headline font-bold text-xl mb-2">PLA Mastery</h3>
                <p class="text-sm text-secondary">Eco-friendly bioplastics providing high-fidelity structural integrity with vibrant color options.</p>
              </div>
              <div class="border-l-2 border-primary pl-6">
                <h3 class="font-headline font-bold text-xl mb-2">Carbon Fiber</h3>
                <p class="text-sm text-secondary">Industrial-strength composites for functional parts requiring extreme rigidity and heat resistance.</p>
              </div>
              <div class="border-l-2 border-primary pl-6">
                <h3 class="font-headline font-bold text-xl mb-2">Wood-fill Textures</h3>
                <p class="text-sm text-secondary">Artistic filaments containing real wood fibers for a natural finish that can be sanded and stained.</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4 text-primary font-label text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-primary-container transition-colors">
              <span>View Material Data Sheets</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
            
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>
          </div>

          <!-- Artistic Infills -->
          <div class="md:col-span-12 bg-surface-container-highest p-12 flex flex-col md:flex-row items-center gap-12 border-l-4 border-primary">
            <div class="flex-1">
              <span class="material-symbols-outlined text-primary text-4xl mb-6">pattern</span>
              <h2 class="font-headline text-4xl font-bold mb-4 uppercase tracking-tight">Internal Engineering</h2>
              <p class="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                Beyond the surface. We design internal lattice structures that turn hidden support into visible art. Gyroids, hexagons, and custom generative skeletons optimized for strength and weight.
              </p>
            </div>
            <div class="w-full md:w-1/3 aspect-square bg-surface-container-lowest p-8 flex items-center justify-center relative">
              <div class="absolute inset-4 border border-outline-variant/20"></div>
              <span class="material-symbols-outlined text-8xl text-outline-variant">grid_view</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- The Extrusion Process -->
    <section class="px-8 py-32 bg-surface-container-lowest">
      <div class="max-w-screen-2xl mx-auto">
        <div class="mb-24 text-center md:text-left">
          <h2 class="font-headline text-5xl font-bold uppercase tracking-tighter mb-4">The Printing Lifecycle</h2>
          <div class="w-24 h-1 bg-primary mb-8"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- Step 1 -->
          <div class="relative group">
            <div class="text-primary font-headline text-8xl font-black opacity-10 absolute -top-12 -left-4 group-hover:opacity-20 transition-opacity">01</div>
            <div class="relative z-10">
              <span class="material-symbols-outlined text-on-surface mb-6 text-3xl">upload_file</span>
              <h3 class="font-headline text-xl font-bold uppercase mb-4">Digital Details</h3>
              <p class="text-secondary text-sm leading-relaxed">
                Share your STL/OBJ models with us. We support all major CAD formats for seamless integration.
              </p>
            </div>
            <div class="mt-8 h-px w-full bg-outline-variant/30"></div>
          </div>

          <!-- Step 2 -->
          <div class="relative group">
            <div class="text-primary font-headline text-8xl font-black opacity-10 absolute -top-12 -left-4 group-hover:opacity-20 transition-opacity">02</div>
            <div class="relative z-10">
              <span class="material-symbols-outlined text-on-surface mb-6 text-3xl">request_quote</span>
              <h3 class="font-headline text-xl font-bold uppercase mb-4">Precision Quote</h3>
              <p class="text-secondary text-sm leading-relaxed">
                Our studio engineers provide a comprehensive technical review and transparent pricing structure.
              </p>
            </div>
            <div class="mt-8 h-px w-full bg-outline-variant/30"></div>
          </div>

          <!-- Step 3 -->
          <div class="relative group">
            <div class="text-primary font-headline text-8xl font-black opacity-10 absolute -top-12 -left-4 group-hover:opacity-20 transition-opacity">03</div>
            <div class="relative z-10">
              <span class="material-symbols-outlined text-on-surface mb-6 text-3xl">handshake</span>
              <h3 class="font-headline text-xl font-bold uppercase mb-4">Agreement</h3>
              <p class="text-secondary text-sm leading-relaxed">
                Confirm the build plan, material choice, and layer height specifications to begin production.
              </p>
            </div>
            <div class="mt-8 h-px w-full bg-outline-variant/30"></div>
          </div>

          <!-- Step 4 -->
          <div class="relative group">
            <div class="text-primary font-headline text-8xl font-black opacity-10 absolute -top-12 -left-4 group-hover:opacity-20 transition-opacity">04</div>
            <div class="relative z-10">
              <span class="material-symbols-outlined text-on-surface mb-6 text-3xl">local_shipping</span>
              <h3 class="font-headline text-xl font-bold uppercase mb-4">Fabrication</h3>
              <p class="text-secondary text-sm leading-relaxed">
                Your piece is extruded layer by layer, post-processed if required, and safely shipped.
              </p>
            </div>
            <div class="mt-8 h-px w-full bg-primary/30"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Banner -->
    <section class="bg-primary text-on-primary px-8 py-24">
      <div class="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 class="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">Ready to Extrude?</h2>
          <p class="font-body text-on-primary/80">Submit your geometry for an instant technical review.</p>
        </div>
        <router-link to="/quote" class="bg-white text-primary font-label text-sm uppercase tracking-widest px-8 py-4 font-bold hover:bg-surface-container-low transition-colors whitespace-nowrap">
          Upload Model
        </router-link>
      </div>
    </section>
  </div>
</template>
