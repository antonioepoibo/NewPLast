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
            <p class="text-[20px] text-bleuFonce work-sans-regular w-[80%]">NewP a été créé en octobre 2024 dans les locaux d'Orange Innovation à Caen par sept étudiants issus de différentes écoles (MyDigitalSchool, UniCaen et l’EnsiCaen). L'objectif de cette application était de concevoir un projet inter-écoles, en collaboration avec Orange, afin de répondre à une problématique spécifique.</p>
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
    </div>

</template>

<script setup>
    import newpCorp from "../../assets/img/NewpCorporate.svg";

    
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