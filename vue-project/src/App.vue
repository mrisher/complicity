<template>
  <div id="app">
    <div id="main_storyboard" class="w3-display-container" data-starting-index="0">
        <img id="panel_image" class="max_100" />
            <audio id='scene_audio'>
                <source id="mp3_src" src="/audio/click.mp3" type="audio/mpeg">
                Test1.mp3
            </audio>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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
