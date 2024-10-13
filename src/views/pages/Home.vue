<script setup>
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const router = useRouter();

const stats = ref(null);
const features = ref(null);
const pricing = ref(null);

const navigateToRegister = () => {
    router.push('/auth/register');
};
const navigateToDashboard = () => {
    router.push('/');
};

const backgroundStyle = computed(() => {
    let path = '/demo/images/landing/';
    let image = layoutConfig.colorScheme.value === 'dark' ? 'line-effect-dark.svg' : 'line-effect.svg';
    return { 'background-image': `url(${path + image})` };
});
const scrollTo = ($element) => {
    setTimeout(() => {
        $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 200);
};
</script>

<template>
    <div class="surface-ground min-h-screen w-screen">
        <div class="landing-wrapper">



            

            <div :style="backgroundStyle" class="bg-no-repeat bg-cover bg-bottom">
                <div class="col-12">
                    <div class="card">
                        <h5>Browse Listings</h5>
                        <div class="grid p-fluid">
                            <!-- <div class="col-12 md:col-6">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-user"></i>
                                    </InputGroupAddon>
                                    <InputText placeholder="Username" />
                                </InputGroup>
                            </div> -->

                            <!-- <div class="col-12 md:col-6">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-clock"></i>
                                    </InputGroupAddon>
                                    <InputGroupAddon>
                                        <i class="pi pi-star-fill"></i>
                                    </InputGroupAddon>
                                    <InputNumber placeholder="Price" />
                                    <InputGroupAddon>$</InputGroupAddon>
                                    <InputGroupAddon>.00</InputGroupAddon>
                                </InputGroup>
                            </div> -->

                            <div class="col-12 md:col-12">
                                <InputGroup>
                                    <Button label="Search" />
                                    <InputText placeholder="Enter City, Area or Region" />
                                </InputGroup>
                            </div>

                            <!-- <div class="col-12 md:col-6">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Checkbox v-model="inputGroupValue" :binary="true" />
                                    </InputGroupAddon>
                                    <InputText placeholder="Confirm" />
                                </InputGroup>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div ref="stats" class="p-8">
                    <div class="flex flex-column align-items-center mb-7">
                        <span class="font-bold text-color-secondary text-2xl mb-3">Sell and Buy Homes Commision Free</span>
                        <h2 class="font-bold text-6xl my-0">How It Works</h2>
                    </div>
                    <div class="flex flex-column xl:flex-row justify-content-center gap-5">
                        <div class="surface-card text-center py-7 px-5 shadow-2" style="border-radius: 14px">
                            <div class="text-xl text-color-secondary mb-3">Sellers</div>
                            <h3 class="mt-0 mb-3 font-bold text-4xl">List your home</h3>
                            <p class="line-height-3 mb-5 text-color-secondary">Join over <strong>1000</strong> people selling their house commision free.</p>
                            <Button icon="pi pi-arrow-right" label="Get Started" class="p-button-text" iconPos="right"></Button>
                            <div class="mt-8 xl:pt-8">
                                <img alt="intro image" src="/demo/images/landing/feature-components.svg" class="w-9 md:w-4 xl:w-9" />
                            </div>
                        </div>
                        <div class="flex flex-column md:flex-row xl:flex-column gap-5">
                            <div class="flex-1 surface-card flex flex-column xl:flex-row xl:align-items-center justify-content-between py-7 px-5 shadow-2 gap-5" style="border-radius: 14px">
                                <div class="flex-1 flex-order-1 xl:flex-order-0 text-center xl:text-left">
                                    <img alt="intro image" src="/demo/images/landing/feature-blocks.svg" class="w-9" />
                                </div>
                                <div class="text-center xl:text-right flex-1">
                                    <div class="text-xl text-color-secondary mb-3">PrimeBlocks</div>
                                    <h3 class="mt-0 mb-3 font-bold text-4xl">Save your time</h3>
                                    <p class="line-height-3 mb-5 text-color-secondary">PrimeBlocks have <strong>370+</strong> blocks: hero sections, pricing, footers and more....</p>
                                    <Button icon="pi pi-arrow-right" label="Browse Blocks" class="p-button-text" iconPos="right"></Button>
                                </div>
                            </div>
                            <div class="flex-1 surface-card flex flex-column xl:flex-row xl:align-items-center justify-content-between py-7 px-5 shadow-2 gap-5" style="border-radius: 14px">
                                <div class="text-center xl:text-left flex-1">
                                    <div class="text-xl text-color-secondary mb-3">PrimeIcons</div>
                                    <h3 class="mt-0 mb-3 font-bold text-4xl">Enjoy 300+ Icons</h3>
                                    <p class="line-height-3 mb-5 text-color-secondary">What you need in your app, you find any icon in PrimeIcons.</p>
                                    <Button icon="pi pi-arrow-right" label="Explore Icons" class="p-button-text" iconPos="right"></Button>
                                </div>
                                <div class="flex-1 text-center xl:text-right">
                                    <img alt="intro image" src="/demo/images/landing/feature-icons.svg" class="w-9" />
                                </div>
                            </div>
                        </div>
                        <div class="surface-card text-center py-7 px-5 shadow-2" style="border-radius: 14px">
                            <div class="text-xl text-color-secondary mb-3">Buyers</div>
                            <h3 class="mt-0 mb-3 font-bold text-4xl">Browse Listings</h3>
                            <p class="line-height-3 mb-5 text-color-secondary">Get more bang for your buck.</p>
                            <Button icon="pi pi-arrow-right" label="View Designer" class="p-button-text" iconPos="right"></Button>
                            <div class="mt-8 xl:pt-8">
                                <img alt="intro image" src="/demo/images/landing/feature-designer.svg" class="w-9 md:w-4 xl:w-9" />
                            </div>
                        </div>
                    </div>
                </div>




                <div ref="features" class="px-5 sm:px-8 py-8 surface-card">
                    <div class="flex flex-column lg:flex-row justify-content-center gap-5">
                        <div>
                            <div class="bg-orange-50 p-6 flex align-items-center justify-content-center mb-5" style="border-radius: 14px; border-top-left-radius: 5rem">
                                <img alt="intro image" src="/demo/images/landing/icon-modern-responsive.svg" class="h-6rem sm:h-12rem" />
                            </div>
                            <h3 class="mt-0 mb-5 font-bold text-4xl">Save Money</h3>
                            <p class="line-height-3 text-color-secondary">Learn how easy it is to buy or sell a home without a realator and save on fees.</p>
                        </div>
                        <div>
                            <div class="bg-green-50 p-6 flex align-items-center justify-content-center mb-5" style="border-radius: 14px">
                                <img alt="intro image" src="/demo/images/landing/icon-modern-design.svg" class="h-6rem sm:h-12rem" />
                            </div>
                            <h3 class="mt-0 mb-5 font-bold text-4xl">Sell A Home</h3>
                            <p class="line-height-3 text-color-secondary">List your house, arrange showings, select an offer and then follow our guide to complete the process.</p>
                        </div>
                        <div>
                            <div class="bg-red-50 p-6 flex align-items-center justify-content-center mb-5" style="border-radius: 14px; border-bottom-right-radius: 5rem">
                                <img alt="intro image" src="/demo/images/landing/icon-clean-code.svg" class="h-6rem sm:h-12rem" />
                            </div>
                            <h3 class="mt-0 mb-5 font-bold text-4xl">Buy A Home</h3>
                            <p class="line-height-3 text-color-secondary">Browse listings, arrange viewings, make an offer and then follow our guide to complete the process.</p>
                        </div>
                    </div>
                </div>

                <!-- <div class="flex align-items-center justify-content-between px-5 sm:px-8 py-6">
                    <a @click="navigateToDashboard" class="cursor-pointer">
                        <span class="text-2xl font-bold text-color">REAL COMM</span>
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
                                        @click="scrollTo(stats)"
                                        v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                        leaveActiveClass="fadeout"
                                        leaveToClass="hidden"
                                        >STATS</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                        @click="scrollTo(features)"
                                        v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                        >FEATURES</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300"
                                        @click="scrollTo(pricing)"
                                        v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'fadeout', leaveToClass: 'hidden' }"
                                        >PRICING</a
                                    >
                                </li>
                                <li>
                                    <a class="block p-3 cursor-pointer font-bold text-color-secondary hover:text-color transition-colors transition-duration-300" @click="navigateToRegister">SIGN IN</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> -->
                <div class="flex flex-column lg:flex-row gap-5 align-items-center justify-content-between px-5 sm:px-8 py-8 overflow-hidden">
                    <div class="flex-1 fadein animation-duration-1000">
                        <h1 class="font-bold text-7xl mt-0 mb-5">PrimeTek Presents Real Comm</h1>
                        <p class="text-3xl mb-5 line-height-3">Minimal layout inspired by a beautiful city</p>
                        <Button label="TRY NOW"></Button>
                    </div>
                    <div class="flex-1">
                        <img alt="intro image" src="/demo/images/landing/screen.jpg" class="fadeinright animation-ease-in-out animation-duration-1000 w-full border-round-2xl shadow-2" />
                    </div>
                </div>

                <div class="grid p-fluid">
                    <!-- <div class="col-12 md:col-6">
                        <div class="card">
                            <h5>InputText</h5>
                            <div class="grid formgrid">
                                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                    <InputText type="text" placeholder="Default"></InputText>
                                </div>
                                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                    <InputText type="text" placeholder="Disabled" :disabled="true"></InputText>
                                </div>
                                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                    <InputText type="text" placeholder="Invalid" invalid  />
                                </div>
                            </div>

                            <h5>Icons</h5>
                            <div class="grid formgrid">
                                <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                    <IconField>
                                        <InputIcon class="pi pi-user" />
                                        <InputText type="text" placeholder="Username" />
                                    </IconField>
                                </div>
                                <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                    <IconField iconPosition="left">
                                        <InputText type="text" placeholder="Search" />
                                        <InputIcon class="pi pi-search" />
                                    </IconField>
                                </div>
                            </div>

                            <h5>Float Label</h5>
                            <FloatLabel>
                                <InputText id="username" type="text" v-model="floatValue" />
                                <label for="username">Username</label>
                            </FloatLabel>

                            <h5>Textarea</h5>
                            <Textarea placeholder="Your Message" :autoResize="true" rows="5" cols="30" />

                            <h5>AutoComplete</h5>
                            <AutoComplete id="dd" :dropdown="true" :multiple="true" v-model="selectedAutoValue" :suggestions="autoFilteredValue" @complete="searchCountry($event)" field="name" />

                            <h5>Calendar</h5>
                            <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>

                            <h5>Spinner</h5>
                            <InputNumber v-model="inputNumberValue" showButtons mode="decimal"></InputNumber>

                            <h5>Chips</h5>
                            <Chips v-model="chipsValue" />
                        </div>

                        <div class="card">
                            <div class="grid">
                                <div class="col-12">
                                    <h5>Slider</h5>
                                    <InputText v-model.number="sliderValue" />
                                    <Slider v-model="sliderValue" />
                                </div>
                                <div class="col-12 md:col-6">
                                    <h5>Rating</h5>
                                    <Rating v-model="ratingValue" />
                                </div>
                                <div class="col-12 md:col-6">
                                    <h5>ColorPicker</h5>
                                    <ColorPicker style="width: 2rem" v-model="colorValue" />
                                </div>
                                <div class="col-12">
                                    <h5>Knob</h5>
                                    <Knob v-model="knobValue" :step="10" :min="-50" :max="50" valueTemplate="{value}%" />
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="col-12 md:col-6">
                        <div class="card">
                            <h5>RadioButton</h5>
                            <div class="grid">
                                <div class="col-12 md:col-4">
                                    <div class="field-radiobutton mb-0">
                                        <RadioButton id="option1" name="option" value="Chicago" v-model="radioValue" />
                                        <label for="option1">Chicago</label>
                                    </div>
                                </div>
                                <div class="col-12 md:col-4">
                                    <div class="field-radiobutton mb-0">
                                        <RadioButton id="option2" name="option" value="Los Angeles" v-model="radioValue" />
                                        <label for="option2">Los Angeles</label>
                                    </div>
                                </div>
                                <div class="col-12 md:col-4">
                                    <div class="field-radiobutton mb-0">
                                        <RadioButton id="option3" name="option" value="New York" v-model="radioValue" />
                                        <label for="option3">New York</label>
                                    </div>
                                </div>
                            </div>

                            <h5>Checkbox</h5>
                            <div class="grid">
                                <div class="col-12 md:col-4">
                                    <div class="field-checkbox mb-0">
                                        <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                                        <label for="checkOption1">Chicago</label>
                                    </div>
                                </div>
                                <div class="col-12 md:col-4">
                                    <div class="field-checkbox mb-0">
                                        <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                                        <label for="checkOption2">Los Angeles</label>
                                    </div>
                                </div>
                                <div class="col-12 md:col-4">
                                    <div class="field-checkbox mb-0">
                                        <Checkbox id="checkOption3" name="option" value="New York" v-model="checkboxValue" />
                                        <label for="checkOption3">New York</label>
                                    </div>
                                </div>
                            </div>

                            <h5>Input Switch</h5>
                            <InputSwitch v-model="switchValue" />
                        </div>

                        <div class="card">
                            <h5>Listbox</h5>
                            <Listbox v-model="listboxValue" :options="listboxValues" optionLabel="name" :filter="true" />

                            <h5>Dropdown</h5>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                            <h5>MultiSelect</h5>
                            <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="name" placeholder="Select Countries" :filter="true">
                                <template #value="slotProps">
                                    <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                        <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ option.name }}</div>
                                    </div>
                                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                                        <div>Select Countries</div>
                                    </template>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                        </div>

                        <div class="card">
                            <h5>ToggleButton</h5>
                            <ToggleButton v-model="toggleValue" onLabel="Yes" offLabel="No" :style="{ width: '10em' }" />

                            <h5>SelectButton</h5>
                            <SelectButton v-model="selectButtonValue1" :options="selectButtonValues1" optionLabel="name" />

                            <h5>SelectButton - Multiple</h5>
                            <SelectButton v-model="selectButtonValue2" :options="selectButtonValues2" optionLabel="name" :multiple="true" />
                        </div>
                    </div> -->

                    
                </div>
            </div>
            <div class="px-5 sm:px-8 py-8 surface-ground flex flex-wrap gap-5 align-items-center justify-content-between">
                <div class="text-4xl font-bold">Join the Prime Community</div>
                <Button label="Join Now" class="p-button-raised"></Button>
            </div>
            <div ref="pricing" class="px-5 sm:px-8 py-8 surface-card flex flex-column lg:flex-row justify-content-center gap-5">
                <div class="shadow-2 surface-card p-5 text-center border-round-2xl">
                    <img alt="intro image" src="/demo/images/landing/asset-free.svg" class="w-full sm:w-6 lg:w-full block mx-auto mb-5" />
                    <div class="text-2xl font-bold mb-3">Free</div>
                    <div class="mb-5">
                        <span class="text-6xl font-bold">$0 </span>
                        <span class="text-xl text-color-secondary">/month</span>
                    </div>
                    <a
                        class="p-2 mb-5 font-bold block text-center cursor-pointer hover:surface-hover transition-colors transition-duration-300"
                        style="
                            border-radius: 2rem;
                            box-shadow:
                                0px 3px 4px rgba(0, 0, 0, 0.1),
                                0px 24px 36px rgba(0, 0, 0, 0.04);
                        "
                        >TRY NOW</a
                    >
                    <ul class="list-none p-0 m-0">
                        <li class="flex align-items-center">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Responsive Layout</span>
                        </li>
                    </ul>
                </div>
                <div class="shadow-2 surface-card p-5 text-center border-round-2xl">
                    <img alt="intro image" src="/demo/images/landing/asset-premium.svg" class="w-full sm:w-6 lg:w-full block mx-auto mb-5" />
                    <div class="text-2xl font-bold mb-3">Premium</div>
                    <div class="mb-5">
                        <span class="text-6xl font-bold">$9 </span>
                        <span class="text-xl text-color-secondary">/month</span>
                    </div>
                    <a
                        class="p-2 mb-5 font-bold block text-center cursor-pointer hover:surface-hover transition-colors transition-duration-300"
                        style="
                            border-radius: 2rem;
                            box-shadow:
                                0px 3px 4px rgba(0, 0, 0, 0.1),
                                0px 24px 36px rgba(0, 0, 0, 0.04);
                        "
                        >TRY NOW</a
                    >
                    <ul class="list-none p-0 m-0">
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Responsive Layout</span>
                        </li>
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>10000 Push Messages</span>
                        </li>
                        <li class="flex align-items-center">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>50 Support Tickets</span>
                        </li>
                    </ul>
                </div>
                <div class="shadow-2 surface-card p-5 text-center border-round-2xl">
                    <img alt="intro image" src="/demo/images/landing/asset-enterprise.svg" class="w-full sm:w-6 lg:w-full block mx-auto mb-5" />
                    <div class="text-2xl font-bold mb-3">Enterprise</div>
                    <div class="mb-5">
                        <span class="text-6xl font-bold">$19 </span>
                        <span class="text-xl text-color-secondary">/month</span>
                    </div>
                    <a
                        class="p-2 mb-5 font-bold block text-center cursor-pointer hover:surface-hover transition-colors transition-duration-300"
                        style="
                            border-radius: 2rem;
                            box-shadow:
                                0px 3px 4px rgba(0, 0, 0, 0.1),
                                0px 24px 36px rgba(0, 0, 0, 0.04);
                        "
                        >TRY NOW</a
                    >
                    <ul class="list-none p-0 m-0">
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Responsive Layout</span>
                        </li>
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Unlimited Push Messages</span>
                        </li>
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>1000 Support Tickets</span>
                        </li>
                        <li class="flex align-items-center mb-3">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Free Shipping</span>
                        </li>
                        <li class="flex align-items-center">
                            <i class="pi pi-check-circle text-green-500 text-xl mr-2"></i>
                            <span>Unlimited Storage</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="px-5 sm:px-8 py-8 bg-gray-900 flex flex-column md:flex-row md:align-items-start gap-5" style="border-top-left-radius: 14px; border-top-right-radius: 14px">
                <div class="flex align-items-center flex-1">
                    <img alt="intro image" src="/demo/images/landing/logo-v.svg" class="w-4rem" />
                    <span class="text-white text-5xl font-bold ml-2">Real Comm</span>
                </div>
                <div class="flex-1">
                    <div class="text-xl text-gray-600 mb-4">LATEST</div>
                    <ul class="list-none p-0 m-0">
                        <li class="mb-3">
                            <a class="cursor-pointer text-white text-xl">Ultima</a>
                        </li>
                        <li class="mb-3">
                            <a class="cursor-pointer text-white text-xl">Apollo</a>
                        </li>
                        <li class="mb-3">
                            <a class="cursor-pointer text-white text-xl">Sakai</a>
                        </li>
                        <li class="mb-3">
                            <a class="cursor-pointer text-white text-xl">Diamond</a>
                        </li>
                        <li>
                            <a class="cursor-pointer text-white text-xl">Poseidon</a>
                        </li>
                    </ul>
                </div>
                <div class="flex-1">
                    <div class="text-xl text-gray-600 mb-4">DEMOS</div>
                    <ul class="list-none p-0 m-0">
                        <li class="mb-3">
                            <a href="https://www.primefaces.org/primeng" class="cursor-pointer text-white text-xl">PrimeNG</a>
                        </li>
                        <li class="mb-3">
                            <a href="https://www.primefaces.org/showcase" class="cursor-pointer text-white text-xl">PrimeFaces</a>
                        </li>
                        <li class="mb-3">
                            <a href="https://www.primefaces.org/primereact" class="cursor-pointer text-white text-xl">PrimeReact</a>
                        </li>
                        <li>
                            <a href="https://www.primefaces.org/primevue" class="cursor-pointer text-white text-xl">PrimeVue</a>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-1 gap-4">
                    <a href="http://github.com/primefaces">
                        <i class="pi pi-github text-white text-5xl"></i>
                    </a>
                    <a href="https://discord.gg/gzKFYnpmCY">
                        <i class="pi pi-discord text-white text-5xl"></i>
                    </a>
                    <a href="http://twitter/primevue">
                        <i class="pi pi-twitter text-white text-5xl"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- <AppConfig simple /> -->
</template>
