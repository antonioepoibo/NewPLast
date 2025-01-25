<template>

    <div class="container border border-white min-h-[700px] my-6">
        <div class="flex justify-between items-start mb-[1rem] p-10">
            <div class="relative w-[22rem] h-[22rem]">
                <img :src="profildata.avatar_url" class="w-[22rem] h-[22rem] object-cover border-2 border-white" alt="">
                <div class="text-white text-[14px] px-4 py-2 absolute border-2 border-white bg-[#002233] bottom-[-1.1rem] left-1/2 transform -translate-x-1/2"><p>Fan de cailloux</p></div>
            </div>
            <div class="w-[60%] flex">
                <div class="flex flex-col gap-4 w-[70%]">
                    <div class="flex gap-2">
                        <h1 class="text-3xl font-bold text-white">{{profildata.username}}</h1>
                        <p class="text-3xl font-bold text-white"> {{ profildata.age }} ans</p>
                    </div>
                    <div class="flex gap-4">
                        <span class="cursor-default relative flex border border-white rounded-full text-white opacity-50 px-4 text-[12px] duration-200 hover:opacity-100" v-for="int in profildata.interest ? profildata.interest.split(',') : []" :key="int">{{ int }}</span>
                    </div>
                    <div class="flex gap-10">
                        <div class="flex gap-2 items-center">
                            <i v-for="n in profildata.rate" :key="n" class="fa-solid fa-star text-green-300"></i>
                            <p class="text-white">{{ profildata.rate }}/5</p>
                        </div>
                        <p class="text-white">20 avis</p>
                    </div>
                    <div class="flex justify-evenly gap-4">
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-white">{{ friends.length }}</p>
                            <p class="text-white opacity-50">Amis</p>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-white">{{ activities.length }}</p>
                            <p class="text-white opacity-50">Posts</p>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-white">{{ friends.length }}</p>
                            <p class="text-white opacity-50">Avis</p>
                        </div>
                    </div>
                    <p class="text-white opacity-50" style="font-style: italic;">{{ profildata.desc }}</p>
                </div>
                <div class="w-[30%] flex flex-col items-end gap-6">
                    <p class="text-white/50">{{ profildata.isCompany = 'false' ? 'Particulier' : 'Entreprise'}}</p>
                    <p class="text-green-400">En ligne depuis 11h</p>
                </div>
            </div>
        </div>
        <div class="relative">
            <hr class="w-full border">
            <div class="flex gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#002233] border-2 border-white px-4 py-1">
                <p class="text-white">Acitivitée crée</p>
                <p class="text-white/50">{{activities.length}}</p>
            </div>
        </div>
        <div class="flex gap-8 my-4 mx-10 overflow-y-hidden">
            <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :subscribeToActivity="subscribeToActivity"
            />
        </div>
    </div>    

</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import {useRouter} from 'vue-router'
    import {supabase} from '../supabase'
    import {useSessionStore} from '../stores/sessions'
    import ActivityItem from '../components/ActivityItem_small.vue'

    const sessionStore = useSessionStore()
    const router = useRouter()
    const profilID = ref(router.currentRoute.value.query.profildata || 'inconnu')
    const profildata = ref({})
    const friends = ref([])
    const activities = ref([])

    async function getProfilInformation(){
        const {data} = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profilID.value)

            profildata.value = data[0]
    }

    async function getFriends(){
        const {data} = await supabase
            .from('friends')
            .select('*')
            .eq('userID', router.currentRoute.value.query.profildata)

        friends.value = data
    }

    async function getActivities(){
        const {data} = await supabase
            .from('activity')
            .select('*')
            .eq('owner', router.currentRoute.value.query.profildata)

        activities.value = data


    }

    onMounted(async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) console.error('Error getting session:', sessionError);
        
        if (sessionData?.session) {
            sessionStore.setSession(sessionData.session);
            getProfilInformation()
            getFriends()
            getActivities()
        } else {
            sessionStore.clearSession();
        }
        
        //@ts-ignore
        supabase.auth.onAuthStateChange((event, newSession) => {
            if (event === 'SIGNED_IN' && newSession) {
            sessionStore.setSession(newSession);
            console.log(sessionStore.userId);

            } else if (event === 'SIGNED_OUT') {
            sessionStore.clearSession();
            }
        });
    });

</script>