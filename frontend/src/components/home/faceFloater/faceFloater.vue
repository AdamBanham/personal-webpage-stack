<template>
  <div
    class="facefloater-contain"
    :style="containStyler"
  >
    <div
      :class="[starClass, colourClass]"
      :style="starStyler"
    />
  </div>  
</template>

<script>
export default {
name: "FaceFloater",
props: {
    orbitsize: {
        type: Number,
        default: 450
    },
    zlevel: {
        type: Number,
        default: 5
    },
    speed: {
        type: Number,
        default: 10
    },
    starsize: {
        type: Number,
        default: 100
    },
    startdeg: {
        type: Number,
        default: 0
    }
},
data() {
    return {
        colourClass: null,
        starClass: "facefloater"
    }
},
computed : {
    containStyler : function() {
        return {
            'height': this.orbitsize +'px',
            'width': this.orbitsize+'px',
            'z-index': this.zlevel, 
            'animation-duration' : this.speed +'s',
        }
    },
    starStyler: function() {
        // work out left and right based on starting degree
        var left,top;
        if (this.startdeg <= 45)
        {
            top = "0px";
            left = (this.orbitsize / 2) + (this.orbitsize/2) * (this.startdeg/45);
            left = left+"px";
        }
        else if (this.startdeg > 45 && this.startdeg <= 135)
        {
            left = this.orbitsize +"px";
            top = this.orbitsize *  ((this.startdeg-45)/(135-45));
            top = top +"px";
        }
        else if (this.startdeg > 135 && this.startdeg <= 225)
        {
            top = this.orbitsize+"px";
            left = this.orbitsize - this.orbitsize *  ((this.startdeg-135)/(225-135));
            left = left +"px";
        }
        else if (this.startdeg > 225 && this.startdeg <= 315)
        {
            left= "0px"
            top = this.orbitsize - this.orbitsize *  ((this.startdeg-225)/(315-225));
            top = top +"px";
        }
        else 
        {
            top = "0px"
            left = (this.orbitsize/2) *  ((this.startdeg-315)/(45));
            left = left +"px";
        }
        return {
            'z-index' : this.zlevel-10,
            'height' : this.starsize + 'px',
            'width': this.starsize + 'px',
            'top' : top,
            'left': left,
            'border-radius': Math.round(this.starsize/2) + 'px',
        }
    }
},
created() {
    let rand = Math.random() * 12
    if (rand < 2.5) {
        this.colourClass = "red"
    } else if (rand < 5.0) {
        this.colourClass = "green"
    } else if (rand < 7.5) {
        this.colourClass = "yellow"
    } else if (rand < 10) {
        this.colourClass = "cyan"
    } else {
        this.colourClass = "orange"
    }
   
}
}
</script>

<style lang="sass" scoped>
@use "@/styles/coloursAnt.sass" as c
@use "@/styles/breakpoints.sass" as brk

.facefloater-contain
    position: absolute
    animation: rotate 10s infinite
    .facefloater
        position: absolute
    .cyan
        background-image: radial-gradient(c.$cyan-3, c.$cyan-5, c.$cyan-7)
        box-shadow: 0 0 75px 5px c.$cyan-7
    .yellow
        background-image: radial-gradient(c.$yellow-3, c.$yellow-5, c.$yellow-7)
        box-shadow: 0 0 75px 5px c.$yellow-7
    .green
        background-image: radial-gradient(c.$green-3, c.$green-5, c.$green-7)
        box-shadow: 0 0 75px 5px c.$green-7
    .red 
        background-image: radial-gradient(c.$red-3, c.$red-5, c.$red-7)
        box-shadow: 0 0 75px 5px c.$red-7
    .orange
        background-image: radial-gradient(c.$orange-3, c.$orange-5, c.$orange-7)
        box-shadow: 0 0 75px 5px c.$orange-7

    div
        @media (min-width: brk.$desktop-width)
            transform: scale(0.75)

        @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
            transform: scale(0.4)

        @media (max-width: calc(brk.$tablet-width - 1px))
            transform: scale(0.2)

    @media (min-width: brk.$desktop-width)
        transform: scale(0.75)

    @media (max-width: calc(brk.$desktop-width - 1px)) and (min-width: brk.$tablet-width)
        transform: scale(0.5)
        max-width: 300px
        max-height: 300px

    @media (max-width: calc(brk.$tablet-width - 1px))
        transform: scale(0.25)
        max-width: 300px
        max-height: 300px
    
</style>