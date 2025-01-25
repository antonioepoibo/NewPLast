<template>
    <div ref="myElement" class="GapContainer relative flex gap-[3rem] items-center text-center flex-nowrap mx-2 m-auto transition-transform duration-700 ease-in-out max-[600px]:gap-[2rem]" :style="{ transform: `translateX(-${currentIndex * 105}%)` }">
          <!-- photo de sois -->
            <div class="relative flex flex-col items-center text-white text-center flex-shrink-0 w-[7rem] max-[600px]:w-[4.4rem]">
              <img :src="image_url || '/default-avatar.png'" class="rounded-full w-[90px] h-[90px] object-cover border-[.2rem] border-white max-[600px]:w-[70px] max-[600px]:h-[70px] max-[600px]:border-[.1rem] max-[500px]:w-[50px] max-[500px]:h-[50px]" :alt="'Photo de vous'">
              <div class="flex flex-col items-start">
                <p class="max-[600px]:text-[14px] max-[500px]:text-[12px]">Vous</p>
                <div v-if="last_login">
                  <p>
                    <span v-if="new Date(last_login).getTime() > new Date().getTime() - 60000" class="text-green-600 max-[600px]:text-[10px]">Maintenant</span>
                    <span v-else class="opacity-50 max-[600px]:text-[9px]">Il y a {{ convertTimeDiff(last_login) }}</span>
                  </p>
                </div>
                <div v-else>
                  <p class="max-[500px]:text-[10px]">Chargement...</p>
                </div>
              </div>
            </div>
            <!-- photo des amis-->
            <div @click="$router.push(`/friendsprofile?profildata=${friend.id}`)"  v-for="friend in friends" :key="friend.id" class="widthOneDiv coucou flex flex-col gap-6 items-center my-4 text-center flex-shrink-0 max-[600px]:gap-2">
              <!-- Si il sont en ligne -->
              <div v-if="new Date(friend.last_login).getTime() > new Date().getTime() - 60000" class="relative flex flex-col items-center text-white text-center w-[7rem] max-[600px]:w-[4.4rem]">
                <i class="fa-solid fa-xmark absolute top-[-10px] right-0 cursor-pointer	" @click="delFriends(friend.id)"></i>
                <img
                  :src="friend.avatar_url || '/default-avatar.png'" 
                  class="rounded-full w-[90px] h-[90px] object-cover hover:border-[.2rem] hover:border-white max-[600px]:w-[70px] max-[600px]:h-[70px] max-[600px]:border-[.1rem] max-[500px]:w-[50px] max-[500px]:h-[50px]"
                  :alt="friend.firstname ? `Photo de ${friend.firstname}` : 'Photo inconnue'"
                >
                <div class="flex flex-col items-start">
                  <p class="max-[600px]:text-[14px] max-[500px]:text-[12px]">{{ friend.firstname + ' ' + friend.lastname || 'Nom inconnu' }}</p>
                <div v-if="friend && friend.last_login">
                  <p>
                    <span v-if="new Date(friend.last_login).getTime() > new Date().getTime() - 60000" class="text-green-600 max-[600px]:text-[10px]">
                      Maintenant
                    </span>
                    <span v-else class="opacity-50 max-[600px]:text-[9px]">
                      Il y a {{ convertTimeDiff(friend.last_login) }}
                    </span>
                  </p>
                </div>
                <div v-else>
                  <p class="max-[500px]:text-[10px]">Chargement...</p>
                </div>
                </div>
              </div>
              <div v-else class="flex flex-col items-center text-white text-center opacity-50 relative">
                <i class="fa-solid fa-xmark absolute top-[-10px] right-0 cursor-pointer" @click="delFriends(friend.id)"></i>
              <img
                :src="friend.avatar_url || '/default-avatar.png'" 
                class="rounded-full w-[90px] h-[90px] object-cover hover:border-[.2rem] hover:border-white duration-200 max-[600px]:w-[70px] max-[600px]:h-[70px] max-[600px]:border-[.1rem] max-[500px]:w-[50px] max-[500px]:h-[50px]"
                :alt="friend.full_name ? `Photo de ${friend.full_name}` : 'Photo inconnue'"
              >
              <div class="flex flex-col items-start">
                <p class="max-[600px]:text-[14px] max-[500px]:text-[12px]">{{ friend.firstname + ' ' + friend.lastname || 'Nom inconnu' }}</p>
              <div v-if="friend && friend.last_login">
                <p>
                  <span v-if="new Date(friend.last_login).getTime() > new Date().getTime() - 60000" class="text-green-600 max-[600px]:text-[10px]">
                    Maintenant
                  </span>
                  <span v-else class="opacity-50 max-[600px]:text-[9px]">
                    Il y a {{ convertTimeDiff(friend.last_login) }}
                  </span>
                </p>
              </div>
                <div v-else>
                  <p class="max-[500px]:text-[10px]">Chargement...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';


const sessionStore = useSessionStore();
const friends = ref([]);

async function getFriends() {
    const { data } = await supabase
        .from('friends')
        .select('*')
        .eq('userID', sessionStore.userId);
    console.log(data);
    if (data.length > 0) {
        const { data: amis } = await supabase
            .from('profiles')
            .select('*')
            .in('id', data.map(friend => friend.newfriendsID));
        friends.value = amis;
        
    }
}

const image_url = ref('');


async function getImg() {
    const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', sessionStore.userId);
    if (error) {
        console.error(error);
        return DefaultImg;
    } else {
        image_url.value = data[0].avatar_url;
    }
}

function delFriends(friendId) {
    friends.value = friends.value.filter(friend => friend.id !== friendId);
}

onMounted(() => {
    getFriends();
    getImg();
});

</script>