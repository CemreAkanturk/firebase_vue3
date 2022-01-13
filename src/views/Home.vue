<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <Sidebar @category-changed="updatedCategory"></Sidebar>
    <div>
      <appBookMarkList v-if="bookmarkList.length > 0" :items="bookmarkList"></appBookMarkList>
      <div v-else>Bookmark Bulunmamaktadır...</div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Home/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
      this.bookmarkList = res?.data || [];
    });
  },
  mounted() {
   
  },
  methods: {
    updatedCategory(catId) {
      const url = catId ? `/bookmarks?_expand=category&_expand=user&categoryId=${catId}` : "/bookmarks?_expand=category&_expand=user";

      this.$appAxios.get(url).then((res) => {
        this.bookmarkList = res?.data || [];
      });
    },
  },
};
</script>