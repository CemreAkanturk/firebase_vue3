<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input type="text" v-model="userData.title" placeholder="Başlık" class="input mb-3" />
    <input type="text" v-model="userData.url" placeholder="URL" class="input mb-3" />
    <select class="input mb-3" v-model="userData.categoryId">
      <option disabled value="" selected>Kategori</option>
      <option v-for="category in categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
    <textarea v-model="userData.description" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button @click="$router.push({ name: 'HomePage' })" class="secondary-button">İptal</button>
      <button @click="onSave" class="default-button">Kaydet</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null,
      },
    };
  },
  created() {
    this.$appAxios.get(`/categories`).then((res) => {
      this.categoryList = res.data || [];
    });

    console.log(this._getCurrentUser)
  },
  methods: {
    onSave() {
      const saveData = {
        ...this.userData,
        userId: this._getCurrentUser?.id,
        created_at: new Date(),
      };
      this.$appAxios.post("/bookmarks", saveData).then(() => {
        Object.keys(this.userData)?.forEach((field) => (this.userData[field] = null));
        this.$router.push({ name: "HomePage" });
      });

      
    },
  },
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
};
</script>