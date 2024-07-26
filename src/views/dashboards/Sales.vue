<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ProductService } from '@/service/ProductService';

const productService = new ProductService();

const value1 = ref(75);
const value2 = ref(20);
const value3 = ref(42);
const value4 = ref(26);
const value5 = ref(10);
const value6 = ref(60);

const dates = ref();

const orderWeek = ref([
    { name: 'This Week', code: '0' },
    { name: 'Last Week', code: '1' }
]);
const selectedOrderWeek = ref(orderWeek.value[0]);
const products = ref([]);
const productsThisWeek = ref([]);
const productsLastWeek = ref([]);
const analytics = ref([
    { label: 'Products', value: 1 },
    { label: 'Sales', value: 2 },
    { label: 'Customers', value: 3 }
]);

const selectedDrop = ref(0);

const revenueChart = ref({
    labels: ['Online', 'Retail', 'Partner'],
    datasets: [
        {
            data: [12, 32, 56],
            backgroundColor: [
                getComputedStyle(document.documentElement).getPropertyValue('--indigo-500'),
                getComputedStyle(document.documentElement).getPropertyValue('--teal-500'),
                getComputedStyle(document.documentElement).getPropertyValue('--purple-500')
            ],
            borderWidth: 0
        }
    ]
});

const revenueOptions = ref({
    plugins: {
        legend: {
            display: false
        }
    },
    responsive: true,
    cutout: 60
});

const chatMessages = ref([
    { self: false, from: 'Jane Cooper', url: '/demo/images/avatar/stephenshaw.png', messages: ['Hey M. hope you are well. Our idea is accepted by the board. '] },
    { self: true, from: 'Jerome Bell', url: '/demo/images/avatar/ivanmagalhaes.png', messages: ['we did it! 🤠'] },
    { self: false, from: 'Darlene Robertson', url: '/demo/images/avatar/amyelsner.png', messages: ['I will be looking at the process then, just to be sure 🤓 '] }
]);
const activeTab = ref(0);
const activeListItemIndex = ref(1);
const activeListItem = ref({
    image: '/demo/images/dashboard/headphones.svg',
    text: 'HF Headphones',
    subtext: 'Wireless',
    ratio: '+24%'
});

const listItems = ref([
    { image: '/demo/images/dashboard/sneaker.png', text: 'Red Sneakers', subtext: 'RX Series', ratio: '+40%' },
    { image: '/demo/images/dashboard/headphones.png', text: 'HF Headphones', subtext: 'Wireless', ratio: '+24%' },
    { image: '/demo/images/dashboard/sunglasses.png', text: 'Sunglasses', subtext: 'UV Protection', ratio: '+17%' }
]);

onMounted(async () => {
    products.value = await productService.getProducts().then((data) => data.slice(0, 5));
    productsThisWeek.value = await productService.getProducts().then((data) => data.slice(0, 5));
    productsLastWeek.value = await productService.getProductsMixed().then((data) => data.slice(0, 5));
});

const recentSales = (code) => {
    if (code === '0') products.value = productsThisWeek.value;
    else products.value = productsLastWeek.value;
};

const onChatKeydown = async (event) => {
    if (event.key === 'Enter') {
        const message = event.target.value;
        const lastMessage = chatMessages.value[chatMessages.value.length - 1];

        if (lastMessage.from) {
            chatMessages.value.push({
                self: true,
                from: 'Jerome Bell',
                url: '/demo/images/avatar/ivanmagalhaes.png',
                messages: [message]
            });
        } else {
            lastMessage.messages.push(message);
        }

        if (message.match(/primeng|primereact|primefaces|primevue/i)) {
            chatMessages.value.push({
                nth: false,
                from: 'Ioni Bowcher',
                url: '/demo/images/avatar/ionibowcher.png',
                messages: ['Always bet on Prime!']
            });
        }

        event.target.value = '';

        await nextTick();
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
};

const onTabClick = (index) => {
    activeTab.value = index;

    if (index === 0) {
        listItems.value = [
            { image: '/demo/images/dashboard/sneaker.png', text: 'Red Sneakers', subtext: 'RX Series', ratio: '+40%' },
            { image: '/demo/images/dashboard/headphones.png', text: 'HF Headphones', subtext: 'Wireless', ratio: '+24%' },
            { image: '/demo/images/dashboard/sunglasses.png', text: 'Sunglasses', subtext: 'UV Protection', ratio: '+17%' }
        ];
    } else if (index === 1) {
        listItems.value = [
            { image: '/demo/images/dashboard/camera.png', text: 'Instant Camera', subtext: 'II-Mark', ratio: '+27%' },
            { image: '/demo/images/dashboard/cupcake.png', text: 'Cupcake', subtext: 'Cinnamon', ratio: '+41%' },
            { image: '/demo/images/dashboard/drink.png', text: 'Cold Drink', subtext: 'Lime', ratio: '+56%' }
        ];
    } else if (index === 2) {
        listItems.value = [
            { image: '/demo/images/dashboard/tripod.png', text: 'Tripod', subtext: 'Stabilizer', ratio: '+34%' },
            { image: '/demo/images/dashboard/headphone2.png', text: 'Headphone', subtext: 'Wireless', ratio: '+67%' },
            { image: '/demo/images/dashboard/spoon.png', text: 'Spoon Set', subtext: 'Colorful', ratio: '+8%' }
        ];
    }

    activeListItem.value = listItems.value[activeListItemIndex.value];
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-3 gap-3">
                <div class="flex align-items-center">
                    <img src="/demo/images/avatar/profile.jpg" :width="64" alt="profile" class="border-circle border-2 border-primary flex-shrink-0" />
                    <div class="ml-3">
                        <span class="text-4xl font-light">Bonjour, <span class="font-normal">Hermione</span></span>
                        <div class="text-color-secondary">26 January 2023, Thu</div>
                    </div>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <Dropdown :options="analytics" v-model="selectedDrop" placeholder="Category" class="w-full sm:w-10rem" optionLabel="label"></Dropdown>
                    <Calendar v-model="dates" :showIcon="true" selectionMode="range" class="w-full sm:w-14rem" placeholder="Select Range"></Calendar>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card p-0 grid grid-nogutter">
                <div class="col-12 md:col-6 lg:col-3 py-5 px-6 border-none md:border-right-1 surface-border">
                    <div class="flex align-items-center mb-3">
                        <Avatar icon="pi pi-shopping-cart" size="large" shape="circle" class="text-base bg-indigo-100 text-indigo-700"></Avatar>
                        <span class="text-xl ml-2">Orders</span>
                    </div>
                    <div class="flex align-items-center justify-content-between mb-3">
                        <span class="block font-bold text-6xl mb-3">1420</span>
                        <div class="flex align-items-center justify-content-between h-2rem px-2 py-1 bg-green-100 text-green-900 border-round">
                            <i class="pi pi-arrow-up-right"></i>
                            <span class="font-bold ml-1">551</span>
                        </div>
                    </div>
                    <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                        <div class="h-full bg-indigo-500" style="width: 40%"></div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 py-5 px-6 border-none md:border-right-1 surface-border">
                    <div class="flex align-items-center mb-3">
                        <Avatar icon="pi pi-money-bill" size="large" shape="circle" class="text-base bg-green-100 text-green-700"></Avatar>
                        <span class="text-xl ml-2">Revenue</span>
                    </div>
                    <div class="flex align-items-center justify-content-between mb-3">
                        <span class="block font-bold text-6xl mb-3">1420</span>
                        <div class="flex align-items-center justify-content-between h-2rem px-2 py-1 bg-green-100 text-green-900 border-round">
                            <i class="pi pi-arrow-up-right"></i>
                            <span class="font-bold ml-1">2.7K</span>
                        </div>
                    </div>
                    <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                        <div class="h-full bg-green-500" style="width: 60%"></div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 py-5 px-6 border-none md:border-right-1 surface-border">
                    <div class="flex align-items-center mb-3">
                        <Avatar icon="pi pi-users" size="large" shape="circle" class="text-base bg-yellow-100 text-yellow-700"></Avatar>
                        <span class="text-xl ml-2">Customers</span>
                    </div>
                    <div class="flex align-items-center justify-content-between mb-3">
                        <span class="block font-bold text-6xl mb-3">1420</span>
                        <div class="flex align-items-center justify-content-between h-2rem px-2 py-1 bg-green-100 text-green-900 border-round">
                            <i class="pi pi-arrow-up-right"></i>
                            <span class="font-bold ml-1">254</span>
                        </div>
                    </div>
                    <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                        <div class="h-full bg-yellow-500" style="width: 80%"></div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 py-5 px-6">
                    <div class="flex align-items-center mb-3">
                        <Avatar icon="pi pi-comments" size="large" shape="circle" class="text-base bg-purple-100 text-purple-700"></Avatar>
                        <span class="text-xl ml-2">Comments</span>
                    </div>
                    <div class="flex align-items-center justify-content-between mb-3">
                        <span class="block font-bold text-6xl mb-3">1420</span>
                        <div class="flex align-items-center justify-content-between h-2rem px-2 py-1 bg-green-100 text-green-900 border-round">
                            <i class="pi pi-arrow-up-right"></i>
                            <span class="font-bold ml-1">85</span>
                        </div>
                    </div>
                    <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                        <div class="h-full bg-purple-500" style="width: 30%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <h5>Store Overview</h5>
                <div class="flex flex-wrap gap-5">
                    <ul class="flex-1 list-none p-0 m-0">
                        <li
                            v-for="(item, i) in listItems"
                            :key="i"
                            @click="
                                activeListItemIndex = i;
                                activeListItem = item;
                            "
                            class="border-round p-3 flex cursor-pointer border-1 border-transparent"
                            :class="{ 'border-primary-500': activeListItemIndex === i, 'hover:surface-hover': activeListItemIndex !== i }"
                        >
                            <img :src="item.image" width="64" class="mr-3 border-round" />
                            <div class="flex-1 flex align-items-center justify-content-between">
                                <div class="flex flex-column">
                                    <span class="font-bold">{{ item.text }}</span>
                                    <span class="text-color-secondary mb-1">{{ item.subtext }}</span>
                                    <Badge :value="item.ratio"></Badge>
                                </div>
                                <i class="pi pi-chevron-right text-color-secondary ml-3"></i>
                            </div>
                        </li>
                    </ul>

                    <div class="flex-1 flex flex-column align-items-center justify-content-center">
                        <div class="bars flex align-items-end mb-4">
                            <div class="w-1rem h-2rem mr-2 surface-200 border-round" :class="{ 'h-3rem bg-primary-500': activeListItemIndex === 2 && activeTab === 0 }"></div>
                            <div class="w-1rem h-3rem mr-2 surface-200 border-round" :class="{ 'h-5rem bg-primary-500': activeListItemIndex === 1 && activeTab !== 2 }"></div>
                            <div class="w-1rem h-4rem mr-2 surface-200 border-round"></div>
                            <div class="w-1rem h-6rem mr-2 surface-200 border-round" :class="{ 'h-4rem bg-primary-500': activeListItemIndex === 2 && activeTab !== 0 }"></div>
                            <div class="w-1rem h-2rem mr-2 surface-200 border-round" :class="{ 'h-4rem bg-primary-500': activeListItemIndex === 1 && activeTab === 2 }"></div>
                            <div class="w-1rem h-5rem mr-2 surface-200 border-round" :class="{ 'h-4rem bg-primary-500': activeListItemIndex === 0 && activeTab === 1 }"></div>
                            <div class="w-1rem h-3rem mr-2 surface-200 border-round" :class="{ 'h-4rem bg-primary-500': activeListItemIndex === 0 && activeTab !== 1 }"></div>
                            <div class="w-1rem h-1rem mr-2 surface-200 border-round"></div>
                        </div>
                        <span class="font-bold">{{ activeListItem.text }}</span>
                        <span class="text-color-secondary">{{ activeListItem.subtext }}</span>
                    </div>
                </div>
                <div class="flex align-items-center mt-7 border-round">
                    <div class="flex flex-column align-items-center flex-1 py-3 cursor-pointer border-top-1 hover:surface-hover" :class="{ 'border-primary-500': activeTab === 0, 'surface-border': activeTab !== 0 }" @click="onTabClick(0)">
                        <i class="pi pi-sort-amount-down text-2xl mb-2"></i>
                        <span class="font-bold">Latest</span>
                    </div>
                    <div class="flex flex-column align-items-center flex-1 py-3 cursor-pointer border-top-1 hover:surface-hover" :class="{ 'border-primary-500': activeTab === 1, 'surface-border': activeTab !== 1 }" @click="onTabClick(1)">
                        <i class="pi pi-chart-line text-2xl mb-2"></i>
                        <span class="font-bold">Trending</span>
                    </div>
                    <div class="flex flex-column align-items-center flex-1 py-3 cursor-pointer border-top-1 hover:surface-hover" :class="{ 'border-primary-500': activeTab === 2, 'surface-border': activeTab !== 2 }" @click="onTabClick(2)">
                        <i class="pi pi-star text-2xl mb-2"></i>
                        <span class="font-bold">Starred</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card h-full">
                <div class="flex flex-wrap align-items-center justify-content-between mb-3 gap-3">
                    <h5 class="m-0">Recent Sales</h5>
                    <Dropdown :options="orderWeek" v-model="selectedOrderWeek" optionLabel="name" @update:modelValue="recentSales($event.code)" class="w-10rem"></Dropdown>
                </div>

                <DataTable :value="products" :rows="5" responsiveLayout>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="'/demo/images/product/' + slotProps.data.image" class="shadow-4" :alt="slotProps.data.image" width="50" />
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="category" header="Category" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.category }}
                        </template>
                    </Column>
                    <Column field="price" header="Price" :sortable="true">
                        <template #body="slotProps">
                            <td>${{ slotProps.data.price }}</td>
                        </template>
                    </Column>
                    <Column>
                        <template #body>
                            <Button type="button" icon="pi pi-search" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-6">
            <div class="card h-full">
                <h5>Live Support</h5>
                <div>
                    <ul ref="chatcontainer" class="chat-container list-none p-0 px-3 mt-4 mb-6 h-21rem overflow-y-auto">
                        <li v-for="(chartMessage, index) in chatMessages" :key="index" class="flex align-items-start mb-3" :class="{ 'justify-content-start': !chartMessage.self, 'justify-content-end': chartMessage.self }">
                            <img v-if="!chartMessage.self" :src="chartMessage.url" width="36" height="36" class="border-circle" />
                            <div v-if="!chartMessage.self" class="ml-2 flex flex-column align-items-start">
                                <div>
                                    <span class="font-bold mr-3">{{ chartMessage.from }}</span>
                                    <span class="text-color-secondary">2m ago</span>
                                </div>
                                <div v-for="(message, messageIndex) in chartMessage.messages" :key="messageIndex" class="inline-block text-left surface-100 border-round px-5 py-3 mt-3">
                                    {{ message }}
                                </div>
                            </div>
                            <div v-if="chartMessage.self" class="mr-3 flex flex-column align-items-end">
                                <div>
                                    <span class="text-color-secondary">2m ago</span>
                                    <span class="font-bold ml-3">{{ chartMessage.from }}</span>
                                </div>
                                <div v-for="(message, messageIndex) in chartMessage.messages" :key="messageIndex" class="inline-block text-right bg-primary-500 text-primary-50 border-round px-5 py-3 mt-3">
                                    {{ message }}
                                </div>
                            </div>
                            <img v-if="chartMessage.self" :src="chartMessage.url" width="36" height="36" class="border-circle" />
                        </li>
                    </ul>
                    <InputGroup class="mt-3">
                        <InputText type="text" placeholder="Write your message (Hint: 'PrimeVue')" @keydown="onChatKeydown($event)" />
                    </InputGroup>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="card h-full">
                <div class="flex align-items-center justify-content-between mb-3">
                    <h5 class="m-0">Revenue Stream</h5>
                    <div class="flex align-items-center gap-2">
                        <Button type="button" icon="pi pi-angle-left" class="p-button-outlined p-button-rounded p-button-plain h-2rem w-2rem p-0"></Button>
                        <Button type="button" icon="pi pi-angle-right" class="p-button-outlined p-button-rounded p-button-plain h-2rem w-2rem p-0"></Button>
                    </div>
                </div>
                <div class="flex flex-column align-items-center justify-content-center">
                    <Chart type="doughnut" :data="revenueChart" :options="revenueOptions" :width="180" :height="180" class="mb-5"></Chart>
                    <span class="font-bold mb-2">Total Revenue This Week</span>
                    <span class="font-bold text-6xl mb-2">88k</span>
                    <span class="font-bold mb-4 text-green-500">+21%<span class="text-color-secondary"> higher than last week</span></span>
                    <div class="flex align-items-center justify-content-center gap-3">
                        <div class="flex align-items-center">
                            <i class="pi pi-circle-on text-indigo-500"></i>
                            <span class="text-color-secondary ml-2">Online</span>
                        </div>
                        <div class="flex align-items-center">
                            <i class="pi pi-circle-on text-teal-500"></i>
                            <span class="text-color-secondary ml-2">Retail</span>
                        </div>
                        <div class="flex align-items-center">
                            <i class="pi pi-circle-on text-purple-500"></i>
                            <span class="text-color-secondary ml-2">Partner</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
            <div class="card h-full">
                <h5>Sales Channels</h5>

                <ul class="list-none m-0 p-0">
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Online Marketplaces</span>
                            <span>%40</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-orange-500" style="width: 40%"></div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Resellers</span>
                            <span>%60</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-indigo-500" style="width: 60%"></div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Affiliate</span>
                            <span>%90</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-blue-500" style="width: 90%"></div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Organic</span>
                            <span>%50</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-green-500" style="width: 50%"></div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Referral</span>
                            <span>%30</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-purple-500" style="width: 30%"></div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Ads</span>
                            <span>%30</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-yellow-500" style="width: 45%"></div>
                        </div>
                    </li>
                    <li>
                        <div class="flex align-items-center justify-content-between mb-2">
                            <span class="font-bold">Partners</span>
                            <span>%30</span>
                        </div>
                        <div class="border-round overflow-hidden surface-200" style="height: 0.5rem">
                            <div class="h-full bg-teal-500" style="width: 70%"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="card p-0">
                <img src="/demo/images/dashboard/bg-product.jpg" alt="blog-bg" class="w-full border-round-top-2xl" />
                <div class="p-4">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="inline-flex align-items-center">
                            <span class="font-bold">Optimizing Logistics with AI</span>
                            <i class="pi pi-check-circle ml-3 text-xl text-green-500"></i>
                        </div>
                        <i class="pi pi-bookmark ml-3 text-xl text-color-secondary"></i>
                    </div>
                    <p class="mb-5 line-height-3">Sit amet nulla facilisi morbi tempus iaculis. Dolor magna eget est lorem ipsum dolor sit. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus.</p>
                    <div class="flex align-items-center justify-content-between">
                        <img src="/demo/images/avatar/amyelsner.png" alt="avatar" class="flex-shrink-0 w-2rem h-2rem" />
                        <div class="text-color-secondary flex align-items-center">
                            <i class="pi pi-heart mr-1"></i>
                            <span>888</span>
                            <i class="pi pi-eye ml-4 mr-1"></i>
                            <span>8888</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6 xl:col-3">
            <div class="card h-full">
                <h5>Best Sellers</h5>
                <ul class="list-none p-0 m-0">
                    <li class="flex align-items-center justify-content-between pb-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/bamboo-watch.png" alt="verona-layout" class="w-3rem h-3rem border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Bamboo Watch</span>
                                <span class="text-color-secondary text-sm">Accessories</span>
                            </div>
                        </div>
                        <Knob v-model="value1" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                    <li class="flex align-items-center justify-content-between py-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/black-watch.png" alt="verona-layout" width="42" height="42" class="border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Black Watch</span>
                                <span class="text-color-secondary text-sm">Accessories</span>
                            </div>
                        </div>
                        <Knob v-model="value2" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                    <li class="flex align-items-center justify-content-between py-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/blue-band.png" alt="verona-layout" width="42" height="42" class="border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Blue Band</span>
                                <span class="text-color-secondary text-sm">Fitness</span>
                            </div>
                        </div>
                        <Knob v-model="value3" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                    <li class="flex align-items-center justify-content-between py-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/blue-t-shirt.png" alt="verona-layout" width="42" height="42" class="border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Blue T-Shirt</span>
                                <span class="text-color-secondary text-sm">Clothing</span>
                            </div>
                        </div>
                        <Knob v-model="value4" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                    <li class="flex align-items-center justify-content-between py-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/black-watch.png" alt="verona-layout" width="42" height="42" class="border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Black Watch</span>
                                <span class="text-color-secondary text-sm">Accessories</span>
                            </div>
                        </div>
                        <Knob v-model="value5" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                    <li class="flex align-items-center justify-content-between py-2">
                        <div class="flex align-items-center justify-content-between">
                            <img src="/demo/images/product/sneakers.jpg" alt="verona-layout" width="42" height="42" class="border-round" />
                            <div class="ml-2 flex flex-column">
                                <span class="font-bold">Sneakers</span>
                                <span class="text-color-secondary text-sm">Clothing</span>
                            </div>
                        </div>
                        <Knob v-model="value6" :size="40" class="ml-auto" :showValue="false"></Knob>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-6">
            <div class="card">
                <h5>Customer Stories</h5>
                <div class="flex flex-wrap align-items-center justify-content-around gap-2">
                    <div class="flex flex-column align-items-center justify-content-center">
                        <Button href="#" icon="pi pi-plus text-2xl" class="w-4rem h-4rem p-button-outlined p-button-rounded mb-2"></Button>
                        <span class="font-bold text-sm">Add New</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/amyelsner.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Darlene Robertson</span>
                        <span class="text-color-secondary text-sm">2m ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/annafali.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Albert Flores</span>
                        <span class="text-color-secondary text-sm">1h ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/asiyajavayant.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Annette Black</span>
                        <span class="text-color-secondary text-sm">6m ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/bernardodominic.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Ralph Edwards</span>
                        <span class="text-color-secondary text-sm">4m ago</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <h5>Potential Influencers</h5>
                <div class="flex flex-wrap align-items-center justify-content-around gap-2">
                    <div class="flex flex-column align-items-center justify-content-center">
                        <Button href="#" icon="pi pi-plus text-2xl" class="w-4rem h-4rem p-button-outlined p-button-rounded mb-2"></Button>
                        <span class="font-bold text-sm">Add New</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/ionibowcher.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Jenna Watson</span>
                        <span class="text-color-secondary text-sm">2m ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/onyamalimba.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Dan Cooper</span>
                        <span class="text-color-secondary text-sm">10m ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/elwinsharvill.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Kathryn Murphy</span>
                        <span class="text-color-secondary text-sm">50m ago</span>
                    </div>
                    <div class="flex flex-column align-items-center justify-content-center">
                        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-transparent border-3 surface-border border-circle relative">
                            <img src="/demo/images/avatar/stephenshaw.png" class="border-circle h-3rem w-3rem" />
                            <span class="absolute top-0 surface-card border-circle flex align-items-center justify-content-center" style="right: -0.75rem; width: 1.5rem; height: 1.5rem">
                                <i class="pi pi-globe text-sm"></i>
                            </span>
                        </div>
                        <span class="font-bold">Smith Wilson</span>
                        <span class="text-color-secondary text-sm">40m ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
