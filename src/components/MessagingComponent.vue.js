import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// States
const users = ref([]); // List of users
const selectedUser = ref('');
const messageContent = ref('');
const messages = ref([]);
// Fetch all users except the logged-in user
async function fetchUsers(currentUserId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId);
    if (error) {
        console.error('Error fetching users:', error);
    }
    else {
        users.value = data || [];
    }
}
// Fetch messages involving the logged-in user
async function fetchMessages(currentUserId) {
    const { data, error } = await supabase
        .from('messages')
        .select('*, sender:sender_id (username), receiver:receiver_id (username)')
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order('timestamp', { ascending: false });
    if (error) {
        console.error('Error fetching messages:', error);
    }
    else {
        messages.value = data.map(msg => ({
            id: msg.id,
            sender_name: msg.sender.username,
            receiver_name: msg.receiver.username,
            content: msg.content,
            timestamp: msg.timestamp,
        }));
    }
}
// Send a new message
async function sendMessage() {
    if (!selectedUser.value || !messageContent.value) {
        alert('Please select a user and type a message.');
        return;
    }
    const { error } = await supabase.from('messages').insert({
        sender_id: currentUserId,
        receiver_id: selectedUser.value,
        content: messageContent.value,
    });
    if (error) {
        console.error('Error sending message:', error);
    }
    else {
        messageContent.value = '';
        fetchMessages(currentUserId); // Refresh the message list
    }
}
// Simulated logged-in user
const currentUserId = 'current-logged-in-user-id'; // Replace with real logic
// On component mount
onMounted(() => {
    fetchUsers(currentUserId);
    fetchMessages(currentUserId);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("receiver"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.selectedUser)), });
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((user.id)), value: ((user.id)), });
        (user.username);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.messageContent)), placeholder: ("Type your message here"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.sendMessage) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    for (const [message] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((message.id)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (message.sender_name);
        (message.content);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("timestamp") }, });
        (new Date(message.timestamp).toLocaleString());
    }
    __VLS_styleScopedClasses['timestamp'];
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
            users: users,
            selectedUser: selectedUser,
            messageContent: messageContent,
            messages: messages,
            sendMessage: sendMessage,
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
