<script setup lang="ts">
const selected = defineModel<boolean>({ required: true })
defineProps<{
  type: 'checkbox' | 'radio'
}>()
</script>

<template>
  <label
    class="group flex cursor-pointer items-center py-[2px] text-gray-400 transition-all hover:text-white"
    :class="{ 'text-white': selected }"
  >
    <input :type="type" v-model="selected" class="sr-only" />
    <div
      class="mr-2 h-5 w-5 rounded border-2 text-gray-700 transition-all group-has-focus-within:border-white/50"
      :class="{ 'rounded-full': type === 'radio' }"
      aria-hidden="true"
    >
      <div
        v-if="type === 'checkbox'"
        class="h-3 w-2 translate-x-1 rotate-45 border-r-2 border-b-2 border-white transition-opacity"
        :class="{ 'opacity-0': !selected }"
      />
      <div
        v-if="type === 'radio'"
        class="h-[9px] w-[9px] translate-[3.5px] rounded-full bg-white/80 transition-opacity"
        :class="{ 'opacity-0': !selected }"
      />
    </div>
    <slot />
  </label>
</template>
