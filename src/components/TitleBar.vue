<script setup>
import { mdiGithub } from '@mdi/js'
import Level from '@/components/Level.vue'
import JbButton from '@/components/JbButton.vue'

defineProps({
  titleStack: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="p-6">
    <level>
      <ul>
        <li
          v-for="(title, index) in titleStack"
          :key="index"
          class="title-stack-item inline-block pr-3 text-1xl text-gray-500 dark:text-gray-400 last:pr-0
            last:text-black dark:text-gray-100"
        >
          {{ title }}
        </li>
      </ul>
    
    </level>
  </section>
</template>

<style scoped>
li.title-stack-item:not(:last-child):after {
  content: '/';
  @apply inline-block pl-3;
}
</style>
