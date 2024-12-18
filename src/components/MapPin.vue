<template>
    <div class="relative z-20 flex flex-col items-center my-10">

      <div
        class="rounded-lg z-30 leaflet-container" :class="{ 'blur-[4px]': blurEnabled, 'leaflet-container': !blurEnabled }" ref="mapContainer" :style="{ width: props.width, height: props.height }"
      ></div>
  
      <div v-if="!locationAllowed" class="absolute bg-black z-40 opacity-70 flex items-center justify-center text-[26px]" :style="{ width: props.width, height: props.height }"
      >
        <button @click="getLocation" class="text-white duration-200 hover:text-slate-600">
          Autorisez la localisation
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import L from "leaflet";
  import axios from "axios";
  import { supabase } from '../supabase';
  import { useSessionStore } from '../stores/sessions';
  import "leaflet.markercluster"; // Assure-toi d'avoir importé leaflet.markercluster

  const lat = ref(0),
    lng = ref(0),
    map = ref(),
    mapContainer = ref(),
    locationAllowed = ref(false),
    blurEnabled = ref(true),
    utilisateurID = ref(''),
    sessionStore = useSessionStore(),
    lastname = ref(''),
    firstname = ref('');

  // Initialisation du cluster de marqueurs
  let markerClusterGroup = L.markerClusterGroup();

  const props = defineProps({
    acvitivitesLoc: Array,
    acvitivitesUser: Array,
    width: String,
    height: String,
  });

  const home = L.icon({
    iconUrl: "../src/assets/img/man.svg",
    iconSize: [38, 38],
  });

  const dotNew = L.icon({
    iconUrl: "../src/assets/img/dot-new.svg",
    iconSize: [38, 38],
  });

  const dot = L.icon({
    iconUrl: "../src/assets/img/dot.svg",
    iconSize: [38, 38],
  });

  onMounted(() => {
    map.value = L.map(mapContainer.value, { zoomAnimation: false }).setView([51.505, -0.09], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map.value);

    // Ajoute markerClusterGroup à la carte une seule fois
    map.value.addLayer(markerClusterGroup);

    getUser();
  });

  async function getUser() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, lastname, firstname')
      .eq('id', sessionStore.userId);

    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
    } else if (data && data.length > 0) {
      utilisateurID.value = data[0].id;
      lastname.value = data[0].lastname
      firstname.value = data[0].firstname
      console.log('Utilisateur trouvé avec l\'id :', lastname.value);
      setPinWithLocation();
      setPinWithLocationNew();
    } else {
      console.log('Aucun utilisateur trouvé avec cet email');
    }
  }

  // Fonction pour afficher les activités auxquelles l'utilisateur est abonné
  async function setPinWithLocation() {
    if (!map.value) {
      console.error("Carte non initialisée.");
      return;
    }

    console.log(lastname.value + ' ' + firstname.value);

    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('id, userId, activity_id')
      .eq('userId', sessionStore.userId);

    if (subError) {
      console.error("Erreur lors de la récupération des abonnements :", subError);
      return;
    }

    if (subscriptions.length === 0) {
      console.log("Aucune activité à afficher, l'utilisateur n'est abonné à aucune activité.");
      return;
    }

    const activityIds = subscriptions.map(sub => sub.activity_id);
    const { data, error: fetchError } = await supabase
      .from('activity')
      .select('id, name, type, location, start_time, end_time, price, max_participants, latitude, longitude, owner')
      .in('id', activityIds);

    if (fetchError) {
      console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
      return;
    }

    if (data && data.length > 0) {
      data.forEach(activity => {
        if (activity.latitude && activity.longitude) {
          const isSubscribed = subscriptions.some(sub => sub.activity_id === activity.id);

          const marker = L.marker([activity.latitude, activity.longitude], { draggable: false, icon: dot })
            .addTo(markerClusterGroup)
            .bindPopup(`
              <div class="flex flex-col gap-2">
                <p class="text-[22px] font-bold">${activity.name}</p>
                <p class="text italic opacity-[70%]">Par ${activity.owner}</p>
                <p class="text-[15px] w-[90%] italic opacity-[70%] max-[600px]:w-[75%]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...</p>
                <div class="flex flex-col gap-2 items-start text-center">
                  <div class="flex gap-4">
                    <i class="text-[14px] w-[18.2px] fa-regular fa-circle-question"></i>
                    <p class="text-[14px]">${activity.start_time}</p>
                  </div>
                  ${activity.max_participants ? `
                  <div class="flex gap-4">
                    <i class="text-[14px] fa-solid fa-users"></i>
                    <p class="text-[14px]">0 participants sur ${activity.max_participants}</p>
                  </div>` : ''}
                  <div class="flex gap-4">
                    <i class="text-[14px] w-[18.2px] fa-solid fa-location-arrow"></i>
                    <p class="text-[14px]">${activity.location}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div id="jointMapActivity" class="border ${isSubscribed ? 'border-blue-600' : 'border-green-600'} rounded-tl-lg rounded-br-lg py-1 px-4">
                    <p class="text-center m-auto flex">${isSubscribed ? 'Vous êtes inscrit' : 'Rejoindre'}</p>
                  </div> 
                </div>      
              </div>
            `);
        } else {
          console.error("Coordonnées manquantes pour l'activité :", activity);
        }
      });
    } else {
      console.error("Aucune activité trouvée pour l'utilisateur.");
    }
  }

  async function setPinWithLocationNew() {
    if (!map.value) {
      console.error("Carte non initialisée.");
      return;
    }

    console.log(lastname.value + ' ' + firstname.value);

    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('id, userId, activity_id')
      .eq('userId', sessionStore.userId);

    if (subError) {
      console.error("Erreur lors de la récupération des abonnements :", subError);
      return;
    }

    const activityIds = subscriptions.map(sub => sub.activity_id);

    const { data, error: fetchError } = await supabase
      .from('activity')
      .select('id, name, type, location, start_time, end_time, price, max_participants, latitude, longitude, owner');

    if (fetchError) {
      console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
      return;
    }

    if (data && data.length > 0) {
      const activitiesNotSubscribed = data.filter(activity => !activityIds.includes(activity.id));

      if (activitiesNotSubscribed.length === 0) {
        console.log("L'utilisateur est abonné à toutes les activités.");
        return;
      }

      activitiesNotSubscribed.forEach(activity => {
        if (activity.latitude && activity.longitude) {
          const marker = L.marker([activity.latitude, activity.longitude], { draggable: false, icon: dotNew })
            .bindPopup(`
              <div class="flex flex-col gap-2">
                <p class="text-[22px] font-bold">${activity.name}</p>
                <p class="text italic opacity-[70%]">Par ${activity.owner}</p>
                <p class="text-[15px] w-[90%] italic opacity-[70%] max-[600px]:w-[75%]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...</p>
                <div class="flex flex-col gap-2 items-start text-center">
                  <div class="flex gap-4">
                    <i class="text-[14px] w-[18.2px] fa-regular fa-circle-question"></i>
                    <p class="text-[14px]">${activity.start_time}</p>
                  </div>
                  ${activity.max_participants ? `
                  <div class="flex gap-4">
                    <i class="text-[14px] fa-solid fa-users"></i>
                    <p class="text-[14px]">0 participants sur ${activity.max_participants}</p>
                  </div>` : ''}
                  <div class="flex gap-4">
                    <i class="text-[14px] w-[18.2px] fa-solid fa-location-arrow"></i>
                    <p class="text-[14px]">${activity.location}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div id="jointMapActivity" class="border border-green-600 rounded-tl-lg rounded-br-lg py-1 px-4">
                    <p class="text-center m-auto flex">Rejoindre</p>
                  </div> 
                </div>      
              </div>
            `);

              marker.addTo(markerClusterGroup);
            } else {
              console.error("Coordonnées manquantes pour l'activité :", activity);
            }
          });
        } else {
          console.error("Aucune activité trouvée.");
        }
      }
      
      function getLocation() {
          if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
              (position) => {
              locationAllowed.value = true;
              blurEnabled.value = false;
      
              lat.value = position.coords.latitude;
              lng.value = position.coords.longitude;
      
              map.value.setView([lat.value, lng.value], 13);
      
              L.marker([lat.value, lng.value], { draggable: false, icon: home })
                  .addTo(map.value)
                  .bindPopup("Vous êtes ici.")
                  .openPopup();
              },
              (err) => {
              console.error("Erreur de localisation :", err.message);
              locationAllowed.value = false;
              }
          );
          }
      }
      
      async function leaveMapActivity(id) {
          const { data, error: fetchError } = await supabase
          .from('activites')
          .select('user_join')
          .eq('id', id) 
          .single();
      
          if (fetchError) {
              console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
              return;
          }
      
          const userJoin = data.user_join.split(' ');
          const userIndex = userJoin.indexOf('1');
          userJoin.splice(userIndex, 1);
      
          const {error: updateError } = await supabase
          .from('activites')
          .update({ user_join: userJoin.join(' ') })
          .eq('id', id);
      
          if (updateError) {
              console.error("Erreur lors de la mise à jour de l'activité :", updateError);
              return;
          }
      }
      
      async function joinMapActivity(id) {
          try {
          const { data, error: fetchError } = await supabase
              .from('activites')
              .select('user_join')
              .eq('id', id)
              .single();
      
          if (fetchError) {
              console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
              return;
          }
      
          const userJoin = data.user_join ? data.user_join.split(',') : []; 
          userJoin.push(utilisateurID.value); 
      
          const { error: updateError } = await supabase
              .from('activites')
              .update({ user_join: userJoin.join(',') })
              .eq('id', id);
      
          if (updateError) {
              console.error("Erreur lors de la mise à jour de l'activité :", updateError);
              return;
          }
      
          console.log("L'utilisateur a rejoint l'activité avec succès.");
      
          } catch (error) {
          console.error("Erreur lors de l'exécution de joinMapActivity :", error);
          }
      }

  // Surveiller props.acvitivitesUser
  watch(
    () => props.activitesUser,
    (newVal) => {
      // Vérifier que newVal est défini et est un tableau
      if (Array.isArray(newVal) && newVal.length > 0) {
        // Filtrer les activités avec une localisation
        const activitiesWithLocation = newVal.filter(activity => activity.localisation);

        // Si des activités ont une localisation, afficher les marqueurs
        if (activitiesWithLocation.length > 0) {
          // Appeler les fonctions pour afficher les activités abonnées et non-abonnées
          setPinWithLocation(utilisateurID.value);
          setPinWithLocationNew(utilisateurID.value);
        } else {
          console.log("Aucune activité avec localisation trouvée.");
        }
      } else {
        console.log("Aucune activité utilisateur trouvée ou données mal définies.");
      }
    },
    { immediate: true }
  );
</script>
  
<style scoped>  
  .leaflet-popup-content p {
      margin: 0px 0 !important;
      margin: 0rem 0 !important;
  }

  .leaflet-popup-content p{
    margin: 0px 0 !important;
  }  
</style>
  