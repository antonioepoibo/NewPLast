<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['session'])
const { session } = toRefs(props)
const router = useRouter()

const loading = ref(true)
const company_name = ref('')
const location = ref('')
const firstname = ref('')
const industry = ref('')
const website_url = ref(null)
const phone_number = ref('')
const selectedIndustry = ref([])


// Liste d'intérêts prédéfinis
const availableIndustry = [
  "Cinéma", "Bowling", "Parcs d’attractions", "Théâtre", "Concerts", "spectacles", 
  "Jeux vidéo et eSports", "Escape rooms", "Bars", "Discothèques", "Musées et galeries d'art", 
  "Zoos", "Aquariums", "Festivals", "Casinos", "Karaokés", "Mini-golf", "Sports extrêmes", "Croisières", 
  "Parcs aquatiques", "Salles de jeux d’arcade", "Restaurants", "Cafés", 
  "Fast-food", "Hôtels", "Hébergements", "Salons de coiffure", "Barbiers", "Instituts de beauté et spas", 
  "Fitness","Gymnases", "Éducation", "Formation"
];


onMounted(() => {
  getProfile()
})

async function getProfileCompany() {
  try {
    loading.value = true
    const { company } = session.value

    const { data, error, status } = await supabase
      .from('company')
      .select(`company_name, location, industry, website_url, phone_number`)
      .eq('id_business', company.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      company_name.value = data.company_name
      location.value = data.location
      industry.value = data.industry
      website_url.value = data.website_url
      phone_number.value = data.phone_number
      selectedIndustry.value = data.industry ? data.industry.split(', ') : []
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { company } = session.value

    const updates = {
      id: company.id,
      company_name: company_name.value,
      location: location.value,
      industry: selectedIndustry.value.join(', '),
      website_url: website_url.value,
      phone_number: phone_number.value,
    }

    const { error } = await supabase.from('company').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

function goToHomePage() {
  router.push('/HomePage')
}

function toggleIndustry(industry) {
  if (selectedIndustry.value.includes(industry)) {
    selectedIndustry.value = selectedIndustry.value.filter(i => i !== industry)
  } else if (selectedIndustry.value.length < 1) {
    selectedIndustry.value.push(industry)
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="form-container">
    <h1>Profil Entreprise</h1>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled class="input-field" />
      </div>
      <div class="form-group">
        <label for="company_name">Nom de l'Entreprise</label>
        <input id="company_name" type="text" v-model="company_name" class="input-field" />
      </div>
      <div class="form-group">
        <label for="location">Localisation</label>
        <input id="location" type="text" v-model="location" class="input-field" />
      </div>
      <div class="form-group">
        <label for="website_url">Website</label>
        <input id="website_url" type="text" v-model="website_url" class="input-field" />
      </div>
      <div class="form-group">
        <label for="phone_number">Numero de telephone</label>
        <input id="phone_number" type="text" v-model="phone_number" class="input-field" />
      </div>
      <div class="form-group">
        <label>Type d'Entreprise</label>
        <div class="industry-container">
          <button
            v-for="item in availableIndustry"
            :key="item"
            :class="['industry-button', selectedIndustry.includes(item) ? 'selected' : '']"
            @click.prevent="toggleIndustry(item)"
            :disabled="!selectedIndustry.includes(item) && selectedIndustry.length >= 1"
          >
            {{ item }}
          </button>
        </div>
        <p class="selected-industry">Sélectionnés : {{ selectedIndustry.join(', ') }}</p>
      </div>
      <div class="form-actions">
        <input
          type="submit"
          class="button primary"
          :value="loading ? 'Chargement...' : 'Mettre à jour'"
          :disabled="loading"
        />
        <button class="button secondary" @click="goToHomePage">Aller à la page d'accueil</button>
        <button class="button secondary" @click="signOut" :disabled="loading">Déconnexion</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.form-container {
  max-width: 500px;
  margin: 2em auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5em;
}

.input-field {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.interests-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 0.5em;
}

.interest-button {
  padding: 0.5em 1em;
  border: 1px solid #007bff;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  color: #007bff;
  background-color: white;
}

.interest-button.selected {
  background-color: #007bff;
  color: white;
}

.interest-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.selected-interests {
  font-size: 0.9em;
  color: #555;
  margin-top: 0.5em;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1em;
}

.button {
  flex: 1;
  padding: 0.75em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button.primary {
  background-color: #007bff;
  color: white;
}

.button.primary:hover {
  background-color: #0056b3;
}

.button.secondary {
  background-color: #f44336;
  color: white;
}

.button.secondary:hover {
  background-color: #d32f2f;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
