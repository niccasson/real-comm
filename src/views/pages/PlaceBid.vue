<script setup>
import { ref, reactive, toRaw } from 'vue';
import Listings from '@/features/listings/api/listings.js';

const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);
const selectedCountry = ref(null);

const categoryOptions = ['Residential', 'Comercial', 'Condo', 'Apparttment'];

const createListingData = reactive({
  address: '',
  annual_property_taxes: 0,
  asking_price: 0,
  bathrooms: 0,
  bedrooms: 0,
  building_type: '',
  built_in: 0,
  city_town: '',
  community_name: '',
  description: '',
  land_size: '',
  listing_id: 0,
  media: '',
  neighbourhood_name: '',
  parking_type: '',
  postal_code: '',
  property_type: '',
  province: '',
  square_footage: 0,
  storeys: 0,
  title: ''
})

function submitCreateListing() {
  console.log('Button clicked!');
  console.log(toRaw(createListingData));
  // Add your logic here
  Listings.createListing(createListingData);
}
</script>

<template>
    <div class="card">
        <span class="text-900 text-xl font-bold mb-4 block">Create Listing</span>
        <div class="grid">
            <div class="col-12 lg:col-2">
                <div class="text-900 font-medium text-xl mb-3">General Information</div>
                <!-- <p class="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p> -->
            </div>
            <div class="col-12 lg:col-10">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12">
                        <label for="nickname" class="font-medium text-900"> Address </label>
                        <InputText id="nickname" type="text" v-model="createListingData.address" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="city" class="font-medium text-900"> City </label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="state" class="font-medium text-900"> Province </label>
                        <InputText id="state" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="city" class="font-medium text-900"> Postal Code </label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="country" class="font-medium text-900"> Country </label>
                        <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" :filter="true" placeholder="Select a Country" :showClear="true">
                            <template #value="slotProps">
                                <div class="flex align-items-center" v-if="slotProps.value">
                                    <span :class="`mr-2 flag flag-${selectedCountry.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="nickname" class="font-medium text-900"> Price </label>
                        <InputText id="nickname" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="city" class="font-medium text-900"> Square Feet </label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="nickname" class="font-medium text-900"> Number of Bedrooms </label>
                        <InputText id="nickname" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="city" class="font-medium text-900"> Number of Bathrooms </label>
                        <InputText id="city" type="text" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-2">
                <div class="text-900 font-medium text-xl mb-3">Photos</div>
                <!-- <p class="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p> -->
            </div>
            <div class="col-12 lg:col-10">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12">
                        <label for="avatar" class="font-medium text-900"> Select Photos </label>
                        <FileUpload mode="basic" name="avatar" customUpload accept="image/*" :maxFileSize="1000000" chooseLabel="Upload Images" class="p-button-outlined p-button-plain"></FileUpload>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-2">
                <div class="text-900 font-medium text-xl mb-3">Detailed Information</div>
                <!-- <p class="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p> -->
            </div>
            <div class="col-12 lg:col-10">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12">
                        <label for="bio" class="font-medium text-900"> Description </label>
                        <Textarea id="bio" type="text" :rows="5" autoResize></Textarea>
                    </div>
                    <div class="field mb-4 col-6">
                        <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Building Type</span>
                        <div class="p-3">
                            <Dropdown :options="categoryOptions" v-model="selectedStock" placeholder="Select building type"></Dropdown>
                        </div>
                    </div>
                    <div class="field mb-4 col-6">
                        <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Property Type</span>
                        <div class="p-3">
                            <Dropdown :options="categoryOptions" v-model="selectedStock" placeholder="Select property type"></Dropdown>
                        </div>
                    </div>
                    <div class="field mb-4 col-12 md:col-3">
                        <label for="email" class="font-medium text-900"> Build Year </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-3">
                        <label for="email" class="font-medium text-900"> Land Size </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-3">
                        <label for="email" class="font-medium text-900"> Annual Property Taxes </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-3">
                        <label for="email" class="font-medium text-900"> Number of Stories </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="email" class="font-medium text-900"> Community Name </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="email" class="font-medium text-900"> Neighbourhood Name </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="email" class="font-medium text-900"> Property Tittle </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6">
                        <label for="email" class="font-medium text-900"> Parking Type </label>
                        <InputText id="email" type="text" />
                    </div>
                    <div class="col-12">
                        <Button label="Create Listing" class="w-auto mt-3" @click="submitCreateListing"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
