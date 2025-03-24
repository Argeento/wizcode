<script setup lang="ts">
const props = defineProps<{
  categories: ITunesCategory[]
  albumsFilteredByQuery: ITunesAlbum[]
  modelValue: string[]
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

const isSelected = (id: string) => props.modelValue.includes(id)

const toggleCategory = (id: string) => {
  const updatedSelection = isSelected(id)
    ? props.modelValue.filter((categoryId) => categoryId !== id)
    : [...props.modelValue, id]
  emit('update:modelValue', updatedSelection)
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
  <ul>
    <CategoryItem
      v-for="category in categoriesWithCount"
      :key="category.id"
      :category="category"
      :selected="isSelected(category.id)"
      @toggle="toggleCategory"
    />
  </ul>
</template>
