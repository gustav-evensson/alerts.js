<script setup>
import AlertsJS from 'alerts.js'

const ajs = new AlertsJS({
  position: 'top-right',
  darkMode: true,
  hideCountdown: true
})
</script>

<template>
<button @click="ajs.createAlert('Hello from vue!', 'success', 'persisted')">Create Alert</button>
</template>
