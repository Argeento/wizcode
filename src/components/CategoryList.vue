<script setup lang="ts">
const model = defineModel<string[]>({ required: true })
const props = defineProps<{
  categories: ITunesCategory[]
  albumsFilteredByQuery: ITunesAlbum[]
}>()

const toggleCategory = (isSelected: boolean, id: string) => {
  model.value = isSelected
    ? [...model.value, id]
    : model.value.filter((categoryId) => categoryId !== id)
}

const categoriesWithCount = computed(() => {
  return props.categories.map((category) => {
    const count = props.albumsFilteredByQuery.filter(
      (album) => album.category.id === category.id,
    ).length
    return { ...category, count }
  })
})
</script>

<template>
  <fieldset>
    <legend class="mb-1 text-sm uppercase">Categories</legend>
    <ul>
      <li v-for="category in categoriesWithCount" :key="category.id">
        <BaseToggle
          type="checkbox"
          :model-value="model.includes(category.id)"
          @update:model-value="toggleCategory($event, category.id)"
        >
          {{ category.name }} ({{ category.count }})
        </BaseToggle>
      </li>
    </ul>
  </fieldset>
</template>
