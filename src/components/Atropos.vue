<script setup lang="ts">
import Atropos from 'atropos'
import { isMobile } from '../composables/useIsMobile'

const { tag = 'div' } = defineProps<{
  tag?: keyof HTMLElementTagNameMap
}>()

const atropos = useTemplateRef<HTMLElement>('atropos')

onMounted(async () => {
  if (isMobile.value) {
    return
  }
  await nextTick()
  if (atropos.value) {
    Atropos({
      el: atropos.value,
    })
  }
})
</script>

<template>
  <component :is="tag" ref="atropos" class="atropos">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner">
          <slot />
        </div>
      </div>
    </div>
  </component>
</template>
