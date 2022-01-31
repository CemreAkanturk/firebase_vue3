<template>
  <card-component
      class="mb-6"
      title="Müşteriye ait İşlem Geçmişi "
      has-table
  >
      <transaction-table :transactionList="props.transactionList" />
    </card-component>
</template>

<script setup>
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import transactionTable from '@/components/Customer/transactionTable.vue'


const props=defineProps({
  transactionList:Array
});


</script>
	
