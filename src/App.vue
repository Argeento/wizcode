<script setup lang="ts">
const { loading, error, albums, categories } = useFetchTopAlbums()

// Filters
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

// Sorting
const sortOptions = [
  { label: 'iTunes', value: 'default' },
  { label: 'Name', value: 'name' },
  { label: 'Artist', value: 'artist' },
  { label: 'Release date', value: 'releaseDate' },
] as const

type SortValue = (typeof sortOptions)[number]['value']
const sortBy = ref<SortValue>('default')

const albumsFilteredAndSorted = computed(() => {
  let sortFn: (a: ITunesAlbum, b: ITunesAlbum) => number
  switch (sortBy.value) {
    case 'default':
      sortFn = (a, b) => a.defaultSort - b.defaultSort
      break
    case 'name':
      sortFn = (a, b) => a.name.localeCompare(b.name)
      break
    case 'artist':
      sortFn = (a, b) => a.artist.name.localeCompare(b.artist.name)
      break
    case 'releaseDate':
      sortFn = (a, b) => a.release.getTime() - b.release.getTime()
      break
    default:
      const _exhaustiveCheck: never = sortBy.value
      throw new Error(`Unhandled sort option: ${_exhaustiveCheck}`)
  }
  return [...albumsFilteredByQueryAndCategory.value].sort(sortFn)
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
        class="mb-4"
      />
      <SortOptions v-model="sortBy" :options="sortOptions" />
    </aside>

    <main class="p-4 md:ml-[250px]">
      <AlbumList :albums="albumsFilteredAndSorted" />
    </main>
  </div>
</template>
