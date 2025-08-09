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
          <b> <strong style="color:yellowgreen">Dr.</strong> Adam Banham </b> 
          (<a
            href="https://orcid.org/0000-0001-9912-8220"
            target="_blank"
          >ORCID</a>) 
          (<a
            href="https://scholar.google.com/citations?hl=en&user=IyiPbEAAAAAJ"
            target="_blank"
          >Scholar</a>) <br><br>
        </p>
        <p>
          <strong>
            I am an award-winning scholar and educator.
          </strong> 
          I have published
          high-quality publications as a researcher and excelled as a 
          teacher for undergraduates  and postgraduates studying either
          computer science or information systems through their 
          coursework at QUT.
        </p>
        <br>
        <p>
          I help organisations mature their processes and build 
          process-aware informations to support their operational
          excellence. 
          Ideally, by the end of a project with me, you and your team 
          will be 
          <strong>
            busier than ever!
          </strong> 
          <em>Doing more work that matters</em> rather than dealing with 
          friction from the process.
        </p>
        <br>
        <p>
          I completed my doctoral studies at the Queensland University of 
          Technology, focusing on 
          <strong>
            Process Mining
          </strong>. 
          My doctoral studies spanned several major events, the most 
          prominent of which was the global outbreak of COVID-19 I am 
          particularly thankful to 
          <strong> Professor Moe T. Wynn </strong>
          , for taking me on during my undergraduate years and 
          creating opportunities to work with her and colleagues. 
          <strong>
            Dr. Robert Andrews,
          </strong>  
          for giving me a chance to work alongside him during my 
          undergraduate studies and for his continuing support. 
          Finally, 
          <strong>
            Prof. Sander J.J. Leemans
          </strong>, 
          for allowing me to learn from his passion for 
          process mining and guidance through the troubling waters of a 
          doctoral journey.
        </p>
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
              href="https://research.qut.edu.au/bpm/"
              target="_blank"
              title="Process Science @ QUT Homepage"
            >https://research.qut.edu.au/bpm/</a>
          </li>
          <li>
            Visited RWTH Aachen from November to March, working with Prof.
            Sander J. J. Leemans.
            <router-link
              to="/blog/rwthVist2023"
              title="RWTH visit"
            >More info.</router-link>
          </li>
          <li>
            Finished internally presenting Thesis work @ QUT - minor 
            changes needed.
            <router-link
              title="blog about final seminar" 
              to="/blog/FinalSeminar2024A"
            >Check out the presentation.</router-link>
          </li>
          <li>
            External examination completed, 13/03/2025, passed with minor revisions.
          </li>
          <li>
            Offically Conferred PhD on 09/05/2025, see 
            <a
            href="/docs/education/Dr-Banham-Conferred.pdf"
            target="_blank">
              letter
            </a>.
          </li>
          <li>
            <strong style="color:yellowgreen">
              Offically Graduated and 
              Recieved Doctoral Testamur on 02/08/2025
            </strong>, see 
            <a
            href="/docs/education/Dr-Banham-Testamur.pdf"
            target="_blank">
              testamur
            </a>
            <a
            href="https://www.myequals.net/sharelink/bcbe292a-cb3c-4d27-a0f4-88170c6cab45/10305491-09a5-4884-87b2-3f8e9b6bf76c"
            target="_blank">
              (<em>offical record</em>)
            </a>.
          </li>
        </ul>
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
    //console.log("Error occured in mouting home page : "+err.message)
  }
  
},
methods: {
  moveTo: function(path){
        this.$router.push({path:path})
    }
}
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c 
@use "@/styles/breakpoints.sass" as brk

.home-page
  width: 100% 
  height: 100%
  display: flex
  justify-content: center
  align-items: center

  strong 
    color: c.$green-7

  @media (min-width: brk.$desktop-width)
    margin-top: 50px
    margin-bottom: 50px

  @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
    margin-top: 75px
    flex-direction: column

  @media (max-width: calc(brk.$tablet-width - 1px))
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
      background-color: c.$background-light 
      border-radius: 15px
      box-shadow: c.$green-1 2.5px 5px 5px 0.5px
      margin-bottom: 25px
      padding : 15px
      p 
        text-align: center
      ul
        text-align: left
        padding: 10px
      
      @media (min-width: brk.$desktop-width)
        margin-left: 100px

      @media (min-width: brk.$tablet-width)
        max-width: 450px

      @media (max-width: calc(brk.$tablet-width - 1px))
        max-width: 300px
</style>