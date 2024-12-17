import { ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Définir votre token Mapbox
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog';
// Champs pour gérer l'adresse et les suggestions
const locationInput = ref(''); // Adresse saisie
const suggestions = ref([]); // Suggestions d'adresses
// Fonction pour récupérer les suggestions via l'API Mapbox
async function fetchSuggestions() {
    if (!locationInput.value) {
        suggestions.value = [];
        return;
    }
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput.value)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`);
    const data = await response.json();
    suggestions.value = data.features || [];
}
// Sélectionner une adresse dans la liste
function selectAddress(suggestion) {
    locationInput.value = suggestion.place_name;
    form.location = suggestion.place_name; // Mettre à jour la valeur dans le formulaire
    form.coordinates = suggestion.geometry.coordinates; // Stocker les coordonnées
    suggestions.value = []; // Effacer les suggestions après sélection
}
// Props pour les données et la fonction d'ajout d'activité
const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
    addActivity: {
        type: Function,
        required: true,
    },
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        form: {
            type: Object,
            required: true,
        },
        addActivity: {
            type: Function,
            required: true,
        },
    },
});
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
    __VLS_styleScopedClasses['suggestions-list'];
    __VLS_styleScopedClasses['suggestions-list'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.addActivity) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("name"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("name"), placeholder: ("e.g., Yoga Class"), required: (true), });
    (__VLS_ctx.form.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("type"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("type"), placeholder: ("e.g., Fitness"), required: (true), });
    (__VLS_ctx.form.type);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("location"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.fetchSuggestions) }, id: ("location"), placeholder: ("e.g., Central Park"), required: (true), });
    (__VLS_ctx.form.location);
    if (__VLS_ctx.suggestions.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("suggestions-list") }, });
        for (const [suggestion, index] of __VLS_getVForSourceType((__VLS_ctx.suggestions))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.suggestions.length)))
                            return;
                        __VLS_ctx.selectAddress(suggestion);
                    } }, key: ((index)), });
            (suggestion.place_name);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("start_time"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("start_time"), type: ("datetime-local"), required: (true), });
    (__VLS_ctx.form.start_time);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("end_time"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("end_time"), type: ("datetime-local"), required: (true), });
    (__VLS_ctx.form.end_time);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("price"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("price"), type: ("number"), placeholder: ("e.g., 20"), required: (true), });
    (__VLS_ctx.form.price);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("discount"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("discount"), type: ("number"), placeholder: ("e.g., 10"), });
    (__VLS_ctx.form.discount);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("max_participants"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("max_participants"), type: ("number"), placeholder: ("e.g., 20"), required: (true), });
    (__VLS_ctx.form.max_participants);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("deadline"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("deadline"), type: ("datetime-local"), required: (true), });
    (__VLS_ctx.form.deadline);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), });
    __VLS_styleScopedClasses['suggestions-list'];
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
        return {
            suggestions: suggestions,
            fetchSuggestions: fetchSuggestions,
            selectAddress: selectAddress,
        };
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
        addActivity: {
            type: Function,
            required: true,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        form: {
            type: Object,
            required: true,
        },
        addActivity: {
            type: Function,
            required: true,
        },
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
