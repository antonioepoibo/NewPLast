<template>

    <div class="firstSec margin flex justify-between items-center pt-[5rem] [500px]:">
        <div class="flex flex-col gap-[3rem] max-[500px]:gap-y-[1rem] max-[500px]:mr-2">
            <h1 class="text-[40px] work-sans-bold text-bleuFonce w-[35rem] max-[500px]:text-[16px] max-[500px]:w-[10rem]">La nouvelle app qui crée des liens</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[34rem] max-[500px]:text-[10px] max-[500px]:w-[13rem]">Tu viens d’arriver dans une nouvelle ville et tu veux te faire de nouveaux amis, mais tu ne sais pas comment t’y prendre ? Newp est l’application idéale pour toi !</h2>
            <div class="flex items-center gap-5">
                <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold duration-200 hover:opacity-90 max-[500px]:text-[7px] max-[500px]:px-4">
                    <router-link to="/signin">Se connecter</router-link>
                </div>
                <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold duration-200 hover:opacity-90 max-[500px]:text-[7px]">
                    <router-link to="/signup">S'inscrire</router-link>
                </div>
            </div>
        </div>
        <img :src="phone1" class="max-[500px]:w-[8rem]" alt="">
    </div>

    <div class="SecondeSec margin flex flex-col justify-between items-center pt-[5.7rem]">
        <div class="m-auto flex flex-col gap-[2rem] max-[500px]:text-[16px] max-[500px]:mx-6 max-[500px]:gap-[1rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] text-center max-[500px]:text-[16px] max-[500px]:w-[100%]">La recherche d’activités aussi simple que de se faire des amis</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[40rem] text-center m-auto max-[500px]:w-[100%] max-[500px]:text-[11px]">L’application NewP a été conçue pour rendre la recherche et la création d’activités aussi simples que de se faire des amis.</h2>
        </div>
        <div class="flex justify-between gap-[15rem] items-center mt-[5rem] max-[500px]:flex-col max-[500px]:mt-[2rem] max-[500px]:gap-[2rem]">
            <div>
                <img :src="phone2" class="max-[500px]:w-[13rem]" alt="">
            </div>
            <div class="flex flex-col gap-5">
                <div class="py-5 px-10 max-w-[440px] rounded-lg saturate-0 opacity-60 hover:saturate-100 bg-white duration-200 hover:border-green-600 hover:border-2 min-h-[194px] flex flex-col gap-5 justify-center shadow-[7px_4px_5.199999809265137px_0px_rgba(0,0,0,0.25)] hover:ml-5 max-[500px]:saturate-100">
                    <div class="flex items-center gap-5">
                        <i class="fa-solid fa-pen-ruler text-[33px] text-vert max-[500px]:text-[25px]"></i>
                        <p class="text-[17px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Création d’activité personnalisée</p>
                    </div>
                    <div>
                        <p class="max-[500px]:text-[12px]">L’interface de création d’activités de NewP a été conçue pour vous permettre de créer des activités de manière simple et complète</p>
                    </div>
                </div>
                <!-- Gestion complète de vos amis -->
                <div class="py-5 px-10 max-w-[440px] rounded-lg saturate-0 opacity-60 hover:saturate-100 bg-white duration-200 hover:border-green-600 hover:border-2 min-h-[194px] flex flex-col gap-5 justify-center shadow-[7px_4px_5.199999809265137px_0px_rgba(0,0,0,0.25)] hover:ml-5 max-[500px]:saturate-100">
                    <div class="flex items-center gap-5">
                        <i class="fa-solid fa-user text-[33px] text-vert max-[500px]:text-[18px]"></i>
                        <p class="text-[17px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Gestion complète de vos amis</p>
                    </div>
                    <div class="">
                        <p class="max-[500px]:text-[12px]">NewP permet d'ajouter des amis, d'échanger avec eux et de les évaluer pour aider la communauté à trouver des personnes de confiance.</p>
                    </div>
                </div>
                <!-- Inscription la plus rapide possible -->
                <div class="py-5 px-10 max-w-[440px] rounded-lg saturate-0 opacity-60 hover:saturate-100 bg-white duration-200 hover:border-green-600 hover:border-2 max-h-[166px] flex flex-col gap-5 justify-center shadow-[7px_4px_5.199999809265137px_0px_rgba(0,0,0,0.25)] hover:ml-5 max-[500px]:saturate-100">
                    <div class="flex items-center gap-5">
                        <i class="fa-solid fa-recycle text-[33px] text-vert max-[500px]:text-[25px]"></i>
                        <p class="text-[17px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Inscription la plus rapide possible</p>
                    </div>
                    <div class="">
                        <p class="max-[500px]:text-[12px]">L'inscription à NewP se fait simplement, pour vous faire gagner du temps sans aucun blocage.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="TresSec margin flex flex-col pt-[5.7rem]">
        <div class="flex flex-col gap-[2rem]">
            <h1 class="text-[36px] work-sans-bold text-bleuFonce w-[44rem] max-[500px]:w-full max-[500px]:text-[16px]">L’application pensée pour vous</h1>
            <h2 class="text-[20px] work-sans-regular text-bleuFonce w-[45rem] max-[500px]:w-[90%] max-[500px]:text-[14px]">Newp regroupe tout ce dont vous avez besoin pour trouver de nouveaux amis et organiser vos prochaines activités avec de nouvelles personnes.</h2>
        </div>
        <div class="flex gap-[2.7rem] flex-wrap mt-6 justify-center">
            <div class="w-[769px] h-[318px] bg-white shadow-[4px_4px_6.300000190734863px_3px_rgba(0,0,0,0.08)] rounded-2xl duration-200 flex justify-between items-center px-[48px] opacity-70 saturate-0 hover:opacity-100 hover:saturate-100 max-[500px]:flex-col max-[500px]:h-auto max-[500px]:filter-none max-[500px]:gap-4 max-[500px]:px-8" @click="addBorder">
                <div class="flex flex-col gap-4 max-[500px]:my-8">
                    <div class="flex gap-2">
                        <div class="bg-vert60 border-2 rounded-md  p-2 border-vert flex items-center">
                            <i class="fa-solid fa-map-location-dot text-white text-[36px] max-[500px]:text-[20px]"></i>
                        </div>
                        <p class="text-[20px] work-sans-semibold text-bleuFonce w-[60%] max-[500px]:text-[14px]">Intégration d’une map interactive</p>
                    </div>
                    <p class="text-[16px] work-sans-regular text-bleuFonce w-[80%] max-[500px]:text-[12px] max-[500px]:w-full">Retrouvez toutes vos activités, que vous avez créées ou auxquelles vous vous êtes inscrit, en un seul clic.</p>
                    <p class="bg-[#002233]/30 text-[#002233] work-sans-semibold text-[13px] border border-[#002233] px-4 py-1 rounded-md w-fit max-[500px]:text-[10px]">En savoir +</p>
                </div>
                <img :src="littlephone" class="self-end max-[500px]:m-auto max-[500px]:w-[8rem]" alt="">
            
            </div>
            <div class="w-[360px] h-[318px] bg-white shadow-[4px_4px_6.300000190734863px_3px_rgba(0,0,0,0.08)] rounded-2xl duration-200 opacity-70 saturate-0 hover:opacity-100 hover:saturate-100 max-[500px]:h-[240px] max-[500px]:filter-none" @click="addBorder">
                <div class="flex flex-col gap-2 mx-10 justify-center h-full">
                    <div class="bg-vert60 border-2 rounded-md p-2 border-vert w-fit max-[500px]:px-3">
                        <i class="fa-solid fa-map-location-dot text-white text-[36px]max-[500px]:text-[24px]"></i>
                    </div>
                    <p class="text-[20px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Intégration du NewpChat</p>
                    <p class="text-[16px] work-sans-regular text-bleuFonce max-[500px]:text-[12px]">Retrouvez toutes vos activités, que vous avez créées ou auxquelles vous vous êtes inscrit, en un seul clic.</p>
                    <p class="bg-[#002233]/30 text-[#002233] work-sans-semibold text-[13px] border border-[#002233] px-4 py-1 rounded-md w-fit max-[500px]:text-[10px]">En savoir +</p>
                </div>
            
            </div>
            <div class="w-[360px] h-[318px] bg-white shadow-[4px_4px_6.300000190734863px_3px_rgba(0,0,0,0.08)] rounded-2xl duration-200 opacity-70 saturate-0 hover:opacity-100 hover:saturate-100 max-[500px]:h-[240px] max-[500px]:filter-none" @click="addBorder">
                <div class="flex flex-col gap-2 mx-10 justify-center h-full">
                    <div class="bg-vert60 border-2 rounded-md p-2 border-vert w-fit max-[500px]:px-3">
                        <i class="fa-solid fa-map-location-dot text-white text-[36px]max-[500px]:text-[24px]"></i>
                    </div>
                    <p class="text-[20px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Planification des activités en toute simplicité</p>
                    <p class="text-[16px] work-sans-regular text-bleuFonce max-[500px]:text-[12px]">Planifiez vos activités selon vos besoins et envies, et modifiez-les à tout moment !</p>
                    <p class="bg-[#002233]/30 text-[#002233] work-sans-semibold text-[13px] border border-[#002233] px-4 py-1 rounded-md w-fit max-[500px]:text-[10px]">En savoir +</p>
                </div>
            </div>
            <div class="w-[360px] h-[318px] bg-white shadow-[4px_4px_6.300000190734863px_3px_rgba(0,0,0,0.08)] rounded-2xl duration-200 opacity-70 saturate-0 hover:opacity-100 hover:saturate-100 max-[500px]:h-[240px] max-[500px]:filter-none" @click="addBorder">
                <div class="flex flex-col gap-2 mx-10 justify-center h-full">
                    <div class="bg-vert60 border-2 rounded-md p-2 border-vert w-fit max-[500px]:px-3">
                        <i class="fa-solid fa-map-location-dot text-white text-[36px]max-[500px]:text-[24px]"></i>
                    </div>
                    <p class="text-[20px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Suivi de vos activités en temps réel</p>
                    <p class="text-[16px] work-sans-regular text-bleuFonce max-[500px]:text-[12px]">Suivez les activités auxquelles vous êtes abonné(e) pour ne rien manquer !</p>
                    <p class="bg-[#002233]/30 text-[#002233] work-sans-semibold text-[13px] border border-[#002233] px-4 py-1 rounded-md w-fit max-[500px]:text-[10px]">En savoir +</p>
                </div>
            </div>
            <div class="w-[360px] h-[318px] bg-white shadow-[4px_4px_6.300000190734863px_3px_rgba(0,0,0,0.08)] rounded-2xl duration-200 opacity-70 saturate-0 hover:opacity-100 hover:saturate-100 max-[500px]:h-[240px] max-[500px]:filter-none" @click="addBorder">
                <div class="flex flex-col gap-2 mx-10 justify-center h-full">
                    <div class="bg-vert60 border-2 rounded-md p-2 border-vert w-fit max-[500px]:px-3">
                        <i class="fa-solid fa-map-location-dot text-white text-[36px]max-[500px]:text-[24px]"></i>
                    </div>
                    <p class="text-[20px] work-sans-semibold text-bleuFonce max-[500px]:text-[14px]">Modération active pour des échanges respectueux</p>
                    <p class="text-[16px] work-sans-regular text-bleuFonce max-[500px]:text-[12px]">Un tout nouveau système de signalement, complété par un système d’évaluation !</p>
                    <p class="bg-[#002233]/30 text-[#002233] work-sans-semibold text-[13px] border border-[#002233] px-4 py-1 rounded-md w-fit max-[500px]:text-[10px]">En savoir +</p>
                </div>
            </div>
        </div>
    </div>

    <div class="QuatroSec margin flex flex-col pt-[5.7rem]">
        <div>
            <p class="text-[36px] work-sans-bold text-bleuFonce w-[35rem] max-[500px]:w-full max-[500px]:text-[16px]">Vous avez des questions ? Newp vous reponds</p>
        </div>
        <div class="flex flex-col gap-10 mt-[2rem] items-center max-[500px]:gap-5">
            <div class="w-[1124px] min-h-[61px] h-auto rounded-[18px] border border-[#60b776] flex items-center justify-between gap-5 px-[2rem] duration-200 ease-in-out max-[500px]:w-full" @click="showtext">
                <div class="flex flex-col gap-2 w-full my-4 max-[500px]:my-2">
                    <div class="flex items-center justify-between">
                        <p class="work-sans-regular text-[20px] text-bleuFonce max-[500px]:text-[12px]">Comment utiliser NewP ?</p>
                        <i class="fa-solid fa-chevron-down max-[500px]:text-[12px]"></i>
                    </div>
                    <div class="answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <p class="max-[500px]:text-[12px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusantium corporis molestias eos porro aperiam quia, non numquam! A labore quos eum vero laborum libero amet eos. Adipisci, eius culpa!</p>
                    </div>
                </div>
            </div>
            <div class="w-[1124px] min-h-[61px] h-auto rounded-[18px] border border-[#60b776] flex items-center justify-between gap-5 px-[2rem] max-[500px]:w-full" @click="showtext">
                <div class="flex flex-col gap-2 w-full my-4">
                    <div class="flex items-center justify-between">
                        <p class="work-sans-regular text-[20px] text-bleuFonce max-[500px]:text-[12px]">Est-ce que NewP est gratuit ?</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <p class="max-[500px]:text-[12px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusantium corporis molestias eos porro aperiam quia, non numquam! A labore quos eum vero laborum libero amet eos. Adipisci, eius culpa!</p>
                    </div>
                </div>
            </div>
            <div class="w-[1124px] min-h-[61px] h-auto rounded-[18px] border border-[#60b776] flex items-center justify-between gap-5 px-[2rem] max-[500px]:w-full" @click="showtext">
                <div class="flex flex-col gap-2 w-full my-4">
                    <div class="flex items-center justify-between">
                        <p class="work-sans-regular text-[20px] text-bleuFonce max-[500px]:text-[12px]">Est-ce qu’il y a un age reglementaire sur NewP ?</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <p class="max-[500px]:text-[12px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusantium corporis molestias eos porro aperiam quia, non numquam! A labore quos eum vero laborum libero amet eos. Adipisci, eius culpa!</p>
                    </div>
                </div>
            </div>
            <div class="w-[1124px] min-h-[61px] h-auto rounded-[18px] border border-[#60b776] flex items-center justify-between gap-5 px-[2rem] max-[500px]:w-full" @click="showtext">
                <div class="flex flex-col gap-2 w-full my-4">
                    <div class="flex items-center justify-between">
                        <p class="work-sans-regular text-[20px] text-bleuFonce max-[500px]:text-[12px]">A qui correspond NewP ?</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <p class="max-[500px]:text-[12px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusantium corporis molestias eos porro aperiam quia, non numquam! A labore quos eum vero laborum libero amet eos. Adipisci, eius culpa!</p>
                    </div>
                </div>
            </div>
            <div class="w-[1124px] min-h-[61px] h-auto rounded-[18px] border border-[#60b776] flex items-center justify-between gap-5 px-[2rem] max-[500px]:w-full" @click="showtext">
                <div class="flex flex-col gap-2 w-full my-4">
                    <div class="flex items-center justify-between">
                        <p class="work-sans-regular text-[20px] text-bleuFonce max-[500px]:text-[12px]">Combien coûte NewP ?</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <p class="max-[500px]:text-[12px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusantium corporis molestias eos porro aperiam quia, non numquam! A labore quos eum vero laborum libero amet eos. Adipisci, eius culpa!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="CincoSec margin flex flex-col pt-[5.7rem]">
        <p class="text-[36px] work-sans-bold text-bleuFonce m-auto max-[500px]:text-[16px] ">Parce qu'ils nous font confiance</p>
        <div class="w-[804px] flex justify-center gap-[5rem] m-auto flex-wrap mt-8 max-[500px]:gap-[2rem] max-[500px]:w-full">
            <img src="/src/assets/img/logo/unicaen.svg" class="saturate-0 duration-200 hover:saturate-100 max-[500px]:filter-none max-[500px]:w-[4rem] " alt="">
            <img src="/src/assets/img/logo/mds.svg" class="saturate-0 duration-200 hover:saturate-100 max-[500px]:filter-none max-[500px]:w-[4rem] " alt="">
            <img src="/src/assets/img/logo/ensi.svg" class="saturate-0 duration-200 hover:saturate-100 max-[500px]:filter-none max-[500px]:w-[4rem] " alt="">
            <img src="/src/assets/img/logo/orangeinov.svg" class="saturate-0 duration-200 hover:saturate-100 max-[500px]:filter-none max-[500px]:w-[4rem] " alt="">
            <img src="/src/assets/img/logo/orange.svg" class="saturate-0 duration-200 hover:saturate-100 max-[500px]:filter-none max-[500px]:w-[4rem] " alt="">
        </div>
    </div>

</template>

<script setup>

    import phone1 from '../../assets/img/phone1.svg';
    import phone2 from '../../assets/img/phone2.svg';
    import {ref} from 'vue';
    import littlephone from '../../assets/img/littlephone.svg';
    import confiance from '../../assets/img/confiance.svg';


    const previousElement = ref(null);

    const addBorder = (event) => {
        if (previousElement.value) {
            previousElement.value.style.border = 'none';
        }

        event.target.style.border = '2px solid blue';

        previousElement.value = event.target;
    };

    const showtext = (event) => {
        const container = event.currentTarget.querySelector('.answer');
        const icon = event.currentTarget.querySelector('.fa-chevron-down');

        if (container.style.maxHeight && container.style.maxHeight !== "0px") {
            container.style.maxHeight = "0px";
            icon.style.transform = "rotate(0deg)";
        } else {
            container.style.maxHeight = container.scrollHeight + "px";
            icon.style.transform = "rotate(180deg)";
        }
    };

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