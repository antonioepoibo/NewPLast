import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import mapboxgl from 'mapbox-gl';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State to store activities from the database
const activities = ref([]);
// Declare map variable outside initializeMap
let map = null;
// Mapbox setup
mapboxgl.accessToken = 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog'; // Remplacez par votre clé API Mapbox
// Fetch activities from Supabase
async function fetchActivities() {
    const { data, error } = await supabase.from('activity').select('*');
    if (error) {
        console.error(error);
    }
    else {
        activities.value = data;
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
                .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${activity.name}</h3>
            <p><strong>Type:</strong> ${activity.type}</p>
            <p><strong>Location:</strong> ${activity.location}</p>
            <p><strong>Start Time:</strong> ${new Date(activity.start_time).toLocaleString()}</p>
            <p><strong>End Time:</strong> ${new Date(activity.end_time).toLocaleString()}</p>
            <p><strong>Price:</strong> $${activity.price}</p>
            <p><strong>Discount:</strong> ${activity.discount}%</p>
            <p><strong>Max Participants:</strong> ${activity.max_participants}</p>
            <p><strong>Registration Deadline:</strong> ${new Date(activity.deadline).toLocaleString()}</p>
          `))
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
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-screen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("map-container"), ...{ class: ("w-full flex-grow") }, });
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-grow'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
