<template>
  <div id="alien-map" ref="alien-map">{{ numTargets }}</div>
</template>

<script>
export default {
  name: 'AlienMap',
  props: ['numTargets'],
  data: function () {
    return {
      map: null,
      infoWindow: null,
      marker: null,
      target: null
    }
  },
  mounted: function () {
    /* global google */
    this.map = new google.maps.Map(this.$refs['alien-map'], {
      zoom: 20
    })
    this.infoWindow = new google.maps.InfoWindow()

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'Hello World!',
          icon: '/static/images/blue_ring.png'
        })
        this.map.setCenter(pos)
        this.createTarget(pos)
      }, () => {
        this.handleLocationError(true)
      })
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
      var targetPos = position
      var degreesForOneMeter = 0.00002
      targetPos.lat += this.getRandomArbitrary(-10, 10) * degreesForOneMeter
      targetPos.lng += this.getRandomArbitrary(-10, 10) * degreesForOneMeter

      this.target = new google.maps.Marker({
        position: targetPos,
        map: this.map,
        icon: '/static/images/alien.png',
        animation: google.maps.Animation.BOUNCE
      })
    },
    updateLocation: function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      if (position.coords.accuracy > 15) {
        return             // ignore reading if accuracy > 15
      }
      var dist =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(pos), this.target.getPosition())
      if (dist < 3.0) {        // distance in meters
        alert('You win!')
        this.createTarget(pos)
      }
      this.marker.setPosition(pos)
    }
  }
}
</script>

<style>
div#alien-map {
  height: 100%
}
</style>
