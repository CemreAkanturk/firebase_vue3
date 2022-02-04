<script setup>
import { ref, reactive } from "vue";
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail } from "@mdi/js";
import MainSection from "@/components/MainSection.vue";
import TitleBar from "@/components/TitleBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import FilePicker from "@/components/FilePicker.vue";
import HeroBar from "@/components/HeroBar.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import BottomOtherPagesSection from "@/components/BottomOtherPagesSection.vue";
import TitledSection from "@/components/TitledSection.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import service from "@/services/service";
import { useRouter } from "vue-router";

const titleStack = ref(["Müsteriler", "Yeni Musteri Ekle"]);
const infoMsg = ref(false);

const selectOptions = [
  { id: 0, label: "Borcu Vardır", value: -1 },
  { id: 1, label: "Alacağı Vardır", value: 1 },
];

const form = reactive({
  name: "",
  email: "",
  tel: "",
  description: "",
  address: "",
  iban: "",
  balance: "",
  transactions:[]
});

const router = useRouter();
const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
  startBalance: 0,
  balance: null,
  balanceStat: selectOptions[0],
});

const getBalance = () => {
  return parseFloat(customElementsForm.balance * customElementsForm.balanceStat.value);
};

const submit = () => {
  if (form.name == "" || form.description == "" || form.tel == "") {
    return false;
  }

  if (customElementsForm.startBalance && customElementsForm.balance) {

    form.balance = getBalance().toFixed(2);

  }
  if (service.AddCustomer(form)) {
    Object.keys(form)?.forEach((field) => (form[field] = null));
    router.push({ name: "customers" });
  } else alert("Tekrar Deneyiniz..");
};
</script>

<template >
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Yeni Müsteri</HeroBar>
  <card-component form @submit.prevent="submit(form)" class="addCustomer" >
    <field label="Müşteri İsmi:*">
      <control v-model="form.name" :icon="mdiAccount" placeholder="Jhon Doe" />
    </field>

    <field label="Açıklama:*" help="Müşteri hakkında kısa bilgi">
      <control v-model="form.description" placeholder="İş Tanımı..." />
    </field>

    <field label="E-mail:">
      <control v-model="form.email" :icon="mdiMail" placeholder="example@gmail.com" />
    </field>

    <divider />

    <field label="Telefon:*">
      <control v-model="form.tel" type="tel" placeholder="053xxxxxxxx" />
    </field>
    <field label="IBAN:">
      <control v-model="form.iban" />
    </field>
    <field label="Adres:">
      <control v-model="form.address" type="textarea" placeholder="Müsteri adresi..." />
    </field>
    <divider />
    <field label="Açılış Bakiyesi:" wrap-body>
      <check-radio-picker v-model="customElementsForm.startBalance" name="sample-checkbox" :options="{ bakiye: 'Açılış Bakiyesi Vardır' }" />
    </field>

    <div class="balance-content" v-if="customElementsForm.startBalance">
      <span>Detaylar:</span>
      <div>
        <span>Firmanın</span>

        <input style="width: 20%" type="number" step="0.001" v-model="customElementsForm.balance" placeholder="0" />

        <span style="text-align: left; padding-left: 5px; width: 5%">TL</span>
        <control class="dropdown" v-model="customElementsForm.balanceStat" :options="selectOptions" />
      </div>
    </div>

    <small>* işaretli alanlar zorunludur</small>

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

.addCustomer{
	padding:2% 15%;
}

@media  (max-width: 767px) {
.addCustomer{
	padding:initial;
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
</style>