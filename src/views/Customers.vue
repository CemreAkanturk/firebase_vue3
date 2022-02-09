<template>
 
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Müşteriler</HeroBar>
  <div class="search">
    <field style="width: 60%">
      <control v-model="searchText"  name="search" placeholder="Müşterilerde ara..." />
    </field>

  <router-link class="addNew" :to="{ name: 'addcustomer' }"> + Yeni Müşteri Ekle </router-link>
  </div>



  <CardComponent class="mb-6" title="Müşteriler" has-table>
    <Customertable @deleteItem="deleteItem" :items="customerList" checkable />
  </CardComponent>
</template>


<script>
import TitleBar from "@/components/TitleBar.vue";
import HeroBar from "@/components/HeroBar.vue";
import Control from "@/components/Control.vue";
import Customertable from "@/components/Customer/customertable.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useStore } from 'vuex'

export default {
  components: {
    TitleBar,
    HeroBar,
    Control,
    CardComponent,
    Customertable,
  },
  data() {
    return {
      titleStack: ["Admin", "Müsteriler"],
      customers: [],
      searchText: "",
    };
  },
  created() {
    const store = useStore()
    this.$store.dispatch("getAllCustomers").then((response) => {
     this.customers = response;
	store.commit("setCustomers", this.customers);
    });
  
  
  },

  methods: {
    deleteItem(id) {
      this.customers = this.customers.filter((x) => x.id != id);
    },
//     addCustomer(form) {
//       this.customers.push(JSON.parse(JSON.stringify(form)));
//     },
  },
  computed: {
    customerList() {   
      return this.customers.filter((customer) => {	
        return customer.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
      });
    },
  },
};
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
  width: 39%;
  border-radius: 5px;
  color: #fff;
  font-weight: 400;
  line-height: 50px;
}


</style>