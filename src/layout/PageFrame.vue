<script setup>
import { computed, watch, ref, onBeforeUnmount } from 'vue';
import { usePrimeVue } from 'primevue/config';
import AppTopbar from './AppTopbar.vue';
import AppConfig from './AppConfig.vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppSidebar from './AppSidebar.vue';
import AppFooter from './AppFooter.vue';
import { useLayout } from '@/layout/composables/layout';

const $primevue = usePrimeVue();
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);
const topbarRef = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const containerClass = computed(() => {
    return [
        {
            'layout-slim': layoutConfig.menuMode.value === 'slim',
            'layout-slim-plus': layoutConfig.menuMode.value === 'slim-plus',
            'layout-static': layoutConfig.menuMode.value === 'static',
            'layout-overlay': layoutConfig.menuMode.value === 'overlay',
            'layout-overlay-active': layoutState.overlayMenuActive.value,
            'layout-mobile-active': layoutState.staticMenuMobileActive.value,
            'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
            'p-ripple-disabled': $primevue.config.ripple === false,
            'layout-light': layoutConfig.layoutTheme.value === 'colorScheme' && layoutConfig.colorScheme.value === 'light',
            'layout-dark': layoutConfig.layoutTheme.value === 'colorScheme' && layoutConfig.colorScheme.value === 'dark',
            'layout-primary': layoutConfig.colorScheme.value !== 'dark' && layoutConfig.layoutTheme.value === 'primaryColor'
        }
    ];
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.overlaySubmenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.topbar-menubutton');

    return !(sidebarEl?.isSameNode(event.target) || sidebarEl?.contains(event.target) || topbarEl?.isSameNode(event.target) || topbarEl?.contains(event.target));
};
</script>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' });
    },
    goToHowTo() {
      this.$router.push({ name: 'How To' });
    },
    goToListings() {
      this.$router.push({ name: 'Listings' });
    },
    goToCreateListing() {
      this.$router.push({ name: 'Create Listing' });
    },
  },
};
</script>

<template>
    <div class="layout-container" :class="containerClass">
        <!-- <AppTopbar ref="topbarRef"></AppTopbar> -->
        <div class="flex align-items-center justify-content-between px-5 sm:px-8 py-6">
            <a @click="navigateToDashboard" class="cursor-pointer">
                <span class="text-2xl font-bold text-color">REALCOMM</span>
            </a>
            <div class="relative">
                <Button
                    class="cursor-pointer block lg:hidden select-none p-link w-3rem h-3rem inline-flex align-items-center justify-content-center border-circle text-color"
                    v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveToClass: 'hidden', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: 'true' }"
                >
                    <i class="pi pi-bars text-4xl"></i>
                </Button>
                <div id="landing-menu" class="hidden lg:block absolute right-0 top-auto lg:static z-1 shadow-2 lg:shadow-none w-15rem lg:w-auto surface-overlay lg:surface-ground origin-top p-3 lg:p-0" style="border-radius: 14px">
                    <ul class="flex flex-column lg:flex-row m-0 p-0 list-none text-2xl lg:text-base">
                        <li>
                            <a
                                class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                @click="goToHome"
                                v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                leaveActiveClass="fadeout"
                                leaveToClass="hidden"
                                >HOME PAGE</a
                            >
                        </li>
                        <li>
                            <a
                                class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                @click="goToHowTo"
                                v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                >HOW TO</a
                            >
                        </li>
                        <li>
                            <a
                                class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                @click="goToListings"
                                v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                >BROWSE LISTINGS</a
                            >
                        </li>
                        <li>
                            <a
                                class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                @click="goToCreateListing"
                                v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                >CREATE LISTING</a
                            >
                        </li>
                        <!-- <li>
                            <a
                                class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                @click="scrollTo(pricing)"
                                v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                >PRICING</a
                            >
                        </li> -->
                        <li>
                            <a class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300" @click="navigateToRegister">SIGN IN</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="layout-content">
            <div class="layout-content-inner">
                <AppBreadcrumb></AppBreadcrumb>
                <router-view></router-view>
                <AppFooter></AppFooter>
            </div>
        </div>
        <!-- <AppSidebar></AppSidebar> -->
        <!-- <div class="layout-content-wrapper">
            <div class="layout-content">
                <div class="layout-content-inner">
                    <AppBreadcrumb></AppBreadcrumb>
                    <router-view></router-view>
                    <AppFooter></AppFooter>
                </div>
            </div>
        </div> -->
        <!-- <Toast /> -->
        <AppConfig></AppConfig>
    </div>
</template>

<style lang="scss"></style>
