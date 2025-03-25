<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery', { required: true })
const sortBy = defineModel<string>('sortBy', { required: true })
const selectedCategoryIds = defineModel<string[]>('selectedCategoryIds', {
  required: true,
})

defineProps<{
  categories: ITunesCategory[]
  sortOptions: readonly { label: string; value: string }[]
}>()
</script>

<template>
  <header class="my-16 md:mt-26 md:mb-20">
    <h1 class="my-4 text-center text-3xl md:my-8 md:text-6xl">
      iTunes Top Albums
    </h1>

    <SearchBar v-model="searchQuery" />

    <div class="m-4 mx-auto flex max-w-[320px] justify-center gap-4 lg:hidden">
      <label class="w-1/2">
        <div class="mb-2">Categories</div>
        <select
          multiple
          v-model="selectedCategoryIds"
          class="w-full border-b border-l border-white/20 p-2 transition-all outline-none focus:border-white/60"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            v-text="category.name"
          />
        </select>
      </label>

      <label class="w-1/2">
        <div class="mb-2">Sort by</div>
        <select
          v-model="sortBy"
          class="w-full border-b border-l border-white/20 p-2 transition-all outline-none focus:border-white/60"
        >
          <option
            v-for="option in sortOptions"
            :key="option.value"
            :value="option.value"
            v-text="option.label"
          />
        </select>
      </label>
    </div>
  </header>
</template>
