<script setup lang="ts">
import { isMobile } from '../composables/useIsMobile'

defineProps<{ albums: ITunesAlbum[] }>()
</script>

<template>
  <div v-if="albums.length === 0" class="w-full lg:-mt-2 lg:pr-[230px]">
    <p class="text-center text-xl text-white/80 uppercase">No albums found</p>
  </div>

  <!-- Disable transitions on mobile -->
  <ul v-if="isMobile">
    <AlbumItem v-for="album in albums" :key="album.id" :album="album" />
  </ul>
  <TransitionGroup
    v-else
    name="list"
    tag="ul"
    class="grid-col-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  >
    <AlbumItem v-for="album in albums" :key="album.id" :album="album" />
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-leave-active {
  display: none;
}
</style>
