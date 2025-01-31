<template>

<div class="FristSec margin flex justify-between items-center pt-[5.7rem] max-[500px]:flex-col">

    <div class="flex flex-col gap-4">
        <h1 class="text-[36px] work-sans-bold max-[500px]:text-[16px]">Contactez nous</h1>
        <p class="text-[18px] work-sans-regular w-[55%] max-[500px]:text-[12px] max-[500px]:w-[80%]">Vous pouvez nous retrouver et nous contacter sur ces différents réseaux pour tous vos besoins.</p>
        <div class="flex flex-col gap-4 w-[40%] max-[500px]:w-full">
           <div class="flex flex-col gap-4 max-[500px]:flex-row max-[500px]:flex-wrap max-[500px]:justify-center">
                <div class="flex gap-4 items-center">
                    <div class="w-[53px] h-[53px] flex items-center justify-center bg-[#60b776]/80 rounded-md border-4 border-[#60b776] max-[500px]:w-[40px] max-[500px]:h-[42px]">
                        <i class="fa-brands fa-instagram text-[33px] text-white max-[500px]:text-[20px]"></i>
                    </div>
                    <div class="flex flex-col max-[500px]:hidden">
                        <p class="text-[24px] work-sans-bold max-[500px]:text-[14px]">Sur Instagram</p>
                        <p class="class-[19px] work-sans-regular max-[500px]:text-[12px]">@NewP_off</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="w-[53px] h-[53px] flex items-center justify-center bg-[#60b776]/80 rounded-md border-4 border-[#60b776] max-[500px]:w-[40px] max-[500px]:h-[42px]">
                        <i class="fa-brands fa-x-twitter  text-[33px] text-white max-[500px]:text-[20px]"></i>
                    </div>
                    <div class="flex flex-col max-[500px]:hidden">
                        <p class="text-[24px] work-sans-bold">Sur Twitter (X)</p>
                        <p class="class-[19px] work-sans-regular">@NewP_off</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="w-[53px] h-[53px] flex items-center justify-center bg-[#60b776]/80 rounded-md border-4 border-[#60b776] max-[500px]:w-[40px] max-[500px]:h-[42px]">
                        <i class="fa-brands fa-linkedin-in text-[33px] text-white max-[500px]:text-[20px]"></i>
                    </div>
                    <div class="flex flex-col max-[500px]:hidden">
                        <p class="text-[24px] work-sans-bold">Sur Linkedin</p>
                        <p class="class-[19px] work-sans-regular">@Agence_Newp</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="w-[53px] h-[53px] flex items-center justify-center bg-[#60b776]/80 rounded-md border-4 border-[#60b776] max-[500px]:w-[40px] max-[500px]:h-[42px]">
                        <i class="fa-solid fa-at text-[33px] text-white max-[500px]:text-[20px]"></i>
                    </div>
                    <div class="flex flex-col max-[500px]:hidden">
                        <p class="text-[24px] work-sans-bold">Par Email</p>
                        <p class="class-[19px] work-sans-regular">hello@newp.com</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="w-[53px] h-[53px] flex items-center justify-center bg-[#60b776]/80 rounded-md border-4 border-[#60b776] max-[500px]:w-[40px] max-[500px]:h-[42px]">
                        <i class="fa-solid fa-mobile-screen-button -rotate-6 text-[33px] text-white max-[500px]:text-[20px]"></i>
                    </div>
                    <div class="flex flex-col max-[500px]:hidden">
                        <p class="text-[24px] work-sans-bold">Par telephone</p>
                        <p class="class-[19px] work-sans-regular">08.09.40.14.01</p>
                    </div>
                </div>
           </div>
        
        
        </div>
    
    </div>

    <div class="relative w-[733px] h-[637px] flex flex-row-reverse items-start max-[500px]:h-[677px] max-[500px]:w-full max-[500px]:mt-6">
        <img :src="fondbleu" alt="" class="max-[500px]:w-[50%] max-[500px]:h-[30rem] max-[500px]:object-cover max-[500px]:rounded-2xl">
        <div class="absolute flex flex-col gap-8 bottom-0 left-0 max-[500px]:py-[1rem] max-[500px]:rounded-lg py-[4rem] w-[666px] h-[586px] max-[500px]:h-[657px] max-[500px]:w-[90%] bg-white rounded-[33px] border border-[#f2f1f1]">
            <div class="flex gap-4 justify-center max-[500px]:flex-col max-[500px]:w-full">
                <div class="flex flex-col gap-4 w-fit max-[500px]:w-full max-[500px]:px-6">
                    <label for="" class="work-sans-semibold text-[18px] max-[500px]:text-[14px]">Nom complet</label>
                    <input type="text" placeholder="Bohard Hugo" class="w-[233px] max-[500px]:text-[12px] max-[500px]:w-full bg-white rounded-md p-2 text-[14px] work-sans-regularitalic border border-black/50">
                </div>
                <div class="flex flex-col gap-4 w-fit max-[500px]:flex-col max-[500px]:w-full max-[500px]:px-6">
                    <label for="" class="work-sans-semibold text-[18px] max-[500px]:text-[14px]">Nom complet</label>
                    <input type="email" placeholder="Hbohard.contact@gmail.com" class="w-[233px] bg-white rounded-md max-[500px]:text-[12px] max-[500px]:w-full p-2 text-[14px] work-sans-regularitalic border border-black/50">
                </div>
            </div>
            <div class="flex gap-4 justify-center max-[500px]:flex-col max-[500px]:w-full">
                <div class="flex flex-col gap-4 w-fit max-[500px]:w-full max-[500px]:px-6">
                    <label for="" class="work-sans-semibold text-[18px] max-[500px]:text-[14px]">Numero de téléphone</label>
                    <input type="number" placeholder="06.06.06.06.06" class="w-[233px] max-[500px]:text-[12px] max-[500px]:w-full bg-white rounded-md p-2 text-[14px] work-sans-regularitalic border border-black/50">
                </div>
                <div class="flex flex-col gap-4 w-fit max-[500px]:flex-col max-[500px]:w-full max-[500px]:px-6">
                    <label for="" class="work-sans-semibold text-[18px] max-[500px]:text-[14px]">Sujet</label>
                    <input type="text" placeholder="Choisir un sujet" class="w-[233px] bg-white max-[500px]:text-[12px] max-[500px]:w-full rounded-md p-2 text-[14px] work-sans-regularitalic border border-black/50">
                </div>
            </div>
            <div class="flex gap-4 justify-center max-[500px]:flex-col max-[500px]:w-full">
                <div class="flex flex-col gap-4 w-fit max-[500px]:w-full max-[500px]:px-6">
                    <label for="" class="work-sans-semibold text-[18px] max-[500px]:text-[14px]">Message</label>
                    <textarea placeholder="Ecrivez votre demande..." class="resize-none max-[500px]:text-[12px] max-[500px]:w-full w-[484px] min-h-[129px] bg-white rounded-md p-2 text-[14px] work-sans-regularitalic border border-black/50"></textarea>
                </div>
            </div>
            <div class="text-[15px] mx-[5.5rem] bg-[#002233] w-fit px-10 py-2 rounded-lg work-sans-semibold duration-200 hover:opacity-90">
                <router-link to="/signup">Envoyer</router-link>
            </div>
        </div>
    
    </div>

</div>

</template>

<script setup>

    import fondbleu from "../../assets/img/fondbleuBig.svg";

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