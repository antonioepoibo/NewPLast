<template>
    <h1>Activity Map</h1>
    <div class="flex flex-col h-screen">
      <MapPin :acvitivitesUser="activities" :width="width" :height="height" />

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
//@ts-ignore
import { supabase } from '../supabase';
import mapboxgl from 'mapbox-gl';
//@ts-ignore
import MapPin from '../components/MapPin.vue';

const width = ref('100%')
const height = ref('100%');

// Type definition for Activity
interface Activity {
  id: number;
  name: string;
  type: string;
  location: string;
  start_time: string;
  end_time: string;
  price: number;
  discount: number;
  max_participants: number;
  deadline: string;
  latitude: number | null;
  longitude: number | null;
}

// State to store activities from the database
const activities = ref<Activity[]>([]);

// Declare map variable outside initializeMap
let map: mapboxgl.Map | null = null;

// Mapbox setup
mapboxgl.accessToken = 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog'; // Remplacez par votre clé API Mapbox

// Fetch activities from Supabase
async function fetchActivities() {
  const { data, error } = await supabase.from('activity').select('*');
  if (error) {
    console.error(error);
  } else {
    activities.value = data as Activity[];
    initializeMap();
  }
}

// Initialize the map and add markers
function initializeMap() {
  map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0], // Centrer la carte au début
    zoom: 2, // Zoom initial
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.scrollZoom.disable();

  activities.value.forEach((activity) => {
    if (activity.latitude && activity.longitude) {
      const marker = new mapboxgl.Marker()
        .setLngLat([activity.longitude, activity.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${activity.name}</h3>
            <p><strong>Type:</strong> ${activity.type}</p>
            <p><strong>Location:</strong> ${activity.location}</p>
            <p><strong>Start Time:</strong> ${new Date(activity.start_time).toLocaleString()}</p>
            <p><strong>End Time:</strong> ${new Date(activity.end_time).toLocaleString()}</p>
            <p><strong>Price:</strong> $${activity.price}</p>
            <p><strong>Discount:</strong> ${activity.discount}%</p>
            <p><strong>Max Participants:</strong> ${activity.max_participants}</p>
            <p><strong>Registration Deadline:</strong> ${new Date(activity.deadline).toLocaleString()}</p>
          `)
        )
        //@ts-ignore
        .addTo(map);
    }
  });

  // Ajuster la vue de la carte pour inclure tous les marqueurs
  const bounds = new mapboxgl.LngLatBounds();
  activities.value.forEach((activity) => {
    if (activity.latitude && activity.longitude) {
      bounds.extend([activity.longitude, activity.latitude]);
    }
  });
  map.fitBounds(bounds, { padding: 50 });
}

// Fetch activities on component mount
onMounted(() => {
  fetchActivities();
  window.addEventListener('resize', () => {
    if (map) {
      map.resize(); // Redimensionner la carte quand la fenêtre est redimensionnée
    }
  });
});
</script>


<style scoped>
#map-container {
  width: 100%;
  height: 100%;
}

</style>
