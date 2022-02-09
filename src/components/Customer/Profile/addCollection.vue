<template >
  <div style="margin: 1% 4%">
    <div class="flex justify-between">
      <span class="tab" :class="state.selectedTab == operation.id ? 'active' : ''" v-for="operation in operations" :key="operation.id" @click="state.selectedTab = operation.id">{{ operation.name }}</span>
    </div>

    <div class="form" v-if="state.selectedTab == 0">
      <div class="form-input">
        <span>Tarih *</span>
        <input v-model="state.cashModel.date" type="date" />
      </div>

      <div class="form-input">
        <span>Meblağ *</span>
        <input v-model="state.cashModel.sum" type="number" step="0.001" placeholder="0 TL"/>
      </div>

      <div class="form-input">
        <span>Açıklama</span>
        <input v-model="state.cashModel.description" type="text" />
      </div>
      <div class="buttons flex justify-between full">
        <button @click="cancel" class="back">Vazgeç</button>
        <button @click="add(state.cashModel)">Tahsilat Ekle</button>
      </div>
    </div>

    <div class="form" v-if="state.selectedTab == 1">
      <div class="form-input">
        <span>Tarih *</span>
        <input v-model="state.checkModel.date" type="date" />
      </div>
      <div class="form-input">
        <span>Vade Tarihi *</span>
        <input v-model="state.checkModel.expiry_date" type="date" />
      </div>

      <div class="form-input">
        <span>Meblağ *</span>
        <input v-model="state.checkModel.sum" type="number" placeholder="0 TL" />
      </div>
      <div class="form-input">
        <span>Banka</span>
	   <select v-model="state.checkModel.bank">
		   <option v-for="bank in state.bankList" :key="bank" :value="bank">{{bank}}</option>
	   </select>
	    
      </div>

      <div class="form-input">
        <span>Çek No</span>
        <input v-model="state.checkModel.check_no" type="text" />
      </div>

      <div class="form-input">
        <span>Açıklama</span>
        <input v-model="state.checkModel.description" type="text" />
      </div>

      <div class="buttons flex justify-between full">
        <button @click="cancel" class="back">Vazgeç</button>
        <button @click="add(state.checkModel)">Tahsilat Ekle</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject } from "vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import service from "@/services/service";
import BankList from '@/utils/constants/bankList.js'

const props = defineProps({
  cancel: {
    type: Function,
  },
});

const operations = [
  { id: 0, name: "Nakit  Ödeme" },
  { id: 1, name: "Çek  Ödeme" },
];
const today=new Date();

const state = reactive({
  selectedTab: operations[0].id,
  cashModel: {
    date:today.toISOString().slice(0,10),
    description: "",
    sum: null,
    operation: {
      id: 0,
      name: "Nakit Ödeme",
    },
  },
  checkModel: {
    date:today.toISOString().slice(0,10),
    expiry_date:new Date(today.setMonth(today.getMonth()+1)).toISOString().slice(0,10),
    description: "",
    sum: null,
    bank: "",
    check_no: "",
    operation: {
      id: 1,
      name: "Çek Ödeme",
    },
  },
  bankList:BankList
});

const addPayment = inject("addPayment");

const add = (Item) => {
  if (!Item.date && !Item.sum) return;
  if (Item.operation.id == 1 && !Item.expiry_date) return;

  addPayment(Item);
  state.checkModel = {
    date: "",
    expiry_date: "",
    description: "",
    sum: null,
    bank: "",
    check_no: "",
    operation: {
      id: 1,
      name: "Çek Ödeme",
    },
  };

  (state.cashModel = {
    date: "",
    description: "",
    sum: null,
    operation: {
      id: 0,
      name: "Nakit Ödeme",
    },
  }),
    props.cancel();
};
</script>

<style  scoped>
.tab {
  width: 50%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: rgb(134, 134, 134);
  height: 40px;
  line-height: 40px;
}

.tab.active {
  color: #f96a27;
  border-bottom: 2px solid #f97e27;
  background: #f97e2767;
}

.form {
  margin: 4% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-input span {
  width: 40%;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: #999593;
  font-family: "Roboto Condensed", sans-serif;
}
.form-input input,.form-input select {
  width: 60%;
  border: 1px solid #cac7c759;
  height: 45px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.buttons button {
  width: 49%;
  background: #f97e27;
  color: #fff;
  height: 45px;
  border-radius: 5px;
}

button.back {
  background: rgba(128, 128, 128, 0.082);
  color: gray;
  border: 2px solid rgba(128, 128, 128, 0.384);
}
</style>