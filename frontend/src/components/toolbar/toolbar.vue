<template>
  <div class="toolbar">
    <v-app-bar :elevation="5">
      <template #prepend>
        Adam P. Banham
      </template>
      <template #append>
        <v-btn @click="moveTo('home')">
          Home
        </v-btn>
        <v-btn @click="moveTo('blog')">
          Blog
        </v-btn>
        <v-btn @click="moveTo('pubs')">
          Publications
        </v-btn>
        <v-btn id="menu-process-mining">
          Process mining
        </v-btn>
        <v-menu activator="#menu-process-mining">
          <v-list>
            <v-list-item
            :key="1"
            :value="1"
            @click="moveTo('pm-discovery')"
            >
              <v-list-item-title> Process Discovery </v-list-item-title>
            </v-list-item>
            <v-list-item
            :key="2"
            :value="2"
            >
              <v-list-item-title> Conformance Checking </v-list-item-title>
            </v-list-item>
            <v-list-item
            :key="3"
            :value="3"
            >
              <v-list-item-title> Process Enhancement </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn @click="moveTo('code')">
          Coding
        </v-btn>
        <v-btn @click="moveTo('contact')">
          Contact
        </v-btn>
      </template>
    </v-app-bar>
    <!-- <div class="choices">
      <div
        class="choice"
        @click="moveTo('home')"
      >
        Home
      </div>
      <div
        class="choice"
        @click="moveTo('blog')"
      >
        Blog
      </div>
      <div
        class="choice"
        @click="moveTo('pubs')"
      >
        Publications
      </div>
      <div class="sub-choices choice">
        Process Mining
        <div
          class="choice"
          @click="moveTo('pm-discovery')"
        >
          Process Discovery
        </div>
      </div>
      
      <div
        class="choice"
        @click="moveTo('code')"
      >
        Coding
      </div>
      <div
        class="choice"
        @click="moveTo('contact')"
      >
        Contact
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
name: "Toolbar",
methods : {
    moveTo: function(name){
        this.$router.push({name:name})
    }
}
}
</script>

<style lang="sass">
@import "@/styles/coloursAnt.sass"
@import "@/styles/breakpoints.sass"
.toolbar
    .v-toolbar__prepend
      @media (max-width: calc($tablet-width - 1px))
        display: none


    @media (max-width: calc($tablet-width - 1px))
      height: 55px

    &::-webkit-scrollbar
      height: 15px
      width: 5px 
      background-color: none
    
    &::-webkit-scrollbar-thumb
      background-color: $green-3
      opacity: 0.6
      border-radius: 5px
    
</style>