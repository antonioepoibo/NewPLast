import newP from '../assets/img/newP_logo.svg';
import { defineProps, defineEmits, ref } from "vue";
import { useSessionStore } from '../stores/sessions';
const { defineSlots, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessionStore = useSessionStore();
const searchQuery = ref(''); // Reactive state for search query
const categories = ['Cinéma', 'Bowling', 'Foot', 'Soirée bar', 'Paintball', 'Lazer Game'];
const props = defineProps({
    searchBar: String
});
const emit = defineEmits(); // Define emits
// Emit the search query when the input changes
function updateSearchQuery() {
    emit('update:searchQuery', searchQuery.value); // Emit the search query to parent
}
// Logout function
function logout() {
    sessionStore.clearSession();
    alert('You have logged out.');
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        searchBar: String
    },
    emits: {},
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex flex-col h-full gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between w-full h-[auto] bg-[#021925] py-6 px-[10rem] max-[600px]:px-[6rem] max-[600px]:py-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-10 items-center text-white text-[18px] flex-shrink-0") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/"), }));
    const __VLS_2 = __VLS_1({ to: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.newP)), ...{ class: ("w-[8rem] hover:opacity-50 duration-200 hover:underline max-[600px]:w-[6rem]") }, alt: (""), });
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/"), ...{ class: ("max-[1100px]:hidden ") }, }));
    const __VLS_8 = __VLS_7({ to: ("/"), ...{ class: ("max-[1100px]:hidden ") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: (({ underline: __VLS_ctx.$route.path === '/' })) }, ...{ class: ("text-white hover:opacity-50 duration-200 hover:underline") }, });
    __VLS_nonNullable(__VLS_11.slots).default;
    var __VLS_11;
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/finder"), ...{ class: ("max-[1100px]:hidden") }, }));
    const __VLS_14 = __VLS_13({ to: ("/finder"), ...{ class: ("max-[1100px]:hidden") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: (({ underline: __VLS_ctx.$route.path === '/Finder' })) }, ...{ class: ("text-white hover:opacity-50 duration-200 hover:underline") }, });
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ to: ("/message"), ...{ class: ("max-[1100px]:hidden") }, }));
    const __VLS_20 = __VLS_19({ to: ("/message"), ...{ class: ("max-[1100px]:hidden") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: (({ underline: __VLS_ctx.$route.path === '/Message' })) }, ...{ class: ("text-white hover:opacity-50 duration-200 hover:underline") }, });
    __VLS_nonNullable(__VLS_23.slots).default;
    var __VLS_23;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-10 items-center text-white text-[18px] flex-shrink-0") }, });
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/activite/add/"), ...{ class: ("text-white hover:opacity-50 max-[1100px]:hidden") }, }));
    const __VLS_26 = __VLS_25({ to: ("/activite/add/"), ...{ class: ("text-white hover:opacity-50 max-[1100px]:hidden") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa-solid fa-plus text-[24px]") }, });
    __VLS_nonNullable(__VLS_29.slots).default;
    var __VLS_29;
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ to: ("/profil"), }));
    const __VLS_32 = __VLS_31({ to: ("/profil"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ ...{ class: ("rounded-full w-[4rem] h-[4rem] object-cover") }, src: ((__VLS_ctx.image_url)), alt: (""), });
    __VLS_nonNullable(__VLS_35.slots).default;
    var __VLS_35;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.logout) }, ...{ class: ("max-[1100px]:hidden") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("text-red-600 text-[24px] hover:text-red-400 duration-200 fa-solid fa-arrow-right-from-bracket") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-6 items-center justify-center m-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col justify-center items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-[30px] font-bold text-white max-[600px]:text-[20px]") }, });
    (__VLS_ctx.sessionStore.username);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("italic text-white") }, });
    if (__VLS_ctx.searchBar !== false) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-4 items-center border border-white rounded-full px-10 py-2 bg-white") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa-solid fa-magnifying-glass") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.updateSearchQuery) }, type: ("text"), value: ((__VLS_ctx.searchQuery)), ...{ class: ("bg-transparent border-transparent w-[20rem] max-[600px]:w-[10rem] max-[600px]:text-[12px]") }, placeholder: ("Que faire aujourd'hui ?"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa-solid fa-align-left") }, });
    }
    if (__VLS_ctx.searchBar !== false) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-6 text-center max-[600px]:gap-2") }, });
        for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("btn") }, });
            (category);
        }
    }
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-[auto]'];
    __VLS_styleScopedClasses['bg-[#021925]'];
    __VLS_styleScopedClasses['py-6'];
    __VLS_styleScopedClasses['px-[10rem]'];
    __VLS_styleScopedClasses['max-[600px]:px-[6rem]'];
    __VLS_styleScopedClasses['max-[600px]:py-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-10'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['w-[8rem]'];
    __VLS_styleScopedClasses['hover:opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['max-[600px]:w-[6rem]'];
    __VLS_styleScopedClasses['max-[1100px]:hidden'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['hover:opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['max-[1100px]:hidden'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['hover:opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['max-[1100px]:hidden'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['hover:opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-10'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['hover:opacity-50'];
    __VLS_styleScopedClasses['max-[1100px]:hidden'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-plus'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-[4rem]'];
    __VLS_styleScopedClasses['h-[4rem]'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['max-[1100px]:hidden'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['hover:text-red-400'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-arrow-right-from-bracket'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['m-auto'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-[30px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['max-[600px]:text-[20px]'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['px-10'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-magnifying-glass'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-transparent'];
    __VLS_styleScopedClasses['w-[20rem]'];
    __VLS_styleScopedClasses['max-[600px]:w-[10rem]'];
    __VLS_styleScopedClasses['max-[600px]:text-[12px]'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-align-left'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['max-[600px]:gap-2'];
    __VLS_styleScopedClasses['btn'];
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
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            newP: newP,
            sessionStore: sessionStore,
            searchQuery: searchQuery,
            categories: categories,
            updateSearchQuery: updateSearchQuery,
            logout: logout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
