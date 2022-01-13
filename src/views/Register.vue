<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input type="text" v-model="userData.email" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input type="password" v-model="userData.password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link :to="{ name: 'LoginPage' }" class="text-red-900 hover:text-black"> Giriş yap! </router-link>
    </span>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      userData: {
        email: null,
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onSave() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.userData.email, this.userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          this.$router.push({ name: "HomePage" });
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>
