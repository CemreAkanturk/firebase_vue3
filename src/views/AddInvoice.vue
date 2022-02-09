<script setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { mdiLeadPencil, mdiMagnify, mdiFileDocumentEditOutline, mdiAccountTie, mdiRvTruck, mdiHelpCircle, mdiCalendarMonthOutline, mdiBell, mdiMusicAccidentalSharp, mdiTicketConfirmation, mdiInformation } from "@mdi/js";
import TitleBar from "@/components/TitleBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import HeroBar from "@/components/HeroBar.vue";
import Icon from "@/components/Icon.vue";
import CustomField from "@/components/CustomField.vue";
import Control from "@/components/Control.vue";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import ExpiryDate from "@/components/Shared/ExpiryDate.vue";
import service from "@/services/service";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  description: "",
  customer: {
    name: "",
  },
  collection_status: { id: 0, type: "Tahsil Edilecek" },
  expiry_date: "",
  issue_date: "",
  charged_date: "",
  invoice_no: "",
  collection_statement: "",
});

const selectCollectionStat = ref(0);

const searchList = ref([]);
const CustomerText = ref("");
const titleStack = ref(["Faturalar", "Yeni Fatura Oluştur"]);
const customers = computed(() => store.getters._customers);
const radio = computed(() => (selectCollectionStat.value == 0 ? true : false));

watchEffect((onInvalidate) => {
  if (CustomerText.value.length > 0 && form.customer.name != CustomerText.value) {
    const typing = setTimeout(() => {
      searchList.value = customers.value.filter((customer) => {
        return customer.name.toLowerCase().indexOf(CustomerText.value.toLowerCase()) != -1;
      });
    }, 200);

    if (searchList.length == 0)
      form.customer = {
        name: CustomerText,
      };
    onInvalidate(() => clearTimeout(typing));
  } else {
    searchList.value = [];
  }
});

const selectCustomer = (customer) => {
  form.customer = customer;
  CustomerText.value = customer.name;
  searchList.value = [];
};

const submit = () => {};
</script>

<template >
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Yeni Fatura</HeroBar>
  <card-component form @submit.prevent="submit(form)" class="addCustomer">
    <custom-field :iconpath="mdiFileDocumentEditOutline" label="Fatura Açıklaması">
      <control v-model="form.description" />
    </custom-field>

    <divider />

    <custom-field :iconpath="mdiAccountTie" label="Müşteri " help="Kayıtlı bir müşteri seçebilir veya yeni bir müşteri ismi yazabilirsiniz.">
      <div class="customers-container">
        <control :icon="mdiMagnify" v-model="CustomerText" />
        <div class="customers-options" v-if="searchList.length > 0">
          <span v-for="customer in searchList" :key="customer.id" @click="selectCustomer(customer)">{{ customer.name }} / {{ customer.description }}</span>
        </div>
      </div>
    </custom-field>

  

    <custom-field label="Müşteri Bilgileri ">
      <control placeholder="" />
    </custom-field>

    <divider />
    <custom-field :iconpath="mdiHelpCircle" label="Tahsilat Durumu">
      <check-radio-picker v-model="selectCollectionStat" name="sample-radio" type="radio" :options="{ 0: 'Tahsil Edilecek', 1: 'Tahsil Edildi' }" />
    </custom-field>

    <div v-if="radio" class="mb-6">
      <custom-field :iconpath="mdiBell" label="Vade Tarihi">
        <ExpiryDate></ExpiryDate>
      </custom-field>
    </div>
    <div v-else>
      <custom-field :iconpath="mdiCalendarMonthOutline" label="Tahsil Edildiği Tarih">
        <control type="date" placeholder="" />
      </custom-field>
      <custom-field :iconpath="mdiCalendarMonthOutline" label="Tahsilat Açıklaması">
        <control type="textarea" placeholder="" />
        <span class="description full"><Icon :path="mdiInformation"></Icon> Tahsilat açıklaması faturada görünmez. </span>
      </custom-field>
    </div>
    <custom-field :iconpath="mdiCalendarMonthOutline" label="Düzenlenme Tarihi">
      <control type="date" placeholder="" />
    </custom-field>

    <custom-field :iconpath="mdiMusicAccidentalSharp" label="Fatura No">
      <control :icon="mdiTicketConfirmation" type="text" class="w50" />
    </custom-field>

    <div class="buttons">
      <router-link class="close" :to="{ name: 'customers' }"> GERİ </router-link>
      <button type="submit" class="addNew">KAYDET</button>
    </div>
  </card-component>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
}

.close {
  width: 8%;
  min-width: 80px;
  border: 2px solid #acacac;
  height: 40px;
  margin-right: 20px;
  color: #a39f9d;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addCustomer {
  padding: 2%;
}

@media (max-width: 767px) {
  .addCustomer {
    padding: initial;
  }
}

.addNew {
  width: 12%;
  min-width: 100px;
  background-color: #53a6eb;
  height: 40px;
  color: #fff;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
}

.balance-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.balance-content div {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.balance-content div span {
  width: 10%;
  text-align: center;
}

.balance-content div input {
  width: 18%;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #cecacaef;
}
.balance-content div .dropdown {
  width: 25%;
}

.customers-container {
  position: relative;
}
.customers-options {
  position: absolute;
  top: 50px;
  max-height: 150px;
  background: #fff;
  z-index: 2;
  border: 1px solid #0f0f0f42;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.customers-options span {
  width: 100%;
  padding: 10px 20px;
}

.customers-options span:hover {
  background: #c6d8e7;
}
</style>