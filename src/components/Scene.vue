<template>
  <div id="stage" class="w3-display-container">
    <backdrop v-if="sceneItem.backdrop" v-bind:image="sceneItem.backdrop" v-on:click.native="advanceScene"></backdrop>
    <alien-map v-if="sceneItem.map" v-bind:num-targets="3"
      v-on:gameWon="gameWon"></alien-map>
  </div>
</template>

<script>
import Backdrop from './Backdrop.vue'
import AlienMap from './AlienMap.vue'

export default {
  name: 'Scene',
  props: ['sceneItem'],
  components: {
    Backdrop,
    AlienMap
  },
  data () {
    return {
      timeout: null
    }
  },
  methods: {
    advanceScene: function (event) {
      if (this.sceneItem.timeout && event.type === 'click') {
        clearTimeout(this.timeout)
      }
      this.$emit('advanceScene')
    },
    gameWon: function () {
      this.advanceScane()
    }
  },
  updated: function () {
    if (this.sceneItem.timeout) {
      this.$nextTick(function () {
        // set a timeout
        this.timeout = setTimeout(() => { this.advanceScene() }, this.sceneItem.timeout * 1000)
      })
    }
  }
}
</script>
