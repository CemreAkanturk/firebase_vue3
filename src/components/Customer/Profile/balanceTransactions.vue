<template>
  <div class="balance" v-if="balance > 0">
    <span>Toplam Ödenecek</span> <span class="price">{{ balance }} TL</span>
  </div>

  <div class="balance" v-else>
    <span>Toplam Tahsil Edilecek</span> <span class="price">{{ balance * -1 }} TL</span>
  </div>

  <div class="buttons">
    <button class="blue" @click="isModalPayment = true;ModalStatus='payment'">ÖDEME EKLE</button>
    <button class="green"  @click="isModalPayment = true;ModalStatus='collection'">TAHSİLAT EKLE</button>
    <button class="orange"  @click="isModalSalesInvoice = true">SATIŞ FATURASI EKLE</button>
    <button class="red"  @click="isModalPurchaseInvoice = true">ALIŞ FATURASI EKLE</button>
  </div>

  <modal-box  v-model="isModalPayment" has-cancel  v-slot:default="slotProps">
  	<add-payment :cancel="slotProps.cancel" :status="ModalStatus"></add-payment>
  </modal-box>

</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import addPayment from '@/components/Customer/Profile/addPayment.vue';
import addCollection from '@/components/Customer/Profile/addCollection.vue'

const props = defineProps({
  balance: Number,
});

const isModalPayment = ref(false);
const isModalCollection = ref(false);
const is = ref(false);
const ModalStatus=ref("payment")

const state = reactive({
  transtactions: {
    operation:{
	    id:0,
	    name:""
    },
    balance: "",
    date: "",
    description: "",
    sum: 0,
  }
});
</script>
<style scoped>
.balance {
  color: #403637;
  font-family: "Roboto Condensed", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  border-bottom: 1px solid #ebebeb;
}

.dark .balance {
  color: #ebebeb;
}
.dark .price {
  color: #fff;
}
.price {
  color: #999593;
  font-weight: 700;
  font-size: 18px;
}

.buttons {
  display: flex;
  flex-direction: column;
  margin: 5% 3%;
}
.buttons button {
  width: 100%;
  color: #fff;
  margin: 2% 0;
  height: 45px;
  border-radius: 7px;
}
.buttons button:hover {
  opacity: 0.9;
}

.blue {
  background: #519bc7;
}

.green {
  background: #56b350;
}

.orange {
  background: #f57a33;
}

.red {
  background: #e55a4c;
}
</style>