
<template>
  <full-screen-section
    bg="login"
  >
    <div class="container">
	    <img class="login-img" src="../assets/images/login.svg">
    <h3 class="login">Admin Panel</h3>
      <field
        help="Please enter your login"
      >
        <control
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
		placeholder="Email"
        />
      </field>

      <field
        help="Please enter your password"
      >
        <control
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
       	 placeholder="Password"
       />
      </field>

     

      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="LOGIN"
		class="login-btn"
		  @click="submit"
        />
      </jb-buttons>
    </div>
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
  login: '',
  pass: '',

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

<style scoped>
.login{
	text-align: center;
	font-size:36px;
	font-family: Lato;
	font-weight: 700;
	color:#ebebeb;
	margin-bottom:5%;


}

.container{
	width: 25%;
	min-width: 300px;
	margin-top:-5%
}

.login-btn{
	width: 100%;
	height: 50px;
	background: #2eafcd;
	font-family: Roboto;
	font-size:18px;
	font-weight: 500;
}
.login-btn:hover{

	background: rgb(41, 160, 187);
	
}

.login-img{
	width: 25%;
	margin:5% auto
}
	</style>