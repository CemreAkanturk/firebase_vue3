<script setup>
import { computed, ref } from "vue";
import {useRouter} from "vue-router"
import { useStore } from "vuex";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import service from "@/services/service";
import CryptoJs from "crypto-js";
const props = defineProps({
  checkable: Boolean,
  items: Array,
});
const emits = defineEmits(["deleteItem"]);

const store = useStore();

const darkMode = computed(() => store.state.darkMode);

const items = computed(() => props.items);


const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(10);

const currentPage = ref(0);
const deleteId = ref("");

const checkedRows = ref([]);

const itemsPaginated = computed(() => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)));

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (id,cancel) => {
 
  service.DeleteCustomer(id);
  emits("deleteItem", id);
  cancel()
};

const router=useRouter()

const customerGet = (userId) => {
 const key = "fktld125.aso8kdusn.hssde";
 const cryptedPass = CryptoJs.AES.encrypt(userId, key).toString();
 router.push({ name: 'customer', params: { id: cryptedPass } })
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id);
  }
};


</script>

<template>
  <modal-box v-model="isModalActive" title="Müşteri Sil" style="text-align:center"  v-slot:default="slotProps" >

     <img class="delete-icon" src="../../assets/images/warning.svg">
    <p style="color:#333;font-weight:700">Bu müşteriyi bilgileri ile beraber silmek istediğinizden emin misiniz?</p>
    
    <jb-buttons style="display:flex;justify-content:flex-end;margin-top:8%">
      <jb-button style="width:20%" type="reset" color="info" outline label="Vazgeç"  @click="slotProps.cancel"/>
      <jb-button style="width:30%;" type="submit" color="danger"  label="Sil"  @click="remove(deleteId,slotProps.cancel)" />
    </jb-buttons>
      
  </modal-box>

  <modal-box v-model="isModalDangerActive" large-title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <div v-if="checkedRows.length" class="bg-gray-50 p-3 dark:bg-gray-800">
    <span v-for="checkedRow in checkedRows" :key="checkedRow.id" class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700">
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>isim</th>
        <th>Açıklama</th>
        <th>E-mail</th>
        <th>Telefon</th>
        <th>Adres</th>
	   <th>Bakiye</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <checkbox-cell v-if="checkable" @checked="checked($event, client)" />

        <td data-label="Name">
          {{ client.name }}
        </td>
        <td data-label="Description">
          {{ client.description }}
        </td>
        <td data-label="Email">
          {{ client.email }}
        </td>
        <td data-label="Telefon">
          {{ client.tel }}
        </td>
        <td data-label="Adres">
          <small class="text-gray-500 dark:text-gray-400" :title="client.address">{{ client.address }}</small>
        </td>
	     <td data-label="Bakiye">
          <small v-if="client.balance!=0" class="text-gray-500 dark:text-gray-400" :title="client.balance">{{ client.balance>0?client.balance:client.balance*-1 }} TL {{client.balance>0?'Ödenecek':'Tahsil Edilecek'}}</small>
		<small v-else class="text-gray-500 dark:text-gray-400" :title="client.balance">{{ client.balance}} TL </small>
        </td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button color="success" :icon="mdiEye" small @click="customerGet(client.id)"/>
            <jb-button color="danger" :icon="mdiTrashCan" small @click="isModalActive = true;deleteId=client.id"  />		
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1" :outline="darkMode" small @click="currentPage = page" />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<style scoped>
.delete-icon{
	width: 12%;
	margin:auto
}
</style>