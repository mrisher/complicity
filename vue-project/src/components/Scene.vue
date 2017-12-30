<template>
  <div id="stage" class="w3-display-container">
    <backdrop v-bind:image="scene_item.backdrop" v-on:click.native="advanceScene"></backdrop>
  </div>
</template>

<script>
import Backdrop from './Backdrop.vue'

export default {
  name: 'Scene',
  props: ['scene_item'],
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
  }
}
</script>
