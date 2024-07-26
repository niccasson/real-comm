<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const val1 = ref(null);
const val2 = ref(null);
const val3 = ref(null);
const val4 = ref(null);

const navigateToDashboard = () => {
    router.push('/');
};

const onDigitInput = (event) => {
    let element;
    if (event.code !== 'Backspace') {
        if (event.code.includes('Numpad') || event.code.includes('Digit')) {
            element = event.target.nextElementSibling;
        }
    }
    if (event.code === 'Backspace') {
        element = event.target.previousElementSibling;
    }

    if (element == null) return;
    else element.focus();
};
</script>

<template>
    <div class="surface-ground h-screen w-screen flex align-items-center justify-content-center">
        <div class="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style="border-radius: 14px">
            <h1 class="font-bold text-2xl mt-0 mb-2">Verification Code</h1>
            <p class="text-color-secondary mb-4">Enter code we sent in your mail!</p>

            <div class="flex align-items-center mb-4 gap-2">
                <InputText v-model="val1" class="w-5rem text-center" maxlength="1" @keyup="onDigitInput($event)" />
                <InputText v-model="val2" class="w-5rem text-center" maxlength="1" @keyup="onDigitInput($event)" />
                <InputText v-model="val3" class="w-5rem text-center" maxlength="1" @keyup="onDigitInput($event)" />
                <InputText v-model="val4" class="w-5rem text-center" maxlength="1" @keyup="onDigitInput($event)" />
            </div>

            <Button label="Verify" class="mb-4" @click="navigateToDashboard"></Button>
            <span class="text-color-secondary text-center">If you didn't get the mail? <span class="font-bold text-primary-500">Send code again</span></span>
        </div>
    </div>

    <AppConfig simple />
</template>
