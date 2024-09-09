<template>
  <div class="toolbar">
    <v-app-bar :elevation="5">
      <template #prepend>
        <v-icon icon="mdi-graph-outline" size="large" 
        style="margin-right: 10px"
        />
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
  overflow-x: auto


  .v-toolbar__content
    overflow-x: auto

  .v-toolbar__prepend
    margin-left: 20px
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