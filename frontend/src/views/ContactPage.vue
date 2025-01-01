<template>
  <div class="content-bar">
    <p> There are some ways to get into contact with myself. <br>Theses are ordered by the chance of being seen and getting a response. </p>
    <div
      v-for="card in cards"
      :key="card.title"
      class="detail-card"
    >
      <div class="header">
        <div class="title">
          <h2>{{ card.title }} </h2>
        </div>
      </div>
      <div class="body">
        <div class="icon">
          <img
            :src="card.icon"
            alt="icon"
          >
        </div>
        <div class="info">
          <p v-html="card.info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MailIcon from "@/assets/icons/mail.png";
import LinkedInIcon from "@/assets/icons/linkedinLogo.png";
import GithubIcon from "@/assets/icons/GitHub-Mark-64px.png";
import ORCID from "@/assets/icons/orcidLogo.png";
export default {
name: "ContactPage",
data : function() {
  return {
    cards: [
      { title : "Contact me via a email", icon: MailIcon, info: "I am usually available between 9am to 5pm (GMT+10), monday to friday. <br> <b>Contact : <a href='mailto:adam.banham@outlook.com.au' target='_blank'>adam.banham@outlook.com.au</a></b>"},
      { title : "Add me on LinkedIn", icon: LinkedInIcon, info: "Send me a contact invite via LinkedIn or drop me a message for collaboration ideas.<br> <b> Profile: <a href='https://www.linkedin.com/in/adam-banham/' target='_blank'>https://www.linkedin.com/in/adam-banham/</a></b>"},
      { title : "Join me on GitHub", icon: GithubIcon, info: "Star some repos and drop me a follow if you would like to follow my software development.<br> <b>Profile: <a href='https://github.com/adambanham/' target='_blank'>https://github.com/adambanham/</a></b>"},
      { title: "Check out my academic history", icon: ORCID, info: "In case you need to find my published work or position history.<br> <b> Profile: <a href='https://orcid.org/0000-0001-9912-8220' target='_blank'>https://orcid.org/0000-0001-9912-8220 </a> </b>"}
    ]
  }
}
}
</script>

<style lang="sass" scoped>
@import "@/styles/coloursAnt.sass"
@import "@/styles/content.sass"

.content-bar

  // :first-child
  //   margin-top: 100px

  > div
    margin-top: 20px

  p 
    display: inline-flex
    justify-content: center
    align-items: center
    text-align: center

  .detail-card
    width: 90%
    margin-left: 5%
    margin-right: 5%
    height: 250px
    border-radius: 10px
    background: $light-grey
    display: flex
    flex-direction: column
    .header 
      width: 100% 
      height: 50px
      display: flex
      justify-items: center
      align-items: center
      justify-content: center
      flex-direction: row  
      h2 
        color: $green-3
    .body
      display: flex
      height: 100%
      justify-content: center
      align-content: center
      flex-direction: row
      .icon
       width: 40% 
       display: flex
       flex-flow: row nowrap
       justify-items: center
       align-items: center
       justify-content: center
       img 
         width: auto
         height: auto
      .info 
        width: 60% 
        display: flex
        flex-flow: row nowrap
        justify-items: center
        align-items: center
        justify-content: center
        p
          width: 80%
          text-align: center
          vertical-align: middle
          flex-direction: column
          color: $green-4
          b 
            color: $green-2
            a 
              color: $blue-2
              &:hover
                color: $blue-5

    
</style>