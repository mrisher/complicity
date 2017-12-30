<template>
  <div id="stage" class="w3-display-container">
    <backdrop v-bind:image="sceneItem.backdrop" v-on:click.native="advanceScene"></backdrop>
    <alien-map v-bind:num-targets="3"></alien-map>
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
    }
  },
  methods: {
    advanceScene: function () {
      this.$emit('advanceScene')
    }
  },
  updated: function () {
    if (this.sceneItem.timeout) {
      this.$nextTick(function () {
        // set a timeout
        setTimeout(() => { this.advanceScene() }, this.sceneItem.timeout * 1000)
      })
    }
  }
}
</script>
