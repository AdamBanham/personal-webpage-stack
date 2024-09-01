<template>
  <div class="home-page">
    <div class="left">
      <FaceHolder />
      <FaceFloater
        v-for="(float,i) in largeFloats"
        :key="'large-'+i"
        :orbitsize="float.orbitsize"
        :zlevel="float.zlevel"
        :speed="float.speed"
        :starsize="float.starsize"
        :startdeg="float.startdeg"
      />
      <FaceFloater
        v-for="(float,i) in mediumFloats"
        :key="'medium-'+i"
        :orbitsize="float.orbitsize"
        :zlevel="float.zlevel"
        :speed="float.speed"
        :starsize="float.starsize"
        :startdeg="float.startdeg"
      />
      <FaceFloater
        v-for="(float,i) in smallFloats"
        :key="'small-'+i"
        :orbitsize="float.orbitsize"
        :zlevel="float.zlevel"
        :speed="float.speed"
        :starsize="float.starsize"
        :startdeg="float.startdeg"
      />
      <!-- <TimelineBar /> -->
    </div>
    <div class="right">
      <div>
        <p>
          <b> 
            I'm seeking opportunities in academia in computer science 
            and information systems, specifically in process mining. 
            Please get in touch if you have an openning.
          </b> 
        </p>
      </div>
      <div>
        <p>
          <b> Adam Banham </b> 
          (<a
            href="https://orcid.org/0000-0001-9912-8220"
            target="_blank"
          >ORCID</a>) 
          (<a
            href="https://scholar.google.com/citations?hl=en&user=IyiPbEAAAAAJ"
            target="_blank"
          >Scholar</a>) <br><br>
          Thanks to the fantastic support at the Queensland University of Technology, I am currently studying for a PhD 
          focusing on Process Mining. In particular, I have to thank my current supervisor team for all their effort and patience, 
          as they have helped me grow significantly through my undergraduate studies and continue to do so now.
          Professor Moe T. Wynn, for taking me on during my undergraduate and creating opportunities to work with her and colleagues. 
          Dr Robert Andrews, for giving me a chance to work alongside him during my undergraduate studies and for his continuing support. 
          Finally, Prof. Sander J.J. Leemans, for giving me the opportunity to learn from him during my honours and PhD.
          <br>
          <br>
          <b>Additional Info:</b>
          <ul>
            <li>
              Born in Ipswich, Queensland, Australia.
            </li>
            <li>
              Completed Bachelor (Honours) of Information Technology at QUT in 2020 with Second Class honours - Division A
            </li>
            <li>
              Started PhD on Feburary 22 in 2021 with the school of Information Systems at QUT.
            </li>
            <li>
              Year One Milestone - Research Plan - Confirmed with no changes 
            </li>
            <li>
              Brief overview of project: <a
                href="https://qut.to/cjvey"
                target="_blank"
                title="Project Description @ QUT"
              >https://qut.to/cjvey</a>
            </li>
            <li>
              Check out the BPM group at QUT : <a
                href="https://qut.to/eb3gw"
                target="_blank"
                title="BPM @ QUT Homepage"
              >https://qut.to/eb3gw</a>
            </li>
            <li>
              Visited RWTH Aachen from November to March, working with Prof.
              Sander J. J. Leemans.
              <a
                href="/blog/rwthVist2023"
                target="_blank"
                title="BPM @ QUT Homepage"
              >More info.</a>
            </li>
            <li>
              Finished internally presenting Thesis work @ QUT - minor 
              changes needed.
              <a
                href="/blog/FinalSeminar2024A"
                target="_blank"
                title="BPM @ QUT Homepage"
              >Check out the presentation.</a>
            </li>
          </ul>
        </p>
      </div>
    </div>
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
    FaceFloater,
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

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/breakpoints.sass"

.home-page
  width: 100% 
  height: 100%
  display: flex
  
  justify-content: center
  align-items: center

  @media (min-width: $desktop-width)
    margin-top: 200px

  @media (max-width: calc($desktop-width - 1px)) and (min-width: $tablet-width)
    margin-top: 75px
    flex-direction: column

  @media (max-width: calc($tablet-width - 1px))
    margin-top: 50px
    flex-direction: column

  .left 
    justify-content: center
    align-items: center
    display: flex
    z-index: 50

  .right
    display: flex
    z-index: 100
    padding: 15px
    flex-direction: column

    div
      background-color: $background-light 
      border-radius: 15px
      box-shadow: $green-1 2.5px 5px 5px 0.5px
      margin-bottom: 25px
      p 
        text-align: center
      ul
        text-align: left
      
      @media (min-width: $desktop-width)
        margin-left: 100px

      @media (min-width: $tablet-width)
        max-width: 450px

      @media (max-width: calc($tablet-width - 1px))
        max-width: 300px
</style>