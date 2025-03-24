<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <label
    class="wrapper mx-auto flex w-[465px] cursor-text items-center bg-black px-8 py-3"
  >
    <div class="sr-only">Search for an artist or album</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="-ml-6 translate-x-8"
    >
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="white"
        stroke-width="2"
        fill="none"
      />
      <line x1="16" y1="16" x2="22" y2="22" stroke="white" stroke-width="2" />
    </svg>

    <input
      type="search"
      v-model.trim="model"
      placeholder="Search for an artist or album..."
      class="w-full py-2 pr-4 pl-12 text-2xl outline-none"
    />
  </label>
</template>

<style lang="scss" scoped>
.wrapper {
  transition: border-color 0.2s ease-in-out;
  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.35);

  &:focus-within {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
}
</style>
