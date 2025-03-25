<script setup lang="ts">
const props = defineProps<{ album: ITunesAlbum }>()

// Remove parentheses and brackets from album name
const shortName = computed(() => props.album.name.replace(/[[()].*[\])]/g, ''))
</script>

<template>
  <Atropos tag="li" class="mb-6">
    <div
      class="relative overflow-hidden rounded-[20px] border border-b-0 border-l-0 border-white/20 p-[10px]"
    >
      <!-- Blurred card background -->
      <div
        class="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center blur-sm brightness-120"
        :style="{ backgroundImage: `url(${props.album.coverSrc})` }"
      />

      <!-- Album cover -->
      <div class="cover-wrapper mb-[9px] overflow-hidden rounded-[12px]">
        <img
          :src="album.coverSrc"
          :alt="album.name"
          width="280"
          height="280"
          loading="lazy"
          class="relative -z-10 aspect-square w-full rounded-[12px]"
          data-atropos-offset="-2"
        />
      </div>

      <!-- Album info text -->
      <div
        class="rounded-[12px] border-t-2 border-t-white/20 bg-black/65 px-4 py-3 text-center shadow-lg"
        data-atropos-offset="2"
      >
        <div class="pb-0 text-center font-medium md:truncate">
          {{ shortName }}
        </div>
        <div class="text-center text-sm text-gray-400 md:truncate">
          {{ props.album.artist.name }}
        </div>
      </div>
    </div>
  </Atropos>
</template>

<style scoped>
.cover-wrapper {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
}
</style>
