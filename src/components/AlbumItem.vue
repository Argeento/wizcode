<script setup lang="ts">
const props = defineProps<{ album: ITunesAlbum }>()
const isOpen = ref(false)
// Remove parentheses and brackets from album name
const shortName = computed(() => props.album.name.replace(/[[()].*[\])]/g, ''))
</script>

<template>
  <Atropos tag="li" class="mb-6 md:mb-0">
    <div
      class="relative cursor-pointer overflow-hidden rounded-[20px] border border-b-0 border-l-0 border-white/20 p-[10px]"
      @click="isOpen = !isOpen"
    >
      <!-- Blurred card background -->
      <div
        class="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center blur-sm brightness-120"
        :style="{ backgroundImage: `url(${props.album.coverSrc})` }"
      />

      <!-- Album info closed -->
      <div :class="{ 'opacity-0': isOpen }" class="transition-opacity">
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

      <!-- Album info open -->
      <div
        :class="{ 'translate-y-[200px] opacity-0': !isOpen }"
        class="absolute top-0 left-0 h-full w-full translate-y-0 p-2 transition-all duration-250"
        data-testid="album-info-container"
      >
        <div
          class="h-full rounded-[12px] border-t-2 border-t-white/20 bg-black/85 px-6 py-4 shadow-lg"
          data-atropos-offset="2"
        >
          <div class="mb-2">
            <span class="font-semibold text-gray-500">Album: </span>
            <span class="text-white">{{ props.album.name }}</span>
          </div>
          <div class="mb-2">
            <span class="font-semibold text-gray-500">Artist: </span>
            <span class="text-white">{{ props.album.artist.name }}</span>
          </div>
          <div class="mb-2">
            <span class="font-semibold text-gray-500">Category: </span>
            <span class="text-white">{{ props.album.category.name }}</span>
          </div>
          <div class="mb-2">
            <span class="font-semibold text-gray-500">Release date: </span>
            <span class="text-white">{{
              props.album.release.toLocaleDateString()
            }}</span>
          </div>
          <div>
            <a
              :href="props.album.href"
              target="_blank"
              class="inline-block text-center text-blue-300 hover:underline"
              @click.stop
            >
              ♫ Listen on iTunes
            </a>
          </div>
        </div>
      </div>
      <!-- e/o Album info open -->
    </div>
  </Atropos>
</template>

<style scoped>
.cover-wrapper {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
}
</style>
