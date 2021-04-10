<template>
  <div class="home-page">
      <FaceHolder />
      <FaceFloater v-for="i in Array.from({length:3}, (x,i) => i)" :key="'large-outside-'+i"
          :orbitsize="Math.random() * 500 + 600"
          :zlevel="Math.round(Math.random() * 50 + 15)"
          :speed="Math.round(Math.random() * 30 + 5)"
          :starsize="Math.random() * 50 + 150"
          :startdeg="Math.random() * -50"
        />
        <FaceFloater v-for="i in Array.from({length:3}, (x,i) => i)" :key="'small-outside-'+i"
          :orbitsize="Math.random() * 500 + 600"
          :zlevel="Math.round(Math.random() * 50 + 15)"
          :speed="Math.round(Math.random() * 30 + 5)"
          :starsize="Math.random() * 15 + 30"
          :startdeg="Math.random() * -150"
        />
      <FaceFloater v-for="i in Array.from({length:6}, (x,i) => i)" :key="'small-'+i"
          :orbitsize="Math.random() * 125 + 350"
          :zlevel="Math.round(Math.random() * 50 + 50)"
          :speed="Math.round(Math.random() * 45 + 5)"
          :starsize="Math.random() * 50 + 15"
           :startdeg="Math.random() * -150"
        />
  </div>
</template>

<script>
import FaceHolder from "./faceHolder/faceHolder.vue";
import FaceFloater from "./faceFloater/faceFloater.vue"
export default {
name: "HomePage",
components: {
    FaceHolder,
    FaceFloater
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
  z-index: 50
</style>