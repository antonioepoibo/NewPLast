import { defineProps } from 'vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Define the props for the ActivityItem component
const props = defineProps({
    activity: {
        type: Object,
        required: true
    },
    subscribeToActivity: {
        type: Function,
        required: true
    }
});
const activityStartDate = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
const activityStartNum = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1].split(':').slice(0, 2).join(':').replace(':', 'h');
const activityEndDate = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
const activityEndNum = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1].split(':').slice(0, 2).join(':').replace(':', 'h');
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        activity: {
            type: Object,
            required: true
        },
        subscribeToActivity: {
            type: Function,
            required: true
        }
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-[22rem] bg-[#3B5562] rounded-sm shadow-xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-3 py-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-[#3B5562] opacity-70 text-[12px] bg-white py-1 px-3 rounded-full font-bold") }, });
    (__VLS_ctx.activity.type);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-70 text-[8px] italic") }, });
    (__VLS_ctx.activityStartDate + ' ' + __VLS_ctx.activityStartNum);
    (__VLS_ctx.activityEndDate + ' ' + __VLS_ctx.activityEndNum);
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("../assets/img/default_activite.svg"), alt: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-3 pt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-4 items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("../assets/img/default_activite.svg"), ...{ class: ("rounded-full w-[60px] h-[60px] object-cover") }, alt: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-white text-[18px] font-bold") }, });
    (__VLS_ctx.activity.owner.split('@')[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-50 text-[14px]") }, });
    (__VLS_ctx.activity.owner.split('@')[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 justify-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col items-end") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-80 text-[14px]") }, });
    (__VLS_ctx.activity.price);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-50 text-[14px]") }, });
    (__VLS_ctx.activity.location);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center text-[10px] text-white gap-2 flex-row-reverse px-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.activity.max_participants || 0);
    __VLS_elementAsFunction(__VLS_intrinsicElements.progress, __VLS_intrinsicElements.progress)({ max: ((__VLS_ctx.activity.max_participants)), value: ((0)), ...{ class: ("h-2 w-[6rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[16px] opacity-80 mt-5 italic max-[1300px]:text-[13px] px-3 max-[920px]:text-[10px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-5") }, });
    if (!__VLS_ctx.activity.subscribed && !__VLS_ctx.activity.isOwner) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((!__VLS_ctx.activity.subscribed && !__VLS_ctx.activity.isOwner)))
                        return;
                    __VLS_ctx.subscribeToActivity(__VLS_ctx.activity.id);
                } }, ...{ class: ("bg-white text-[#3B5562] py-2 text-[14px] px-6 font-bold rounded-full") }, });
    }
    else if (__VLS_ctx.activity.subscribed) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    else if (__VLS_ctx.activity.isOwner) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['w-[22rem]'];
    __VLS_styleScopedClasses['bg-[#3B5562]'];
    __VLS_styleScopedClasses['rounded-sm'];
    __VLS_styleScopedClasses['shadow-xl'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-5'];
    __VLS_styleScopedClasses['text-[#3B5562]'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['text-[12px]'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['text-[8px]'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['pt-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-[60px]'];
    __VLS_styleScopedClasses['h-[60px]'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['justify-start'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-end'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-80'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-[10px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex-row-reverse'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['h-2'];
    __VLS_styleScopedClasses['w-[6rem]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[16px]'];
    __VLS_styleScopedClasses['opacity-80'];
    __VLS_styleScopedClasses['mt-5'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['max-[1300px]:text-[13px]'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['max-[920px]:text-[10px]'];
    __VLS_styleScopedClasses['py-5'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-[#3B5562]'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['rounded-full'];
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
            activityStartDate: activityStartDate,
            activityStartNum: activityStartNum,
            activityEndDate: activityEndDate,
            activityEndNum: activityEndNum,
        };
    },
    props: {
        activity: {
            type: Object,
            required: true
        },
        subscribeToActivity: {
            type: Function,
            required: true
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        activity: {
            type: Object,
            required: true
        },
        subscribeToActivity: {
            type: Function,
            required: true
        }
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
