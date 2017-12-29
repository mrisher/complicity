<template>
  <img id="backdrop" class="max_100" v-bind:src="getImageFileName"/>
</template>

<script>
export default {
  props: ['image'],
  computed: {
    getImageFileName: function () {
      return '/static/images/' + this.image + '.jpg'
    }
  }
}
</script>

<style>
</style>
