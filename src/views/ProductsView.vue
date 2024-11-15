<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductItem from '../components/ProductItem.vue'

const store = useProductsStore()

onMounted(async () => {
  await store.getProducts()
})

const page = ref<number>(1)
const limit = ref<number>(12)

const changePage = (p: number) => {
  page.value = p
  window.scrollTo(0, 0)
}
</script>

<template :key="this.page">
  <el-container class="wrapper">
    <el-row :gutter="20" class="w-full">
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        :key="product.id"
        v-for="product in store.products.slice((page - 1) * limit, (page - 1) * limit + limit)"
      >
        <ProductItem :product-data="product" />
      </el-col>
    </el-row>
  </el-container>

  <el-container class="mt-2 mb-4 flex justify-center">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="store.products.length"
      @current-change="changePage"
      :hide-on-single-page="true"
    />
  </el-container>
</template>
