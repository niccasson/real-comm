<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import { listingsStore } from '@/features/listings/stores/listings-store.js';


const listingsStoreInst = listingsStore();

const picklistValue = ref([
    [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' }
    ],
    []
]);

const orderlistValue = ref([
    { name: 'San Francisco', code: 'SF' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Berlin', code: 'BRL' },
    { name: 'Barcelona', code: 'BRC' },
    { name: 'Rome', code: 'RM' }
]);

const dataviewValue = ref(null);
const layout = ref('grid');
const globalFilterValue = ref('');
const filteredValue = ref(null);
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
]);

const productService = new ProductService();

onMounted(async() => {
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
    productService.getProductsSmall().then((data) => (console.log(data)));
    let listingsData = await listingsStoreInst.fetchListings();
    filteredValue.value = listingsData;
    console.log(listingsData);
});

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

const onFilter = (e) => {
    const value = e.target.value;
    globalFilterValue.value = value;
    if (value.length === 0) {
        filteredValue.value = null;
    } else {
        const filtered = dataviewValue.value.filter((product) => {
            return product.name.toLowerCase().includes(value.toLowerCase());
        });
        filteredValue.value = filtered;
    }
};

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

// Method to handle button click
const viewListing = (listingId) => {
    console.log('Button was clicked!');
    console.log(listingId);
    
    // Create the URL with query parameters
    const newWindowUrl = `${window.location.origin}/listings/listing-overview?listingId=${listingId}`;
    window.open(newWindowUrl, '_blank');
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>DataView</h5>
                <DataView :value="filteredValue || dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between gap-2">
                            <div>
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
                            </div>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="globalFilterValue" @input="onFilter" placeholder="Search by Name" />
                            </IconField>
                        </div>
                    </template>

                    <template #grid="slotProps">
                        <div class="grid grid-nogutter">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 p-2">
                                <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                                    <div class="flex justify-content-center p-3">
                                        <div class="relative mx-auto">
                                            <img class="border-round w-full" :src="item.media + '/main.jpg'" :alt="item.address" style="max-width: 300px"/>
                                        </div>
                                    </div>
                                    <div class="pt-4">
                                        <div class="flex flex-row justify-content-between align-items-start gap-2">
                                            <div>
                                                <span class="font-medium text-secondary text-sm">{{ item.city_town }}, {{ item.province }}</span>
                                                <div class="text-lg font-medium text-900 mt-1">{{ item.address }}</div>
                                            </div>
                                            <div class="surface-100 p-1" style="border-radius: 30px">
                                                <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                    <span class="text-900 font-medium text-sm">{{ item.square_footage }}</span>
                                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-column gap-4 mt-4">
                                            <span class="text-2xl font-semibold text-900">${{ item.asking_price }}</span>
                                            <div class="flex gap-2">
                                                <Button icon="pi pi-shopping-cart" label="View Listing" class="flex-auto white-space-nowrap" @click="viewListing(item.listing_id)" />
                                                <Button icon="pi pi-heart" outlined></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>

            </div>
        </div>

        <div class="col-12 xl:col-8">
            <div class="card">
                <h5>PickList</h5>
                <PickList v-model="picklistValue" listStyle="height:250px">
                    <template #sourceheader> From </template>
                    <template #targetheader> To </template>
                    <template #item="slotProps">
                        <div>{{ slotProps.item.name }}</div>
                    </template>
                </PickList>
            </div>
        </div>

        <div class="col-12 xl:col-4">
            <div class="card">
                <h5>OrderList</h5>
                <OrderList v-model="orderlistValue" listStyle="height:250px">
                    <template #header> Cities </template>
                    <template #item="slotProps">
                        <div>{{ slotProps.item.name }}</div>
                    </template>
                </OrderList>
            </div>
        </div>
    </div>
</template>