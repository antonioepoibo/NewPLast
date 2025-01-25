<template>
    <div class="loading-container h-[100vh]" v-if="isLoading">
      <img :src="fondsmall" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran">
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-md z-20"></div>
      <div class="relative z-20 mt-[10rem] flex flex-col gap-6 items-center">
        <p class="text-white">Chargement...</p>
        <div class="lds-dual-ring"></div>
        <div class="flex flex-col gap-1 items-center">
          <p class="text-white text-sm">Chargement en cours...</p>
          <p class="text-white text-xs">Veuillez patienter svp...</p>
        </div>
      </div> 
    </div>
  </template>
  
  <script>
  import fondsmall from '../assets/img/fondsmall.svg';

  export default {
    name: "LoadingPage",
    data() {
      return {
        isLoading: true,
        fondsmall 
      };
    },
    mounted() {
      // Simuler un délai pour tester le composant
      setTimeout(() => {
        this.isLoading = false; // Après un certain temps, on cache la page de chargement
      }, 3000); // 3 secondes de chargement, tu peux ajuster
    }
  };
  </script>
  
  <style scoped>
.loading-screen {
  text-align: center;
  font-size: 1.5em;
  color: #555;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 20px;
  position: relative;
  transform: translateZ(0);
  animation: lds-dual-ring 1.2s infinite linear;
  border-radius: 50%;
  box-sizing: border-box;
  border: 8px solid #000000;
}

.lds-dual-ring:before,
.lds-dual-ring:after {
  content: '';
  display: block;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 8px;
  top: -10px;
  border: 4px solid #ffffff;
  border-radius: 50px;
  box-sizing: border-box;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  