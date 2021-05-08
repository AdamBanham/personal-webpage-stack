<template>
  <div class="home-page">
      <FaceHolder />
      <FaceFloater v-for="(float,i) in largeFloats" :key="'large-'+i"
          :orbitsize="float.orbitsize"
          :zlevel="float.zlevel"
          :speed="float.speed"
          :starsize="float.starsize"
           :startdeg="float.startdeg"
        />
        <FaceFloater v-for="(float,i) in mediumFloats" :key="'medium-'+i"
          :orbitsize="float.orbitsize"
          :zlevel="float.zlevel"
          :speed="float.speed"
          :starsize="float.starsize"
           :startdeg="float.startdeg"
        />
      <FaceFloater v-for="(float,i) in smallFloats" :key="'small-'+i"
          :orbitsize="float.orbitsize"
          :zlevel="float.zlevel"
          :speed="float.speed"
          :starsize="float.starsize"
           :startdeg="float.startdeg"
        />
  </div>
</template>

<script>
import FaceHolder from "./faceHolder/faceHolder.vue";
import FaceFloater from "./faceFloater/faceFloater.vue";
import Floaters from './floaters.js';
export default {
name: "HomePage",
components: {
    FaceHolder,
    FaceFloater
},
data() {
  return {
    floats : []
  }
},
computed: {
  smallFloats() {
    return this.floats.filter(
      (i) => i.type == Floaters.FloaterTypes.SMALL
    );
  },
  mediumFloats() {
    return this.floats.filter(
      (i) => i.type == Floaters.FloaterTypes.MEDIUM
    );
  },
  largeFloats() {
    return this.floats.filter(
      (i) => i.type == Floaters.FloaterTypes.LARGE
    );
  }
},
mounted() {
  var some;
  try {
    this.floats = this.floats.concat(
      Array.from( {length:6}, () => new Floaters.Floater(Floaters.FloaterTypes.SMALL))
    ).concat(
      Array.from( {length:4}, () => new Floaters.Floater(Floaters.FloaterTypes.MEDIUM))
    ).concat(
      Array.from( {length:3}, () => new Floaters.Floater(Floaters.FloaterTypes.LARGE))
    ) 
  }
  catch (err) {
    console.log("Error occured in mouting home page : "+err.message)
  }
  
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