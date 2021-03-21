<template>
  <div class="home">
    <HomePage />
  </div>
</template>

<script>
import HomePage from "@/components/home/home.vue"
export default {
  name: 'Home',
  components : {
    HomePage
  }
}
</script>

<style lang="sass" scoped>
.home
  width: 100% 
  height: 100%
  position: relative
</style>
