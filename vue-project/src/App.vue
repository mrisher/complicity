<template>
  <div id="app">
    <scene v-for="scene in scenes" v-bind:scene_item="scene" :key="scene.id"></scene>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'

export default {
  name: 'app',
  components: {Scene},
  data () {
    return {
      scenes: [
        {id: 0, backdrop: 'homescreen', audio_file: 'click', manual_play: true},
        {id: 1, backdrop: 'incoming_call', audio_file: 'ringtone'},
        {id: 2, backdrop: 'griggs', audio_file: 'audio-001'},
        {id: 3, backdrop: 'plane_view', audio_file: 'audio-002'},
        {id: 4, backdrop: 'griggs-alt', audio_file: 'get_residue'},
        {id: 5, backdrop: 'apps'},
        {id: 6, special: 'map'},
        {id: 7, backdrop: 'compass'},
        {id: 8, backdrop: 'meter'},
        {id: 9, backdrop: 'reticle'},
        {id: 10, backdrop: 'griggs'},
        {id: 11, backdrop: 'apps'},
        {id: 12, backdrop: 'griggs-alt'}]
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
