<template>
  <div>
    <div class="transparent_full_screen_click_layer" v-on:click="play" v-if="clickToPlay"></div>
    <audio ref='scene_audio' v-on:canplaythrough="play" v-on:ended="onEnded">
      <source v-bind:src="audioFile" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    audioFile: {
      type: String
    },
    clickToPlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    play: function (e) {
      var player = this.$refs.scene_audio
      player.play()
    },
    onEnded: function (e) {
      this.$emit('advanceScene')
    }
  },
  updated: function () {
    var player = this.$refs.scene_audio
    player.pause()
    player.load()
  }
}
</script>

<style>
div.transparent_full_screen_click_layer {
    position:fixed;
    top:0;
    left:0;
    z-index:5;
    width:100%;
    height:100%;
}
</style>
