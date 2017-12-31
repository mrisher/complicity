<template>
  <GmapMap
    ref="main-map"
    :center="center"
    :zoom="20"
    style="width: 100%; height: 600px"
  >
    <GmapMarker
      :position="playerPos"
      icon= '/static/images/blue_ring.png'
    />
    <GmapMarker
      :position="targetPos"
      icon="/static/images/alien.png"
      :animation=1
    />
  </GmapMap>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoJAcxxMYCl2yudzcCLa70oZHgTm3TuLU'
  }
})

export default {
  name: 'AlienMap',
  props: ['numTargets'],
  data: function () {
    return {
      playerPos: {lat: 20.0, lng: 20.0},
      center: {lat: 10.0, lng: 10.0},
      targetPos: {lat: 20.0, lng: 20.0}
    }
  },
  mounted: function () {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.center = pos
        this.targetPos = this.getNearbyPos(pos)
      }, () => {
        this.handleLocationError(true)
      })

      // now set up a watcher
      navigator.geolocation.watchPosition(
        position => {
          this.updateLocation(position)
        },
        function () {
          alert('error in watchPosition')
        },
        {enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 4500})
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false)
    }
  },
  methods: {
    handleLocationError: function (browserHasGeolocation) {
      alert('Error: ' +
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : 'Error: Your browser doesn\'t support geolocation.')
    },
    getRandomArbitrary: function (min, max) {
      return Math.random() * (max - min) + min
    },
    getNearbyPos: function (pos, latOffsetInMeters = 10, lngOffsetInMeters = 10) {
      var returnPos = Object.assign({}, pos)
      var degreesForOneMeter = 0.00002
      returnPos.lat += this.getRandomArbitrary(-latOffsetInMeters, latOffsetInMeters) * degreesForOneMeter
      returnPos.lng += this.getRandomArbitrary(-lngOffsetInMeters, lngOffsetInMeters) * degreesForOneMeter
      return returnPos
    },
    computeHaversineDist: function (lat1, lon1, lat2, lon2) {
      function toRad (x) {
        return x * Math.PI / 180
      }

      var R = 6371 // km
      var x1 = lat2 - lat1
      var dLat = toRad(x1)
      var x2 = lon2 - lon1
      var dLon = toRad(x2)
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c

      return Number(d * 1000).toFixed(3)
    },
    updateLocation: function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      var dist = this.computeHaversineDist(
        pos.lat, pos.lng, this.targetPos.lat, this.targetPos.lng)
      if (dist < 3.0) {        // distance in meters
        alert('You win!')
        this.targetPos = this.getNearbyPos(pos)
      }
      this.playerPos = pos
    }
  }
}
</script>

<style>
</style>
