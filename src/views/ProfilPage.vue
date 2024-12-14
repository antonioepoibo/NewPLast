<template>
    <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover" alt="Fond d'écran"/>
    <HeadEr :username="sessionStore.mail" />
    <div class="relative z-20 flex w-full flex-col h-full">
    <div class="flex container gap-[5rem]">
      <div class="flex flex-col gap-[5rem] relative z-20 my-10" :class="{'w-[auto]': pageStep === 'info', 'w-[26rem]': pageStep === 'param'}">
          <div class="flex items-center gap-6">
              <img :src="image_url" class="rounded-full w-[120px] h-[120px] object-cover" alt="">
              <div>
                  <h1 class="text-white font-bold text-[24px]"> {{ last_name + ' ' + name  }}</h1>
                  <p class="text-white">0 xp</p>
              </div>
          </div>

          <div class="flex flex-col gap-8">
              <div @click="Info" class="flex gap-2 items-center cursor-pointer">
                  <div class="rounded-full bg-transparent border-2 border-white relative w-[20px] h-[20px]"></div>
                  <p :class="{'underline': pageStep === 'info', 'hover:underline': pageStep === 'param'}" class="text-white text-[18px]">Mes activité</p>
              </div>
              <div @click="Param" class="flex gap-2 items-center cursor-pointer">
                  <div class="rounded-full bg-transparent border-2 border-white relative w-[20px] h-[20px]"></div>
                  <p :class="{'underline': pageStep === 'param', 'hover:underline': pageStep === 'info'}" class="text-white text-[18px]">Paramètres</p>
              </div>
          </div>
      </div>
      <div>
          <div v-if="pageStep === 'info'" class="flex flex-col gap-[5rem] my-[5rem] relative z-20">
              <div class="mt-[5rem] flex flex-col gap-6">
                  <div class="flex flex-col gap-4">
                      <h1 class="text-white font-bold text-[24px]">Mes statistique</h1>
                      <p class="text-white opacity-70 text-[18px] italic">Sur cette page, vous trouverez toutes les informations relatives à votre compte.</p>
                  </div>

                  <div>
                      <h1 class="text-white font-bold text-[24px]">Mes statistique</h1>

                  </div>
              </div>
          </div>

          <div v-if="pageStep === 'param'" class="flex flex-col gap-[5rem] my-[5rem] relative z-20">
              <div class="mt-[5rem] flex flex-col gap-6">
                  <div class="flex flex-col gap-4">
                      <h1 class="text-white font-bold text-[26px]">Editer mes information</h1>
                      <p class="text-white opacity-70 text-[18px] italic">Sur cette page, vous trouverez toutes les informations relatives à votre profil et vous pourrez les modifier a votre guise a tout moment </p>
                  </div>

                  <div>
                      <h1 class="text-white text-[22px]">Photo de profil</h1>
                      <div class="flex gap-[6rem] items-center my-[2.5rem]">

                          <img :src="image_url" class="rounded-full w-[10rem] h-[10rem] object-cover" alt="">
                          <div class="flex gap-10">
                          <p class="text-green-600 text-[24px] font-bold cursor-pointer">Modifier</p>
                          <p class="text-red-600 text-[24px] font-bold cursor-pointer">Supprimer</p>
                          </div>
                      
                      </div>

                  </div>
                  <div class="mr-[8rem] flex flex-col gap-6 w-[38rem]">
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Pseudo *</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="name" :placeholder="HugoKyo">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Email *</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="userEmail" placeholder="hugobohard55@gmail.com">
                          </div>
                      </div>

                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Nom *</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="name" :placeholder="Hugo">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Prénom *</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="last_name" :placeholder="Bohard">
                          </div>
                      </div>

                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Numéro de téléphone</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" placeholder="06060606">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Type de profil *</p>
                              <input type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="profilType ? profilType : 'Selectionner votre profil'" placeholder="Selectionner votre profil">
                          </div>
                      </div>
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4 w-full">
                              <p class="text-white text-[22px]">Biographie</p>
                              <textarea name="" id="" class="text-[18px] text-white bg-transparent border-white border italic w-[100%] h-[5rem] resize-none" :value="bio"></textarea>
                          </div>
                      </div>
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4 w-full">
                              <p class="text-white text-[22px]">Centres d’intêrets</p>
                                  <div class="flex gap-5 flex-wrap justify-center">
                                      <div class="flex gap-2 mr-8 text-center text-white">
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Amical(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Créatif(ve)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Passionné(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Curieux(se)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Dynamique</div>
                                      </div>
                                      <div class="flex gap-2 ml-8 text-center text-white">
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Optimiste</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Drôle</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Empathique</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Ambitieux(se)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Aventurier(ère)</div>
                                      </div>
                                      <div class="flex gap-2 mr-8 text-center text-white">
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Sociable</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Réfléchi(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Indépendant(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Spontané(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Bienveillant(e)</div>
                                      </div>
                                          <div class="flex gap-2 ml-8 text-center text-white">
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Sincère</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Énergique</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Inspirant(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Ouvert(e)</div>
                                          <div class="Describe opacity-50 duration-200 hover:opacity-100 text-[14px]">Authentique</div>
                                      </div>    
                                  </div>
                          </div>
                      </div>
                      <div class="flex items-center gap-10">
                          <div @click="modifiy" class="flex items-center bg-green-500 text-[#002233] font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md hover:opacity-80 duration-200 cursor-pointer">
                              <p>Modifier</p>
                          </div>
                          <div @click="modifiy" class="flex items-center border-2 border-red-500 text-red-500 font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md  hover:opacity-80 duration-200 cursor-pointer">
                              <p>Supprimer</p>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
      </div>
    </div>
</div>
</template>

<script setup>

import HeadEr from '../components/HeadEr.vue';

import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import fond from '../assets/img/fond.svg';
import { useSessionStore } from '../stores/sessions';


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
      .eq('email',sessionStore.mail);

  if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
  } else if (data && data.length > 0) {
      const user = data[0];
      name.value = user.name;
      last_name.value = user.lastname;
      image_url.value = user.image_url;
      friends_id.value = user.friends_id.split(',').map(id => id.trim());
      last_login.value = user.last_login;
      utilisateurID.value = user.id;
      profilType.value = user.profil_type;
      bio.value = user.bio;
  } else {
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
  if (sessionError) console.error('Error getting session:', sessionError);

  if (sessionData?.session) {
    sessionStore.setSession(sessionData.session);
    getUser();
  } else {
    sessionStore.clearSession();
  }

  supabase.auth.onAuthStateChange((event, newSession) => {
    if (event === 'SIGNED_IN' && newSession) {
      sessionStore.setSession(newSession);
      console.log(sessionStore.userId);
      getUser();
    } else if (event === 'SIGNED_OUT') {
      sessionStore.clearSession();
    }
  });
});
</script>

<style>

.Describe{
background-color: transparent;
border: gray solid 2px;
width: auto;
height: 1.6rem;
border-radius: 100px;
padding: 0 1rem;
cursor: pointer;
}

</style>