<template>
  <GmapMap
    ref="main-map"
    :center="mapCenter"
    :zoom="20"
    style="width: 100%; height: 600px"
  >
    <GmapMarker
      :position="playerPos"
      icon= '/static/images/blue_ring.png'
    />
    <GmapMarker
      :key="index"
      v-for="(target, index) in targets"
      :position="target"
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
      mapCenter: {lat: 10.0, lng: 10.0},
      targets: []
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

        // center the map on current position
        this.mapCenter = pos

        // create us an array of targets
        for (var i = 0; i < this.numTargets; i++) {
          var newTargetPos = this.getNearbyPos(pos)
          this.targets.push(newTargetPos)
        }
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
    checkForCollision: function () {
      var dist
      if (this.targets.length) {
        this.targets.forEach((target, index) => {
          dist = this.computeHaversineDist(this.playerPos.lat, this.playerPos.lng, target.lat, target.lng)
          if (dist < 3.0) {        // distance in meters
            alert('You caught #' + index)
            this.targets.splice(index, 1)  // remove 'index'
            if (this.targets.length === 0) {
              this.$emit('gameWon')
            }
          }
        })
      }
    },
    updateLocation: function (position) {
      if (position.coords.accuracy > 50) {
        // if accuracy is poor, reject this sample
        // return
      }

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.playerPos = pos
      this.checkForCollision()
    }
  }
}
</script>

<style>
</style>
