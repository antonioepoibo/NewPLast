import { supabase } from '../supabase';
import { onMounted } from 'vue';
import { useSessionStore } from '../stores/sessions';
import { ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessionStore = useSessionStore();
const loading = ref(true);
const username = ref('');
const full_name = ref('');
const firstname = ref('');
const lastname = ref('');
const age = ref(null);
const gender = ref('');
const selectedInterests = ref([]);
// Liste d'intérêts prédéfinis
const availableInterests = [
    'Sports', 'Musique', 'Voyages', 'Lecture', 'Cinéma', 'Cuisine', 'Danse', 'Art', 'Nature',
    'Photographie', 'Mode', 'Jeux vidéo', 'Fitness', 'Yoga', 'Peinture', 'Écriture', 'Théâtre', 'Randonnée',
    'Camping', 'Animaux', 'Astronomie', 'Films', 'Séries TV', 'Jardinage',
    'DIY (Do It Yourself)', 'Méditation',
    'Esport', 'Marathon', 'Crossfit', 'Natation', 'Surf', 'Ski', 'Snowboard', 'Escalade', 'Voyage en sac à dos',
    'Road trips', 'Architecture', 'Blogging', 'Vlogging', 'Langues étrangères', 'Animaux de compagnie',
    'Automobile', 'Moto', 'Parcs d’attractions', 'Poésie', 'Bien-être', 'Café', 'Thé',
    'Pêche', 'Chasse', 'Arts martiaux', 'Boxe',
    'Pâtisserie', 'Astrologie', 'Alpinisme', 'Planche à voile',
    'Bricolage', 'Escrime', 'Musculation', 'Roller', 'Patinage artistique', 'Street art',
    'Mode vintage', 'Tatouages', 'Piercings', 'Artisanat', 'Vin', 'Bières artisanales', 'Mindfulness',
    'Thérapies naturelles', 'Danse classique', 'Hip-hop', 'Street dance', 'K-pop', 'Culture japonaise',
    'Culture coréenne', 'Manga', 'Anime', 'Comics', 'Jeux de société', 'Jeux de rôle',
    'Littérature jeunesse', 'Activités de plein air', 'Bowling', 'Mini-golf', 'Golf',
    'Tennis', 'Football', 'Basketball', 'Rugby', 'Handball', 'Volley-ball', 'Badminton', 'Esport', 'Chant',
    'Instruments de musique', 'Piano', 'Guitare', 'Batterie', 'Violon', 'Flûte', 'Opéra', 'Rap', 'Jazz', 'Blues',
    'Rock', 'Musique classique', 'Funk', 'Soul', 'R&B', 'Techno', 'House', 'Électro', 'Salsa', 'Bachata',
    'Tango', 'Kizomba', 'Reggae', 'Rock alternatif', 'Metal', 'Pop', 'Country', 'Musique latine', 'Cyclisme',
    'Vélo de montagne', 'Football américain', 'Baseball', 'Cricket', 'Sports extrêmes', 'Motocross',
    'Plongée sous-marine', 'Snorkeling', 'Kitesurf', 'Parachutisme', 'Parapente', 'Wing suiting', 'Base jump'
];
onMounted(() => {
    console.log(sessionStore.userId);
    getProfile();
});
async function getProfile() {
    try {
        loading.value = true;
        const user = sessionStore.userId;
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, full_name, firstname, lastname, age, gender, interest`)
            .eq('id', user)
            .single();
        if (error && status !== 406)
            throw error;
        if (data) {
            username.value = data.username;
            full_name.value = data.full_name;
            firstname.value = data.firstname;
            lastname.value = data.lastname;
            age.value = data.age;
            gender.value = data.gender;
            selectedInterests.value = data.interest ? data.interest.split(', ') : [];
        }
    }
    catch (error) {
        alert(error.message);
    }
    finally {
        loading.value = false;
    }
}
async function updateProfile() {
    try {
        loading.value = true;
        const user = sessionStore.userId;
        const updates = {
            id: user.id,
            username: username.value,
            full_name: full_name.value,
            firstname: firstname.value,
            lastname: lastname.value,
            age: age.value,
            gender: gender.value,
            interest: selectedInterests.value.join(', '),
            updated_at: new Date(),
        };
        const { error } = await supabase.from('profiles').upsert(updates);
        if (error)
            throw error;
    }
    catch (error) {
        alert(error.message);
    }
    finally {
        loading.value = false;
    }
}
function goToHomePage() {
    router.push('/HomePage');
}
function toggleInterest(interest) {
    if (selectedInterests.value.includes(interest)) {
        selectedInterests.value = selectedInterests.value.filter(i => i !== interest);
    }
    else if (selectedInterests.value.length < 3) {
        selectedInterests.value.push(interest);
    }
}
async function signOut() {
    try {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    }
    catch (error) {
        alert(error.message);
    }
    finally {
        loading.value = false;
    }
}
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
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['interest-button'];
    __VLS_styleScopedClasses['interest-button'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['primary'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['secondary'];
    __VLS_styleScopedClasses['button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.updateProfile) }, ...{ class: ("form-widget") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("email"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("email"), type: ("text"), value: ((__VLS_ctx.sessionemail)), disabled: (true), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("username"), type: ("text"), value: ((__VLS_ctx.username)), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("full_name"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("full_name"), type: ("text"), value: ((__VLS_ctx.full_name)), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("firstname"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("firstname"), type: ("text"), value: ((__VLS_ctx.firstname)), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("lastname"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("lastname"), type: ("text"), value: ((__VLS_ctx.lastname)), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("age"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("age"), type: ("number"), ...{ class: ("input-field") }, });
    (__VLS_ctx.age);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("gender"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ id: ("gender"), value: ((__VLS_ctx.gender)), ...{ class: ("input-field") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("Male"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("Female"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("Other"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("interests-container") }, });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.availableInterests))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleInterest(item);
                } }, key: ((item)), ...{ class: ((['interest-button', __VLS_ctx.selectedInterests.includes(item) ? 'selected' : ''])) }, disabled: ((!__VLS_ctx.selectedInterests.includes(item) && __VLS_ctx.selectedInterests.length >= 3)), });
        (item);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("selected-interests") }, });
    (__VLS_ctx.selectedInterests.join(', '));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-actions") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("submit"), ...{ class: ("button primary") }, value: ((__VLS_ctx.loading ? 'Chargement...' : 'Mettre à jour')), disabled: ((__VLS_ctx.loading)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goToHomePage) }, ...{ class: ("button secondary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.signOut) }, ...{ class: ("button secondary") }, disabled: ((__VLS_ctx.loading)), });
    __VLS_styleScopedClasses['form-container'];
    __VLS_styleScopedClasses['form-widget'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['input-field'];
    __VLS_styleScopedClasses['form-group'];
    __VLS_styleScopedClasses['interests-container'];
    __VLS_styleScopedClasses['interest-button'];
    __VLS_styleScopedClasses['selected-interests'];
    __VLS_styleScopedClasses['form-actions'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['primary'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['secondary'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['secondary'];
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
            loading: loading,
            username: username,
            full_name: full_name,
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender: gender,
            selectedInterests: selectedInterests,
            availableInterests: availableInterests,
            updateProfile: updateProfile,
            goToHomePage: goToHomePage,
            toggleInterest: toggleInterest,
            signOut: signOut,
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
