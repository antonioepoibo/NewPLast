<template>

    <div class="FristSec margin flex flex-col justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem] max-[500px]:gap-[1rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] text-center max-[500px]:w-full max-[500px]:text-[16px]">Pourquoi NewP</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[40rem] text-center m-auto max-[500px]:w-full max-[500px]:text-[14px] max-[500px]:px-6">Vous nous posez souvent la question : pourquoi NewP ? Aujourd’hui, vous allez enfin le découvrir !</h2>
        </div>
    </div>

    <div class="SecondeSec margin flex justify-between items-center pt-[5.7rem] max-[500px]:flex-col max-[500px]:pt-8">
        <div class="m-auto flex flex-col gap-[2rem] max-[500px]:items-center max-[500px]:gap-[1rem]">
            <h1 class="text-[36px] text-bleuFonce work-sans-bold max-[500px]:text-[16px]">La formation De NewP</h1>
            <p class="text-[20px] text-bleuFonce work-sans-regular w-[80%] max-[500px]:text-[12px] max-[500px]:w-[90%]">NewP a été créé en octobre 2024 dans les locaux d'Orange Innovation à Caen par sept étudiants issus de différentes écoles (MyDigitalSchool, UniCaen et l’EnsiCaen). L'objectif de cette application était de concevoir une start up, en collaboration avec Orange, afin de répondre à une problématique spécifique.</p>
            <p class="text-[24px] text-bleuFonce work-sans-semibold text-center w-[80%] max-[500px]:text-[14px] max-[500px]:w-[90%]">“Aider les personnes a faire de nouvelle rencontre amical”</p>
            <p class="text-[20px] text-bleuFonce work-sans-regular w-[80%] max-[500px]:text-[12px] max-[500px]:w-[90%]">Et c’est ainsi que la NewP Team est née, réunissant sept étudiants dévoués à répondre à cette problématique percutante et poignante, ressentie par de nombreux étudiants et autres personnes !</p>
        </div>
        <img :src="newpCorp" alt="" class="max-[500px]:w-[13rem] max-[500px]:mt-6">
    </div>

    <div class="TresSec margin flex flex-col justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem] max-[500px]:gap-[1rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] text-center max-[500px]:w-full max-[500px]:text-[16px]">La Newp’Teams</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[40rem] text-center m-auto max-[500px]:w-full max-[500px]:text-[14px]">Voici les différentes personnes qui ont contribué à ce projet</h2>
        </div>

        <div class="relative max-w-[1027px] max-[500px]:max-w-[299px] overflow-hidden my-8">
            <div class="flex gap-[4rem] transition-transform duration-300" :style="{ transform: `translateX(-${currentIndex * (windowWidth <= 500 ? 121 : 106)}%)` }">
                <div v-for="team in teams" :key="team.id" class="flex flex-col gap-2 w-[299px] shrink-0 max-[500px]:items-center">
                <div class="relative w-[299px] h-[312px] max-[500px]:w-[199px] max-[500px]:h-[212px]">
                    <img :src="fondbleu" class="max-[500px]:w-[95%] max-[500px]:h-[95%]" alt="Fond bleu" />
                    <img :src="team.image" class="absolute bottom-0 right-0 max-[500px]:w-[90%] max-[500px]:h-[9à%]" alt="Photo membre" />
                </div>
                <div class="flex justify-between items-center max-[500px]:w-[199px]">
                    <p class="text-[20px] work-sans-semibold max-[500px]:text-[16px]">{{ team.name }}</p>
                    <img :src="team.logo" alt="Logo" />
                </div>
                <p class="work-sans-regular text-[20px] max-[500px]:text-[14px] max-[500px]:w-[199px]">{{ team.role }}</p>
                </div>
            </div>
        </div>

        <!-- Indicateurs -->
        <div class="flex gap-4 mt-6 max-[500px]:gap-2 max-[500px]:mt-1">
            <div v-for="(n, index) in totalSlides" :key="index" class="max-[500px]:w-3 max-[500px]:h-3 w-4 h-4 rounded-full transition-all duration-300" :class="index === currentIndex ? 'bg-green-600/50 border-green-600 border-2' : 'bg-gray-400'" @click="currentIndex = index"></div>
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
    import {ref, computed, onMounted, onUnmounted} from "vue";
    import titou from "../../assets/img/titou.svg";
    import ilo from "../../assets/img/ilo.svg";
    import hugo from "../../assets/img/hugo.svg";
    import marly from "../../assets/img/marly.svg";
    import antonio from "../../assets/img/antonio.svg";
    import paul from "../../assets/img/paul.svg";
    import cecile from "../../assets/img/cecile.svg";
    import choco from "../../assets/img/choco.svg";


    const teams = ref([
        {
            name: "Hamard Titouan",
            role: "Graphique Design",
            logo: mds,
            image: titou,
        },
        {
            name: "Montals Ilona",
            role: "Web designeuse",
            logo: mds,
            image: ilo,
        },
        {
            name: "Bohard Hugo",
            role: "Développeur Front",
            logo: mds,
            image: hugo,
        },
        {
            name: "Mathieu Marly",
            role: "Charger de development",
            logo: unicaen,
            image: marly,
        },
        {
            name: "Cimino Antonio",
            role: "PDG - Developeur back",
            logo: ensiCaen,
            image: antonio,
        },
        {
            name: "Nguyen Paul",
            role: "Feature owner",
            logo: ensiCaen,
            image: paul,
        },
        {
            name: "Lu Cecile",
            role: "Feature owner",
            logo: ensiCaen,
            image: cecile,
        },
        {
            name: "Chocolat chaud",
            role: "Reconfort",
            logo: orange,
            image: choco,
        },
    ])

    const currentIndex = ref(0);

    const totalSlides = computed(() => {
        return windowWidth.value <= 500 ? teams.value.length : Math.ceil(teams.value.length / 3);
    });
    
    const autoslide = () => {
        setInterval(() => {
            nextSlide();
            
        }, 5000);
    }


    const nextSlide = () => {
        if (currentIndex.value < totalSlides.value - 1) {
            currentIndex.value++;
        }
        else {
            currentIndex.value = 0;
        }
    };

    const windowWidth = ref(window.innerWidth);

    // Met à jour la largeur de la fenêtre lorsqu'on redimensionne
    const updateWindowWidth = () => {
     windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
    autoslide();
      window.addEventListener('resize', updateWindowWidth);
    });

    onUnmounted(() => {
     window.removeEventListener('resize', updateWindowWidth);
    });


    
</script>

<style scoped>

body{
    background-color: #F2F1F1;
}

  /* Responsive design */
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

  @media (max-width: 1024px) {
    .margin{
        margin: 0 100px;
    }
  }

  @media (max-width: 768px) {
    .margin{
        margin: 0 50px;
    }
  }

  @media (max-width: 400px) {
    .margin{
        margin: 0 20px;
    }
  }
</style>