<template>
  <div class="buttons">
    <button>Aynı Gün</button>
    <button>7 Gün</button>
    <button>14 Gün</button>
    <button>30 Gün</button>
    <button>60 Gün</button>
  </div>

  <control type="date" placeholder="" />
</template>

<script setup>
import Control from "@/components/Control.vue";
</script>

<style scoped>
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 26px;

  background: 0 0;
  border: 2px solid #a5a2a0;
  border-radius: 6px;

  text-decoration: none !important;
  letter-spacing: 0.5px;
  cursor: pointer;
  pointer-events: auto;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 13px;
  padding: 0px 10px;
  margin-bottom: 15px;
}

.buttons button {
  width: 20%;
  font-weight: 600;
  text-align: center;
  border-right: 2px solid #a5a2a0;
  color: #817d7d;
  text-transform: uppercase;
}
.buttons button:last-child {
  border-right: none;
}
</style>

