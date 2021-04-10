<template>
    <div class="facefloater-contain" :style="containStyler">
        <div :class="[starClass, colourClass]" :style="starStyler" />
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
   
},
computed : {
    containStyler : function() {
        return {
            'height': this.orbitsize +'px',
            'width': this.orbitsize+'px',
            'z-index': this.zlevel, 
            'animation-duration' : this.speed +'s',
            'transform' : "rotate("+this.startdeg+"deg)"
        }
    },
    starStyler: function() {
        return {
            'z-index' : this.zlevel-10,
            'height' : this.starsize + 'px',
            'width': this.starsize + 'px',
            'border-radius': Math.round(this.starsize/2) + 'px',
        }
    }
}
}
</script>

<style lang="sass" scoped>
@import "@/styles/colours.sass"
.facefloater-contain
    position: absolute
    animation: rotate 10s linear -10s infinite
    .facefloater
        top: 0
        left: 0
    .cyan
        background-color: $cyan-5
        box-shadow: 0 0 25px 10px $cyan-7
    .yellow
        background-color: $yellow-5
        box-shadow: 0 0 25px 10px $yellow-7
    .green
        background-color: $green-5
        box-shadow: 0 0 25px 10px $green-7
    .red 
        background-color: $red-5
        box-shadow: 0 0 25px 10px $red-7
    .orange
        background-color: $orange-5
        box-shadow: 0 0 25px 10px $orange-7
</style>