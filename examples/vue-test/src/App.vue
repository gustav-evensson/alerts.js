<script setup>
import AlertsJS from 'alerts.js'

const ajs = new AlertsJS({
  position: 'top-right',
  darkMode: true,
  corners: 'round'
})
</script>

<template>
<button @click="ajs.createAlert('Hello from vue!')">Create Alert</button>
</template>
