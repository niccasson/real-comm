<script setup>
import { useRouter } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';

const router = useRouter();

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">VERONA</h1>
            <p class="text-color-secondary mb-4">Welcome to the <strong>Verona Community</strong>, where the magic happens, sign in to continue.</p>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-user" />
                <InputText type="text" placeholder="Email" class="w-full" />
            </IconField>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-key" />
                <InputText type="password" placeholder="Password" class="w-full" />
            </IconField>

            <Button label="Sign In" class="mb-4" @click="navigateToDashboard"></Button>

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
