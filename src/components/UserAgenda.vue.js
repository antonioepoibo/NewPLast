import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State to store the list of subscribed activities
const activities = ref([]);
// State to track whether the agenda should be shown
// Fetch the subscribed activities for the logged-in user
async function fetchUserAgenda(userId) {
    // Log the userId being passed to check if it is valid
    console.log("Fetching subscriptions for userId:", userId);
    const { data, error } = await supabase
        .from('subscriptions')
        .select('activity_id')
        .eq('userId', userId);
    // Log errors or data if available
    if (error) {
        console.error('Error fetching subscriptions:', error);
        return;
    }
    console.log("Subscriptions data:", data); // Log the data to check what is returned
    if (!data || data.length === 0) {
        console.log('No subscriptions found for this user.');
        return;
    }
    // Now fetch the details of each subscribed activity
    if (data && data.length > 0) {
        console.log("Found subscriptions, fetching activities...");
        const activityIds = data.map(sub => sub.activity_id); // Extract activity IDs from the subscriptions
        console.log("Activity IDs:", activityIds); // Log the activity IDs
        const { data: activitiesData, error: activitiesError } = await supabase
            .from('activity')
            .select('*')
            .in('id', activityIds); // Fetch the activities by their IDs
        if (activitiesError) {
            console.error('Error fetching activities:', activitiesError);
        }
        else {
            console.log("Fetched activities:", activitiesData);
            activities.value = activitiesData;
        }
    }
    else {
        console.log("No subscriptions found for this user.");
    }
}
// Unsubscribe from an activity
async function unsubscribe(activityId) {
    const userId = sessionStore.userId;
    try {
        const { error } = await supabase
            .from('subscriptions')
            .delete()
            .eq('activity_id', activityId)
            .eq('userId', userId);
        if (error) {
            console.error('Error unsubscribing:', error);
            alert('Failed to unsubscribe. Please try again.');
        }
        else {
            alert('Successfully unsubscribed!');
            // Refresh the page to reflect the updated state
            window.location.reload();
        }
    }
    catch (err) {
        console.error('Unexpected error:', err);
    }
}
const actDate = activities.value;
const sessionStore = useSessionStore();
// Fetch the user's agenda when the component is mounted
onMounted(() => {
    // Fetch the agenda using the username prop passed from the parent component
    fetchUserAgenda(sessionStore.userId);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.activities.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap gap-[2rem] justify-between my-6 mx-4") }, });
        for (const [activity] of __VLS_getVForSourceType((__VLS_ctx.activities))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((activity.id)), ...{ class: ("flex gap-4 items-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("flex flex-col items-start border-[.15rem] border-white text-white px-6 py-1 text-[24px] font-bold rounded-lg") }, });
            (activity.start_time.replace('T', ' ').split(' ')[0].split('-')[2]);
            __VLS_elementAsFunction(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
            (activity.start_time.replace('T', ' ').split(' ')[0].split('-')[1]);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col text-white") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-[20px] font-bold w-[14rem]") }, });
            (activity.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-[14px] opacity-50") }, });
            (activity.type);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ v: (true), ...{ class: ("flex gap-4 text-2xl items-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white") }, });
            (activity.price);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-green-600") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("text-white fa-solid fa-user-group") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.activities.length > 0)))
                            return;
                        __VLS_ctx.unsubscribe(activity.id);
                    } }, ...{ class: ("bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['gap-[2rem]'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['my-6'];
    __VLS_styleScopedClasses['mx-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-start'];
    __VLS_styleScopedClasses['border-[.15rem]'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[20px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['w-[14rem]'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-green-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-user-group'];
    __VLS_styleScopedClasses['bg-red-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['hover:bg-red-500'];
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
            activities: activities,
            unsubscribe: unsubscribe,
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
