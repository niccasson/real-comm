<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">Forgot Password?</h1>
            <p class="text-color-secondary mb-4">We need your email address for you can access your account, then we’ll send a recovery mail.</p>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-user" />
                <InputText type="text" placeholder="Email" class="w-full" />
            </IconField>

            <Button label="Send Recovery Mail" @click="navigateToDashboard"></Button>
        </div>
    </div>

    <AppConfig simple />
</template>
