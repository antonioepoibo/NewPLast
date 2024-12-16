import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State
const loading = ref(false);
const email = ref('');
const router = useRouter();
const handleLogin = async () => {
    try {
        loading.value = true;
        // Login using magic link
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
        });
        if (error)
            throw error;
        // Vérifiez ou ajoutez l'email dans la table profiles
        await ensureProfile(email.value);
        alert('Check your email for the login link!');
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
    finally {
        loading.value = false;
    }
};
// Fonction pour vérifier ou ajouter l'email dans la table profiles
const ensureProfile = async (email) => {
    try {
        // Vérifiez si l'email existe déjà dans la table profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', email)
            .single();
        if (error && error.code !== 'PGRST116') {
            // Si une erreur autre que "Pas de correspondance trouvée"
            throw error;
        }
        if (!data) {
            // Si aucune ligne avec cet email, insérez une nouvelle ligne
            const { error: insertError } = await supabase.from('profiles').insert([
                {
                    email: email,
                    updated_at: new Date().toISOString(), // Ajoutez un timestamp actuel
                },
            ]);
            if (insertError)
                throw insertError;
            console.log('Email ajouté à la table profiles');
        }
        else {
            console.log('Email déjà présent dans la table profiles');
        }
    }
    catch (err) {
        console.error('Erreur lors de la vérification ou de l\'ajout du profil :', err);
        throw err;
    }
};
// Redirection vers la page entreprise
const goToCompanyLogin = () => {
    router.push('/loginCompany');
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleLogin) }, ...{ class: ("row flex-center flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-6 form-widget") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), required: (true), placeholder: ("Your email"), });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), disabled: ((__VLS_ctx.loading)), });
    (__VLS_ctx.loading ? 'Loading...' : 'Send Magic Link');
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goToCompanyLogin) }, type: ("button"), });
    __VLS_styleScopedClasses['row'];
    __VLS_styleScopedClasses['flex-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['col-6'];
    __VLS_styleScopedClasses['form-widget'];
    __VLS_styleScopedClasses['header'];
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
            email: email,
            handleLogin: handleLogin,
            goToCompanyLogin: goToCompanyLogin,
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
