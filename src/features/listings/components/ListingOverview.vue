<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import DateTime from '@/utils/datetime.js';
import { authStore } from '@/features/auth/stores/auth-store.js';
import { listingsStore } from '@/features/listings/stores/listings-store.js';
import { bidsStore } from '@/features/bids/stores/bids-store.js';


const router = useRouter();
const authStoreInst = authStore();
const listingsStoreInst = listingsStore();
const bidsStoreInst = bidsStore();


const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);


const listingData = reactive({});
let filteredListingData = {};
const listingImages = ref([]);

let isLoading = true;
let currBidData = ref([]);
let isCollapsed = ref(true);
const displayLoginRequired = ref(false);


import { PhotoService } from '@/service/PhotoService';
const photoService = new PhotoService();
const images = ref([]);

const bidAmount = ref(0);

onMounted(async() => {
    isLoading = true;

    const route = useRoute();
    const listingId = route.query.listingId;

    listingImages.value = await listingsStoreInst.fetchAwsImages(listingId);
    currBidData.value = await bidsStoreInst.fetchBidData(listingId);
    const currListData = await listingsStoreInst.fetchListingData(listingId);
    console.log('Listing data: ', currListData);
    Object.assign(listingData, currListData);
    console.log(listingData);

    const displayKeys = [
        'annual_property_taxes',
        'bathrooms',
        'bedrooms',
        'building_type',
        'built_in',
        'community_name',
        'land_size',
        'neighbourhood_name',
        'parking_type',
        'property_type',
        'square_footage',
        'storeys',
        'title',
    ];

    // Filter listingData to only include the keys in displayKeys
    filteredListingData = computed(() => {
      return Object.fromEntries(
        Object.entries(listingData).filter(([key]) => displayKeys.includes(key))
      );
    });

    console.log(listingImages.value);
    console.log(currBidData.value);
    console.log(filteredListingData);
    

    isLoading = false;
});

const selectedImageIndex = ref(0);
const color = ref('bluegray');
const size = ref('M');

const setColor = (val) => {
    color.value = val;
};
const setSize = (val) => {
    size.value = val;
};
const setSelectedImageIndex = (index) => {
    selectedImageIndex.value = index;
};



const goToLoginPage = () => {
    router.push({ name: 'login' });
};

// const closeLoginRequired = () => {
//     displayLoginRequired.value = false;
// };

// // Handle panel toggle
// const handleToggle = () => {
//     if (!authStoreInst.isAuthenticated) {
//         openLoginRequired();
//         console.log("You must be logged in to toggle the panel.");
//         isCollapsed.value = true;
//         return;
//     }
//     // Toggle the collapsed state
//     isCollapsed.value = !isCollapsed.value;
// };

// const confirm = (event) => {
//     confirmPopup.require({
//         target: event.target,
//         message: 'Are you sure you want to proceed?',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => {
//             toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
//         },
//         reject: () => {
//             toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//         }
//     });
// };

// Method to handle button click
const placeOffer = (listingId) => {
    console.log('Button was clicked!');
    console.log('listing_id: ', listingData.listing_id);
    console.log('Bid ammount: $', bidAmount.value);

    const bidData = {listing_id: listingId, bid_price: bidAmount.value, bid_date: DateTime.getCurrentDateTime(), username: 'niccy'};
    bidsStoreInst.placeBid(bidData);
};
</script>

<template>
    <div class="card">
        <div class="grid mb-7">
            <div class="col-12 lg:col-7">
                <div class="flex">
                    <Galleria :value="listingImages" :responsiveOptions="galleriaResponsiveOptions" :numVisible="7" :circular="true" containerStyle="max-width: 800px; margin: auto">
                        <template #item="slotProps">
                            <img :src="slotProps.item" style="width: 100%; display: block" />
                        </template>
                        <template #thumbnail="slotProps">
                            <img :src="slotProps.item" tyle="width: 100%; display: block;" />
                        </template>
                    </Galleria>
                </div>
            </div>
            <div class="col-12 lg:col-4 py-3 lg:pl-6">
                <div class="flex align-items-center text-xl font-medium text-900 mb-4">{{ listingData.address }}</div>
                <div class="flex align-items-center text-xl font-medium text-900 mb-4">{{ listingData.city_town }}, {{ listingData.province }} {{ listingData.postal_code }}</div>
                <div class="flex align-items-center justify-content-between mb-5">
                    <span class="text-900 font-medium text-3xl block">${{ listingData.asking_price }}</span>
                </div>      
                <Panel header="Place Bid" :toggleable="true" v-model:collapsed="isCollapsed" @toggle="handleToggle">
                    <div v-if="authStoreInst.isAuthenticated" class="grid p-fluid">
                        <div class="col-12 md:col-12">
                            <InputGroup>
                                <Button label="Bid" @click="placeOffer(listingData.listing_id)" />
                                <InputNumber v-model="bidAmount" placeholder="Price" />
                                <InputGroupAddon>$</InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                    <div v-else class="grid p-fluid">
                        <div class="flex align-items-center py-5 px-3">
                            <i class="pi pi-fw pi-user mr-2 text-2xl" />
                            <p class="m-0 text-lg">You must be logged in to place a bid.</p>
                        </div>
                        <Button label="Login" @click="goToLoginPage" />
                    </div>
                </Panel>
                <h5>Bids</h5>
                <DataTable :value="currBidData" :size="small" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :sortField="bidsStoreInst.columns.BID_PRICE" :sortOrder="-1" tableStyle="min-width: 50rem" autoLayout="true">
                    <template v-if="!currBidData.length">
                        <div>No data found.</div>
                    </template>    
                    <Column v-for="col in bidsStoreInst.displayColumns" :key="col.field" :field="col.field" :header="col.header" sortable>
                    </Column>
                </DataTable>
            </div>
        </div>

        <TabView>
            <TabPanel header="Highlights">
                <div class="text-900 font-bold text-3xl mb-4 mt-2">Listing Description</div>
                <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
                    {{ listingData.description }}
                </p>

                <div class="text-900 font-bold text-3xl mb-4 mt-2">Property Summary</div>
                <div class="grid">
                    <!-- Loop through the listingData keys and values -->
                    <div v-for="(value, key) in filteredListingData" :key="key" class="col-12 lg:col-2">
                      <span class="text-900 block font-medium mb-3 font-bold">{{ key }}</span>
                      <ul class="py-0 pl-3 m-0 text-600 mb-3">
                        <li class="mb-2">{{ value }}</li>
                      </ul>
                    </div>
                </div>



                <!-- <div class="grid">
                    <div class="col-12 lg:col-4">
                        <span class="text-900 block font-medium mb-3 font-bold">Highlights</span>
                        <ul class="py-0 pl-3 m-0 text-600 mb-3">
                            <li class="mb-2">Vulputate sapien nec.</li>
                            <li class="mb-2">Purus gravida quis blandit.</li>
                            <li class="mb-2">Nisi quis eleifend quam adipiscing.</li>
                            <li>Imperdiet proin fermentum.</li>
                        </ul>
                    </div>
                    <div class="col-12 lg:col-4">
                        <span class="text-900 block mb-3 font-bold">Size and Fit</span>
                        <ul class="list-none p-0 m-0 text-600 mb-4 text-600">
                            <li class="mb-3"><span class="font-semibold">Leo vel:</span> Egestas congue.</li>
                            <li class="mb-3"><span class="font-semibold">Sociis natoque:</span> Parturient montes nascetur.</li>
                            <li><span class="font-semibold">Suspendisse in:</span> Purus sit amet volutpat.</li>
                        </ul>
                    </div>
                    <div class="col-12 lg:col-4">
                        <span class="text-900 block mb-3 font-bold">Material & Care</span>
                        <ul class="p-0 m-0 flex flex-wrap flex-column xl:flex-row text-600">
                            <li class="flex align-items-center white-space-nowrap w-10rem block mr-2 mb-3">
                                <i class="pi pi-sun mr-2 text-900"></i>
                                <span>Not dryer safe</span>
                            </li>
                            <li class="flex align-items-center white-space-nowrap w-10rem block mb-3">
                                <i class="pi pi-times-circle mr-2 text-900"></i>
                                <span>No chemical wash</span>
                            </li>
                            <li class="flex align-items-center white-space-nowrap w-10rem block mb-3 mr-2">
                                <i class="pi pi-sliders-h mr-2 text-900"></i>
                                <span>Iron medium heat</span>
                            </li>
                            <li class="flex align-items-center white-space-nowrap w-10rem block mb-3">
                                <i class="pi pi-minus-circle mr-2 text-900"></i>
                                <span>Dry flat</span>
                            </li>
                        </ul>
                    </div>
                </div> -->
            </TabPanel>
            <TabPanel header="Reviews">
                <div class="text-900 font-bold text-3xl mb-4 mt-2">Customer Reviews</div>
                <ul class="list-none p-0 m-0">
                    <li class="pb-5 border-bottom-1 surface-border">
                        <span>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-gray-500"></i>
                        </span>
                        <div class="text-900 font-bold text-xl my-3">Absolute Perfection!</div>
                        <p class="mx-0 mt-0 mb-3 text-600 line-height-3">
                            Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu dictum varius duis at consectetur lorem donec massa. Imperdiet proin fermentum leo vel orci porta non. Porttitor rhoncus dolor purus non.
                        </p>
                        <span class="font-medium">Darlene Robertson, 2 days ago</span>
                    </li>
                    <li class="py-5 border-bottom-1 surface-border">
                        <span>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                        </span>
                        <div class="text-900 font-bold text-xl my-3">Classy</div>
                        <p class="mx-0 mt-0 mb-3 text-600 line-height-3">Venenatis cras sed felis eget. Proin nibh nisl condimentum id venenatis a condimentum.</p>
                        <span class="font-medium">Kristin Watson, 2 days ago</span>
                    </li>
                </ul>
            </TabPanel>
            <TabPanel header="Shipping and Returns">
                <div class="text-900 font-bold text-3xl mb-4 mt-2">Shipping Placeholder</div>
                <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
                    Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Justo donec enim diam vulputate ut pharetra. Tempus egestas sed sed risus. Feugiat sed lectus vestibulum mattis. Tristique nulla aliquet enim tortor at auctor urna
                    nunc. Habitant morbi tristique senectus et. Facilisi nullam vehicula ipsum.
                </p>

                <div class="grid">
                    <div class="col-12 md:col-6">
                        <span class="text-900 block font-bold mb-3 font-bold">Shipping Costs</span>
                        <ul class="py-0 pl-3 m-0 text-600 mb-3">
                            <li class="mb-2">Japan - JPY 2,500.</li>
                            <li class="mb-2">Europe - EUR 10</li>
                            <li class="mb-2">Switzerland - CHF 10</li>
                            <li class="mb-2">Canada - CAD 25</li>
                            <li class="mb-2">USA - USD 20</li>
                            <li class="mb-2">Australia - AUD 30</li>
                            <li class="mb-2">United Kingdom - GBP 10</li>
                        </ul>
                    </div>
                    <div class="col-12 md:col-6">
                        <span class="text-900 block font-bold mb-3">Return Policy</span>
                        <p class="line-height-3 text-600 p-0 m-0">Pharetra et ultrices neque ornare aenean euismod elementum nisi. Diam phasellus vestibulum lorem sed. Mattis molestie a iaculis at.</p>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>
