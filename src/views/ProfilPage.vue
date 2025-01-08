<template>
  <div class="relative h-auto">
    <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran"/>
    <HeadEr :username="sessionStore.mail" />
    <div class="relative z-20 flex w-full flex-col h-full">
    <div class="flex container gap-[5rem]">
      <div class="flex flex-col gap-[5rem] relative z-20 my-10" :class="{'w-[auto]': pageStep === 'info', 'w-[26rem]': pageStep === 'param'}">
          <div class="flex items-center gap-6">
              <img :src="image_url ? image_url : DefaultImg" class="rounded-full w-[120px] h-[120px] object-cover" alt="">
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
                      <br>
                      <br>
                      <br>
                      <br>
                      <br>
                      <br>
                      <br>
                      <br>
                      

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
                        <div class="relative w-[200px] h-[200px] rounded-full flex items-center justify-center">
                          <img :src="image_url" class="absolute opacity-50 rounded-full w-[10rem] h-[10rem] object-cover" alt="">
                          <span class="absolute text-white text-[30px]">+</span>
                          <input type="file" id="imageInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="uploadImage" />
                        </div>
                          <div class="flex gap-10">
                          <p @click="upPicture" class="text-green-600 text-[24px] font-bold cursor-pointer">Modifier</p>
                          <p class="text-red-600 text-[24px] font-bold cursor-pointer">Supprimer</p>
                          </div>
                      
                      </div>

                  </div>
                  <div class="mr-[8rem] flex flex-col gap-6 w-[38rem]">
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Pseudo *</p>
                              <input name="username" type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="username" :placeholder="HugoKyo">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Email *</p>
                              <input name="email" type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="userEmail" placeholder="hugobohard55@gmail.com">
                          </div>
                      </div>

                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Nom *</p>
                              <input name="firstname" type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="name" :placeholder="Hugo">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Prénom *</p>
                              <input name="lastname" type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="last_name" :placeholder="Bohard">
                          </div>
                      </div>

                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Age</p>
                              <input name="age" type="num" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" placeholder="23" :value="age">
                          </div>
                          <div class="flex flex-col gap-4">
                              <p class="text-white text-[22px]">Genre </p>
                              <input name="gender" type="text" class="text-[18px] text-white bg-transparent border-white border-b italic w-[15rem]" :value="gender" placeholder="Homme">
                          </div>
                      </div>
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4 w-full">
                              <p class="text-white text-[22px]">Biographie</p>
                              <textarea name="desc" id="" class="text-[18px] text-white bg-transparent border-white border italic w-[100%] h-[5rem] resize-none" :value="desc"></textarea>
                          </div>
                      </div>
                      <div class="flex justify-between">
                          <div class="flex flex-col gap-4 w-full">
                              <p class="text-white text-[22px]">Centres d’intêrets</p>
                              <div class="flex gap-2 flex-wrap justify-center">
                                <p name="interest" 
                                    v-for="int in availableInterests" 
                                    :key="int"
                                    class="Describe text-white"
                                    @click="toggleInterest(int)"
                                    :class="{'opacity-100': selectedInterests.includes(int), 'opacity-50': !selectedInterests.includes(int)}">
                                    {{ int }}
                                </p>
                            </div>

                          </div>
                      </div>
                      <div class="flex items-center gap-10">
                        <div @click="modify" class="flex items-center bg-green-500 text-[#002233] font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md hover:opacity-80 duration-200 cursor-pointer">
                            <p>Modifier</p>
                        </div>

                          <div @click="del" class="flex items-center border-2 border-red-500 text-red-500 font-bold w-[auto] h-[2rem] py-5 px-8 rounded-md  hover:opacity-80 duration-200 cursor-pointer">
                              <p>Supprimer</p>
                          </div>
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
import DefaultImg from '../assets/img/default_img.png';



const sessionStore = useSessionStore();
const pageStep = ref('info');
const userEmail = ref(sessionStore.mail);
const name = ref('');
const last_name = ref('');
const image_url = ref('');
const utilisateurID = ref('');
const profilType = ref('');
const username = ref('');
const email = ref('');
const desc = ref('');
const age = ref('');
const gender = ref('');
const interest = ref([]);
const selectedInterests = ref([]); // Liste des intérêts sélectionnés par l'utilisateur


const availableInterests = [
  'Sports', 'Musique', 'Voyages', 'Cinéma', 'Cuisine', 'Danse', 'Art', 'Nature', 'Photographie',
  'Jeux vidéo', 'Fitness', 'Peinture', 'Écriture', 'Théâtre', 'Animaux', 'Astronomie', 'Films', 
  'Séries TV', 'Jardinage', 'DIY (Do It Yourself)', 'Esport', 'Natation', 'Surf', 'Ski', 'Escalade', 
  'Voyage en sac à dos', 'Architecture', 'Blogging', 'Vlogging', 'Langues étrangères', 'Moto', 'Poésie', 
  'Café', 'Thé', 'Pêche', 'Chasse', 'Arts martiaux', 'Boxe', 'Astrologie', 'Planche à voile', 'Musculation',
  'Roller', 'Street art', 'Vin', 'Mindfulness', 'Danse classique', 'Culture japonaise', 'Culture coréenne',
  'Manga', 'Anime', 'Jeux de société', 'Jeux de rôle', 'Littérature jeunesse', 'Activités de plein air', 'Bowling', 
  'Golf', 'Football', 'Basketball', 'Rugby', 'Handball', 'Volley-ball', 'Badminton', 'Chant', 'Piano', 
  'Guitare', 'Batterie', 'Violon', 'Flûte', 'Opéra', 'Rap', 'Jazz', 'Blues', 'Rock', 'Pop', 'Cyclisme', 
  'Football américain', 'Motocross', 'Plongée sous-marine', 'Snorkeling', 'Kitesurf'
];


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
      name.value = user.firstname;
      last_name.value = user.lastname;
      image_url.value = user.avatar_url;
      utilisateurID.value = user.id;
      profilType.value = user.profil_type;
      username.value = user.username;
      email.value = sessionStore.mail;
      desc.value = user.desc;
      age.value = user.age;
      gender.value = user.gender;
      interest.value = user.interest ? user.interest.split(',').map(item => 
  item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()) : [];
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

async function uploadImage() {
  const input = document.getElementById('imageInput');
  const file = input.files[0];

  if (file) {
    const filePath = `profil_picture/${file.name.replace(/\s/g, '_')}_${sessionStore.userId}`;

    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file);

    if (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error.message);
    } else {
      const { data: publicURLData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);
      
      image_url.value = publicURLData.publicUrl;
      console.log('Image téléchargée avec succès:', publicURLData.publicUrl);
    }
  } else {
    console.error('Aucun fichier sélectionné');
  }
}



async function modify() {
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const firstname = document.querySelector('input[name="firstname"]').value;
  const lastname = document.querySelector('input[name="lastname"]').value;
  const age = document.querySelector('input[name="age"]').value;
  const gender = document.querySelector('input[name="gender"]').value;
  const desc = document.querySelector('textarea[name="desc"]').value;
  const interest = selectedInterests.value; // Utilisez les centres d'intérêt sélectionnés directement

  try {
    const { data: userData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', sessionStore.mail)
      .single();

    if (error) return console.error('Erreur lors de la récupération des données de l\'utilisateur:', error.message);

    const updates = {};
    const data = {
      username, email, firstname, lastname, age, gender, desc, interest: interest.join(','), avatar_url: image_url.value
    };

    // Comparer et  les champs modifiés
    for (const key in data) {
      if ((data[key]?.toString().trim().toLowerCase() || '') !== (userData[key]?.toString().trim().toLowerCase() || '')) {
        updates[key] = data[key];
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('email', sessionStore.mail);

      if (updateError) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', updateError.message);
      } else {
        await getUser();
        console.log('Champs modifiés :', Object.keys(updates).join(', '));
      }
    } else {
      console.log('Aucune modification à mettre à jour');
    }
  } catch (err) {
    console.error('Erreur inconnue:', err.message);
  }
}

const toggleInterest = (interestName) => {
  const index = selectedInterests.value.indexOf(interestName);

  if (index > -1) {
    selectedInterests.value.splice(index, 1);
  } else {
    selectedInterests.value.push(interestName);
  }
};


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