<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const routes = router.getRoutes()

const screens = []

for (const routeIndex in routes) {
  const path = routes[routeIndex].path
  const title = routes[routeIndex].meta && routes[routeIndex].meta.title ? routes[routeIndex].meta.title : null

  if (title) {
    screens.push({
      path,
      title
    })
  }
}
</script>

<template>

</template>
