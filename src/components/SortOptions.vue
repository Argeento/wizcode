<script setup lang="ts">
const model = defineModel<string>({ required: true })
defineProps<{
  options: readonly { label: string; value: string }[]
}>()
</script>

<template>
  <fieldset>
    <legend class="mb-1 text-sm uppercase">Sort by</legend>
    <ul>
      <li v-for="option in options" :key="option.value">
        <BaseToggle
          type="radio"
          :model-value="model === option.value"
          @update:model-value="model = option.value"
        >
          {{ option.label }}
        </BaseToggle>
      </li>
    </ul>
  </fieldset>
</template>
