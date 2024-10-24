<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';
import { authStore } from '@/features/auth/stores/auth-store.js';

// const router = useRouter();
// const store = useStore();
const authStoreInst = authStore();

onMounted(() => {
    authStoreInst.logout();
    // store.dispatch('authentication/logout')
    //     .then(() => {
    //         console.log('Logout successful');
    //         router.push('/');
    //     })
    //     .catch(err => {
    //         console.error('Logout failed', err);
    //     });
});
</script>