<template>
    <div class="relative h-auto">
        <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran"/>

        <div class="relative z-20 flex w-full flex-col h-full">
            <HeadEr :username="sessionStore.mail" :searchBar="false" />
            <MapPin :acvitivitesLoc="act" :acvitivitesUser="activities" :width="width" :height="height" />
        </div>
    </div>
</template>

<script setup>

import HeadEr from '../components/HeadEr.vue';
import { useSessionStore } from '../stores/sessions';
import fond from '../assets/img/fond.png'
import MapPin from '../components/MapPin.vue'
import {ref} from 'vue'

const sessionStore = useSessionStore();
const width = ref('90%')
const height = ref('100vh')
const activities = ref([]);

</script>