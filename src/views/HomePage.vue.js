import { ref, onMounted, nextTick, watch } from 'vue';
import { supabase } from '../supabase';
import LoginComponent from '../components/LoginComponent.vue';
import AddActivityForm from '../components/AddActivityForm.vue';
import ActivityItem from '../components/ActivityItem.vue';
import UserAgenda from '../components/UserAgenda.vue';
import { useRouter, useRoute } from 'vue-router';
import { useSessionStore } from '../stores/sessions';
import MapPin from '../components/MapPin.vue';
import fond from '../assets/img/fond.svg';
import HeadEr from '../components/HeadEr.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Reactive state
const sessionStore = useSessionStore();
const router = useRouter();
const route = useRoute();
const showForm = ref(false);
const activities = ref([]);
const form = ref({
    name: '',
    type: '',
    location: '',
    start_time: '',
    end_time: '',
    price: 0,
    discount: 0,
    max_participants: 0,
    deadline: ''
});
const categories = ['Cinéma', 'Bowling', 'Foot', 'Soirée bar', 'Paintball', 'Lazer Game'];
const showAgenda = ref(true);
const width = ref('100%'), height = ref('500px');
const ActVcurrentIndex = ref(0);
const ActVmaxIndex = ref(0);
const allActivities = ref([]);
const searchQuery = ref(''); // Reactive state in the parent
async function getAllActivities() {
    try {
        const { data, error } = await supabase
            .from('activity')
            .select('*');
        if (error) {
            console.error('Erreur lors de la récupération des activités:', error.message);
            return;
        }
        if (data) {
            allActivities.value = data;
            calcMaxIndexActV(); // Recalculer les indices après la récupération des données
        }
    }
    catch (err) {
        console.error('Erreur inattendue:', err);
    }
}
function calcMaxIndexActV() {
    if (allActivities.value.length < 3) {
        ActVmaxIndex.value = 1;
    }
    else {
        ActVmaxIndex.value = Math.ceil(allActivities.value.length / 3);
        console.log("ActVmaxIndex", ActVmaxIndex.value);
    }
}
function moveLeftActV() {
    if (ActVcurrentIndex.value > 0) {
        ActVcurrentIndex.value--;
    }
}
function moveRightActV() {
    if (ActVcurrentIndex.value < ActVmaxIndex.value - 1) {
        ActVcurrentIndex.value++;
    }
}
function setNewIActV(i) {
    if (i > 0 && i <= ActVmaxIndex.value) {
        ActVcurrentIndex.value = i - 1;
    }
}
onMounted(() => {
    getAllActivities();
});
// Toggle the agenda visibility
function toggleAgenda() {
    showAgenda.value = !showAgenda.value;
}
// Toggle activity form
function toggleActivityForm() {
    showForm.value = !showForm.value;
}
// Logout function
function logout() {
    sessionStore.clearSession();
    alert('You have logged out.');
}
// Navigate to Account page
function goToAccountPage() {
    router.push({ name: 'Account' });
}
// Function to fetch activities
async function fetchActivities() {
    const { data, error } = await supabase.from('activity').select('*');
    if (error)
        console.error(error);
    else {
        activities.value = data.sort((a, b) => a.start_time.localeCompare(b.start_time));
        allActivities.value = activities.value;
    }
}
// Function to filter activities
function filterActivities(allActivities) {
    return searchQuery.value
        ? allActivities.filter(activity => activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        : allActivities;
}
// Watch for changes in searchQuery to update filtered activities
watch(searchQuery, () => {
    activities.value = filterActivities(allActivities.value);
});
// Add activity
async function addActivity() {
    const { data, error } = await supabase.from('activity').insert({
        ...form.value,
        owner: sessionStore.mail
    })
        .select();
    const activityId = data[0]?.id;
    if (error) {
        console.error('Error adding activity:', error);
    }
    else if (data) {
        activities.value.push(data[0]);
        subscribeToActivity(activityId);
        resetForm();
        showForm.value = false;
    }
}
// Reset the form
function resetForm() {
    form.value = {
        name: '',
        type: '',
        location: '',
        start_time: '',
        end_time: '',
        price: 0,
        discount: 0,
        max_participants: 0,
        deadline: ''
    };
}
// Subscribe to activity
async function subscribeToActivity(activityId) {
    if (!sessionStore.isLoggedIn) {
        alert('Please log in to subscribe to this activity.');
        return;
    }
    const { data: existingSubscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('activity_id', activityId)
        .eq('userId', sessionStore.userId);
    if (fetchError) {
        console.error('Error checking subscription:', fetchError);
        alert('An error occurred while checking your subscription. Please try again later.');
        return;
    }
    if (existingSubscription.length > 0) {
        alert('You are already subscribed to this activity.');
        return;
    }
    const { error } = await supabase.from('subscriptions').insert({
        activity_id: activityId,
        userId: sessionStore.userId,
    });
    if (error) {
        console.error('Error subscribing to activity:', error);
    }
    else {
        alert('Successfully subscribed!');
        const activity = activities.value.find(a => a.id === activityId);
        if (activity) {
            activity.subscribed = true;
        }
        // Trigger re-mount by toggling showAgenda
        showAgenda.value = false; // Temporarily hide the agenda
        await nextTick(); // Wait for DOM to update
        showAgenda.value = true; // Show the agenda again to re-render
    }
}
// Monitor session state
onMounted(async () => {
    calcMaxIndexActV();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError)
        console.error('Error getting session:', sessionError);
    if (sessionData?.session) {
        sessionStore.setSession(sessionData.session);
        fetchActivities();
    }
    else {
        sessionStore.clearSession();
    }
    const { data: profileData, error: profileError } = await supabase
        .from('profiles') // Replace with your actual table name
        .select('username')
        .eq('id', sessionStore.userId) // Assuming 'id' is the foreign key for users in the profile table
        .single(); // Fetch a single row
    if (profileError) {
        console.error('Error fetching username:', profileError);
    }
    else if (profileData) {
        console.log('Fetched username:', profileData.username);
        sessionStore.setUsername(profileData.username); // Optionally store the username in your session store
    }
    supabase.auth.onAuthStateChange((event, newSession) => {
        if (event === 'SIGNED_IN' && newSession) {
            sessionStore.setSession(newSession);
            console.log(sessionStore.userId);
            fetchActivities();
        }
        else if (event === 'SIGNED_OUT') {
            sessionStore.clearSession();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.fond)), ...{ class: ("absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover") }, alt: ("Fond d'écran"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex w-full flex-col h-full") }, });
    if (!__VLS_ctx.sessionStore.isLoggedIn) {
        // @ts-ignore
        [LoginComponent,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(LoginComponent, new LoginComponent({ ...{ 'onLogin': {} }, }));
        const __VLS_1 = __VLS_0({ ...{ 'onLogin': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_5;
        const __VLS_6 = {
            onLogin: (__VLS_ctx.login)
        };
        let __VLS_2;
        let __VLS_3;
        var __VLS_4;
    }
    if (__VLS_ctx.sessionStore.isLoggedIn) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex flex-col h-full gap-6") }, });
        // @ts-ignore
        [HeadEr,];
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(HeadEr, new HeadEr({ username: ((__VLS_ctx.sessionStore.username)), searchQuery: ((__VLS_ctx.searchQuery)), }));
        const __VLS_8 = __VLS_7({ username: ((__VLS_ctx.sessionStore.username)), searchQuery: ((__VLS_ctx.searchQuery)), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
    if (__VLS_ctx.sessionStore.isLoggedIn) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-white text-[30px] font-bold") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleAgenda) }, ...{ class: ("btn btn-primary") }, });
        if (__VLS_ctx.showAgenda) {
            // @ts-ignore
            [UserAgenda,];
            // @ts-ignore
            const __VLS_12 = __VLS_asFunctionalComponent(UserAgenda, new UserAgenda({ username: ((__VLS_ctx.sessionStore.username)), }));
            const __VLS_13 = __VLS_12({ username: ((__VLS_ctx.sessionStore.username)), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        }
        if (__VLS_ctx.showForm) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [AddActivityForm,];
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(AddActivityForm, new AddActivityForm({ ...{ 'onSubmit': {} }, form: ((__VLS_ctx.form)), }));
            const __VLS_18 = __VLS_17({ ...{ 'onSubmit': {} }, form: ((__VLS_ctx.form)), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            let __VLS_22;
            const __VLS_23 = {
                onSubmit: (__VLS_ctx.addActivity)
            };
            let __VLS_19;
            let __VLS_20;
            var __VLS_21;
        }
        if (__VLS_ctx.activities.length) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-white text-[30px] font-bold") }, });
            const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/activite/add"), ...{ class: ("text-white opacity-50 duration-100 hover:opacity-100") }, }));
            const __VLS_26 = __VLS_25({ to: ("/activite/add"), ...{ class: ("text-white opacity-50 duration-100 hover:opacity-100") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            __VLS_nonNullable(__VLS_29.slots).default;
            var __VLS_29;
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("overflow-hidden") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-[2rem]") }, ...{ style: (({ transform: `translateX(-${__VLS_ctx.ActVcurrentIndex * 101}%)` })) }, });
            for (const [activity] of __VLS_getVForSourceType((__VLS_ctx.activities))) {
                // @ts-ignore
                [ActivityItem,];
                // @ts-ignore
                const __VLS_30 = __VLS_asFunctionalComponent(ActivityItem, new ActivityItem({ key: ((activity.id)), activity: ((activity)), subscribeToActivity: ((__VLS_ctx.subscribeToActivity)), }));
                const __VLS_31 = __VLS_30({ key: ((activity.id)), activity: ((activity)), subscribeToActivity: ((__VLS_ctx.subscribeToActivity)), }, ...__VLS_functionalComponentArgsRest(__VLS_30));
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-4 justify-center items-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (__VLS_ctx.moveLeftActV) }, ...{ class: ("relative text-white fa-solid fa-arrow-left arrow") }, });
            for (const [i] of __VLS_getVForSourceType((__VLS_ctx.ActVmaxIndex))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.sessionStore.isLoggedIn)))
                                return;
                            if (!((__VLS_ctx.activities.length)))
                                return;
                            __VLS_ctx.setNewIActV(i);
                        } }, id: ((i.toString())), ...{ class: (({ 'opacity-50': i !== __VLS_ctx.ActVcurrentIndex + 1 })) }, ...{ class: ("bg-white flex w-[0.8rem] h-[0.8rem] rounded-full") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (__VLS_ctx.moveRightActV) }, ...{ class: ("relative text-white fa-solid fa-arrow-right arrow") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-white text-[30px] font-bold max-[600px]:text-[20px]") }, });
        const __VLS_35 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ to: ("/finder"), ...{ class: ("text-white opacity-50 duration-100 hover:opacity-100") }, }));
        const __VLS_37 = __VLS_36({ to: ("/finder"), ...{ class: ("text-white opacity-50 duration-100 hover:opacity-100") }, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        __VLS_nonNullable(__VLS_40.slots).default;
        var __VLS_40;
        // @ts-ignore
        [MapPin,];
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(MapPin, new MapPin({ acvitivitesLoc: ((__VLS_ctx.act)), acvitivitesUser: ((__VLS_ctx.activities)), width: ((__VLS_ctx.width)), height: ((__VLS_ctx.height)), }));
        const __VLS_42 = __VLS_41({ acvitivitesLoc: ((__VLS_ctx.act)), acvitivitesUser: ((__VLS_ctx.activities)), width: ((__VLS_ctx.width)), height: ((__VLS_ctx.height)), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    }
    __VLS_styleScopedClasses[''];
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
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[30px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['btn'];
    __VLS_styleScopedClasses['btn-primary'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[30px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-100'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-[2rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-arrow-left'];
    __VLS_styleScopedClasses['arrow'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-[0.8rem]'];
    __VLS_styleScopedClasses['h-[0.8rem]'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['fa-solid'];
    __VLS_styleScopedClasses['fa-arrow-right'];
    __VLS_styleScopedClasses['arrow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[30px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['max-[600px]:text-[20px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-100'];
    __VLS_styleScopedClasses['hover:opacity-100'];
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
            LoginComponent: LoginComponent,
            AddActivityForm: AddActivityForm,
            ActivityItem: ActivityItem,
            UserAgenda: UserAgenda,
            MapPin: MapPin,
            fond: fond,
            HeadEr: HeadEr,
            sessionStore: sessionStore,
            showForm: showForm,
            activities: activities,
            form: form,
            showAgenda: showAgenda,
            width: width,
            height: height,
            ActVcurrentIndex: ActVcurrentIndex,
            ActVmaxIndex: ActVmaxIndex,
            searchQuery: searchQuery,
            moveLeftActV: moveLeftActV,
            moveRightActV: moveRightActV,
            setNewIActV: setNewIActV,
            toggleAgenda: toggleAgenda,
            addActivity: addActivity,
            subscribeToActivity: subscribeToActivity,
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
