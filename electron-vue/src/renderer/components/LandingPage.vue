<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <a-button type="primary">Primary Button</a-button>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
// import { Button } from 'ant-design-vue'

export default {
  name: 'landing-page',
  components: { SystemInformation },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }
</style>
