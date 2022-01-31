<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";

const props=defineProps({
  checkable: Boolean,
  transactionList:Array
});

const store = useStore();

const darkMode = computed(() => store.state.darkMode);

const items = computed(() => props.transactionList);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(10);

const currentPage = ref(0);

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

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
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
  <div v-if="checkedRows.length" class="bg-gray-50 p-3 dark:bg-gray-800">
    <span v-for="checkedRow in checkedRows" :key="checkedRow.id" class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700">
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th>İşlem Türü</th>
        <th>Açıklama</th>
        <th>İşlem Tarihi</th>
        <th>Meblağ</th>
        <th>Bakiye</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in itemsPaginated" :key="item.id">
        <td data-label="Name">
          {{ item.operation_type }}
        </td>
        <td data-label="Company">
          {{ item.description }}
        </td>
        <td data-label="City">
          {{ item.date }}
        </td>
        <td data-label="Progress">
            {{ item.sum }} TL
        </td>
        <td data-label="Created">
        {{ item.balance }} TL
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

