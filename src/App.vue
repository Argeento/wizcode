<script setup lang="ts">
const { loading, error, albums, categories } = useFetchTopAlbums()

const selectedCategoryIds = ref<string[]>([])
const searchQuery = ref('')
const albumsFilteredByQuery = computed(() =>
  filterAlbumsByQuery(albums.value, searchQuery.value),
)

const sortBy = ref(SortValue.Default)
const albumsFilteredAndSorted = computed(() => {
  const filtered = filterAlbumsByCategory(
    albumsFilteredByQuery.value,
    selectedCategoryIds.value,
  )
  return sortAlbums(filtered, sortBy.value)
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
          <SortOptions v-model="sortBy" />
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
