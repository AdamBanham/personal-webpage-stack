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
        default: 25
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
@import "@/styles/colours.sass"
.facefloater-contain
    position: absolute
    animation: rotate 10s infinite
    .facefloater
        position: absolute
    .cyan
        background-image: radial-gradient($cyan-3, $cyan-5, $cyan-7)
        box-shadow: 0 0 75px 5px $cyan-7
    .yellow
        background-image: radial-gradient($yellow-3, $yellow-5, $yellow-7)
        box-shadow: 0 0 75px 5px $yellow-7
    .green
        background-image: radial-gradient($green-3, $green-5, $green-7)
        box-shadow: 0 0 75px 5px $green-7
    .red 
        background-image: radial-gradient($red-3, $red-5, $red-7)
        box-shadow: 0 0 75px 5px $red-7
    .orange
        background-image: radial-gradient($orange-3, $orange-5, $orange-7)
        box-shadow: 0 0 75px 5px $orange-7
</style>