<template>
  <div class="home-page">
      <FaceHolder />
  </div>
</template>

<script>
import FaceHolder from "./faceHolder/faceHolder.vue";
export default {
name: "HomePage",
components: {
    FaceHolder
}
}
</script>

<style lang="sass">
.home-page
  width: 100% 
  height: 100%
  justify-content: center
  align-items: center
  display: flex
</style>