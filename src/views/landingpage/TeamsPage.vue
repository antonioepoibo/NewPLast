<template>

    <div class="FristSec margin flex flex-col justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] text-center">Pourquoi NewP</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[40rem] text-center m-auto">Vous nous posez souvent la question : pourquoi NewP ? Aujourd’hui, vous allez enfin le découvrir !</h2>
        </div>
    </div>

    <div class="SecondeSec margin flex justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem]">
            <h1 class="text-[36px] text-bleuFonce work-sans-bold">La formation De NewP</h1>
            <p class="text-[20px] text-bleuFonce work-sans-regular w-[80%]">NewP a été créé en octobre 2024 dans les locaux d'Orange Innovation à Caen par sept étudiants issus de différentes écoles (MyDigitalSchool, UniCaen et l’EnsiCaen). L'objectif de cette application était de concevoir une start up, en collaboration avec Orange, afin de répondre à une problématique spécifique.</p>
            <p class="text-[24px] text-bleuFonce work-sans-semibold text-center w-[80%]">“Aider les personnes a faire de nouvelle rencontre amical”</p>
            <p class="text-[20px] text-bleuFonce work-sans-regular w-[80%]">Et c’est ainsi que la NewP Team est née, réunissant sept étudiants dévoués à répondre à cette problématique percutante et poignante, ressentie par de nombreux étudiants et autres personnes !</p>
        </div>
        <img :src="newpCorp" alt="">
    </div>

    <div class="TresSec margin flex flex-col justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] text-center">La Newp’Teams</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[40rem] text-center m-auto">Voici les différentes personnes qui ont contribué à ce projet</h2>
        </div>

        <div class="relative max-w-[1027px] overflow-hidden my-8">
            <div class="flex gap-[4rem] transition-transform duration-300" :style="{ transform: `translateX(-${currentIndex * 106}%)` }">
                <div v-for="team in teams" :key="team.id" class="flex flex-col gap-2 w-[299px] shrink-0">
                <div class="relative w-[299px] h-[312px]">
                    <img :src="fondbleu" alt="Fond bleu" />
                    <img :src="team.image" class="absolute bottom-0 right-0" alt="Photo membre" />
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-[20px] work-sans-semibold">{{ team.name }}</p>
                    <img :src="team.logo" alt="Logo" />
                </div>
                <p class="work-sans-regular text-[20px]">{{ team.role }}</p>
                </div>
            </div>
        </div>

        <!-- Indicateurs -->
        <div class="flex gap-4 mt-6">
            <div v-for="(n, index) in totalSlides" :key="index" class="w-4 h-4 rounded-full transition-all duration-300" :class="index === currentIndex ? 'bg-green-600/50 border-green-600 border-2' : 'bg-gray-400'" @click="currentIndex = index"></div>
        </div>
    </div>

</template>

<script setup>
    import newpCorp from "../../assets/img/NewpCorporate.svg";
    import fondbleu from "../../assets/img/fondbleu.svg";
    import mds from "../../assets/img/mds.svg";
    import unicaen from "../../assets/img/unicaen.svg";
    import ensiCaen from "../../assets/img/ensiCaen.svg";
    import orange from "../../assets/img/orange.svg";
    import {ref, computed, onMounted} from "vue";

    const teams = ref([
        {
            name: "Hamard Titouan",
            role: "Graphique Design",
            logo: mds,
            image: "/src/assets/img/titou.svg",
        },
        {
            name: "Montals Ilona",
            role: "Web designeuse",
            logo: mds,
            image: "/src/assets/img/ilo.svg",
        },
        {
            name: "Bohard Hugo",
            role: "Développeur Front",
            logo: mds,
            image: "/src/assets/img/hugo.svg",
        },
        {
            name: "Mathieu Marly",
            role: "Charger de development",
            logo: unicaen,
            image: "/src/assets/img/marly.svg",
        },
        {
            name: "Cimino Antonio",
            role: "PDG - Developeur back",
            logo: ensiCaen,
            image: "/src/assets/img/antonio.svg",
        },
        {
            name: "Nguyen Paul",
            role: "Feature owner",
            logo: ensiCaen,
            image: "/src/assets/img/paul.svg",
        },
        {
            name: "Lu Cecile",
            role: "Feature owner",
            logo: ensiCaen,
            image: "/src/assets/img/cecile.svg",
        },
        {
            name: "Chocolat chaud",
            role: "Reconfort",
            logo: orange,
            image: "/src/assets/img/choco.svg",
        },
    ])

    const currentIndex = ref(0);

    const totalSlides = computed(() => Math.ceil(teams.value.length / 3));
    
    const autoslide = () => {
        setInterval(() => {
            nextSlide();
            
        }, 5000);
    }

    onMounted(() => {
        autoslide();
    });

    const nextSlide = () => {
        if (currentIndex.value < totalSlides.value - 1) {
            currentIndex.value++;
        }
        else {
            currentIndex.value = 0;
        }
    };


    
</script>

<style scoped>

body{
    background-color: #F2F1F1;
}

@media (min-width: 1710px) {
      .margin{
          margin: 0 230px;
      }
  }

@media (max-width: 1710px) {
    .margin{
        margin: 0 200px;
    }
}

@media (max-width: 1440px) {
    .margin{
        margin: 0 130px;
    }
}
</style>