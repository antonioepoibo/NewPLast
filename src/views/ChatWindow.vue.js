import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Props
const props = defineProps({
    receiver: { type: Object, required: true },
    userId: { type: Number, required: true },
});
const messages = ref([]);
const newMessage = ref('');
async function fetchMessages() {
    if (!props.receiver)
        return;
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${props.userId},receiver_id.eq.${props.receiver.id}`)
        .or(`sender_id.eq.${props.receiver.id},receiver_id.eq.${props.userId}`)
        .order('timestamp', { ascending: true });
    if (error) {
        console.error(error);
    }
    else {
        messages.value = data;
    }
}
async function sendMessage() {
    if (!newMessage.value.trim())
        return;
    const { error } = await supabase.from('messages').insert({
        sender_id: props.userId,
        receiver_id: props.receiver.id,
        content: newMessage.value.trim(),
    });
    if (error) {
        console.error(error);
    }
    else {
        newMessage.value = '';
        fetchMessages(); // Refresh messages
    }
}
// Fetch messages whenever the selected receiver changes
watch(() => props.receiver, fetchMessages);
onMounted(fetchMessages);
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        receiver: { type: Object, required: true },
        userId: { type: Number, required: true },
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
    if (__VLS_ctx.receiver) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.receiver.username);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("chat-window") }, });
        for (const [message] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((message.id)), ...{ class: ("message") }, });
            if (message.sender_id === __VLS_ctx.userId) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                (__VLS_ctx.receiver.username);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (message.content);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.sendMessage) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.newMessage)), placeholder: ("Type a message"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), });
    }
    __VLS_styleScopedClasses['chat-window'];
    __VLS_styleScopedClasses['message'];
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
            messages: messages,
            newMessage: newMessage,
            sendMessage: sendMessage,
        };
    },
    props: {
        receiver: { type: Object, required: true },
        userId: { type: Number, required: true },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        receiver: { type: Object, required: true },
        userId: { type: Number, required: true },
    },
});
; /* PartiallyEnd: #4569/main.vue */
