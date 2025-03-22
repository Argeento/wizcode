<script setup lang="ts">
const props = defineProps<{ album: ITunesAlbum }>()

// Remove parentheses and brackets from album name
const shortName = computed(() => props.album.name.replace(/[[()].*[\])]/g, ''))
</script>

<template>
  <li
    class="relative h-[307px] w-[240px] overflow-hidden rounded-[16px] border border-b-0 border-l-0 border-white/20 p-[10px]"
  >
    <!-- Blurred card background -->
    <div
      class="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center blur-sm brightness-120"
      :style="{ backgroundImage: `url(${props.album.coverSrc})` }"
    />

    <!-- Album cover -->
    <div
      class="cover-wrapper mb-[10px] h-[220px] w-[220px] overflow-hidden rounded-[10px]"
    >
      <img
        :src="album.coverSrc"
        :alt="album.name"
        width="220"
        height="220"
        loading="lazy"
        class="relative -z-10"
      />
    </div>

    <!-- Album info text -->
    <div
      class="h-14 rounded-[10px] border border-black/60 border-t-white/18 bg-black/70 px-4 py-2 text-center text-sm"
    >
      <div class="truncate pb-0 text-center font-medium">{{ shortName }}</div>
      <div class="ml-2 truncate text-center text-gray-400">
        {{ props.album.artist.name }}
      </div>
    </div>
  </li>
</template>

<style scoped>
.cover-wrapper {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
}
</style>
