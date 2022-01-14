<template>
  <modal-box
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </modal-box>
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Müşteriler</HeroBar>
<div class="search">
	   <control
    ref="root"
    placeholder="Müşterilerde ara..."
    ctrl-k-focus
    borderless
    style="width:60%"
  />

  <button  @click="modalOneActive = true" class="addNew" >+ Yeni Müşteri Ekle</button>
</div>
 


</template>


<script>
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
export default {
	components:{
		TitleBar,
		HeroBar,
		Control,
		ModalBox,
	},
	data(){
		return {
			 titleStack:['Admin', 'Müsteriler'],
			 modalOneActive:false
		}
	}
}
</script>

<style scoped>

.search{
	width: 100%;
	margin:10px 0;
	display: flex;
	justify-content: space-between;
}

.addNew{
	text-align: center;
	background: rgb(83, 166, 235);
	width: 39%;
	border-radius: 5px;
	color:#fff;
	font-weight: 600;

}
</style>