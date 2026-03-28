<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
  { name: 'Home', path: '/' },
  { name: 'Quote', path: '/quote' },
  { name: 'Studio', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' }
];

const isActive = (path) => {
  return route.path === path;
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-transparent">
    <div class="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
      <router-link to="/" class="text-xl font-bold tracking-tighter text-zinc-900 font-headline">EXTRUDIFY.CC</router-link>
      
      <nav class="hidden md:flex gap-12 items-center">
        <template v-for="link in links" :key="link.name">
          <router-link v-if="link.path.startsWith('/')" :to="link.path" 
            :class="[
              'font-headline uppercase tracking-widest text-sm transition-colors duration-300',
              isActive(link.path) 
                ? 'text-orange-700 font-bold border-b-2 border-orange-700' 
                : 'text-zinc-500 hover:text-orange-600'
            ]">
            {{ link.name }}
          </router-link>
          <a v-else :href="link.path" class="font-headline uppercase tracking-widest text-sm text-zinc-500 hover:text-orange-600 transition-colors duration-300">
            {{ link.name }}
          </a>
        </template>
      </nav>

      <div class="flex items-center gap-6">
        <button class="text-zinc-500 hover:text-orange-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform">
          <span class="material-symbols-outlined">shopping_cart</span>
        </button>
        <button class="text-zinc-500 hover:text-orange-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform">
          <span class="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </div>
    <div class="bg-zinc-100 h-[1px] w-full"></div>
  </header>
</template>
