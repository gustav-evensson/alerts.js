<script setup>
import alerts from 'alerts.js'
import { onMounted } from 'vue';

let ajs;

onMounted(() => {
  ajs = new alerts({
    position: 'bottom-center',
    animation: {
      type: 'slide-up'
    }
  })
})

</script>

<template>
	<img src="./assets/bgArt.jpg" alt="" />
	<button @click="ajs.createAlert('Hello from Alerts.js!', 'alert', 'persisted')">Create Notification</button>
</template>

<style>
img,
button {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
img {
	width: 100%;
	height: 100vh;
	object-fit: cover;
}
button {
	background-color: white;
	font-size: 24px;
	padding: 15px 40px;
	border-radius: 6px;
	border: none;
	cursor: pointer;
}
</style>
