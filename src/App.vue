<script setup lang="ts">
const { loading, error, albums } = useFetchTopAlbums()
</script>

<template>
  <div class="text-blue-600">iTunes Top 100</div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">
    An unexpected error occurred. Please try again later.
  </div>
  <div v-else>
    {{ albums }}
  </div>
</template>
