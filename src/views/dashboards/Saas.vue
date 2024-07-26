<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const overviewWeeks = ref([
    { name: 'Last Week', code: '0' },
    { name: 'This Week', code: '1' }
]);

const selectedOverviewWeek = ref(overviewWeeks.value.find((week) => week.name === 'Last Week'));

const overviewChartData = ref(null);
const revenueChartData = ref(null);
const revenueChartOptions = ref(null);
const overviewChartOptions = ref(null);

const setSvg = (path) => {
    return `/demo/images/dashboard/${path}` + (layoutConfig.colorScheme.value === 'light' ? '' : '-dark') + '.svg';
};
const dynamicBackground = () => {
    return layoutConfig.colorScheme.value === 'dark' ? 'rgba(227, 248, 255, 0.1)' : 'rgba(227, 248, 255, 0.5)';
};

const initCharts = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const primaryColor = documentStyle.getPropertyValue('--primary-color');
    const primaryColor300 = documentStyle.getPropertyValue('--primary-200');
    const borderColor = documentStyle.getPropertyValue('--surface-border');

    overviewChartData.value = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
            {
                label: 'Organic',
                data: [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
                borderColor: [primaryColor],
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                type: 'line',
                fill: false
            },
            {
                label: 'Referral',
                data: [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1],
                backgroundColor: [layoutConfig.colorScheme.value === 'dark' ? '#879AAF' : '#E4E7EB'],
                hoverBackgroundColor: [primaryColor300],
                fill: true,
                borderRadius: 10,
                borderSkipped: 'top bottom',
                barPercentage: 0.3
            }
        ]
    };

    overviewChartOptions.value = {
        plugins: {
            legend: {
                position: 'bottom',
                align: 'end',
                labels: {
                    color: textColorSecondary
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        hover: {
            mode: 'index'
        },
        scales: {
            y: {
                max: 7,
                min: 0,
                ticks: {
                    stepSize: 0,
                    callback: function (value, index) {
                        if (index === 0) {
                            return value;
                        } else {
                            return value + 'k';
                        }
                    },
                    color: textColorSecondary
                },
                grid: {
                    borderDash: [2, 2],
                    color: borderColor,
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    color: textColorSecondary
                }
            }
        }
    };

    revenueChartData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [11, 17, 30, 60, 88, 92],
                borderColor: 'rgba(25, 146, 212, 0.5)',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                fill: false,
                tension: 0.4
            },
            {
                data: [11, 19, 39, 59, 69, 71],
                borderColor: 'rgba(25, 146, 212, 0.5)',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                fill: false,
                tension: 0.4
            },
            {
                data: [11, 17, 21, 30, 47, 83],
                backgroundColor: 'rgba(25, 146, 212, 0.2)',
                borderColor: 'rgba(25, 146, 212, 0.5)',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                fill: true,
                tension: 0.4
            }
        ]
    };

    revenueChartOptions.value = {
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: {
                    color: borderColor
                },
                max: 100,
                min: 0,
                ticks: {
                    color: textColorSecondary
                }
            },
            x: {
                grid: {
                    color: borderColor
                },
                ticks: {
                    color: textColorSecondary,
                    beginAtZero: true
                }
            }
        }
    };

    overviewChartData.value = { ...overviewChartData.value };
};
const changeOverviewWeek = () => {
    const dataSet1 = [
        [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
        [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
    ];
    const dataSet2 = [
        [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
        [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5]
    ];

    if (selectedOverviewWeek.value.code === '1') {
        overviewChartData.value.datasets[0].data = dataSet2[parseInt('0')];
        overviewChartData.value.datasets[1].data = dataSet2[parseInt('1')];
    } else {
        overviewChartData.value.datasets[0].data = dataSet1[parseInt('0')];
        overviewChartData.value.datasets[1].data = dataSet1[parseInt('1')];
    }

    // Forcing the reactivity
    overviewChartData.value = { ...overviewChartData.value };
};

watch(() => selectedOverviewWeek.value, changeOverviewWeek);

watch(
    layoutConfig.colorScheme,
    () => {
        initCharts();
    },
    { immediate: true }
);

onMounted(initCharts);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card p-0 overflow-hidden flex flex-column">
                <div class="flex align-items-center p-3">
                    <i class="pi pi-users text-6xl text-blue-500"></i>
                    <div class="ml-3">
                        <span class="text-blue-500 block white-space-nowrap">USERS SIGNED UP</span>
                        <span class="text-blue-500 block text-4xl font-bold">3882</span>
                    </div>
                </div>
                <img :src="setSvg('users')" class="w-full" alt="users" />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card p-0 overflow-hidden flex flex-column">
                <div class="flex align-items-center p-3">
                    <i class="pi pi-map text-6xl text-orange-500"></i>
                    <div class="ml-3">
                        <span class="text-orange-500 block white-space-nowrap">LIFETIME VALUE</span>
                        <span class="text-orange-500 block text-4xl font-bold">532</span>
                    </div>
                </div>
                <img :src="setSvg('locations')" class="w-full" alt="locations" />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card p-0 overflow-hidden flex flex-column">
                <div class="flex align-items-center p-3">
                    <i class="pi pi-directions text-6xl text-green-500"></i>
                    <div class="ml-3">
                        <span class="text-green-500 block white-space-nowrap">CONVERSION RATE</span>
                        <span class="text-green-500 block text-4xl font-bold">12.6%</span>
                    </div>
                </div>
                <img :src="setSvg('rate')" class="w-full" alt="conversion" />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card h-full p-0 overflow-hidden flex flex-column">
                <div class="flex align-items-center p-3">
                    <i class="pi pi-comments text-6xl text-purple-500"></i>
                    <div class="ml-3">
                        <span class="text-purple-500 block white-space-nowrap">ACTIVE TRIALS</span>
                        <span class="text-purple-500 block text-4xl font-bold">440</span>
                    </div>
                </div>
                <img :src="setSvg('interactions')" class="w-full mt-auto" alt="interactions" />
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card h-full">
                <div class="flex justify-content-between align-items-center mb-3">
                    <h5>Acquisition Overview</h5>
                    <Dropdown :options="overviewWeeks" v-model="selectedOverviewWeek" optionLabel="name" @onChange="changeOverviewWeek()"></Dropdown>
                </div>
                <div class="graph">
                    <Chart ref="overviewchart" type="bar" :height="370" :data="overviewChartData" :options="overviewChartOptions"></Chart>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card h-full">
                <h5>Latest Customers</h5>
                <ul class="list-none p-0 m-0">
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="BS" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(101, 214, 173, 0.1)', color: '#27AB83', border: '1px solid #65D6AD' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Brooklyn Simmons</span>
                            <span class="text-color-secondary block">Manager at Mitsubishi</span>
                        </div>
                    </li>
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="LA" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Leslie Alexander</span>
                            <span class="text-color-secondary block">Customer Success at General Electric</span>
                        </div>
                    </li>
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="JB" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(94, 208, 250, 0.1)', color: '#1992D4', border: '1px solid #5ED0FA' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Jerome Bell</span>
                            <span class="text-color-secondary block">Mario Carrier at Nintendo</span>
                        </div>
                    </li>
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="JJ" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(43, 176, 237, 0.1)', color: '#127FBF', border: '1px solid #2BB0ED' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Jim Jones</span>
                            <span class="text-color-secondary block">Reliability Engineer at eBay</span>
                        </div>
                    </li>
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="AB" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(255, 155, 155, 0.1)', color: '#CF1124', border: '1px solid #FF9B9B' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Annette Black</span>
                            <span class="text-color-secondary block">Delivery Woman at Pizza Hut</span>
                        </div>
                    </li>
                    <li class="mb-4 flex align-items-center">
                        <Avatar label="AF" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Albert Flores</span>
                            <span class="text-color-secondary block">Team Leader at Insomniac Games</span>
                        </div>
                    </li>
                </ul>
                <Button type="button" class="w-full mt-3" label="View All" icon="pi pi-arrow-right" iconPos="right"></Button>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card">
                <div class="text-center mb-5">
                    <img :src="setSvg('completion-graph')" alt="graph" class="w-full" />
                </div>

                <ul class="list-none p-0 m-0">
                    <li class="mb-4 flex align-items-center justify-content-start">
                        <Avatar icon="pi pi-user-edit" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Add your personal information</span>
                            <span class="text-blue-500 hover:underline cursor-pointer block font-bold">Go Profile Edit</span>
                        </div>
                    </li>

                    <li class="mb-4 flex align-items-center justify-content-start">
                        <Avatar icon="pi pi-send" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Verify your phone</span>
                            <span class="text-blue-500 hover:underline cursor-pointer block font-bold">Send Verification SMS</span>
                        </div>
                    </li>

                    <li class="mb-4 flex align-items-center justify-content-start">
                        <Avatar icon="pi pi-video" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Verify your Face ID</span>
                            <span class="text-blue-500 hover:underline cursor-pointer block font-bold">Upload Pictures</span>
                        </div>
                    </li>

                    <li class="mb-4 flex align-items-center justify-content-start">
                        <Avatar icon="pi pi-briefcase" size="large" shape="circle" class="text-base font-bold" :style="{ 'background-color': 'rgba(250, 219, 95, 0.1)', color: '#DE911D', border: '1px solid #FADB5F' }"></Avatar>
                        <div class="ml-3">
                            <span class="block">Give permissions for personal data</span>
                            <span class="text-blue-500 hover:underline cursor-pointer block font-bold">View Agreement</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card h-full">
                <h5>Trials Leads By Role</h5>
                <div class="flex align-items-center justify-content-between pb-2 mb-1 border-bottom-1 surface-border">
                    <span class="font-bold">Role</span>
                    <span class="font-bold">Leads</span>
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-wrap align-items-center justify-content-between py-1">
                        <span>Finance</span>
                        <AvatarGroup class="w-8rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/ionibowcher.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-1">
                        <span>Management</span>
                        <AvatarGroup class="w-6rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/annafali.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/bernardodominic.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/elwinsharvill.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-1">
                        <span>Human Resources</span>
                        <AvatarGroup class="w-4rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/ivanmagalhaes.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-2">
                        <span>Development</span>
                        <AvatarGroup class="w-8rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/ionibowcher.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-2">
                        <span>Design</span>
                        <AvatarGroup class="w-4rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-2">
                        <span>R&D</span>
                        <AvatarGroup class="w-6rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-2">
                        <span>Reliability</span>
                        <AvatarGroup class="w-4rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                    <li class="flex flex-wrap align-items-center justify-content-between py-2">
                        <span>Social Media</span>
                        <AvatarGroup class="w-8rem justify-content-evenly">
                            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                            <Avatar image="/demo/images/avatar/ionibowcher.png" shape="circle"></Avatar>
                        </AvatarGroup>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card h-full">
                <h5>Leads By Region</h5>
                <TabView class="p-0">
                    <TabPanel header="Europe">
                        <table class="w-full">
                            <tbody>
                                <tr>
                                    <td class="py-1">🇮🇹 Italy</td>
                                    <td><span class="font-bold">90</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">12</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-100 text-700 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">LOW</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇫🇷 France</td>
                                    <td><span class="font-bold">61</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">8</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇩🇪 Germany</td>
                                    <td><span class="font-bold">46</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">5</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇳🇱 Netherlands</td>
                                    <td><span class="font-bold">28</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">19</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-100 text-700 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">LOW</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇪🇸 Spain</td>
                                    <td><span class="font-bold">17</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">7</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇧🇷 Brazil</td>
                                    <td><span class="font-bold">37</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">7</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">🇲🇽 Mexico</td>
                                    <td><span class="font-bold">27</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">4</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel header="United States">
                        <table class="w-full">
                            <tbody>
                                <tr>
                                    <td class="py-1">California</td>
                                    <td><span class="font-bold">79</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">11</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">Texas</td>
                                    <td><span class="font-bold">71</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-green-100 text-green-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-up"></i>
                                            <span class="font-bold ml-1">9</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-100 text-700 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">LOW</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">Florida</td>
                                    <td><span class="font-bold">55</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">15</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-100 text-700 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">LOW</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">New York</td>
                                    <td><span class="font-bold">48</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">10</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">Ohio</td>
                                    <td><span class="font-bold">26</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">6</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">New York</td>
                                    <td><span class="font-bold">48</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">10</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">Ohio</td>
                                    <td><span class="font-bold">26</span></td>
                                    <td class="text-right">
                                        <div class="inline-flex align-items-center justify-content-between px-2 py-1 bg-red-100 text-red-900 border-round" style="min-width: 3.5rem">
                                            <i class="pi pi-arrow-down"></i>
                                            <span class="font-bold ml-1">6</span>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <div class="inline-flex p-1 align-items-center justify-content-center surface-700 text-100 p-1 border-round text-sm" style="min-width: 4rem">
                                            <span class="font-bold">HIGH</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                </TabView>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card h-full">
                <h5>Recent Blog Posts</h5>
                <div class="flex flex-column mb-3">
                    <span class="text-lg mb-3">What is the Customer Journey?</span>
                    <span><Tag value="Conversion" class="mb-3"></Tag></span>

                    <span class="inline-flex align-items-center">
                        <i class="pi pi-clock mr-1 text-color-secondary"></i>
                        <span class="text-color-secondary">Jan 15.</span>
                        <span class="font-bold ml-2">4 days 36 mins</span>
                    </span>
                </div>
                <p class="line-height-3 mt-0 mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>

                <p class="line-height-3 mt-0 mb-5">Sit amet nulla facilisi morbi tempus iaculis. Dolor magna eget est lorem ipsum dolor sit. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus.</p>

                <div class="flex flex-wrap align-items-center justify-content-between">
                    <div class="flex align-items-center">
                        <Button type="button" icon="pi pi-angle-left" class="p-button-outlined p-button-rounded p-button-plain p-button-sm mr-2 p-2 w-2rem h-2rem"></Button>
                        <Button type="button" icon="pi pi-angle-right" class="p-button-outlined p-button-rounded p-button-plain p-button-sm p-2 w-2rem h-2rem"></Button>
                        <span class="font-bold ml-3">4</span>
                        <span>/8</span>
                    </div>
                    <AvatarGroup>
                        <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                        <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                        <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                        <Avatar image="/demo/images/avatar/ionibowcher.png" shape="circle"></Avatar>
                        <Avatar image="/demo/images/avatar/xuxuefeng.png" shape="circle"></Avatar>
                    </AvatarGroup>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6">
            <div class="card widget-timeline">
                <h5>Timeline</h5>
                <ul class="list-none p-0 m-0">
                    <li class="flex mb-3">
                        <div class="flex flex-column align-items-center">
                            <span class="flex align-items-center justify-content-center border-circle p-2 timeline-icon bg-blue-100 text-blue-500">
                                <i class="pi pi-twitter"></i>
                            </span>
                            <div class="h-full bg-blue-100" style="width: 2px; min-height: 4rem"></div>
                        </div>

                        <div class="ml-3 flex-1">
                            <div class="flex align-items-center justify-content-between mb-3">
                                <span> <strong>Tom Mathias</strong> retweeted a tweet about your following keyword. </span>
                                <span class="font-bold text-color-secondary">46m</span>
                            </div>
                            <div class="p-3 border-round" :style="{ 'background-color': dynamicBackground() }">
                                <div class="flex align-items-center justify-content-between mb-2">
                                    <img src="/demo/images/avatar/xuxuefeng.png" alt="avatar" class="w-2rem" />
                                    <AvatarGroup>
                                        <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle"></Avatar>
                                        <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle"></Avatar>
                                        <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle"></Avatar>
                                    </AvatarGroup>
                                </div>
                                <div class="font-bold mb-2">Jeff Atwood</div>
                                <p class="text-color-secondary text-sm line-height-3 mb-3" style="max-width: 28rem">Hooray! I suck at hardware but I was able to get the pi zero W, plus usb case, plus two color e-ink hat, to work!</p>

                                <ProgressBar :value="50" :showValue="false" class="w-full md:w-6" :style="{ height: '.5rem' }"></ProgressBar>
                            </div>
                        </div>
                    </li>
                    <li class="flex mb-3">
                        <div class="flex flex-column align-items-center">
                            <span class="flex align-items-center justify-content-center border-circle p-2 timeline-icon bg-yellow-100 text-yellow-500">
                                <i class="pi pi-star"></i>
                            </span>
                            <div class="h-full bg-yellow-100" style="width: 2px; min-height: 4rem"></div>
                        </div>

                        <div class="ml-3 flex-1">
                            <div class="flex align-items-center justify-content-between">
                                <span><strong>Scott Wesley</strong> starred NS0021 on customer list.</span>
                                <span class="font-bold text-color-secondary">1h 51m</span>
                            </div>
                        </div>
                    </li>
                    <li class="flex mb-3">
                        <div class="flex flex-column align-items-center">
                            <span class="flex align-items-center justify-content-center border-circle p-2 timeline-icon bg-green-100 text-green-500">
                                <i class="pi pi-link"></i>
                            </span>
                            <div class="h-full bg-green-100" style="width: 2px; min-height: 4rem"></div>
                        </div>

                        <div class="ml-3 flex-1">
                            <div class="flex align-items-center justify-content-between mb-3">
                                <span> <strong>Jorge Gomez</strong> shared design files on cloud. </span>
                                <span class="font-bold text-color-secondary">12h</span>
                            </div>
                            <ul class="list-none p-0 m-0">
                                <li class="flex align-items-center justify-content-start mb-2">
                                    <img src="/demo/images/dashboard/bg-detail.svg" alt="bg" class="w-2rem" />
                                    <span class="font-bold ml-2">01.Verona-Remastered.fig</span>
                                </li>
                                <li class="flex align-items-center justify-content-start">
                                    <img src="/demo/images/dashboard/bg-detail.svg" alt="bg" class="w-2rem" />
                                    <span class="font-bold ml-2">02.Verona-Marketing.fig</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="text-center">
                        <Button class="p-button-text" icon="pi pi-chevron-down" label="View More"></Button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Monthly Recurring Revenue Growth</h5>

                <Chart type="line" :height="370" :data="revenueChartData" :options="revenueChartOptions" id="nasdaq-chart"></Chart>
            </div>
        </div>
    </div>
</template>
