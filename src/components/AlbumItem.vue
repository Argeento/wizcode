<script setup lang="ts">
const props = defineProps<{ album: ITunesAlbum }>()

// Remove parentheses and brackets from album name
const shortName = computed(() => props.album.name.replace(/[[()].*[\])]/g, ''))
</script>

<template>
  <li class="h-[230px] w-[170px]">
    <img
      :src="album.coverSrc"
      :alt="album.name"
      width="170"
      height="170"
      loading="lazy"
    />
    <div class="text-center font-medium">{{ shortName }}</div>
  </li>
</template>
