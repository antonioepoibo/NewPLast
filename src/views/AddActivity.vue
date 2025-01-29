<template>
    <div class="relative h-auto">

    <div class="relative z-20 flex w-full flex-col h-full">
        <h1 class="container relative z-20 text-white text-[24px] font-bold mt-[4rem] max-[500px]:text-[17px]">Crée une nouvelle activité</h1>
      <p class="container relative z-20 mt-2 text-white text-[18px] italic opacity-80 max-[500px]:text-[12px]">Remplir ce formulaire pour pouvoir créer une nouvelle activité et prévisualiser le contenu</p>
        <div class="relative z-20">
            <div class="container flex justify-between my-6 items-center max-[1400px]:flex-col-reverse max-[1400px]:gap-6">
                <div class="w-auto h-auto border-2 border-white flex flex-col p-6 max-[500px]:w-[98%]">
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start max-[500px]:px-0 max-[500px]:gap-6">
                        <div class="flex flex-col gap-4 max-[500px]:w-full max-[500px]:gap-2">
                            <label class="text-[18px] text-white max-[500px]:text-[16px]" for="">Titre de l’activité</label>
                            <input v-model="activityname" class="bg-transparent border-b border-white text-white max-[500px]:text-[14px] max-[500px]:w-full" placeholder="Bowling" type="text">
                        </div>
                        <div class="flex flex-col gap-4 max-[500px]:w-full max-[500px]:gap-2">
                            <label class="text-[18px] text-white" for="">Lieux</label>
                            <input 
                                v-model="activityloc" 
                                @input="fetchSuggestions" 
                                @blur="clearSuggestions"
                                @keyup.enter="TransformCord()"
                                class="bg-transparent w-[15rem]italic border-b border-white text-white max-[500px]:w-full " 
                                placeholder="12 rue de la fleure, Mondeville" 
                                type="text"
                            />
                            <ul v-if="suggestions.length > 0" class="bg-white text-black border mt-2 rounded shadow-md max-h-[200px] overflow-y-auto">
                                <li 
                                    v-for="suggestion in suggestions" 
                                    :key="suggestion.id" 
                                    @click="selectSuggestion(suggestion)" 
                                    class="p-2 cursor-pointer hover:bg-gray-300"
                                >
                                    {{ suggestion.place_name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start max-[500px]:px-1">
                        <div class="flex flex-col gap-4 max-[500px]:w-full">
                            <label class="text-[18px] text-white max-[500px]:text-[16px] max-[500px]:w-full" for="">Description de l'activité</label>
                            <textarea v-model="activitydesc" class="p-1 bg-transparent border w-[32rem] border-white h-[10rem] resize-y max-[670px]:w-[20rem] text-white max-[500px]:w-full" placeholder="Description de l'activité"></textarea>
                        </div>
                    </div>
                    <div class="w-[80%] max-[500px]:w-full">
                        <div class="flex gap-2 flex-wrap flex-shrink-0 max-[500px]:justify-center">
                            <p @click="addType" :class="{'opacity-50': !keyword.includes(type), 'opacity-100': keyword.includes(type), 'cursor-not-allowed': keyword.split(',').length >= 3 && !keyword.includes(type), 'cursor-pointer': keyword.split(',').length < 3 || keyword.includes(type)}" :id="type" class="TypeContainer border border-white text-sm w-auto px-6 py-3 flex items-center whitespace-nowrap text-white h-6 rounded-full opacity-50 transition duration-200 text-[10px] flex-shrink-0 max-[500px]:text-[9px] max-[500px]:py-1 max-[500px]:px-2" v-for="type in simplifiedActivityTypes" :key="type">{{ type }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between items-center px-8 my-4 gap-[6rem] max-[670px]:flex-col max-[670px]:gap-2 max-[670px]:items-start">
                            <div class="flex flex-col gap-4">
                                <label class="text-[18px] text-white">Début de l'activité</label>
                                <input v-model="activityStartdate" class="bg-transparent text-slate-400 italic border-b border-white text-white" placeholder="12/12/2022 14:00" type="datetime-local">
                                {{ activityStartdate  }}
                            </div>
                            <div class="flex flex-col gap-4">
                                <label class="text-[18px] text-white">Fin de l'activité</label>
                                <input v-model="activityEnddate" class="bg-transparent text-slate-400 italic border-b border-white text-white" placeholder="12/12/2022 14:00" type="datetime-local">
                            </div>
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
                        <div class="w-[24rem] bg-[#3B5562] py-10 rounded-sm shadow-xl relative max-[500px]:w-[86%] max-[500px]:m-auto">
                            <img :src="imageUrl ? imageUrl : defaultimg " alt="">
                            <div class="flex justify-between items-center px-3 pt-4">
                            <div class="flex gap-4 items-center">
                                <img :src="image_url" class="rounded-full w-[60px] h-[60px] object-cover" alt="">
                                <div>
                                <h2 class="text-white text-[18px] font-bold max-[500px]:text-[14px]">{{activityname ? activityname : "null"}}</h2>
                                <p class="text-white opacity-50 text-[14px] max-[500px]:text-[10px]">Par {{last_name + ' ' + name}}</p>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 justify-start">
                                <div class="flex flex-col items-end">
                                <p class="text-white opacity-80 text-[14px] max-[500px]:text-[10px]">0/{{ activitypart ? activitypart : 0}}</p>
                                <p class="text-white opacity-50 text-[14px] max-[500px]:text-[10px]">{{ activityloc ? activityloc : "null" }}</p>
                                </div>
                            </div>
                            </div>
                            <div class="flex items-center text-[10px] text-white gap-2 flex-row-reverse px-3">
                                <p>0/{{ activitypart ? activitypart : 0 }}</p>
                                <progress :max="activitypart ? activitypart : 0" :value="0" class="h-2 w-[6rem]"></progress>
                            </div>
                            <p class="text-white text-[16px] opacity-80 mt-5 italic px-3 max-[500px]:text-[12px]">{{activitydesc ? activitydesc : "null"}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>
<script setup>
    import defaultimg from '../assets/img/default_activite.svg';
    import { ref, onMounted } from 'vue'
    import { supabase } from '../supabase';
    import { useSessionStore } from '../stores/sessions';
    import axios from 'axios';
    
    const suggestions = ref([]);
    const sessionStore = useSessionStore();
    const name = ref(''),
    last_name = ref(''),
    image_url = ref(''),
    utilisateurID = ref(''),
    activityname = ref(''),
    activityloc = ref(''),
    activitydesc = ref(''),
    activitypart = ref(''),
    activityprice = ref(''),
    activityStartdate = ref(''),
    activityEnddate = ref(''),
    imageUrl = ref(''),
    latitude = ref(''),
    longitude = ref('');
    const keyword = ref('');
    const simplifiedActivityTypes = [
        "Sport", "Performance", "Créativité", "Culture", "Découverte", "Observation", "Stratégie", "Bien-être", "Compétition", "Apprentissage", "Plein air", "Fête", "Collaboration", "Relaxation", "Improvisation", "Aventure", "Défi", "Nocturne", "Art", "Exploration", "Technologie", "Thème", "Immersion", "Tradition", "Langue", "Construction", "Science", "Spiritualité", "Cuisine", "Théâtre", "Douceur", "Danse", "Méditation", "Aquatique", "Développement", "Musique",
        "Jeux", "Nature", "Ludique", "Extrême", "Expression", "Saisonnier", "Bricolage", "Écologie", "Survie", "Photographie", "Énigmes", "Partage", "Local", "Musical", "Détente"
    ];
    async function addType(){
        const select = event.target.id;
        let keywordsArray = keyword.value.split(',').map(item => item.trim()).filter(item => item !== '');
        
        if (keywordsArray.includes(select)) {
            keywordsArray = keywordsArray.filter(item => item !== select);
        } else {
            if (keywordsArray.length < 3) { // Limit to 3 keywords
                keywordsArray.push(select);
            } else {
                console.log('Maximum of 3 keywords allowed');
                return; // Exit if there are already 3 keywords
            }
        }
        
        keyword.value = keywordsArray.join(', ');
        console.log(keyword.value);
    }

    // Fetch suggestions from Mapbox API
    async function fetchSuggestions() {
        if (activityloc.value.trim().length > 2) {
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(activityloc.value) + '.json', {
                params: {
                    access_token: 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog',
                    autocomplete: true,
                    limit: 5,
                },
            });

            suggestions.value = response.data.features || [];
        } else {
            suggestions.value = [];
        }
    }

    // Handle suggestion selection
    function selectSuggestion(suggestion) {
        activityloc.value = suggestion.place_name;
        latitude.value = suggestion.center[1];
        longitude.value = suggestion.center[0];
        suggestions.value = [];
    }

    // Clear suggestions on blur
    function clearSuggestions() {
        setTimeout(() => (suggestions.value = []), 100);
    }


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

    async function sendNewAct() {
        const now = new Date();
        const startDate = new Date(activityStartdate.value);
        const endDate = new Date(activityEnddate.value);

        // Vérification que tous les champs soient remplis
        if (!activityname.value || !activityloc.value || !activitydesc.value || !activitypart.value || 
            !activityprice.value || !activityStartdate.value || !activityEnddate.value) {
            alert("Tous les champs doivent être remplis.");
            console.error("Un ou plusieurs champs sont vides.");
            return;
        }

        // Vérification des dates
        if (startDate < now) {
            console.error("La date de début ne peut pas être dans le passé.");
            alert("La date de début ne peut pas être dans le passé.");
            return;
        }
        if (endDate < now) {
            console.error("La date de fin ne peut pas être dans le passé.");
            alert("La date de fin ne peut pas être dans le passé.");
            return;
        }

        if (endDate <= startDate) {
            console.error("La date de fin doit être postérieure à la date de début.");
            alert("La date de fin doit être postérieure à la date de début.");
            return;
        }

        // Vérification du nombre de participants et du prix
        if (isNaN(activitypart.value) || activitypart.value <= 0) {
            console.error("Le nombre de participants doit être un nombre positif.");
            alert("Le nombre de participants doit être un nombre positif.");
            return;
        }
        if (isNaN(activityprice.value) || activityprice.value < 0) {
            console.error("Le prix ne peut pas être négatif.");
            alert("Le prix ne peut pas être négatif.");
            return;
        }

        // Préparation et envoi des données
        const { data, error } = await supabase
            .from("activity")
            .insert([
                {
                    name: activityname.value,
                    desc: activitydesc.value,
                    location: activityloc.value,
                    start_time: activityStartdate.value,
                    end_time: activityEnddate.value,
                    price: activityprice.value,
                    max_participants: activitypart.value,
                    image_url: imageUrl.value,
                    owner: name.value + " " + last_name.value,
                    latitude: latitude.value,
                    longitude: longitude.value,
                    type: keyword.value,
                },
            ]);

        if (error) {
            console.error("Erreur lors de l'ajout de l'activité :", error.message);
            console.log(activityname.value + ' ' + activitydesc.value + ' ' + activityloc.value + ' ' + activityStartdate.value + ' ' + activityEnddate.value + ' ' +activityprice.value + ' ' +  activitypart.value + ' ' + imageUrl.value + ' ' + utilisateurID.value + ' ' + latitude.value + ' ' + longitude.value + ' ' + keyword.value);
            alert("Erreur lors de la création de l'activité. Veuillez réessayer.");
        } else {
            console.log("Activité ajoutée avec succès :", data);
            alert("L'activité a été créée avec succès !");
            // Réinitialiser les champs du formulaire
            activityname.value = "";
            activityloc.value = "";
            activitydesc.value = "";
            activitypart.value = "";
            activityprice.value = "";
            activityStartdate.value = "";
            activityEnddate.value = "";
            imageUrl.value = "";
            keyword.value = "";
            latitude.value = "";
            longitude.value = "";
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