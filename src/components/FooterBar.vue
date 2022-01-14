<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Level from '@/components/Level.vue'
import JbLogo from '@/components/JbLogo.vue'

const store = useStore()

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !store.state.isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900"
  >
    <level>
    
     
    </level>
  </footer>
</template>
