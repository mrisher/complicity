<template>
  <gmap-map
    ref="main-map"
    :center="center"
    :zoom="20"
    style="width: 100%; height: 600px"
  >
    <gmap-marker
      position: player-pos,
      icon: '/static/images/blue_ring.png'
    ></gmap-marker>
    <gmap-marker
      position: target,
      icon: '/static/images/alien.png',
      animation: google.maps.Animation.BOUNCE
    ></gmap-marker>
  </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoJAcxxMYCl2yudzcCLa70oZHgTm3TuLU',
    libraries: 'geometry'
  }
})

export default {
  name: 'AlienMap',
  props: ['numTargets'],
  data: function () {
    return {
      map: null,
      infoWindow: null,
      playerPos: {lat: 20.0, lng: 20.0},
      center: {lat: 10.0, lng: 10.0},
      target: {lat: 20.0, lng: 20.0}
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
        this.createTarget(pos)
      }, () => {
        this.handleLocationError(true)
      })

      // now set up a watcher
      navigator.geolocation.watchPosition(
        position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.updateLocation(pos)
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
      alert('Error')
      var pos = this.map.getCenter()
      this.infoWindow.setPosition(pos)
      this.infoWindow.setContent(browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.')
      this.infoWindow.open(this.map)
    },
    getRandomArbitrary: function (min, max) {
      return Math.random() * (max - min) + min
    },
    createTarget: function (position) {
      this.target = position
      var degreesForOneMeter = 0.00002
      this.target.lat += this.getRandomArbitrary(-10, 10) * degreesForOneMeter
      this.target.lng += this.getRandomArbitrary(-10, 10) * degreesForOneMeter
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
    updateLocation: function (pos) {
      var dist = this.computeHaversineDist(
        pos.lat, pos.lng, this.target.lat, this.target.lng)
      if (dist < 3.0) {        // distance in meters
        alert('You win!')
        this.createTarget(pos)
      }
      this.playerPos.lat = pos.lat
      this.playerPos.lng = pos.lng
      this.center = pos
    }
  }
}
</script>

<style>
</style>
