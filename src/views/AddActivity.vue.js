import fond from '../assets/img/fond.svg';
import HeadEr from '../components/HeadEr.vue';
import defaultimg from '../assets/img/default_activite.svg';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';
import axios from 'axios';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessionStore = useSessionStore();
const msg_content = ref('');
const msg_Title = ref('');
const msg_type = ref('');
const msg_show = ref(false);
const name = ref(''), last_name = ref(''), image_url = ref(''), friends_id = ref([]), last_login = ref(''), utilisateurID = ref(''), activityname = ref(''), activityloc = ref(''), activitydesc = ref(''), activitypart = ref(''), activityprice = ref(''), activitydate = ref(''), imageUrl = ref(''), latitude = ref(''), longitude = ref('');
const keyword = ref('');
const simplifiedActivityTypes = [
    "Sport", "Performance", "Créativité", "Culture", "Découverte", "Observation", "Stratégie", "Bien-être", "Compétition", "Apprentissage", "Plein air", "Fête", "Collaboration", "Relaxation", "Improvisation", "Aventure", "Défi", "Nocturne", "Art", "Exploration", "Technologie", "Thème", "Immersion", "Tradition", "Langue", "Construction", "Science", "Spiritualité", "Cuisine", "Théâtre", "Douceur", "Danse", "Méditation", "Aquatique", "Développement", "Musique",
    "Jeux", "Nature", "Ludique", "Extrême", "Expression", "Saisonnier", "Bricolage", "Écologie", "Survie", "Photographie", "Énigmes", "Partage", "Local", "Musical", "Détente"
];
async function addType() {
    const select = event.target.id;
    let keywordsArray = keyword.value.split(',').map(item => item.trim()).filter(item => item !== '');
    if (keywordsArray.includes(select)) {
        keywordsArray = keywordsArray.filter(item => item !== select);
    }
    else {
        if (keywordsArray.length < 3) { // Limit to 3 keywords
            keywordsArray.push(select);
        }
        else {
            console.log('Maximum of 3 keywords allowed');
            return; // Exit if there are already 3 keywords
        }
    }
    keyword.value = keywordsArray.join(', ');
    console.log(keyword.value);
}
async function TransformCord() {
    console.log(activityloc.value);
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: activityloc.value,
            format: "json",
            addressdetails: 1,
            limit: 1,
        },
    });
    if (response.data && response.data.length > 0) {
        latitude.value = response.data[0].lat;
        longitude.value = response.data[0].lon;
        console.log('Coordonnées transformées avec succès');
        console.log('Latitude :', latitude.value);
        console.log('Longitude :', longitude.value);
    }
    else {
        console.log('Adresse non trouvée');
    }
}
async function getUser() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionStore.userId);
    if (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
    }
    else {
        if (data && data.length > 0) {
            name.value = data[0].firstname;
            last_name.value = data[0].lastname;
            image_url.value = data[0].image_url;
            utilisateurID.value = data[0].id;
        }
        else {
            console.log('Aucun utilisateur trouvé avec cet email');
        }
    }
}
async function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        // Upload de l'image dans Supabase Storage
        const { data, error } = await supabase.storage
            .from('activity-pictures')
            .upload(fileName, file);
        if (error) {
            console.error('Erreur lors de l\'upload :', error.message, data);
        }
        else {
            const { data: publicURLData } = supabase.storage
                .from('activity-pictures')
                .getPublicUrl(fileName);
            if (publicURLData) {
                imageUrl.value = publicURLData.publicUrl;
                console.log("URL de l'image obtenue :", imageUrl.value);
            }
            else {
                console.error("Impossible d'obtenir l'URL publique.");
            }
        }
    }
}
;
async function sendNewAct() {
    activitydate.value = "2024-12-12";
    const { data, error } = await supabase
        .from('activity')
        .insert([
        {
            name: activityname.value,
            desc: activitydesc.value,
            owner: last_name.value + ' ' + name.value,
            location: activityloc.value,
            start_time: activitydate.value,
            price: activityprice.value,
            max_participants: activitypart.value,
            latitude: latitude.value,
            longitude: longitude.value,
            type: keyword.value
            //   image_url: imageUrl.value,
            //   creator_id: utilisateurID.value,
            //   user_join: utilisateurID.value,
        },
    ]);
    if (error) {
        console.error('Erreur lors de l\'insertion de l\'activité :', error.message);
        console.log(name.value + ' ' + last_name.value + ' ' + activityname.value + ' ' + activitydesc.value + ' ' + activityloc.value + ' ' + activitydate.value + ' ' + activityprice.value + ' ' + activitypart.value + ' ' + imageUrl.value + ' ' + utilisateurID.value);
    }
    else {
        console.log('Activité insérée avec succès :', data);
        activityname.value = '';
        activityloc.value = '';
        activitydesc.value = '';
        activitypart.value = '';
        activityprice.value = '';
        activitydate.value = '';
        imageUrl.value = '';
        keyword.value = '';
    }
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
    TransformCord();
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.fond)), ...{ class: ("absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover") }, alt: ("Fond d'écran"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20 flex w-full flex-col h-full") }, });
    // @ts-ignore
    [HeadEr,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(HeadEr, new HeadEr({ username: ((__VLS_ctx.sessionStore.mail)), }));
    const __VLS_1 = __VLS_0({ username: ((__VLS_ctx.sessionStore.mail)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("container relative z-20 text-white text-[24px] font-bold mt-[4rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("container relative z-20 mt-2 text-white text-[18px] italic opacity-80") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative z-20") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container flex justify-between my-6 items-center max-[1400px]:flex-col-reverse max-[1400px]:gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-auto h-auto border-2 border-white flex flex-col p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ value: ((__VLS_ctx.activityname)), ...{ class: ("bg-transparent border-b border-white text-white") }, placeholder: ("Bowling"), type: ("text"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ onKeyup: (...[$event]) => {
                __VLS_ctx.TransformCord();
            } }, value: ((__VLS_ctx.activityloc)), ...{ class: ("bg-transparent w-[15rem] text-slate-400 italic border-b border-white text-white") }, placeholder: ("12 rue de la fleure, Mondeville"), type: ("text"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.activitydesc)), ...{ class: ("p-1 bg-transparent border w-[32rem] border-white h-[10rem] resize-y max-[670px]:w-[20rem] text-white") }, placeholder: ("Description de l'activité"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-[80%]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 flex-wrap flex-shrink-0") }, });
    for (const [type] of __VLS_getVForSourceType((__VLS_ctx.simplifiedActivityTypes))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (__VLS_ctx.addType) }, ...{ class: (({ 'opacity-50': !__VLS_ctx.keyword.includes(type), 'opacity-100': __VLS_ctx.keyword.includes(type), 'cursor-not-allowed': __VLS_ctx.keyword.split(',').length >= 3 && !__VLS_ctx.keyword.includes(type), 'cursor-pointer': __VLS_ctx.keyword.split(',').length < 3 || __VLS_ctx.keyword.includes(type) })) }, id: ((type)), ...{ class: ("TypeContainer border border-white text-sm w-auto px-6 py-3 flex items-center whitespace-nowrap text-white h-6 rounded-full opacity-50 transition duration-200 text-[10px] flex-shrink-0") }, key: ((type)), });
        (type);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ class: ("bg-transparent text-slate-400 italic border-b border-white text-white") }, placeholder: ("12/12/2022 14:00"), type: ("datetime-local"), });
    (__VLS_ctx.activityStartdate);
    (__VLS_ctx.activityStartdate);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ class: ("bg-transparent text-slate-400 italic border-b border-white text-white") }, placeholder: ("12/12/2022 14:00"), type: ("datetime-local"), });
    (__VLS_ctx.activityEnddate);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    if (!__VLS_ctx.imageUrl) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative w-[200px] h-[200px] rounded-lg bg-gray-400 flex items-center justify-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-white text-[30px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.uploadImage) }, type: ("file"), ...{ class: ("absolute inset-0 w-full h-full opacity-0 cursor-pointer") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imageUrl)), ...{ class: ("w-[200px] h-[200px] rounded-full object-cover") }, alt: ("Preview de l'image"), });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ class: ("bg-transparent text-slate-400 italic border-b border-white text-white") }, placeholder: ("12/12/2022 14:00"), type: ("datetime-local"), });
    (__VLS_ctx.activitydate);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ class: ("bg-transparent text-slate-400 italic border-b border-white text-white") }, placeholder: ("10"), type: ("number"), });
    (__VLS_ctx.activitypart);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("text-[18px] text-white") }, for: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ class: ("bg-transparent text-slate-400 italic border-b border-white text-white") }, placeholder: ("20 €"), type: ("number"), });
    (__VLS_ctx.activityprice);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-8 my-4 gap-[6rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.sendNewAct) }, ...{ class: ("w-[10rem] h-[3rem] rounded-tl-lg rounded-br-lg text-white bg-green-600 hover:bg-green-400 duration-200") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-[24rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-[24rem] bg-[#3B5562] py-10 rounded-sm shadow-xl relative ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imageUrl ? __VLS_ctx.imageUrl : __VLS_ctx.defaultimg)), alt: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-3 pt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-4 items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((__VLS_ctx.image_url)), ...{ class: ("rounded-full w-[60px] h-[60px] object-cover") }, alt: (""), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-white text-[18px] font-bold") }, });
    (__VLS_ctx.activityname ? __VLS_ctx.activityname : "null");
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-50 text-[14px]") }, });
    (__VLS_ctx.last_name + ' ' + __VLS_ctx.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 justify-start") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col items-end") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-80 text-[14px]") }, });
    (__VLS_ctx.activitypart ? __VLS_ctx.activitypart : 0);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white opacity-50 text-[14px]") }, });
    (__VLS_ctx.activityloc ? __VLS_ctx.activityloc : "null");
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center text-[10px] text-white gap-2 flex-row-reverse px-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.activitypart ? __VLS_ctx.activitypart : 0);
    __VLS_elementAsFunction(__VLS_intrinsicElements.progress, __VLS_intrinsicElements.progress)({ max: ((__VLS_ctx.activitypart ? __VLS_ctx.activitypart : 0)), value: ((0)), ...{ class: ("h-2 w-[6rem]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-white text-[16px] opacity-80 mt-5 italic px-3") }, });
    (__VLS_ctx.activitydesc ? __VLS_ctx.activitydesc : "null");
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
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mt-[4rem]'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['opacity-80'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-20'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['my-6'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['max-[1400px]:flex-col-reverse'];
    __VLS_styleScopedClasses['max-[1400px]:gap-6'];
    __VLS_styleScopedClasses['w-auto'];
    __VLS_styleScopedClasses['h-auto'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['my-4'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['max-[670px]:flex-col'];
    __VLS_styleScopedClasses['max-[670px]:gap-2'];
    __VLS_styleScopedClasses['max-[670px]:items-start'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['w-[15rem]'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['my-4'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['max-[670px]:flex-col'];
    __VLS_styleScopedClasses['max-[670px]:gap-2'];
    __VLS_styleScopedClasses['max-[670px]:items-start'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['p-1'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['w-[32rem]'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['h-[10rem]'];
    __VLS_styleScopedClasses['resize-y'];
    __VLS_styleScopedClasses['max-[670px]:w-[20rem]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['w-[80%]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['opacity-100'];
    __VLS_styleScopedClasses['cursor-not-allowed'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['TypeContainer'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['w-auto'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['whitespace-nowrap'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['text-[10px]'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['my-4'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['max-[670px]:flex-col'];
    __VLS_styleScopedClasses['max-[670px]:gap-2'];
    __VLS_styleScopedClasses['max-[670px]:items-start'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['my-4'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['max-[670px]:flex-col'];
    __VLS_styleScopedClasses['max-[670px]:gap-2'];
    __VLS_styleScopedClasses['max-[670px]:items-start'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['w-[200px]'];
    __VLS_styleScopedClasses['h-[200px]'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['bg-gray-400'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[30px]'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['opacity-0'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['w-[200px]'];
    __VLS_styleScopedClasses['h-[200px]'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-[18px]'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-white'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['my-4'];
    __VLS_styleScopedClasses['gap-[6rem]'];
    __VLS_styleScopedClasses['w-[10rem]'];
    __VLS_styleScopedClasses['h-[3rem]'];
    __VLS_styleScopedClasses['rounded-tl-lg'];
    __VLS_styleScopedClasses['rounded-br-lg'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-green-600'];
    __VLS_styleScopedClasses['hover:bg-green-400'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['w-[24rem]'];
    __VLS_styleScopedClasses['w-[24rem]'];
    __VLS_styleScopedClasses['bg-[#3B5562]'];
    __VLS_styleScopedClasses['py-10'];
    __VLS_styleScopedClasses['rounded-sm'];
    __VLS_styleScopedClasses['shadow-xl'];
    __VLS_styleScopedClasses['relative'];
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
    __VLS_styleScopedClasses['px-3'];
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
            fond: fond,
            HeadEr: HeadEr,
            defaultimg: defaultimg,
            sessionStore: sessionStore,
            name: name,
            last_name: last_name,
            image_url: image_url,
            activityname: activityname,
            activityloc: activityloc,
            activitydesc: activitydesc,
            activitypart: activitypart,
            activityprice: activityprice,
            activitydate: activitydate,
            imageUrl: imageUrl,
            keyword: keyword,
            simplifiedActivityTypes: simplifiedActivityTypes,
            addType: addType,
            TransformCord: TransformCord,
            uploadImage: uploadImage,
            sendNewAct: sendNewAct,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
