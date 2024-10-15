<template>
  <GoogleMap
    :api-key="googleMapsApiKey"
    style="width: 100%; height: 500px"
    mapId="DEMO_MAP_ID"
    :center="center"
    :zoom="zoom"
  >
    <Marker
      v-for="(house, index) in houses"
      :key="index"
      :options="{
        position: house.position,
        icon: getMarkerIcon(house.price),
      }"
      :pin-options="pinOptions"
      @click="showInfo(house)"
    />
  </GoogleMap>

  <div v-if="selectedHouse">
    <p>Price: ₱{{ selectedHouse.price }}</p>
    <p>
      Location: Lat {{ selectedHouse.position.lat }}, Lng
      {{ selectedHouse.position.lng }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { GOOGLE_MAPS_API_KEY } from '@/config'

type Place = {
  position: Coordinates
  price: number
}

type Coordinates = {
  lat: number
  lng: number
}

const pinOptions = { background: '#FBBC04' }
const center = ref<Coordinates>({
  lat: 9.3076, // Update to Dumaguete latitude
  lng: 123.3041, // Update to Dumaguete longitude
})
const googleMapsApiKey = GOOGLE_MAPS_API_KEY
const zoom = ref(12)
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
  if (house) {
    console.log(house)
    selectedHouse.value = house
  } else {
    console.error('House is not defined', house)
  }
}

const generateRandomHouses = (num: number) => {
  const houses: Place[] = []
  for (let i = 0; i < num; i++) {
    const latOffset = (Math.random() - 0.5) * 0.02 // Random offset for latitude
    const lngOffset = (Math.random() - 0.5) * 0.02 // Random offset for longitude
    const price = Math.floor(Math.random() * (800000 - 150000 + 1)) + 150000 // Random price between 150,000 and 800,000

    houses.push({
      position: {
        lat: center.value.lat + latOffset,
        lng: center.value.lng + lngOffset,
      },
      price,
    })
  }
  return houses
}

const houses = ref<Place[]>(generateRandomHouses(50)) // Generate 50 random houses
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
