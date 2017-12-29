<template>
  <div id="app">
    <div id="stage" class="w3-display-container" data-starting-index="0">
        <img id="backdrop" class="max_100" />
            <audio id='soundtrack'>
                <source id="mp3_src" src="/audio/click.mp3" type="audio/mpeg">
                Test1.mp3
            </audio>
    </div>
  </div>
</template>

<script>
import SceneList from './components/SceneList.vue'

export default {
  name: 'app',
  data () {
    return {
      scenes: [
        {backdrop: 'homescreen', audio: 'click', manual_play: true},
        {backdrop: 'incoming_call', audio: 'ringtone'},
        {backdrop: 'griggs', audio: 'audio-001'},
        {backdrop: 'plane_view', audio: 'audio-002'},
        {backdrop: 'griggs-alt', audio: 'get_residue'},
        'apps',
        {special: 'map'},
        'compass',
        'meter',
        'reticle',
        'griggs',
        'apps',
        'griggs-alt']
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
