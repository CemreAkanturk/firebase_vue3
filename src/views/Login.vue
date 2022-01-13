<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
    <input type="text" v-model="user.email" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input type="password" v-model="user.password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="onSubmit">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,
      <router-link class="text-red-900 hover:text-black" :to="{ name: 'RegisterPage' }"> Üye olmak istiyorum! </router-link>
    </span>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.user.email,  this.user.password)
  .then((data) => {
          this.$store.commit("setUser", data.user);
          this.$router.push({ name: "HomePage" });
      })
      .catch(error => {
       alert("Bu kullanıcı bulunamadı...",error);
      });
     
    },
  },
};
</script>