<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

onMounted(() => {
    store.dispatch('authentication/logout')
        .then(() => {
            console.log('Logout successful');
            router.push('/');
        })
        .catch(err => {
            console.error('Logout failed', err);
        });
});
</script>