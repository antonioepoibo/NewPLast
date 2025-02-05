<!-- src/components/SignUp.vue -->
<template>
  <div class="relative w-full h-[100vh]">
    <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran">

    <div v-if="currentStep === 0" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6 max-[500px]:w-full">
      <img :src="newP" class="w-[15rem]" alt="">
      <h1 class="text-[30px] font-bold text-white mb-10 uppercase max-[600px]:text-[25px]">S'inscrire</h1>
      <div class="flex justify-center gap-[8.5rem] w-full px-8 max-[600px]:gap-[6rem] max-[500px]:items-center max-[500px]:w-[100vh]">
        <p @click="setToPhone" class="text-[14px] text-white max-[500px]:text-[12px]" :class="{'underline': isEmail === false, 'opacity-40': isEmail === true}">Numéro de téléphone</p>
        <p @click="setToEmail" class="text-[14px] text-white" :class="{'underline': isEmail === true, 'opacity-40': isEmail === false}">Email</p>
      </div>
      <form  @submit.prevent="signUp" class="flex flex-col items-center gap-6 w-[58%]">
        <div class="flex flex-col gap-2 w-[25rem] max-[500px]:w-[90vw]">
          <label ref="label1" for="email" class="text-[14px] ml-6 text-white opacity-[72%] max-[500px]:ml-4">{{ isEmail ? 'Adresse e-mail' : 'Numéro de téléphone' }}</label>
          <input v-model="email" :type="isEmail ? 'email' : 'number'" required class="border bg-white rounded-full h-[3rem] pl-6 max-[500px]:h-[2.5rem]" />
        </div>
        <div class="flex flex-col gap-2 w-[25rem] max-[500px]:w-[90vw]">
          <label for="name" class="text-[14px] ml-6 text-white opacity-[72%] max-[500px]:ml-4">Nom</label>
          <input v-model="name" type="text" required class="border bg-white rounded-full h-[3rem] pl-6 max-[500px]:h-[2.5rem]" />
        </div>
        <div class="flex flex-col gap-2 w-[25rem] max-[500px]:w-[90vw]">
          <label for="name" class="text-[14px] ml-6 text-white opacity-[72%] max-[500px]:ml-4">Prénom</label>
          <input v-model="Prénom" type="text" required class="border bg-white rounded-full h-[3rem] pl-6 max-[500px]:h-[2.5rem]" />
        </div>
        <div class="relative flex flex-col gap-2 w-[25rem] max-[500px]:w-[90vw]">
          <label for="password" class="text-[14px] ml-6 text-white opacity-[72%] max-[500px]:ml-4">Mot de passe</label>
          <input v-model="password" :type="isPasswordVisible" required class="relative border bg-white rounded-full h-[3rem] pl-6 max-[500px]:h-[2.5rem]" />
          <i @click="see" class="absolute fa-solid fa-eye-slash right-5 top-[45%] cursor-pointer hover:opacity-60 duration-200"></i>
          <div class="flex gap-[2rem] justify-center">
            <div class="w-[6rem] flex flex-col items-center" :class="{'opacity-100' : /[A-Za-z]/.test(password) && password.length >= 8, 'opacity-40': !(/[A-Za-z]/.test(password) && password.length >= 8)}">
              <span class="flex bg-white w-full h-[2px]"></span>
              <p class="text-[10px] text-white uppercase">min 8 lettres</p>
            </div>
            <div class="w-[6rem] flex flex-col items-center" :class="{'opacity-100' : /[A-Z]/.test(password) && password.length >= 1, 'opacity-40': (/[a-z]/.test(password) || password.length < 1)}">
              <span class="flex bg-white w-full h-[2px]"></span>
              <p class="text-[10px] text-white uppercase">1 majuscule</p>
            </div>
            <div class="w-[6rem] flex flex-col items-center" :class="{'opacity-100' : /\d/.test(password) && password.length >= 1, 'opacity-40': !(/\d/.test(password) && password.length >= 1)}">
              <span class="flex bg-white w-full h-[2px]"></span>
              <p class="text-[10px] text-white uppercase">1 chiffre</p>
            </div>
          </div>
        </div>
        
        <button 
          type="button" 
          @click="nextStep" 
          :class="{'opacity-100': password.length >= 8 && /(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)/.test(password), 
                  'opacity-40 cursor-default': !(password.length >= 8 && /(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)/.test(password))}"
          class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
          Suivant
        </button>
      </form>
      <p v-if="message" class="text-red-500">{{ message }}</p>
      <router-link to="/signin" class="mt-4 text-white text-center max-[500px]:w-full">Tu as déjà un compte ? <span class="hover:underline font-bold">Connecte toi !</span></router-link>
 
      <!-- <div class="flex gap-4 items-center">
        <div class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100">
          <img :src="google" class="w-[40px]" alt="">
        </div>
        <div class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100">
          <img :src="meta" class="w-[40px]" alt="">
        </div>
        <div class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100">
          <img :src="apple" class="w-[40px]" alt="">
        </div>
      </div> -->
    </div>
    <div v-if="currentStep === 1" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2">
          <span class="bg-gray-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
      </div>
      <div class="flex flex-col gap-6 items-center">
        <h1 class="text-[18px] font-bold text-white  max-[600px]:text-[15px]">Choisir une photo de profil</h1>
        <div v-if="!imageUrl" class="relative w-[200px] h-[200px] bg-gray-400 rounded-full flex items-center justify-center">
          <span class="text-white text-[30px]">+</span>
          <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="uploadImage" />
        </div>

        <img v-else :src="imageUrl" class="w-[200px] h-[200px] rounded-full object-cover" alt="Preview de l'image" />
        <p @click="ImgLater('imagr_url')" class="text-[14px] text-white opacity-[72%] italic text-center" >Je l'ajoute plus tard</p>
        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="nextStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Suivant
        </button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 2" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2">
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-gray-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
      </div>
      <div class="flex flex-col gap-6 items-center">
        <h1 class="text-[18px] font-bold text-white  max-[600px]:text-[15px]">Sélectionne ta date de naissance</h1>
        <div class="flex gap-4">
          <input type="number" v-model="day" class="border-b-2 border-white bg-transparent text-[24px] text-white py-2 text-center w-[5rem] max-[500px]:w-[3.5rem] italic max-[500px]:text-[16px]" maxlength="2" required />
          <input type="text" v-model="month" class="border-b-2 border-white bg-transparent text-[24px] text-white py-2 text-center italic max-[500px]:w-[7rem] max-[500px]:text-[16px]" maxlength="9" required />
          <input type="text" v-model="year" class="border-b-2 border-white bg-transparent text-[24px] text-white py-2 text-center w-[8rem] italic max-[500px]:w-[3.5rem] max-[500px]:text-[16px]" maxlength="4" required />
        </div>
        <p class="text-[14px] text-white opacity-[72%] italic w-[60%] text-center max-[500px]:w-[80%]">Attention, il se peut qu'on vous demande une carte d’identité pour prouver votre âge. Merci de ne pas mentir sur cette information</p>
        <div v-bind:class="{
          'flex gap-4 items-center opacity-[72%]': true, 
          'text-red-600': ageStatus.status === 'refused',
          'text-green-600': ageStatus.status === 'approved',
          'text-white': ageStatus.status === 'pending'
        }">
          <i class="fa-solid fa-circle-notch fa-spin"></i>
          <p>{{ ageStatus.message }}</p>
        </div>


        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="nextStep" 
            :class="{'opacity-100': year.length === 4 && /^\d+$/.test(year) && year <= 2006, 'opacity-40 cursor-default': !(year.length === 4 && /^\d+$/.test(year) && year <= 2006)}"
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Suivant
        </button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 3" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2">
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-gray-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
      </div>
      <div class="flex flex-col gap-6 items-center">
        <h1 class="text-[18px] font-bold text-white  max-[600px]:text-[15px]">Dis en plus sur toi...</h1>
        <textarea v-model="bio" name="Bio" id="bio" class="resize-none bg-transparent border border-white text-white w-[32rem] h-[18rem] text-[18px] p-4 text-center rounded-xl max-[500px]:w-full max-[500px]:text-[16px]" placeholder="Décris toi en quelques phrases "></textarea>
        <p @click="ImgLater('bio')" class="text-[14px] italic text-white m-auto opacity-[72%] duration-200 hover:underline">enregistrer cet information plus tard </p>
        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="nextStep" 
            :class="{'opacity-100': bio, 'opacity-40 cursor-default': !bio}"
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Suivant
        </button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 4" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[30%] gap-6">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2">
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-gray-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-white rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
      </div>
      <div class="flex flex-col gap-8 items-center">
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-[18px] font-bold text-white  max-[600px]:text-[15px]">quelques mots pour te décrire...</h1>
        <p class="text-[14px] text-white opacity-[72%] italic">Choisie au moins 3 mots qui te définie le mieux !</p>
      </div>
      <div class="flex gap-5 flex-wrap justify-center max-[500px]:w-full">
        <div class="flex gap-2 mr-8 text-center text-white max-[500px]:justify-start max-[500px]:flex-wrap max-[500px]:mr-0">
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Amical(e)'), 'opacity-50': !this.keyword.includes('Amical(e)')}" id="Amical(e)" class="Describe">Amical(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Créatif(ve)'), 'opacity-50': !this.keyword.includes('Créatif(ve)')}" id="Créatif(ve)" class="Describe">Créatif(ve)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Passionné(e)'), 'opacity-50': !this.keyword.includes('Passionné(e)')}" id="Passionné(e)" class="Describe">Passionné(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Curieux(se)'), 'opacity-50': !this.keyword.includes('Curieux(se)')}" id="Curieux(se)" class="Describe">Curieux(se)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Dynamique'), 'opacity-50': !this.keyword.includes('Dynamique')}" id="Dynamique" class="Describe">Dynamique</div>
        </div>
        <div class="flex gap-2 ml-8 text-center text-white max-[500px]:justify-start max-[500px]:flex-wrap max-[500px]:ml-0">
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Optimiste'), 'opacity-50': !this.keyword.includes('Optimiste')}" id="Optimiste" class="Describe">Optimiste</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Drôle'), 'opacity-50': !this.keyword.includes('Drôle')}" id="Drôle" class="Describe">Drôle</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Empathique'), 'opacity-50': !this.keyword.includes('Empathique')}" id="Empathique" class="Describe">Empathique</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Ambitieux(se)'), 'opacity-50': !this.keyword.includes('Ambitieux(se)')}" id="Ambitieux(se)" class="Describe">Ambitieux(se)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Aventurier(ère)'), 'opacity-50': !this.keyword.includes('Aventurier(ère)')}" id="Aventurier(ère)" class="Describe">Aventurier(ère)</div>
        </div>
        <div class="flex gap-2 mr-8 text-center text-white max-[500px]:justify-start max-[500px]:flex-wrap max-[500px]:mr-0">
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Sociable'), 'opacity-50': !this.keyword.includes('Sociable')}" id="Sociable" class="Describe">Sociable</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Réfléchi(e)'), 'opacity-50': !this.keyword.includes('Réfléchi(e)')}" id="Réfléchi(e)" class="Describe">Réfléchi(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Indépendant(e)'), 'opacity-50': !this.keyword.includes('Indépendant(e)')}" id="Indépendant(e)" class="Describe">Indépendant(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Spontané(e)'), 'opacity-50': !this.keyword.includes('Spontané(e)')}" id="Spontané(e)" class="Describe">Spontané(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Bienveillant(e)'), 'opacity-50': !this.keyword.includes('Bienveillant(e)')}" id="Bienveillant(e)" class="Describe">Bienveillant(e)</div>
        </div>
        <div class="flex gap-2 ml-8 text-center text-white max-[500px]:justify-start max-[500px]:flex-wrap max-[500px]:ml-0">
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Sincère'), 'opacity-50': !this.keyword.includes('Sincère')}" id="Sincère" class="Describe">Sincère</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Énergique'), 'opacity-50': !this.keyword.includes('Énergique')}" id="Énergique" class="Describe">Énergique</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Inspirant(e)'), 'opacity-50': !this.keyword.includes('Inspirant(e)')}" id="Inspirant(e)" class="Describe">Inspirant(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Ouvert(e)'), 'opacity-50': !this.keyword.includes('Ouvert(e)')}" id="Ouvert(e)" class="Describe">Ouvert(e)</div>
          <div @click="chose" :class="{'opacity-100': this.keyword.includes('Authentique'), 'opacity-50': !this.keyword.includes('Authentique')}" id="Authentique" class="Describe">Authentique</div>
        </div>
          
        </div>
        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="nextStep"
            :class="{'opacity-50 cursor-default': this.keyword.split(',').length < 3}"
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Suivant
        </button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 5" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6 max-[500px]:w-full">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2">
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-gray-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
      </div>
      <div class="flex flex-col gap-6 items-center w-[70%]">
        <h1 class="text-[18px] font-bold text-white  max-[600px]:text-[15px]">Quelle est ton type de profil ?</h1>
        <div @click="Particulier" :class="{'opacity-100': isClickedPA, 'opacity-40': !isClickedPA}" class="flex bg-transparent border-2 border-white w-full h-[10rem] items-center justify-center gap-10 rounded-sm duration-200 hover:opacity-100">
          <i class="fa-solid fa-user-tie text-[60px] text-white max-[500px]:text-[40px] max-[500px]:ml-2"></i>
          <div class="w-[70%] flex flex-col gap-2 my-4">
            <div class="flex flex-col">
              <h1 class="text-[26px] text-white font-bold max-[500px]:text-[20px]">Particulier</h1>
              <p class="text-[12px] text-white italic opacity-[72%] max-[500px]:text-[8px]">Profil gratuit avec offre payante *</p>
            </div>
            <h2 class="text-[14px] text-white italic max-[500px]:text-[10px]">Un compte idéal pour les nouvelles personnes souhaitant se faire de nouveaux amis ou pour participer à des activités avec de nouvelles personnes.</h2>
          </div>
        </div>
        <div @click="Professionel" :class="{'opacity-100': isClickedPR, 'opacity-40': !isClickedPR}" class="flex bg-transparent border-2 border-white w-full h-[10rem] items-center justify-center gap-10 rounded-sm duration-200 hover:opacity-100">
          <i class="fa-solid fa-user text-[60px] text-white max-[500px]:text-[40px] max-[500px]:ml-2"></i>
          <div class="w-[70%] flex flex-col gap-2 my-4">
            <div class="flex flex-col">
              <h1 class="text-[26px] text-white font-bold  max-[500px]:text-[20px]">Profesionnel</h1>
              <p class="text-[12px] text-white italic opacity-[72%] max-[500px]:text-[8px]">Profil gratuit avec offre payante *</p>
            </div>
            <h2 class="text-[14px] text-white italic max-[500px]:text-[10px]">Un compte réservé pour les professionnels ou les entreprises qui souhaitent promouvoir leurs entreprises proposant des activités.</h2>
          </div>
        </div>
        <div class="flex bg-transparent border-2 border-white w-full h-[8rem] items-center justify-center rounded-sm opacity-40 duration-200 hover:opacity-100 max-[500px]:h-[4rem]">
          <h1 class="text-[26px] text-white font-bold">Coming soon</h1>
        </div>
        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="nextStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Suivant
        </button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 6" class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] gap-6 max-[500px]:w-full">
      <div class="flex flex-col gap-6 items-center mb-10">
        <img :src="newP" class="w-[15rem]" alt="">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px]">S'inscrire</h1>
        <div class="flex gap-2 mb-10">
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
          <span class="bg-green-400 rounded-full w-[5rem] h-[1rem] max-[500px]:w-[3.5rem]"></span>
        </div>
        <div class="flex flex-col gap-6 items-center w-[80%]">
          <h1 class="text-[24px] font-bold text-white  max-[600px]:text-[15px]">Félicitation, votre profil est crée !</h1>
          <p class="text-[16px] italic text-white opacity-[72%] text-center">Dernier étapes, vérifions si toutes les information rentée son correcte !</p>
        </div>
        <div class="flex flex-col gap-4 w-[85%]">
          <div class="flex bg-transparent border-2 border-white w-full h-[auto] items-center justify-center gap-10 rounded-sm py-6 my-6">
            <img :src="this.image_url" class="relative w-[90px] h-[90px] rounded-full max-[500px]:w-[40px] max-[500px]:h-[40px]" alt="image de profil">
            <div class="flex flex-col gap-3 w-[70%]">
              <div class="flex gap-[8rem] justify-between items-center max-[500px]:gap-[2rem]">
                <h1 class="text-[22px] font-bold text-white max-[500px]:text-[8px]">{{ this.name && this.prénom ? "null" + " " + "null" : this.name + ' ' + this.Prénom}}</h1>
                <p class="text-[14px] italic text-white max-[500px]:text-[8px]">{{ this.day && this.month && this.year ?  this.day + '/' + this.month + '/' + this.year : "null" + '/' + "null" + '/' + "null" }}</p>
              </div>
              <div class="flex gap-[8rem] justify-between items-center max-[500px]:gap-[2rem]">
                <h1 class="text-[12px] italic text-white opacity-[72%] max-[500px]:text-[8px]">{{ isClickedPA ? "Particulier" : "Professionel"}}</h1>
                <p class="text-[12px] italic text-white opacity-[72%] max-[500px]:text-[8px]">{{ this.email ? this.email : "contact@hugo-bohard.com" }}</p>
              </div>
              <div class="flex gap-2">
                <div v-for="key in this.keyword.split(',')" :key="key.id" class="bg-transparent border border-white rounded-full"><p class=text-[6px]>{{ key }}</p></div>
              </div>
              <p class="text-[14px] text-white italic opacity-[72%] w-[88%] max-[500px]:text-[8px]">{{ this.bio ? this.bio : "À définir plus tard" }}</p>
            </div>
          </div>
          <div class="flex gap-3 items-start">
            <input v-model="checkboxRGPD" type="checkbox" required>
            <p class="text-[10px] text-white italic max-[500px]:text-[6px]">En créant un compte, vous acceptez les Conditions Générales d'Utilisation du site (CGU) et les  Conditions Générales de Vente (CGV). Ces conditions régissent votre utilisation des services proposés, les modalités d'achat, de paiement et de livraison des services, y compris vos droits et obligations en tant qu'utilisateur. Il est important de lire attentivement ces conditions avant de continuer</p>
          </div>
          <div class="flex gap-3 items-start">
            <input v-model="checkboxCG" type="checkbox" required>
            <p class="text-[10px] text-white italic  max-[500px]:text-[6px]">En créant un compte, vous acceptez les Conditions Générales d'Utilisation du site (CGU) et les  Conditions Générales de Vente (CGV). Ces conditions régissent votre utilisation des services proposés, les modalités d'achat, de paiement et de livraison des services, y compris vos droits et obligations en tant qu'utilisateur. Il est important de lire attentivement ces conditions avant de continuer</p>
          </div>
        </div>
        <div class="flex gap-4">
          <button 
            type="submit" 
            @click="lastStep" 
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Précédent
        </button>
        <button 
            type="submit" 
            @click="finishSignUp" 
            :class="{'opacity-100': checkboxRGPD && checkboxCG, 'opacity-40 cursor-default': !(checkboxRGPD && checkboxCG)}"
            class="text-[13px] rounded-full py-2 px-6 mt-4 text-gray-700 font-bold uppercase bg-white max-[600px]:w-[10rem]">
            Terminer
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'; // Import Supabase client
import bcrypt from 'bcryptjs';

import fond from '../assets/img/fondsmall.svg';
import google from '../assets/img/googleico.svg';
import meta from '../assets/img/metaico.svg';
import apple from '../assets/img/appleico.svg';
import newP from '../assets/img/newP_logo.svg';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      router: useRouter(),
      currentStep: 0,
      name: '',
      Prénom: '',
      email: '',
      password: '',
      message: '',
      isEmail: true,
      Letter: false,
      fond,
      google,
      meta,
      apple,
      newP,
      imageUrl: "",
      day: '',
      month: '',
      year: '',
      bio: '',
      checkboxRGPD: "",
      checkboxCG: "",
      isClickedPA: "",
      isClickedPR: "",
      later: "",
      isPasswordVisible: 'password',
      keyword: '',
    }
  },
  computed: {
    // Propriété calculée qui vérifie si l'année est supérieure ou égale à 2006
    ageStatus() {
      if (this.year.length === 4 && /^\d+$/.test(this.year)) {
        // Vérification de l'année et comparaison
        return this.year >= 2007 ? {
          status: 'refused',
          message: 'Votre âge a été refusé'
        } : {
          status: 'approved',
          message: 'Votre âge a été validé'
        };
      }
      return {
        status: 'pending',
        message: 'Âge en cours d\'analyse'
      };
    }
  },
  methods: {
    setToPhone(){
      this.isEmail = false;
    },
    setToEmail(){
      this.isEmail = true;
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const fileName = `${Date.now()}-${file.name}`; 
        const { data, error } = await supabase.storage
          .from('Images') 
          .upload(fileName, file);

        if (error) {
          console.error('Erreur lors de l\'upload :', error.message, data);
          this.message = "Erreur lors de l'upload.";
        } else {

          const { data: publicURLData } = supabase.storage
            .from('Images')
            .getPublicUrl(fileName);

          if (publicURLData) {
            this.imageUrl = publicURLData.publicUrl;
            console.log("URL de l'image obtenue :", this.imageUrl);
          } else {
            console.error("Impossible d'obtenir l'URL publique.");
            this.message = "Erreur lors de la récupération de l'URL publique.";
          }
        }
      }
    },

    async see(){
      this.isPasswordVisible = this.isPasswordVisible === 'password' ? 'text' : 'password';
    },



    nextStep() {
      if (this.currentStep === 0) {
        if (this.email && this.password && this.name && this.Prénom && this.password.length >= 8) {
            this.currentStep = 1;
          } else {
            this.message = 'Veuillez remplir tous les champs correctement.';
          }
      } else if (this.currentStep === 1) {
      this.currentStep = 2; 
    } else if(this.currentStep === 2 && this.year.length === 4 && /^\d+$/.test(this.year) && this.year <= 2006) {
      this.currentStep = 3;
    } else if(this.currentStep === 3 && this.bio) {
      this.currentStep = 4;
    } else if(this.currentStep === 4 && this.keyword.split(',').length >= 3) {
      this.currentStep = 5;
    } else if(this.currentStep === 5) {
      this.currentStep = 6;
    }
  },
  lastStep(){
    if (this.currentStep === 1) {
      this.currentStep = 0;
    } else if(this.currentStep === 2) {
      this.currentStep = 1;
    } else if(this.currentStep === 3) {
      this.currentStep = 2;
    } else if(this.currentStep === 4) {
      this.currentStep = 3;
    } else if(this.currentStep === 5) {
      this.currentStep = 4;
    }else if(this.currentStep === 6) {
      this.currentStep = 5;
    }
  },

  async ImgLater(type){
    if(type === "imagr_url"){
      this.image_url = "https://gujeiecqangbzroveklt.supabase.co/storage/v1/object/public/Images/default_img.png";
      console.log("Image URL après insertion:", this.image_url)
      this.currentStep = 2;
    }
    if(type === "bio"){
      this.bio = ""
      console.log("Image URL après insertion:", this.bio); 
      this.currentStep = 4;
    }
  },
  async finishSignUp() {
    if (this.currentStep === 6) {
      if (this.checkboxRGPD && this.checkboxCG) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: this.email,
            password: this.password,
          });

          if (error) {
            console.error('Erreur lors de l\'inscription :', error.message, data);
            this.message = "Erreur lors de l'inscription.";
          } else if (!data) {
            console.error('Aucune donnée retournée.');
            this.message = "Aucune donnée retournée. Veuillez réessayer.";
          } else {
            console.log('Inscription réussie:', data);
            router.push('/signin')
            // Ajoutez ici toute logique supplémentaire après une inscription réussie
          }
        } catch (err) {
          console.error('Erreur inconnue lors de l\'inscription :', err);
          this.message = "Erreur inconnue.";
        }
      }
    }
  },




    async Particulier() {
      this.isClickedPA = !this.isClickedPA;
    },
    async Professionel(){
      this.isClickedPR =!this.isClickedPR;
    },

    chose() {
        const select = event.target.id;
        let keywordsArray = this.keyword.split(',').map(item => item.trim()).filter(item => item !== '');
        if (keywordsArray.includes(select)) {
            keywordsArray = keywordsArray.filter(item => item !== select);
        } else {
            keywordsArray.push(select);
        }
        this.keyword = keywordsArray.join(', ');
        console.log(this.keyword);
    }

  

  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.Describe{
  background-color: transparent;
  border: gray solid 2px;
  width: auto;
  height: 1.6rem;
  border-radius: 100px;
  padding: 0 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  font-size: 14px;
}
.Describe:hover{
  opacity: 100;
}

@media (max-width: 500px) {
  .Describe{
    display: flex;
    flex-wrap: wrap;
    padding-top: 2px;
    font-size: 12px;
  }
}
</style>
