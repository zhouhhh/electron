<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <a-button type="primary">Primary Button</a-button> -->
    <a-input-search v-model="keyword" placeholder="input search text" enter-button @search="onSearch" />
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
// import { Button } from 'ant-design-vue'

export default {
  name: 'landing-page',
  components: { SystemInformation },
  data: () => ({
    keyword: ''
  }),
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    async onSearch () {
      const data = await this.$http.get('https://www.shiyisoushu.com/api/search/v3?q=' + this.keyword)
      console.log('data', data)
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
