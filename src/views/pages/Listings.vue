<script setup>
import { ref } from 'vue';

const products = ref([
    {
        price: '$140.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
    },
    {
        price: '$82.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-2.png'
    },
    {
        price: '$54.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-3.png'
    },
    {
        price: '$72.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-4.png'
    },
    {
        price: '$99.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-5.png'
    },
    {
        price: '$89.00',
        image: '/demo/images/ecommerce/product-list/product-list-4-6.png'
    }
]);

const products2 = ref([
    {
        color: 'Bluegray',
        image: '/demo/images/ecommerce/product-list/product-list-2-1.png'
    },
    {
        color: 'Indigo',
        image: '/demo/images/ecommerce/product-list/product-list-2-2.png'
    },
    {
        color: 'Purple',
        image: '/demo/images/ecommerce/product-list/product-list-2-3.png'
    },
    {
        color: 'Cyan',
        image: '/demo/images/ecommerce/product-list/product-list-2-4.png'
    }
]);
</script>

<template>
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

        <div class="col-12">
            <div class="card">
                <h5>Input Groups</h5>
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
                            <InputText placeholder="Keyword" />
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
    </div>

    <div class="card">
      <div class="text-900 font-medium text-4xl mb-4">Popular Products</div>
      <p class="mt-0 p-0 mb-5 text-700 text-2xl">Exclusive Selection</p>
      <div class="grid -mt-3 -ml-3 -mr-3">
        <div
          v-for="(product, i) in paginatedProducts"
          :key="i"
          class="col-12 md:col-6 lg:col-4"
        >
          <div class="p-2">
            <div class="shadow-2 p-4 surface-card border-round" @click="viewListing(product.price)">
              <div class="relative mb-3">
                <span
                  class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl"
                  :style="{ left: '1rem', top: '1rem' }"
                >
                  Category
                </span>
                <img :src="product.image" class="w-full" :alt="i" />
              </div>
              <div class="flex justify-content-between align-items-center mb-3">
                <span class="text-900 font-medium text-xl">Product Name</span>
                <span>
                  <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                  <span class="font-medium">5.0</span>
                </span>
              </div>
              <p class="mt-0 mb-3 text-700 line-height-3">
                Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.
              </p>
              <span class="text-primary text-xl font-medium">{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <!-- <div class="card">
        <div class="text-900 font-medium text-4xl mb-4">Popular Products</div>
        <p class="mt-0 p-0 mb-5 text-700 text-2xl">Exclusive Selection</p>
        <div class="grid -mt-3 -ml-3 -mr-3">
            <div v-for="(product, i) in products" :key="i" class="col-12 md:col-6 lg:col-4">
                <div class="p-2">
                    <div class="shadow-2 p-4 surface-card border-round">
                        <div class="relative mb-3">
                            <span class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl" :style="{ left: '1rem', top: '1rem' }"> Category </span>
                            <img :src="product.image" class="w-full" :alt="i" />
                        </div>
                        <div class="flex justify-content-between align-items-center mb-3">
                            <span class="text-900 font-medium text-xl">Product Name</span>
                            <span>
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <span class="font-medium">5.0</span>
                            </span>
                        </div>
                        <p class="mt-0 mb-3 text-700 line-height-3">Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.</p>
                        <span class="text-primary text-xl font-medium">{{ product.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div> -->



    <!-- <div class="card">
        <div class="grid -mt-3 -ml-3 -mr-3">
            <div v-for="(product, i) in products2" :key="i" class="col-12 md:col-6 lg:col-3 mb-5 lg:mb-0">
                <div class="mb-3 relative">
                    <img :src="product.image" class="w-full" :alt="i" />
                    <Button
                        type="button"
                        class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-black-alpha-40 transition-colors transition-duration-300 cursor-pointer"
                        :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }"
                    >
                        <i class="pi pi-shopping-cart mr-3 text-base"></i>
                        <span class="text-base">Add to Cart</span>
                    </Button>
                </div>
                <div class="flex flex-column align-items-center">
                    <span class="text-xl text-900 font-medium mb-3">Product Name</span>
                    <span class="text-xl text-900 mb-3">$150.00</span>
                    <div class="flex align-items-center mb-3">
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-bluegray-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Bluegray' ? '0 0 0 0.2rem var(--bluegray-500)' : null }"
                            @click="product.color = 'Bluegray'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-indigo-500 hover:border-indigo-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Indigo' ? '0 0 0 0.2rem var(--indigo-500)' : null }"
                            @click="product.color = 'Indigo'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-purple-500 hover:border-purple-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Purple' ? '0 0 0 0.2rem var(--purple-500)' : null }"
                            @click="product.color = 'Purple'"
                        ></div>
                        <div
                            class="w-2rem h-2rem flex-shrink-0 border-circle bg-cyan-500 hover:border-cyan-500 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            :style="{ 'box-shadow': product.color === 'Cyan' ? '0 0 0 0.2rem var(--cyan-500)' : null }"
                            @click="product.color = 'Cyan'"
                        ></div>
                    </div>
                    <span class="text-700">{{ product.color }}</span>
                </div>
            </div>
        </div>
    </div> -->
</template>

  
<script>
export default {
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 6, // Adjust this value as needed
            products: [
                // Your product data here
                {
                    price: '$140.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
                },
                {
                    price: '$82.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-2.png'
                },
                {
                    price: '$54.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-3.png'
                },
                {
                    price: '$72.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-4.png'
                },
                {
                    price: '$99.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-5.png'
                },
                {
                    price: '$89.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-6.png'
                },
                {
                    price: '$140.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
                },
                {
                    price: '$140.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
                },
                {
                    price: '$140.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-1.png'
                },
                {
                    price: '$72.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-4.png'
                },
                {
                    price: '$99.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-5.png'
                },
                {
                    price: '$89.00',
                    image: '/demo/images/ecommerce/product-list/product-list-4-6.png'
                }
            ],
        };
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },
    },
    methods: {
        viewListing(listingId) {
            console.log('Div was clicked!');
            console.log(listingId);
            window.open('https://www.google.com', '_blank');
            // Your logic here
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
  };
  </script>
  
  <style>
  /* Add any necessary styling for pagination controls here */
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .pagination-controls button {
    margin: 0 0.5rem;
  }
  </style>
