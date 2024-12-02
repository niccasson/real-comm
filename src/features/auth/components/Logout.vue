<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/features/auth/stores/auth-store.js';


const router = useRouter();
const authStoreInst = authStore();

onMounted(() => {
    authStoreInst.logout(router);
});

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">LOG OUT SUCCESSFULL</h1>
            <p class="text-color-secondary mb-4">You have successfully logged out.</p>
            <img src="/demo/images/pages/auth/access-denied.svg" alt="access-denied" class="mb-4 align-self-center" />
            <Button label="Go to Dashboard" @click="navigateToDashboard"></Button>
        </div>
    </div>

    <AppConfig simple />
</template>