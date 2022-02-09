<script setup>
import { ref, reactive, computed,provide } from "vue";
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
  

});

const UpdateBalance = (customerId,newBalance)=>{
     service.UpdateCustomerBalance(customerId,newBalance)
}

const addCollection = CollectionData=>{
     if(CollectionData.sum<0)
	return
	

     state.customer.balance= parseFloat(state.customer.balance) + sum;

	UpdateBalance(state.customer.id,state.customer.balance)
     var data={ balance:state.customer.balance, ...paymentData }
	
	if(!state.customer.transactions){
		state.customer.transactions=[]
	}
	state.customer.transactions.push(data)

     service.AddCollection(state.customer.id,state.customer.transactions)
    
}

const addPayment = (paymentData,status)=>{
     if(paymentData.sum<0)
	return

	if(status=="payment")
	var sum=paymentData.sum.toFixed(2)*-1;
	else sum=paymentData.sum.toFixed(2)*1

     state.customer.balance=parseFloat(state.customer.balance) + sum;


	UpdateBalance(state.customer.id,state.customer.balance)
     var data={ balance:state.customer.balance, ...paymentData }
	
	if(!state.customer.transactions){
		state.customer.transactions=[]
	}
	state.customer.transactions.push(data)

      service.AddPayment(state.customer.id,state.customer.transactions,status)
    
}


provide("addPayment",addPayment)



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

