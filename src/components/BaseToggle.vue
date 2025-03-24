<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
defineProps<{
  type: 'checkbox'
}>()
</script>

<template>
  <label
    class="group flex cursor-pointer items-center py-1 text-gray-400 transition-all hover:text-white"
    :class="{ 'text-white': model }"
  >
    <input :type="type" v-model="model" class="sr-only" />
    <div
      class="mr-2 h-5 w-5 rounded border-2 text-gray-700 transition-all group-has-focus-within:border-white/50"
      aria-hidden="true"
    >
      <div
        class="h-3 w-2 translate-x-1 rotate-45 border-r-2 border-b-2 border-white transition-all"
        :class="{ 'opacity-0': !model }"
      />
    </div>
    <slot />
  </label>
</template>
