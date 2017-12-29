<template>
  <img id="backdrop" class="max_100" v-bind:src="getImageFileName"
    v-on:click="advanceScene"
  />
</template>

<script>
export default {
  props: ['image'],
  computed: {
    getImageFileName: function () {
      return '/static/images/' + this.image + '.jpg'
    }
  },
  methods: {
    advanceScene: function () {
      this.$emit('advanceScene')
    }
  }
}
</script>

<style>
</style>
