import HeadEr from '../components/HeadEr.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import fond from '../assets/img/fond.svg';
import { useSessionStore } from '../stores/sessions';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessionStore = useSessionStore();
const pageStep = ref('info');
const userEmail = ref(sessionStorage.getItem('user_email'));
const name = ref('');
const last_name = ref('');
const image_url = ref('');
const friends_id = ref([]);
const last_login = ref('');
const utilisateurID = ref('');
const profilType = ref('');
const bio = ref('');
// Récupérer les donnée de la bdd user
async function getUser() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', sessionStore.mail);
    if (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
    }
    else if (data && data.length > 0) {
        const user = data[0];
        name.value = user.name;
        last_name.value = user.lastname;
        image_url.value = user.image_url;
        friends_id.value = user.friends_id.split(',').map(id => id.trim());
        last_login.value = user.last_login;
        utilisateurID.value = user.id;
        profilType.value = user.profil_type;
        bio.value = user.bio;
    }
    else {
        console.log('Aucun utilisateur trouvé avec cet email');
    }
}
function Param() {
    pageStep.value = 'param';
}
function Info() {
    pageStep.value = 'info';
}
onMounted(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError)
        console.error('Error getting session:', sessionError);
    if (sessionData?.session) {
        sessionStore.setSession(sessionData.session);
        getUser();
    }
    else {
        sessionStore.clearSession();
    }
    supabase.auth.onAuthStateChange((event, newSession) => {
        if (event === 'SIGNED_IN' && newSession) {
            sessionStore.setSession(newSession);
            console.log(sessionStore.userId);
            getUser();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.fond)), ...{ class: ("absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover") }, alt: ("Fond d'écran"), });
    // @ts-ignore
    [HeadEr,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(HeadEr, new HeadEr({ username: ((__VLS_ctx.sessionStore.mail)), }));
    const __VLS_1 = __VLS_0({ username: ((__VLS_ctx.sessionStore.mail)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex w-full flex-col h-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex container gap-[5rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-[5rem] relative z-20 my-10") }, ...{ class: (({ 'w-[auto]': __VLS_ctx.pageStep === 'info', 'w-[26rem]': __VLS_ctx.pageStep === 'param' })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.image_url)), ...{ class: ("rounded-full w-[120px] h-[120px] object-cover") }, alt: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-white font-bold text-[24px]") }, });
    (__VLS_ctx.last_name + ' ' + __VLS_ctx.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.Info) }, ...{ class: ("flex gap-2 items-center cursor-pointer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-full bg-transparent border-2 border-white relative w-[20px] h-[20px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: (({ 'underline': __VLS_ctx.pageStep === 'info', 'hover:underline': __VLS_ctx.pageStep === 'param' })) }, ...{ class: ("text-white text-[18px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.Param) }, ...{ class: ("flex gap-2 items-center cursor-pointer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-full bg-transparent border-2 border-white relative w-[20px] h-[20px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: (({ 'underline': __VLS_ctx.pageStep === 'param', 'hover:underline': __VLS_ctx.pageStep === 'info' })) }, ...{ class: ("text-white text-[18px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.pageStep === 'info') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-[5rem] my-[5rem] relative z-20") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-[5rem] flex flex-col gap-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-white font-bold text-[24px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-70 text-[18px] italic") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-white font-bold text-[24px]") }, });
    }
    if (__VLS_ctx.pageStep === 'param') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-[5rem] my-[5rem] relative z-20") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-[5rem] flex flex-col gap-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-white font-bold text-[26px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-70 text-[18px] italic") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-[6rem] items-center my-[2.5rem]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.image_url)), ...{ class: ("rounded-full w-[10rem] h-[10rem] object-cover") }, alt: (""), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-10") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-green-600 text-[24px] font-bold cursor-pointer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-600 text-[24px] font-bold cursor-pointer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mr-[8rem] flex flex-col gap-6 w-[38rem]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, value: ((__VLS_ctx.name)), placeholder: ((__VLS_ctx.HugoKyo)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, value: ((__VLS_ctx.userEmail)), placeholder: ("hugobohard55@gmail.com"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, value: ((__VLS_ctx.name)), placeholder: ((__VLS_ctx.Hugo)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, value: ((__VLS_ctx.last_name)), placeholder: ((__VLS_ctx.Bohard)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, placeholder: ("06060606"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), ...{ class: ("text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]") }, value: ((__VLS_ctx.profilType ? __VLS_ctx.profilType : 'Selectionner votre profil')), placeholder: ("Selectionner votre profil"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4 w-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ name: (""), id: (""), ...{ class: ("text-[18px] text-white bg-transparent border-white border italic w-[100%] h-[5rem] resize-none") }, value: ((__VLS_ctx.bio)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4 w-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[22px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-5 flex-wrap justify-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 mr-8 text-center text-white") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 ml-8 text-center text-white") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 mr-8 text-center text-white") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 ml-8 text-center text-white") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("Describe opacity-50 duration-200 hover:opacity-100 text-[14px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center gap-10") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.modifiy) }, ...{ class: ("flex items-center bg-green-500 text-[#002233] font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md hover:opacity-80 duration-200 cursor-pointer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.modifiy) }, ...{ class: ("flex items-center border-2 border-red-500 text-red-500 font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md  hover:opacity-80 duration-200 cursor-pointer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
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
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['gap-[5rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-[5rem]'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['my-10'];
    __VLS_styleScopedClasses['w-[auto]'];
    __VLS_styleScopedClasses['w-[26rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-[120px]'];
    __VLS_styleScopedClasses['h-[120px]'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['w-[20px]'];
    __VLS_styleScopedClasses['h-[20px]'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['w-[20px]'];
    __VLS_styleScopedClasses['h-[20px]'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-[5rem]'];
    __VLS_styleScopedClasses['my-[5rem]'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['mt-[5rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-[5rem]'];
    __VLS_styleScopedClasses['my-[5rem]'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['mt-[5rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[26px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['my-[2.5rem]'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-[10rem]'];
    __VLS_styleScopedClasses['h-[10rem]'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-10'];
    __VLS_styleScopedClasses['text-green-600'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['mr-[8rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['w-[38rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['w-[100%]'];
    __VLS_styleScopedClasses['h-[5rem]'];
    __VLS_styleScopedClasses['resize-none'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[22px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-5'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['mr-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['ml-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['mr-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['ml-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['Describe'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-10'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['bg-green-500'];
    __VLS_styleScopedClasses['text-[#002233]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['w-[auto]'];
    __VLS_styleScopedClasses['h-[2rem]'];
    __VLS_styleScopedClasses['py-5'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:opacity-80'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['w-[auto]'];
    __VLS_styleScopedClasses['h-[2rem]'];
    __VLS_styleScopedClasses['py-5'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:opacity-80'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['cursor-pointer'];
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
            sessionStore: sessionStore,
            pageStep: pageStep,
            userEmail: userEmail,
            name: name,
            last_name: last_name,
            image_url: image_url,
            profilType: profilType,
            bio: bio,
            Param: Param,
            Info: Info,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
