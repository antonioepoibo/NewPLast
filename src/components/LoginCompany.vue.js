import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State
const loading = ref(false);
const email = ref('');
const router = useRouter();
const sessionStore = useSessionStore();
const handleLogin = async () => {
    try {
        loading.value = true;
        // Login using magic link
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
        });
        if (error)
            throw error;
        sessionStore.isCompany = true;
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
// Redirection vers la page utilisateur
const goToUserLogin = () => {
    router.push('/login');
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goToUserLogin) }, type: ("button"), });
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
            goToUserLogin: goToUserLogin,
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
