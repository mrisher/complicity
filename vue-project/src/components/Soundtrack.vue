<template>
  <audio ref='scene_audio' v-on:canplaythrough="play" v-on:ended="onEnded">
    <source id="mp3_src" v-bind:src="audioFile" type="audio/mpeg">
    Test1.mp3
  </audio>
</template>

<script>
export default {
  props: {
    audioFile: {
      type: String,
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: true
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
