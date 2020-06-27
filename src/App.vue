<template>
  <div>
    <Header v-if="!$route.meta.isHide" ></Header>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {//注册组件
    Header,Footer
  },
}
</script>

<style>

</style>
