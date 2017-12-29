<template>
  <audio id='scene_audio'>
    <source id="mp3_src" v-bind:src="getAudioFileName" type="audio/mpeg">
    Test1.mp3
  </audio>
</template>

<script>
export default {
  props: ['audio_file'],
  computed: {
    getAudioFileName: function () {
      return '/audio/' + (this.audio_file) + '.mp3'
    }
  }
}
</script>
