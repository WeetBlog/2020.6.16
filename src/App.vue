<template>
  <div>
    <Header></Header>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {//注册组件
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
