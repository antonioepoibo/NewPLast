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

    
    const props = defineProps({
        acvitivitesLoc: Array,
        acvitivitesUser : Array,
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
        map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
    
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        }).addTo(map.value);
    
    //   getLocation();
    getUser();
    });
    
    async function getUser() {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, lastname, firstname')
            .eq('id', sessionStore.userId,
            );
    
        if (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        } else if (data && data.length > 0) {
            utilisateurID.value = data[0].id;
            lastname.value = data[0].lastname
            firstname.value = data[0].firstname
            console.log('Utilisateur trouvé avec l\'id :', lastname.value);
            setPinWithLocation();
        } else {
            console.log('Aucun utilisateur trouvé avec cet email');
        }
    }

    async function setPinWithLocation() {
        if (!map.value) {
            console.error("Carte non initialisée.");
            return;
        }

        console.log(lastname.value + ' ' + firstname.value);

        const { data, error: fetchError } = await supabase
            .from('activity')
            .select('name, type, location, start_time, end_time, price, max_participants, latitude, longitude, owner')
            .eq('owner', lastname.value + ' ' + firstname.value);

        if (fetchError) {
            console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
            return;
        }

        console.log(data)

        if (data && data.length > 0) {
            data.forEach(activity => {
                if (activity.latitude && activity.longitude) {
                    console.log(activity.latitude + ' ' + activity.longitude);
                    L.marker([activity.latitude, activity.longitude], { draggable: false, icon: dot })
                        .addTo(map.value)
                        .bindPopup(`
                        <div class="flex flex-col gap-2">
                            <p class="text-[22px] font-bold">${activity.name}</p>
                            <p class="text italic opacity-[70%]">Par ${activity.owner}</p>
                            <p class="text-[15px] w-[90%] italic opacity-[70%]  max-[600px]:w-[75%]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur</p>
                            <div class="flex flex-col gap-2 items-start text-center">
                            <div class="flex gap-4">
                                <i class="text-[14px] w-[18.2px] fa-regular fa-circle-question"></i>
                                <p class="text-[14px]">${activity.start_time}</p>
                            </div>
                            ${
                                 activity.max_participants
                                ? `<div class="flex gap-4">
                                    <i class="text-[14px] fa-solid fa-users"></i>
                                    <p class="text-[14px]">
                                        0 participants sur ${activity.max_participants}
                                    </p>
                                    </div>`
                                : ''
                            }
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
                        `)
                        .openPopup();
                } else {
                    console.error("Coordonnées manquantes pour l'activité :", activity);
                }
            });
        } else {
            console.error("Aucune donnée valide pour l'activité.");
        }
    }

    
    async function setPinWithLocationNew(lat, lng, id) {
        if (!map.value) {
        console.error("Carte non initialisée.");
        return;
        }
    
        const { data, error: fetchError } = await supabase
        .from('activites')
        .select('id, name, auth, desc, date, user_join, number, localisation')
        .eq('id', id) 
            .single();
    
            if (fetchError) {
            console.error("Erreur lors de la récupération des données de l'activité :", fetchError);
            return;
            }
    
    
        L.marker([lat, lng], { draggable: false, icon: dotNew })
        .addTo(map.value)
        .bindPopup(`
            <div class="flex flex-col gap-2">
            <p class="text-[22px] font-bold max-[600px]:text-[14px]">${data.name}</p>
            <p class="text italic opacity-[70%] max-[600px]:text-[12px]">Par ${data.auth}</p>
            <p class="text-[15px] w-[90%] italic opacity-[70%] max-[600px]:text-[12px]">${data.desc}</p>
            <div class="flex flex-col gap-2 items-start text-center">
                <div class="flex gap-4">
                <i class="text-[14px] w-[18.2px] fa-regular fa-circle-question"></i>
                <p class="text-[14px] max-[600px]:text-[10px]">${data.date}</p>
                </div>
                ${
                data.user_join && data.number
                    ? `<div class="flex gap-4">
                        <i class="text-[14px]  max-[600px]:text-[10px] fa-solid fa-users"></i>
                        <p class="text-[14px]  max-[600px]:text-[10px]">
                        ${data.user_join.split(' ').length} participants sur ${data.number}
                        </p>
                    </div>`
                    : ''
                }
                <div class="flex gap-4">
                <i class="text-[14px] w-[18.2px]  max-[600px]:text-[10px] fa-solid fa-location-arrow"></i>
                <p class="text-[14px] max-[600px]:text-[10px]">${data.localisation}</p>
                </div>
            </div>
                <div class="flex items-start">
                <div class="bg-red-600 rounded-tl-lg rounded-br-lg py-1 px-4 duration-200 hover:bg-red-500">
                    <p id="leave-activity" class="text-center text-white m-auto flex">Quitter</p>  
                </div> 
                </div>
            `)
            .on('popupopen', () => {
                document
                .getElementById('leave-activity')
                .addEventListener('click', () => leaveMapActivity(data.id));
            });
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
  () => props.acvitivitesUser,
  (newVal) => {
    if (newVal.length > 0) {
      newVal.forEach((activitye) => {
        if (activitye.localisation) {
            setPinWithLocation(utilisateurID.value);
        }
      });
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
  