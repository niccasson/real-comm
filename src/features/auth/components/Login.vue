<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';
import { authStore } from '@/features/auth/stores/auth-store.js';

import AppConfig from '@/layout/AppConfig.vue';
// import BackendApis from '@/utils/backend-apis';

const message = ref([]);
// const count = ref(0);

// const router = useRouter();
// const store = useStore();
const authStoreInst = authStore();
const username = ref('');
const password = ref('');

const login = () => {

    console.log(username.value);
    console.log(password.value);

    let loginDict = {
        username: username.value,
        password: password.value
    };

    authStoreInst.login(loginDict);


    // store.dispatch('authentication/login', loginDict)
    //     .then(response => {
    //         console.log('response.data.status:');
    //         console.log(response.data.status);
    //         const responseDataStatus = response.data.status;
    //         if (responseDataStatus === 'success'){
    //             console.log('Login successful');
    //             router.push('/'); 
    //         } else {
    //             message.value = [{ severity: 'error', detail: 'Error Message', content: 'Sign in failed', id: count.value++ }]
    //         }
    //     })
    //     .catch(err => {
    //         console.error('Login failed', err);
    //     });
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">REAL COMM</h1>
            <p class="text-color-secondary mb-4">Welcome to the <strong>Real Comm Community</strong>, where the magic happens, sign in to continue.</p>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-user" />
                <InputText v-model="username" type="text" placeholder="Username" class="w-full" />
            </IconField>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-key" />
                <InputText v-model="password" type="password" placeholder="Password" class="w-full" />
            </IconField>

            <transition-group name="p-message" tag="div">
                <Message v-for="msg of message" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
            </transition-group>

            <Button label="Sign In" class="mb-4" @click="login"></Button>

            <div class="flex gap-4 align-items-center justify-content-center">
                <router-link to="/auth/register">Sign Up</router-link>
            </div>

            <span class="text-color-secondary text-center mb-4">or sign in with below</span>

            <div class="flex gap-4 align-items-center justify-content-center">
                <a href="https://www.facebook.com" class="inline-flex flex-shrink-0 w-3rem h-3rem justify-content-center align-items-center surface-ground border-circle">
                    <i class="pi pi-facebook text-2xl text-color"></i>
                </a>
                <a href="https://www.twitter.com" class="inline-flex flex-shrink-0 w-3rem h-3rem justify-content-center align-items-center surface-ground border-circle">
                    <i class="pi pi-twitter text-2xl text-color"></i>
                </a>
                <a href="https://www.google.com" class="inline-flex flex-shrink-0 w-3rem h-3rem justify-content-center align-items-center surface-ground border-circle">
                    <i class="pi pi-google text-2xl text-color"></i>
                </a>
                <a href="https://www.github.com" class="inline-flex flex-shrink-0 w-3rem h-3rem justify-content-center align-items-center surface-ground border-circle">
                    <i class="pi pi-github text-2xl text-color"></i>
                </a>
            </div>
        </div>
    </div>

    <AppConfig simple />
</template>
