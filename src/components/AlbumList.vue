<script setup lang="ts">
import { isMobile } from '../composables/useIsMobile'

defineProps<{ albums: ITunesAlbum[] }>()
</script>

<template>
  <!-- Disable transitions on mobile -->
  <div v-if="isMobile">
    <AlbumItem v-for="album in albums" :key="album.id" :album="album" />
  </div>
  <TransitionGroup v-else name="list" tag="ul" class="flex flex-wrap gap-6">
    <AlbumItem v-for="album in albums" :key="album.id" :album="album" />
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    all 0.5s cubic-bezier(0.55, 0, 0.1, 1),
    opacity 0.2s;
}

.list-leave-active {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
</style>
