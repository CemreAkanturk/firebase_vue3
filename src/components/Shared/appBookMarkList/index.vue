<template>
  <div>
    <div class="p-2 grid grid-cols-8 gap-4">
      <ListItem v-for="bookMark in items" :key="bookMark.id" :item="bookMark"></ListItem>

    </div>
  </div>
</template>

<script>
import ListItem from "./appBookMarkListItem.vue";
export default {
  components: {
    ListItem,
  },
  props: ["items"],
};
</script>