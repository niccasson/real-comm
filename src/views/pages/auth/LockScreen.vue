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
            <h1 class="font-bold text-2xl mt-0 mb-2">VERONA</h1>
            <p class="text-color-secondary mb-4">Welcome back!</p>

            <div class="flex align-items-center justify-content-between mb-4">
                <div class="flex">
                    <img src="/layout/images/avatar.png" class="mr-3" style="width: 52px; height: 52px" />
                    <div class="flex flex-column justify-content-center gap-1">
                        <span class="font-bold text-color">Wade Warren</span>
                        <span class="text-color-secondary">Designer</span>
                    </div>
                </div>
                <Button icon="pi pi-sign-out" label="Log out" class="p-button-text" iconPos="right"></Button>
            </div>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-key" />
                <InputText type="password" placeholder="Password" class="w-full" />
            </IconField>

            <Button label="Unlock" @click="navigateToDashboard"></Button>
        </div>
    </div>
    <AppConfig simple />
</template>
