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
        <input v-model="state.cashModel.sum" type="number" step="0.001" placeholder="0 TL" />
      </div>

      <div class="form-input">
        <span>Açıklama</span>
        <input v-model="state.cashModel.description" type="text" />
      </div>
      <div class="buttons flex justify-between full">
        <button @click="cancel" class="back">Vazgeç</button>
        <button @click="add(state.cashModel)">{{ statusText }} Ekle</button>
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
        <input v-model="state.checkModel.sum" type="number" step="0.001"  placeholder="0 TL" />
      </div>
      <div class="form-input">
        <span>Banka</span>
        <select v-model="state.checkModel.bank">
          <option v-for="bank in state.bankList" :key="bank" :value="bank">{{ bank }}</option>
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
        <button @click="add(state.checkModel)">{{ statusText }}} Ekle</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject } from "vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import service from "@/services/service";
import { getPaymentObject } from "@/utils/helpers/payment.js";

const props = defineProps({
  cancel: {
    type: Function,
  },
  status: String,
});

const statusText = computed(() => {
  return props.status == "payment" ? "Ödeme" : "Tahsilat";
});

const operations = computed(() => {
  return [
    { id: 0, name: "Nakit " + statusText.value },
    { id: 1, name: "Çek " + statusText.value },
  ];
});

const state = reactive({
  cashModel: getPaymentObject(0),
  checkModel: getPaymentObject(1),
  bankList: [
    "Adabank",
    "Akbank",
    "Albara Türk",
    "Anadolu Bank",
    "A&T Bank",
    "Citi Bank",
    "Deniz Bank",
    "Enpara",
    "Fibabanka",
    "QNB Finansbank",
    "Garanti Bankası",
    "HalkBank",
    "HSBC",
    "ING",
    "Türkiye İş Bankası",
    "Kuveyt Türk",
    "Odea Bank",
    "Rabobank",
    "Şekerbank",
    "Türkiye Finans",
    "T-Bank",
    "Vakıf Bank",
    "Vakıf Katılım",
    "Yapı Kredi",
    "Ziraat Bankası",
    "Ziraat Katılım",
    "Diğer",
  ],
  selectedTab: 0,
});

const addPayment = inject("addPayment");

const add = (Item) => {
  if (!Item.date && !Item.sum) return;

  const operationVal = operations.value.filter((x) => x.id == state.selectedTab)[0];
    if (operationVal.id == 1 && !Item.expiry_date) 
    return;


  addPayment({ ...Item , operation:{...operationVal} },props.status);
 
  state.cashModel = getPaymentObject(0),
  state.checkModel = getPaymentObject(1)

 
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
.form-input input,
.form-input select {
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