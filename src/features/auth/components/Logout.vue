<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/features/auth/stores/auth-store.js';

const router = useRouter();
const authStoreInst = authStore();

onMounted(() => {
    authStoreInst.logout(router);
});
</script>