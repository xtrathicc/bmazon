<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { onMounted, ref } from 'vue'

const store = useProductsStore()

const rating = ref<number>(0)
const activeCategory = ref<string>('')
const oldCategory = ref<string>('')
const prices = ref<number[]>([])
const priceFilterValue = ref<number[]>([0, 1])
const appliedFilters = ref<number>(0)

interface productFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any
}

onMounted(async () => {
  await store.getProducts()
  await store.getProductCategories()
  await updatePriceFilterValues()
})

const updatePriceFilterValues = async () => {
  prices.value = store.products.map((e: { price: number }) => e.price)
  priceFilterValue.value = [Math.min(...prices.value), Math.max(...prices.value)]
  store.clearFilter('price')
}

const changeCategoryFilter = async (url: string) => {
  activeCategory.value = url
  store.setFilter('category', url)
  await applyFilters()
}

const changePriceFilter = async (range: number[]) => {
  store.setFilter('price', range)
  await applyFilters()
}

const changeRatingFilter = async (rating: number) => {
  store.setFilter('rating', rating)
  await applyFilters()
}

const applyFilters = async () => {
  const filters: productFilter = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries(store.filters).forEach((f: [string, any]) => {
    const [name, value] = f
    filters[name] = value
  })

  // check if category is set => always load first
  if (filters.category) {
    const categoryUrl: string = filters.category
    await store.getCategory(categoryUrl)
    if (oldCategory.value !== filters.category) {
      await updatePriceFilterValues()
    }
  } else {
    await store.getProducts()
  }

  if (filters.price) {
    const prices: number[] = filters.price
    const [min, max] = prices

    store.products = store.products.filter(
      (e: { price: number }) => e.price >= min && e.price <= max,
    )
    priceFilterValue.value = [min, max]
  }

  if (filters.rating) {
    store.products = store.products.filter((e: { rating: number }) => e.rating >= filters.rating)
  }

  oldCategory.value = activeCategory.value
  appliedFilters.value += 1
}

const clearFilters = async () => {
  await store.clearFilter()
  activeCategory.value = ''
  oldCategory.value = ''
  prices.value = []
  priceFilterValue.value = [0, 1]
  rating.value = 0

  await store.getProducts()
  await store.getProductCategories()
  await updatePriceFilterValues()
}
</script>

<template>
  <div class="m-8" :key="appliedFilters">
    <el-container direction="vertical" class="my-8">
      <p>Categories</p>
      <el-select v-model="activeCategory" size="large" clearable @change="changeCategoryFilter">
        <el-option
          v-for="category in store.categories"
          :key="category.slug"
          :label="category.name"
          :value="category.url"
        />
      </el-select>
    </el-container>

    <el-container direction="vertical" class="my-8 mr-5">
      <p>Price</p>
      <el-slider
        class="mx-2"
        v-model="priceFilterValue"
        range
        :min="isFinite(Math.min(...prices)) ? Math.min(...prices) : 0"
        :max="isFinite(Math.max(...prices)) ? Math.max(...prices) : 0"
        @change="changePriceFilter"
      />
    </el-container>

    <el-container direction="vertical" class="my-8">
      <p>Rating</p>
      <el-rate
        v-model="rating"
        allow-half
        size="large"
        show-score
        text-color="#ff9900"
        score-template="{value}"
        @change="changeRatingFilter"
      />
    </el-container>

    <el-container>
      <el-button @click="clearFilters">Reset Filters</el-button>
    </el-container>
  </div>
</template>
