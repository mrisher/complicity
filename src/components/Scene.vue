<template>
  <div id="stage" class="w3-display-container">
    <backdrop v-bind:image="sceneItem.backdrop" v-on:click.native="advanceScene"></backdrop>
  </div>
</template>

<script>
import Backdrop from './Backdrop.vue'

export default {
  name: 'Scene',
  props: ['sceneItem'],
  components: {
    Backdrop
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
