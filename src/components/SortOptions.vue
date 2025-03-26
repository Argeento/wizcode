<script setup lang="ts">
import { SORT_OPTIONS } from '../utils/sortAlbums'

const model = defineModel<string>({ required: true })
</script>

<template>
  <fieldset>
    <legend class="mb-1 text-sm uppercase">Sort by</legend>
    <ul>
      <li v-for="option in SORT_OPTIONS" :key="option.value">
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
