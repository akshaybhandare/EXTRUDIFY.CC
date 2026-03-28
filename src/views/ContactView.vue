<template>
  <div class="flex flex-col flex-grow">
    <div class="site-grid"></div>
    <main class="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen relative w-full z-10">
      
      <!-- Hero Section -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
        <div class="md:col-span-7">
          <div class="inline-block bg-primary/10 px-3 py-1 mb-6">
            <span class="text-primary font-headline text-xs font-bold tracking-[0.2em] uppercase">3D Fabrication Portal</span>
          </div>
          <h1 class="font-headline text-[clamp(3rem,8vw,5rem)] leading-[0.9] font-bold tracking-tighter uppercase mb-8">
            Get in <span class="text-primary italic">Shape.</span>
          </h1>
          <p class="text-xl text-secondary max-w-md font-light leading-relaxed">
            The bridge between digital geometry and physical reality. Upload your vision and let our high-precision extrusion systems bring it to life.
          </p>
        </div>

        <div class="md:col-span-5 pt-8">
          <div class="relative aspect-square bg-surface-container-low group overflow-hidden">
            <img src="/src/assets/images/contact-wireframe.jpg" alt="3D abstract wireframe" class="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 flex items-center justify-center border border-outline-variant/20 p-8">
              <div class="w-full h-full border border-primary/20 flex flex-col justify-end p-4">
                <span class="font-headline text-6xl font-bold text-primary/10 tracking-widest">001.PRINT_REQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form & Coordinate System Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        <!-- Minimalist Form -->
        <div class="lg:col-span-7">
          <form class="space-y-12" @submit.prevent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="space-y-2">
                <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Identity (User Name)</label>
                <input type="text" placeholder="Full Name" class="w-full bg-surface-container border-none p-4 text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Digital Mail (Return Address)</label>
                <input type="email" placeholder="email@address.art" class="w-full bg-surface-container border-none p-4 text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Your Vision (STL / OBJ file)</label>
              <div class="relative group">
                <div class="w-full h-32 bg-surface-container-low border border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer group-hover:bg-surface-container transition-colors">
                  <span class="material-symbols-outlined text-primary mb-2">upload_file</span>
                  <span class="font-label text-xs text-secondary uppercase">Drag STL file or click to browse geometry</span>
                  <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Print Specifications</label>
              <textarea rows="6" placeholder="Describe material preferences, scale, and density..." class="w-full bg-surface-container border-none p-4 text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
            </div>

            <button type="submit" class="gradient-cta w-full md:w-auto px-12 py-5 font-headline font-bold text-white uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10">
              Initiate Print Sequence
            </button>
          </form>
        </div>

        <!-- Coordinate System Contact Info -->
        <div class="lg:col-span-5 flex flex-col justify-center">
          <div class="space-y-16 relative">
            <div class="absolute -left-10 top-0 bottom-0 w-[1px] bg-outline-variant/20 hidden lg:block"></div>

            <div class="relative pl-0 lg:pl-4">
              <div class="flex items-baseline gap-4 mb-2">
                <span class="font-headline text-primary font-bold text-2xl">X_</span>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">Tele-Communication</span>
              </div>
              <p class="font-headline text-3xl font-medium tracking-tight text-on-surface">(+91) 8088783909</p>
            </div>

            <div class="relative pl-0 lg:pl-4">
              <div class="flex items-baseline gap-4 mb-2">
                <span class="font-headline text-primary font-bold text-2xl">Y_</span>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">Digital Vector</span>
              </div>
              <p class="font-headline text-3xl font-medium tracking-tight text-on-surface">akshaybhandare08@gmail.com</p>
            </div>

            <div class="relative pl-0 lg:pl-4">
              <div class="flex items-baseline gap-4 mb-2">
                <span class="font-headline text-primary font-bold text-2xl">Z_</span>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">Physical Datum</span>
              </div>
              <address class="not-italic font-headline text-3xl font-medium tracking-tight text-on-surface leading-tight">
                Missfits Boutique<br>Kadabagere, B'lore
              </address>
            </div>

            <!-- Abstract Wireframe Card -->
            <div class="mt-12 p-8 bg-surface-container-low border-l-4 border-primary relative overflow-hidden">
              <div class="absolute top-0 right-0 p-2 opacity-10">
                <span class="material-symbols-outlined text-8xl" style="font-variation-settings: 'FILL' 0;">precision_manufacturing</span>
              </div>
              <h4 class="font-headline font-bold uppercase text-xs tracking-widest mb-4 text-on-surface-variant">Fabrication Specs</h4>
              <div class="space-y-2">
                <div class="flex justify-between text-[10px] uppercase font-label">
                  <span class="text-secondary">Quote Response</span>
                  <span class="text-on-surface font-bold">~ 2.4 Hours</span>
                </div>
                <div class="flex justify-between text-[10px] uppercase font-label">
                  <span class="text-secondary">Printer Availability</span>
                  <span class="text-primary font-bold">Online / Ready</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.gradient-cta {
  background: linear-gradient(45deg, #a73a00 0%, #fc5b00 100%);
}
</style>
