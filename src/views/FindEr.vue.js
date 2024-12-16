import HeadEr from '../components/HeadEr.vue';
import { useSessionStore } from '../stores/sessions';
import fond from '../assets/img/fond.png';
import MapPin from '../components/MapPin.vue';
import { ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessionStore = useSessionStore();
const width = ref('90%');
const height = ref('100vh');
const activities = ref([]);
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.fond)), ...{ class: ("absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover") }, alt: ("Fond d'écran"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex w-full flex-col h-full") }, });
    // @ts-ignore
    [HeadEr,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(HeadEr, new HeadEr({ username: ((__VLS_ctx.sessionStore.mail)), searchBar: ((false)), }));
    const __VLS_1 = __VLS_0({ username: ((__VLS_ctx.sessionStore.mail)), searchBar: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [MapPin,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(MapPin, new MapPin({ acvitivitesLoc: ((__VLS_ctx.act)), acvitivitesUser: ((__VLS_ctx.activities)), width: ((__VLS_ctx.width)), height: ((__VLS_ctx.height)), }));
    const __VLS_6 = __VLS_5({ acvitivitesLoc: ((__VLS_ctx.act)), acvitivitesUser: ((__VLS_ctx.activities)), width: ((__VLS_ctx.width)), height: ((__VLS_ctx.height)), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['bottom-0'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-auto'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-full'];
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
            HeadEr: HeadEr,
            fond: fond,
            MapPin: MapPin,
            sessionStore: sessionStore,
            width: width,
            height: height,
            activities: activities,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
