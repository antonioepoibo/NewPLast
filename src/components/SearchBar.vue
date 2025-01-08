<template>
    <div class="flex flex-col gap-6 items-center justify-center m-auto my-6">
        <div v-if="searchBar !== false" class="flex gap-4 items-center border border-white rounded-full px-10 py-2 bg-white">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" v-model="searchQuery" @input="updateSearchQuery" class="bg-transparent focus:outline-none border-transparent w-[20rem]  max-[600px]:w-[10rem] max-[600px]:text-[12px]" placeholder="Que faire aujourd'hui ?">
            <i class="fa-solid fa-align-left"></i>
        </div>
        <div v-if="searchBar !== false" class="flex gap-6 text-center max-[600px]:gap-2">
            <span 
                v-for="(category, index) in categories.slice(0, 5)" 
                :key="index" 
                class="btn cursor-pointer hover:opacity-80 " 
                @click="setCategoryAsSearchQuery(category)">
                {{ category }}
            </span>
        </div>
    </div>
</template>


<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useSessionStore } from '../stores/sessions';
import DefaultImg from '../assets/img/default_img.png';
import {supabase} from '../supabase'
const sessionStore = useSessionStore();
const searchQuery = ref(''); // Reactive state for search query
const categories = ['Cinéma', 'Bowling', 'Foot', 'Soirée bar', 'Paintball', 'Lazer Game'];
const props = defineProps({
  searchBar: String
});
const emit = defineEmits(); // Define emits
const image_url = ref('');

async function getImg(){
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

// Emit the search query when the input changes
function updateSearchQuery() {
emit('update:searchQuery', searchQuery.value); // Emit the search query to parent
}

function setCategoryAsSearchQuery(category) {
searchQuery.value = category; // Update the search query with the selected category
emit('update:searchQuery', searchQuery.value); // Emit the updated search query to parent
}


getImg();
</script>
