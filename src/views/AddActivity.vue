<template>
    <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover" alt="Fond d'écran"/>

    <div class="relative z-20 flex w-full flex-col h-full">
        <HeadEr :username="sessionStore.mail" />
        <h1 class="container relative z-20 text-white text-[24px] font-bold mt-[4rem]">Crée une nouvelle activité</h1>
      <p class="container relative z-20 mt-2 text-white text-[18px] italic opacity-80">Remplir se formulaire pour pouvoir crée une nouvelle activitié est visualisée la prévisualisation de votre activité</p>
        <div class="relative z-20">
            <div class="container flex justify-between my-6 items-center max-[1400px]:flex-col-reverse max-[1400px]:gap-6">
                <div class="w-auto h-auto border-2 border-white flex flex-col p-6">
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start">
                        <div class="flex flex-col gap-4">
                            <label class="text-[18px] text-white" for="">Titre de l’activité</label>
                            <input v-model="activityname" class="bg-transparent border-b border-white text-white" placeholder="Bowling" type="text">
                        </div>
                        <div class="flex flex-col gap-4">
                            <label class="text-[18px] text-white" for="">Lieux</label>
                            <input v-model="activityloc" @keyup.enter="TransformCord()" class="bg-transparent w-[15rem] text-slate-400 italic border-b border-white text-white" placeholder="12 rue de la fleure, Mondeville" type="text">
                        </div>
                    </div>
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start">
                        <div class="flex flex-col gap-4">
                            <label class="text-[18px] text-white" for="">Description de l'activité</label>
                            <textarea v-model="activitydesc" class="p-1 bg-transparent border w-[32rem] border-white h-[10rem] resize-y max-[670px]:w-[20rem] text-white" placeholder="Description de l'activité"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start">
                        <div class="flex flex-col gap-4">
                            <label class="text-[18px] text-white" for="">Image de couverture</label>
                            <div v-if="!imageUrl" class="relative w-[200px] h-[200px] rounded-lg bg-gray-400 flex items-center justify-center">
                                <span class="text-white text-[30px]">+</span>
                                <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="uploadImage" />
                                </div>

                                <img v-else :src="imageUrl" class="w-[200px] h-[200px] rounded-full object-cover" alt="Preview de l'image" />
                            </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-col gap-4">
                                <label class="text-[18px] text-white" for="">Date et heure</label>
                                <input v-model="activitydate" class="bg-transparent text-slate-400 italic border-b border-white text-white" placeholder="12/12/2022 14:00" type="datetime-local">
                            </div>
                            <div class="flex flex-col gap-4">
                                <label class="text-[18px] text-white" for="">Nombre de participants</label>
                                <input v-model="activitypart" class="bg-transparent text-slate-400 italic border-b border-white text-white" placeholder="10" type="number">
                            </div>
                            <div class="flex flex-col gap-4">
                                <label class="text-[18px] text-white" for="">Prix</label>
                                <input v-model="activityprice" class="bg-transparent text-slate-400 italic border-b border-white text-white" placeholder="20 €" type="number">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem]">
                        <button @click="sendNewAct" class="w-[10rem] h-[3rem] rounded-tl-lg rounded-br-lg text-white bg-green-600 hover:bg-green-400 duration-200">Enregistrer</button>
                    </div>
                </div>
                <div>
                    <div class="w-[24rem]">
                        <div class="w-[24rem] bg-[#3B5562] py-10 rounded-sm shadow-xl relative ">
                            <img :src="imageUrl ? imageUrl : defaultimg " alt="">
                            <div class="flex justify-between items-center px-3 pt-4">
                            <div class="flex gap-4 items-center">
                                <img :src="image_url" class="rounded-full w-[60px] h-[60px] object-cover" alt="">
                                <div>
                                <h2 class="text-white text-[18px] font-bold">{{activityname ? activityname : "null"}}</h2>
                                <p class="text-white opacity-50 text-[14px]">Par {{last_name + ' ' + name}}</p>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 justify-start">
                                <div class="flex flex-col items-end">
                                <p class="text-white opacity-80 text-[14px]">0/{{ activitypart ? activitypart : 0}}</p>
                                <p class="text-white opacity-50 text-[14px]">{{ activityloc ? activityloc : "null" }}</p>
                                </div>
                            </div>
                            </div>
                            <div class="flex items-center text-[10px] text-white gap-2 flex-row-reverse px-3">
                                <p>0/{{ activitypart ? activitypart : 0 }}</p>
                                <progress :max="activitypart ? activitypart : 0" :value="0" class="h-2 w-[6rem]"></progress>
                            </div>
                            <p class="text-white text-[16px] opacity-80 mt-5 italic px-3">{{activitydesc ? activitydesc : "null"}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>

    import fond from '../assets/img/fond.svg';
    import HeadEr from '../components/HeadEr.vue';
    import defaultimg from '../assets/img/default_activite.svg';
    import { ref, onMounted } from 'vue'
    import { supabase } from '../supabase';
    import { useSessionStore } from '../stores/sessions';
    import axios from 'axios';
    
    const sessionStore = useSessionStore();
    const msg_content = ref('')
    const msg_Title = ref('')
    const msg_type = ref('')
    const msg_show = ref(false)
    const name = ref(''),
    last_name = ref(''),
    image_url = ref(''),
    friends_id = ref([]),
    last_login = ref(''),
    utilisateurID = ref(''),
    activityname = ref(''),
    activityloc = ref(''),
    activitydesc = ref(''),
    activitypart = ref(''),
    activityprice = ref(''),
    activitydate = ref(''),
    imageUrl = ref(''),
    latitude = ref(''),
    longitude = ref('');

    async function TransformCord(){
        console.log(activityloc.value)
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: activityloc.value,
            format: "json",
            addressdetails: 1,
            limit: 1,
        },
        });

        if (response.data && response.data.length > 0) {
            latitude.value = response.data[0].lat;
            longitude.value = response.data[0].lon;
            console.log('Coordonnées transformées avec succès');
            console.log('Latitude :', latitude.value);
            console.log('Longitude :', longitude.value);
        } else {
            console.log('Adresse non trouvée');
        }

    }


    async function getUser() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionStore.userId);

        if (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        } else {
          if (data && data.length > 0) {
            name.value = data[0].firstname;        
            last_name.value = data[0].lastname;
            image_url.value = data[0].image_url;
            utilisateurID.value = data[0].id;
          } else {
            console.log('Aucun utilisateur trouvé avec cet email');
          }
        }
    }
    async function uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const fileName = `${Date.now()}-${file.name}`;
            
            // Upload de l'image dans Supabase Storage
            const { data, error } = await supabase.storage
            .from('activity-pictures')
            .upload(fileName, file);

            if (error) {
            console.error('Erreur lors de l\'upload :', error.message, data);
            } else {
            const { data: publicURLData } = supabase.storage
                .from('activity-pictures')
                .getPublicUrl(fileName);

            if (publicURLData) {
                imageUrl.value = publicURLData.publicUrl;
                console.log("URL de l'image obtenue :", imageUrl.value);
            } else {
                console.error("Impossible d'obtenir l'URL publique.");
            }
            }
        }
    };


    async function sendNewAct(){
        activitydate.value = "2024-12-12"
        const { data, error } = await supabase
          .from('activity')
          .insert([
            {
              name: activityname.value,
            //   desc: activitydesc.value,
              owner: last_name.value + ' ' + name.value,
              location: activityloc.value,
              start_time: activitydate.value,
              price: activityprice.value,
              max_participants: activitypart.value,
              latitude: latitude.value,
              longitude: longitude.value
            //   image_url: imageUrl.value,
            //   creator_id: utilisateurID.value,
            //   user_join: utilisateurID.value,
            },
          ]);

        if (error) {
          console.error('Erreur lors de l\'insertion de l\'activité :', error.message);
          console.log(name.value + ' ' + last_name.value + ' ' + activityname.value + ' ' + activitydesc.value + ' ' + activityloc.value + ' ' + activitydate.value + ' ' + activityprice.value + ' ' + activitypart.value + ' ' + imageUrl.value + ' ' + utilisateurID.value);
        } else {
            console.log('Activité insérée avec succès :', data);
            activityname.value = '';
            activityloc.value = '';
            activitydesc.value = '';
            activitypart.value = '';
            activityprice.value = '';
            activitydate.value = '';
            imageUrl.value = '';
        }
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
        TransformCord();
        });
</script>