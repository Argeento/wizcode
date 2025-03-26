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
  const countMap = props.albumsFilteredByQuery.reduce(
    (acc, album) => {
      const id = album.category.id
      acc[id] = (acc[id] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return props.categories.map((category) => ({
    ...category,
    count: countMap[category.id] || 0,
  }))
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
