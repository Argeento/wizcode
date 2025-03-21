<script setup lang="ts">
const { loading, error, albums, categories } = useFetchTopAlbums()

const selectedCategoryIds = ref<string[]>([])
const searchQuery = ref('')

const albumsFilteredByQuery = computed(() => {
  if (searchQuery.value === '') {
    return albums.value
  }
  return albums.value.filter((album) => {
    const searchIn = (album.name + album.artist.name).toLowerCase()
    const searchFor = searchQuery.value.toLowerCase()
    return searchIn.includes(searchFor)
  })
})

const albumsFilteredByQueryAndCategory = computed(() => {
  if (selectedCategoryIds.value.length === 0) {
    return albumsFilteredByQuery.value
  }
  return albumsFilteredByQuery.value.filter((album) =>
    selectedCategoryIds.value.some((id) => id === album.category.id),
  )
})
</script>

<template>
  <div class="text-blue-600">iTunes Top 100</div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">
    An unexpected error occurred. Please try again later.
  </div>
  <div v-else>
    <input type="search" v-model.trim="searchQuery" placeholder="Search" />
    <Categories
      :categories="categories"
      :albums-filtered-by-query="albumsFilteredByQuery"
      v-model="selectedCategoryIds"
    />
    <div v-for="album in albumsFilteredByQueryAndCategory" :key="album.id">
      {{ album.name }}
    </div>
  </div>
</template>
