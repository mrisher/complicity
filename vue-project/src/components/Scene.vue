<template>
  <div id="stage" class="w3-display-container">
    <backdrop v-bind:image="scene_item.backdrop"></backdrop>
    <soundtrack v-bind:audio_file="scene_item.audio_file"></soundtrack>
  </div>
</template>

<script>
import Backdrop from './Backdrop.vue'
import Soundtrack from './Soundtrack.vue'

export default {
  name: 'Scene',
  props: ['scene_item'],
  components: {
    Backdrop,
    Soundtrack
  },
  data () {
    return {
    }
  }
}
</script>
