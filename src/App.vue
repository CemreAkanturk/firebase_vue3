<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import Overlay from '@/components/Overlay.vue'

const store = useStore()

// store.commit('user', {
//   name: 'John Doe',
//   email: 'john@example.com',
//   avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
// })

const isAsideLgActive = computed(() => store.state.isAsideLgActive)

const overlayClick = () => {
  store.dispatch('asideLgToggle', false)
}
</script>

<template>
  <nav-bar />
  <aside-menu :menu="menu" />
  <router-view />
  <footer-bar />
  <overlay
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>

<style>

*:focus,
*:active,
*::before,
*::after{
	outline:none !important;
	--tw-ring-shadow:none !important
}

.checkbox input[type=checkbox]:focus+.check{
	--tw-ring-shadow:none !important
}
.search .border-gray-700 {
    border-color:#ededed1e !important;
}

.addCustomer .border-gray-700  {
    border-color:#0f0f0f42 !important;
}

.dark tr:nth-child(odd) td  {
   background-color: #111827 !important;
}
.dark tr:hover td {
    background-color: #19243a !important;
}


</style>


