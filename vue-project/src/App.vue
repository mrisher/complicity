<template>
  <div id="app">
    <scene v-bind:scene_item="scenes[index]" v-on:advanceScene="advanceScene"></scene>
    <soundtrack v-bind:audio-file="getAudioFileName" 
      v-bind:autoPlay="autoPlay"
      v-on:advanceScene="advanceScene">
    </soundtrack>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'
import Soundtrack from './components/Soundtrack.vue'

export default {
  name: 'app',
  components: {Scene, Soundtrack},
  data () {
    return {
      index: 0,
      scenes: [
        {id: 0, backdrop: 'homescreen', audioFile: 'click', clickToPlay: true},
        {id: 1, backdrop: 'incoming_call', audioFile: 'ringtone'},
        {id: 2, backdrop: 'griggs', audioFile: 'audio-001'},
        {id: 3, backdrop: 'plane_view', audioFile: 'audio-002'},
        {id: 4, backdrop: 'griggs-alt', audioFile: 'get_residue'},
        {id: 5, backdrop: 'apps'},
        {id: 6, special: 'map'},
        {id: 7, backdrop: 'compass'},
        {id: 8, backdrop: 'meter'},
        {id: 9, backdrop: 'reticle'},
        {id: 10, backdrop: 'griggs'},
        {id: 11, backdrop: 'apps'},
        {id: 12, backdrop: 'griggs-alt'}]
    }
  },
  computed: {
    getAudioFileName: function () {
      if (this.scenes[this.index].audioFile === undefined) {
        return null
      } else {
        return '/static/audio/' + this.scenes[this.index].audioFile + '.mp3'
      }
    },
    autoPlay: function () {
      return (this.scenes[this.index].clickToPlay)
    }
  },
  methods: {
    playAudio: function () {
      var player = this.$refs.scene_audio
      player.pause()
      player.load()
      player.oncanplaythrough = player.play()
    },
    loadScene: function (index) {
      var audioFile = this.scenes[index].audioFile
      if (audioFile !== undefined) {
        this.playAudio()
      }
    },
    advanceScene: function () {
      this.index++
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
