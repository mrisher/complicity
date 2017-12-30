<template>
  <div id="app">
    <scene v-bind:sceneItem="scenes[index]" v-on:advanceScene="advanceScene"></scene>
    <soundtrack v-bind:audio-file="getAudioFileName" 
      v-bind:clickToPlay="scenes[this.index].clickToPlay"
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
        {backdrop: 'homescreen', audioFile: 'click', clickToPlay: true},
        {backdrop: 'incoming_call', audioFile: 'ringtone'},
        {backdrop: 'griggs', audioFile: 'audio-001'},
        {backdrop: 'plane_view', audioFile: 'audio-002'},
        {backdrop: 'griggs-alt', audioFile: 'get_residue'},
        {backdrop: 'apps', timeout: 3},
        {special: 'map'},
        {backdrop: 'compass'},
        {backdrop: 'meter'},
        {backdrop: 'reticle'},
        {backdrop: 'griggs'},
        {backdrop: 'apps'},
        {backdrop: 'griggs-alt'}]
    }
  },
  computed: {
    getAudioFileName: function () {
      if (this.scenes[this.index].audioFile === undefined) {
        return null
      } else {
        return '/static/audio/' + this.scenes[this.index].audioFile + '.mp3'
      }
    }
  },
  methods: {
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
