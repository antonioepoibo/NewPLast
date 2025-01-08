<template>
    <div class="relative h-auto">
        <MapPin :acvitivitesLoc="act" :acvitivitesUser="activities" :width="width" :height="height" />
    </div>
</template>

<script setup>

import MapPin from '../components/MapPin.vue'
import {ref} from 'vue'

const width = ref('90%')
const height = ref('100vh')
const activities = ref([]);

</script>