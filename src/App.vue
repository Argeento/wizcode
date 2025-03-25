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
  <div class="mx-auto min-h-screen max-w-[1800px] px-4 md:px-8">
    <div v-if="loading" class="pt-32 text-center uppercase">
      Loading albums from iTunes...
    </div>
    <div v-else-if="error" class="pt-32 text-center uppercase">
      An unexpected error occurred. <br />
      Please try again later.
    </div>
    <div v-else>
      <MainHeader
        :categories="categories"
        :sort-options="sortOptions"
        v-model:search-query="searchQuery"
        v-model:selected-category-ids="selectedCategoryIds"
        v-model:sort-by="sortBy"
      />

      <div class="flex">
        <aside class="sticky top-6 hidden h-full w-[230px] lg:block">
          <CategoryList
            v-model="selectedCategoryIds"
            :albums-filtered-by-query="albumsFilteredByQuery"
            :categories="categories"
            class="mb-4"
          />
          <SortOptions v-model="sortBy" :options="sortOptions" />
        </aside>

        <main class="min-h-screen w-full lg:w-[calc(100%-230px)]">
          <AlbumList :albums="albumsFilteredAndSorted" />
        </main>
      </div>

      <footer class="mt-40 mb-10">
        <p class="text-center text-xs text-gray-600">
          Created by Adrian Wieprzkowicz as part of the Wizcode recruitment
          process.
        </p>
      </footer>
    </div>
  </div>
</template>
