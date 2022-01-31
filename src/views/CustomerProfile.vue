<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from "@mdi/js";
import MainSection from "@/components/MainSection.vue";
import CardComponent from "@/components/CardComponent.vue";
import TitleBar from "@/components/TitleBar.vue";
import Divider from "@/components/Divider.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import FilePicker from "@/components/FilePicker.vue";
import JbButton from "@/components/JbButton.vue";
import BottomOtherPagesSection from "@/components/BottomOtherPagesSection.vue";
import JbButtons from "@/components/JbButtons.vue";
import UserCard from "@/components/UserCard.vue";
import CryptoJS from "crypto-js";
import customerInfo from "@/components/Customer/customerInfo.vue";
import transactions from "@/components/Customer/transactions.vue";
import balanceTransactions from '@/components/Customer/Profile/balanceTransactions.vue'
import service from "@/services/service";

const store = useStore();
const router = useRouter();
const route = useRoute();
const titleStack = ref(["Müşteriler", "Müşteri"]);

const customerId = route.params.id;
const decodeId = CryptoJS.AES.decrypt(customerId, "fktld125.aso8kdusn.hssde").toString(CryptoJS.enc.Utf8);

const state = reactive({
  customer: Object,
});

service.GetCustomer(decodeId).then((data) => {
 
  state.customer = data;
  state.customer.transactions=[{
	  operation_type:"Ödeme",
	  balance:0,
	  date:"21-01-2022",
	  description:"fatura ödendi",
	  sum:50
  },
  {
	  operation_type:"Ödeme",
	  balance:0,
	  date:"21-01-2022",
	  description:"fatura ödendi",
	  sum:50
  }]
});


</script>

<template>
  <title-bar :title-stack="titleStack" />

  

  <main-section>
    <div class="flex justify-between">
      <card-component style="width: 74%">
	 <user-card :customerHead="state.customer" />
        <div class="flex flex-col">
          <transactions  :transactionList="state.customer.transactions || []"></transactions>
        </div>
      </card-component>

      <card-component style="width: 25%">
	 <balance-transactions :balance="state.customer.balance"></balance-transactions>
	 </card-component>
    </div>
  </main-section>

  <bottom-other-pages-section />
</template>

