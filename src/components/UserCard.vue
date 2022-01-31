<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { mdiSquareEditOutline } from "@mdi/js";
import Level from "@/components/Level.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import Pill from "@/components/Pill.vue";
import { mdiMail, mdiPhoneInTalk ,mdiMapMarker,mdiWallet,mdiFileAccount    } from "@mdi/js";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  customerHead: Object,
});
const userName = computed(() => props.customerHead.name);
const description = computed(() => props.customerHead.description);
const email = computed(() => props.customerHead.email);
const tel = computed(() => props.customerHead.tel);
const address = computed(() => props.customerHead.address);
const iban = computed(() => props.customerHead.iban);
</script>

<template>
  <card-component rounded="" style="border: none">
    <level type="justify-between lg:justify-between" style="width: 100%">
      <div class="space-y-3 text-center md:text-left">
        <div class="flex items-center">
          <icon style="margin-right:10px" :path="mdiFileAccount " class="cursor-pointer" size="32" />
          <h1 class="text-2xl">
            <b>{{ userName }}</b>
          </h1>
        </div>
        <p>{{ description }}</p>
      </div>
      <div class="flex justify-center md:block;">
        <pill text="Düzenle" type="info" :icon="mdiSquareEditOutline" />
      </div>
    </level>
    <div class="info">
      <div class="flex items-start justify-between">
        <div class="flex items-start">
          <icon :path="mdiMail" class="cursor-pointer" size="16" />
          {{ email }}
        </div>
        <div>
          <icon :path="mdiPhoneInTalk" class="cursor-pointer" size="16" />
          {{ tel }}
        </div>
      </div>
      <div class="flex items-start justify-between">
        <div>
          <icon :path="mdiMapMarker " class="cursor-pointer" size="16" />
          {{ address }}
        </div>
        <div>
          <icon :path="mdiWallet" class="cursor-pointer" size="16" />
          {{ iban }}
        </div>
      </div>
    </div>
  </card-component>
</template>

<style scoped>
.info {
  margin-top: 1%;
  border-top: 1px solid #ebebeb;
  padding: 15px 0;
}
</style>