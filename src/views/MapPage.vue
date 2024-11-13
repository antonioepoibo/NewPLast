<template>
  <div>
    <h1>Map Page</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>
  </div>
</template>


<script>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapPage',
  setup() {
    onMounted(() => {
        var map = L.map('map').setView([48.8566, 2.3522], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);
    });
  }
};
</script>
