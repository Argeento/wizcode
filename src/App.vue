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
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">
    An unexpected error occurred. Please try again later.
  </div>
  <div v-else class="min-h-screen">
    <header class="mt-26 mb-20">
      <h1 class="my-8 text-center text-6xl">iTunes Top Albums</h1>
      <SearchBar v-model="searchQuery" />
    </header>

    <aside class="fixed top-[64px] left-0 h-full w-[250px] p-4">
      <CategoryList
        v-model="selectedCategoryIds"
        :albums-filtered-by-query="albumsFilteredByQuery"
        :categories="categories"
      />
    </aside>

    <main class="p-4 md:ml-[250px]">
      <AlbumList :albums="albumsFilteredByQueryAndCategory" />
    </main>
  </div>
</template>
