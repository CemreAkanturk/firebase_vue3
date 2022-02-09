<template>
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Faturalar</HeroBar>
  <div class="search">
    <button class="filter" style="width: 6%"><icon :path="mdiFilterMenu" class="filter-icon" size="20" />Filtrele</button>

    <field style="width: 73%">
      <control v-model="searchText" name="search" placeholder="Faturalarda ara..." />
    </field>

    <router-link class="addNew" :to="{ name: 'addInvoice' }"> + Yeni Fatura Olustur </router-link>
  </div>

  <CardComponent class="mb-6" title="Faturalar" has-table> </CardComponent>
</template>



<script setup>
import { mdiFilterMenu } from "@mdi/js";
import TitleBar from "@/components/TitleBar.vue";
import HeroBar from "@/components/HeroBar.vue";
import Control from "@/components/Control.vue";
import CardComponent from "@/components/CardComponent.vue";
import Icon from "@/components/Icon.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const titleStack = ref(["Admin", "Faturalar"]);
const customers = ref([]);
const searchText = ref("");
// export default {

//   data() {
//     return {
//       titleStack: ["Admin", "Faturalar"],
//       customers: [],
//       searchText: "",
//     };
//   },
//   created() {
//     //     this.$store.dispatch("getAllCustomers").then((response) => {
//     //       this.customers = response;
//     //     });
//   },
//   methods: {
//     deleteItem(id) {
//       this.customers = this.customers.filter((x) => x.id != id);
//     },
//   },
//   computed: {
//     customerList() {
//       return this.customers.filter((customer) => {
//         return customer.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
//       });
//     },
//   },
// };
</script>

<style scoped>
.search {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.addNew {
  text-align: center;
  background: rgb(83, 166, 235);
  width: 20%;
  border-radius: 5px;
  color: #fff;
  font-weight: 400;
  line-height: 50px;
}

.filter {
  background: #1f29375e;
  color: rgb(243, 241, 241);
  font-weight: 400;
  line-height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.filter:hover {
  background: #1f293781;
 
  
}
.filter-icon{
	margin-right: 3px;
}
</style>