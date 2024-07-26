<script setup>
import { ref } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const value1 = ref(null);
const value2 = ref(null);

const navigateToDashboard = () => {
    router.push('/');
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">New Password</h1>
            <p class="text-color-secondary mb-4">Enter your new password.</p>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-key z-2" />
                <Password id="password" placeholder="Password" v-model="value1" class="w-full" :inputStyle="{ paddingLeft: '2.5rem' }" inputClass="w-full" :toggleMask="true"></Password>
            </IconField>

            <IconField iconPosition="left" class="mb-4">
                <InputIcon class="pi pi-key z-2" />
                <Password id="password" placeholder="Confirm Password" v-model="value2" class="w-full" :inputStyle="{ paddingLeft: '2.5rem' }" inputClass="w-full" :toggleMask="true" :feedback="false"></Password>
            </IconField>

            <Button label="Submit" @click="navigateToDashboard"></Button>
        </div>
    </div>

    <AppConfig simple />
</template>
