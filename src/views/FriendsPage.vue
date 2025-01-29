<template>
    <loadingPage v-if="isloading" />
    <div v-if="!isloading">
        <!-- <PopUp :msg_content="msg_content" :msg_Title="msg_Title" :msg_type="msg_type" :msg_show="msg_show" /> -->

        <div class="relative z-20">
            <div class="container mt-10">
                <h1 class="text-white font-bold text-[30px] max-[1000px]:text-[25px] max-[700px]:text-[20px] max-[500px]:text-[16px]">Nouveau amis ?</h1>
                <div class="flex justify-center my-2 items-center">
                    <input v-model="nameselector" class="bg-transparent border-b-2 text-white w-[15rem] italic max-[500px]text-[16px]" placeholder="Hugo Bohard" @input="searchUser" type="text">
                </div>
            </div>
            <div v-if="filteredUsers.length > 0 && isSearching" class="flex flex-col gap-6">
                <div v-for="allUser in filteredUsers" :key="allUser.id" class="m-auto border-2 border-white rounded-lg w-[40%] px-10 opacity-50 duration-100 hover:opacity-100 max-[1500px]:w-[60%] max-[1000px]:w-[70%] max-[750px]:w-[94%]">
                        <div class="flex items-center gap-6">
                            <div @click="$router.push(`/friendsprofile?profildata=${allUser.id}`)" class="flex gap-6 m-auto items-center py-4 max-[500px]:flex-col">
                                <img class="rounded-full w-[90px] h-[90px] object-cover" :src="allUser.avatar_url" alt="">
                                <div class="flex flex-col gap-4">
                                    <div class="flex justify-between">
                                        <p class="text-white">{{ allUser.firstname }} {{ allUser.lastname }}</p>
                                        <p class="text-white">il y a {{ convertTimeDiff(allUser.last_login) }}</p>
                                    </div>
                                    <p class="text-white opacity-50 italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed mollitia ex odio itaque consequatur esse, deleniti provident harum vero quam voluptate obcaecati magni facilis ipsam architecto adipisci minus dolorem delectus.</p>
                                </div>
                            </div>
                            <i @click="addFriend(allUser.id)" class="text-green-600 fa-solid fa-user-plus text-[40px]"></i>
                        </div>
                </div>
            </div>
            <div v-if="isSearching && filteredUsers.length === 0" class="text-white text-center max-[500px]text-[16px]">
                Aucun utilisateur trouvé.
            </div>
            <div class="container mt-10">
                <h1 class="text-white font-bold text-[30px] max-[1000px]:text-[25px] max-[700px]:text-[20px] max-[500px]:text-[16px]">Vos amis ?</h1>
            </div>
            <div class="flex flex-col gap-6 min-h-[60vh]">
                <div v-for="friend in filteredFriends" :key="friend.id" class="m-auto border-2 border-white rounded-lg w-[40%] px-10 opacity-50 duration-100 hover:opacity-100 max-[1500px]:w-[60%] max-[1000px]:w-[70%] max-[750px]:w-[94%]">
                    <div class="flex gap-6 m-auto items-center">
                    <div @click="$router.push(`/friendsprofile?profildata=${friend.id}`)" class="flex gap-6 m-auto items-center py-4 max-[500px]:flex-col">
                        <img class="rounded-full w-[90px] h-[90px] object-cover" :src="friend.avatar_url" alt="">
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between">
                                <p class="text-white">{{ friend.firstname }} {{ friend.lastname }}</p>
                                <p class="text-white">il y a {{ convertTimeDiff(friend.last_login) }}</p>
                            </div>
                            <p class="text-white opacity-50 italic">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed mollitia ex odio itaque consequatur esse, deleniti provident harum vero quam voluptate obcaecati magni facilis ipsam architecto adipisci minus dolorem delectus.
                            </p>
                        </div>
                    </div>
                        <i @click="delFriend(friend.id)" class="text-red-600 fa-solid fa-arrow-right-from-bracket text-[40px]"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../supabase';
import loadingPage from '../components/loadingPage.vue';
// import PopUp from '@/components/PopUp.vue';
import {useSessionStore} from '../stores/sessions';

const sessionStore = useSessionStore();

const name = ref('');
const last_name = ref('');
const image_url = ref('');
const last_login = ref('');
const utilisateurID = ref('');
const AllUser = ref([]);
const AllUserWithSearch = ref([]);
const nameselector = ref('');
const isSearching = ref(false);
const isloading = ref(true);
const msg_show = ref(false);
const msg_Title = ref('');
const msg_content = ref('');
const msg_type = ref('');

const friends = ref([]);




// Récupérer les donnée de la bdd user
async function getUser() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionStore.userId);

    console.log(data);

    if (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
    } else if (data && data.length > 0) {
        const user = data[0];
        name.value = user.firstname;
        last_name.value = user.lastname;
        image_url.value = user.avatar_url;
        // last_login.value = user.last_login;
        utilisateurID.value = user.id;
    } else {
        console.log('Aucun utilisateur trouvé avec cet email');
    }
}

async function getFriends() {
    const { data: friendsData, error: friendsError } = await supabase
        .from('friends')
        .select('*')
        .eq('userID', sessionStore.userId);

    if (friendsError) {
        console.error('Erreur lors de la récupération des amis :', friendsError.message);
    } else if (friendsData) {
        const { data: amis, error: amisError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', friendsData.map(friend => friend.newfriendsID));

        if (amisError) {
            console.error('Erreur lors de la récupération des profils des amis :', amisError.message);
        } else {
            friends.value = amis;
            console.log('Les amis ont été récupérés avec succès', friends.value);
        }
    }
}

// Ajouter un amis (ajoutée l'id de l'amis dans la bdd user a la collums friends_id)
async function addFriend(id) {
    const { data, error } = await supabase
        .from('friends')
        .insert([{ userID: utilisateurID.value, newfriendsID: id }]);

    if (error) {
        console.error('Erreur lors de l\'ajout de l\'ami :', error.message);
    } else {
        console.log('Ami ajouté avec succès', data);
        //   // popup 
        // msg_show.value = true;
        // msg_Title.value = 'Ami';
        // msg_content.value = 'Nouvelle ami ajouté avec succès';
        // msg_type.value = 'info';

        // setTimeout(() => {
        //     msg_show.value = false;
        //     msg_Title.value = '';
        //     msg_content.value = '';
        //     msg_type.value = '';
        // }, 5000);        
        await getUser(); 
        await getFriends();
    }
}

async function delFriend(id){
    const { error } = await supabase
        .from('friends')
        .delete()
        .eq('userID', utilisateurID.value)
        .eq('newfriendsID', id);


        if(error){
            console.error('erreur lors de la suppression de l\'ami :', error.message);
        } else {
            // // popup 
            // msg_show.value = true;
            // msg_Title.value = 'Ami';
            // msg_content.value = 'Triste, ami supprimé avec succès';
            // msg_type.value.valie = 'alerte';

            // setTimeout(() => {
            //     msg_show.value = false;
            //     msg_Title.value = '';
            //     msg_content.value = '';
            //     msg_type.value = '';
            // }, 5000);  
            await getUser();
            await getFriends();
        }
}

async function getAllUser() {

    const { data, error } = await supabase
        .from('profiles')
        .select('*');
                
    if (error) {
        console.error('Erreur lors de la récupération de tous les utilisateurs :', error.message);
    } else {
        console.log('Utilisateurs récupérés :', data); // Vérification
        AllUser.value = data;
    }
}


// Récupérer tout les utilisateurs qui sont dans la table user avec le nom ou le prenom qui correspond a la recherche 
async function getAllUserWithSearch(name) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`firstname.ilike.%${name}%,lastname.ilike.%${name}%`);

    if (error) {
        console.error('Erreur lors de la récupération de tous les utilisateurs :', error.message);
    } else if (data && data.length > 0) {
        AllUserWithSearch.value = data;
    } else {
        AllUserWithSearch.value = [];
    }
}

// Rechercher un utilisateur 
const searchUser = () => {
    // si isSearching.value c'est true ou alors ''
    isSearching.value = true;
    getAllUserWithSearch(nameselector.value);
};

// Filtrer les utilisateurs qui ne sont pas déjà amis et qui ne sont pas la personne connectée
const filteredUsers = computed(() => {
    // if (!AllUserWithSearch.value || !friends.value || !utilisateurID.value) {
    //     console.warn("Données manquantes pour le filtrage des utilisateurs.");
    //     return [];
    // }

    // Obtenir les IDs des amis actuels
    const friendIds = friends.value.map(friend => friend.id);

    // Filtrer les utilisateurs
    const result = AllUserWithSearch.value.filter(user => 
        user.id !== utilisateurID.value && !friendIds.includes(user.id)
    );

    console.log('filteredUsers:', result); // Vérification
    return result;
});

// Filtrer les amis actuels
const filteredFriends = computed(() => {
    if (!AllUser.value || !friends.value) {
        console.warn("Données manquantes pour le filtrage des amis.");
        return [];
    }

    // Obtenir les IDs des amis actuels
    const friendIds = friends.value.map(friend => friend.id);

    // Filtrer les amis
    const result = AllUser.value.filter(user => friendIds.includes(user.id));

    console.log('filteredFriends:', result); // Vérification
    return result;
});

// Convertir la date de dernier login en temps écoulé
const convertTimeDiff = (lastLoginDate) => {
    const now = new Date();
    const lastLogin = new Date(lastLoginDate);
    const diffInSeconds = Math.floor((now - lastLogin) / 1000);

    if (isNaN(lastLogin.getTime())) {
        console.error('La date de dernier login est invalide :', lastLoginDate);
        return 'Date invalide';
    }

    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
    let remainingSeconds = diffInSeconds % (30 * 24 * 60 * 60);
    const weeks = Math.floor(remainingSeconds / (7 * 24 * 60 * 60));
    remainingSeconds %= (7 * 24 * 60 * 60);
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds %= (24 * 60 * 60);
    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds %= (60 * 60);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    if (months > 0) return `${months} mois`;
    if (weeks > 0) return `${weeks} semaine(s)`;
    if (days > 0) return `${days} jour(s)`;
    if (hours > 0) return `${hours} heure(s)`;
    if (minutes > 0) return `${minutes} minute(s)`;
    return `${seconds} seconde(s)`;
};

onMounted(async () => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) console.error('Error getting session:', sessionError);
  
  if (sessionData?.session) {
    sessionStore.setSession(sessionData.session);
    isloading.value = true; // Initialisation au début
    console.log(isloading.value);

    await getUser(); // Attendre que la fonction getUser() soit terminée
    await getAllUser(); // Attendre que getAllUser() soit terminée
    await getAllUserWithSearch(''); // Attendre que getAllUserWithSearch() soit terminée
    await getFriends(); // Attendre que getFriends() soit terminée

    isloading.value = false; // Mettre isloading à false une fois les données récupérées
    console.log(isloading.value);

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

<style scoped>
.container{
  margin-left: 31.6rem;
  margin-right: 31.6rem;
  width: auto;

}

  @media (max-width:1500px){
    .container{
      margin-left: 11rem;
      margin-right: 11rem;
    }
  }

  @media (max-width:1250px){
    .container{
      margin-left: 8rem;
      margin-right: 8rem;
    }
  }


  @media (max-width: 800px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  @media (max-width: 600px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  @media (max-width: 480px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
</style>