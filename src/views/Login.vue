
<template>
  <full-screen-section
    v-slot="{ cardRounded }"
    bg="login"
  >
    <card-component
     
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field
        label="Login"
        help="Please enter your login"
      >
        <control
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </field>

      <field
        label="Password"
        help="Please enter your password"
      >
        <control
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </field>

     

      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Login"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const form = reactive({
  login: 'cemre123@gmail.com',
  pass: '123456',

})

const store = useStore();
const router = useRouter()

const submit = () => {
   const auth = getAuth();
    signInWithEmailAndPassword(auth, form.login,  form.pass)
  .then((data) => {
          store.commit("setUser", data.user);
          router.push({ name: 'home' });
      })
      .catch(error => {
       alert(error);
      });
}
</script>
