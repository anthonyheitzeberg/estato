<template>
  <div class="map-container">
    <GoogleMap
      :api-key="googleMapsApiKey"
      :map-id="googleMapsId"
      style="width: 100%; height: 100%"
      :disable-default-ui="true"
      :center="center"
      :clickable-icons="false"
      :fullscreen-control="false"
      :keyboard-shortcuts="false"
      :map-type-control="false"
      :rotate-control="false"
      :scale-control="false"
      :streetViewControl="false"
      :zoom="15"
      :zoom-control="false"
      @click="closeInfo"
    >
      <GoogleMarkerCluster>
        <GoogleMarker
          v-for="(house, index) in houses"
          :key="index"
          :options="{
            position: house.position,
            icon: getMarkerIcon(house.price),
          }"
          @click="showInfo(house)"
        >
        </GoogleMarker>
        <GoogleInfoWindow
          v-if="selectedHouse"
          :options="{ position: center }"
          @closeclick="closeInfo"
        >
          <h4>House Details</h4>
          <p>Price: ₱{{ selectedHouse.price }}</p>
          <p>
            Location: Lat {{ selectedHouse.position.lat }}, Lng
            {{ selectedHouse.position.lng }}
          </p>
        </GoogleInfoWindow>
      </GoogleMarkerCluster>
    </GoogleMap>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_ID } from '@/config'
import { mockDataHouses } from '@/assets/randomHouseData'

type Place = {
  position: google.maps.LatLngLiteral
  price: number
}

const center = ref<google.maps.LatLngLiteral>({
  lat: 9.3076, // Update to Dumaguete latitude
  lng: 123.3041, // Update to Dumaguete longitude
})
const googleMapsApiKey = GOOGLE_MAPS_API_KEY
const googleMapsId = GOOGLE_MAPS_ID
const selectedHouse = ref<Place | null>(null)

const getMarkerIcon = (price: number) => {
  if (price < 300000) {
    return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' // Green for cheap houses
  } else if (price < 400000) {
    return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' // Yellow for medium houses
  } else {
    return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Red for expensive houses
  }
}

const showInfo = (house: Place) => {
  // If the selected house is the same, close the info window
  if (selectedHouse.value === house) {
    closeInfo()
  } else {
    selectedHouse.value = house // Set the selected house
    center.value = selectedHouse.value.position
  }
}

const closeInfo = () => {
  selectedHouse.value = null
}

const houses = ref<Place[]>(mockDataHouses)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 90vh;
}
</style>
