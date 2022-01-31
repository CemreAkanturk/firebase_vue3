<template >
<div style="margin:1% 4%;">
  <div class="flex justify-between">
 
    <span class="tab" :class="state.selectedTab == tab.id ? 'active' : ''" v-for="tab in tabs" :key="tab.id" @click="state.selectedTab = tab.id">{{ tab.name }}</span>
  </div>

<div class="form" v-if="state.selectedTab==0">
  <div class="form-input">
    <span>Tarih *</span>
    <input type="date" />
  </div>

  <div class="form-input">
    <span>Meblağ *</span>
    <input type="number" />
  </div>

  <div class="form-input">
    <span>Açıklama</span>
    <input type="text" />
  </div>
  <div class="buttons flex justify-between full" >
	<button class="back">Vazgeç</button>
	<button>Ödeme Ekle</button>
</div>
</div>



<div class="form"  v-if="state.selectedTab==1">

  <div class="form-input">
    <span>Tarih *</span>
    <input type="date" />
  </div>
   <div class="form-input">
    <span>Vade Tarihi *</span>
    <input type="date" />
  </div>

  <div class="form-input">
    <span>Meblağ *</span>
    <input type="number" />
  </div>
  <div class="form-input">
    <span>Banka</span>
    <input type="text" />
  </div>

  <div class="form-input">
    <span>Çek No</span>
    <input type="text" />
  </div>

  <div class="form-input">
    <span>Açıklama</span>
    <input type="text" />
  </div>
  <div class="buttons flex justify-between full" >
	<button class="back">Vazgeç</button>
	<button>Ödeme Ekle</button>
</div>
</div>

</div>



</template>

<script setup>
import { ref, reactive, computed } from "vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";

const tabs = [
  { id: 0, name: "Nakit  Ödeme" },
  { id: 1, name: "Çek  Ödeme" },
];
const state = reactive({
  selectedTab: tabs[0].id,
});

</script>

<style  scoped>
.tab {
  width: 50%;
  text-align: center;
   text-transform: uppercase;
   font-weight: 700;
   color:rgb(134, 134, 134);
   height: 40px;
   line-height: 40px;
}

.tab.active {
  color: #f96a27;
  border-bottom:2px solid #f97e27;
  background: #f97e2767;
 
}

.form{
	margin:4% auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
}


.form-input{
	width:100%;
	display: flex;
	justify-content: space-between;
	margin-bottom:10px
}

.form-input span{
	width:40% ;
	text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    color: #999593;
    font-family: "Roboto Condensed", sans-serif;


}
.form-input input{
	width:60% ;
	border:1px solid #cac7c759 ;
	height: 45px;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	
}

.buttons button{
	width: 49%;
	background: #f97e27;
	color:#fff;
	height: 45px;
	border-radius: 5px;
}

button.back{
	background: rgba(128, 128, 128, 0.082);
	color:gray;
	border:2px solid rgba(128, 128, 128, 0.384)
	
}

</style>