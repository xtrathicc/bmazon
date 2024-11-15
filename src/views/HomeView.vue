<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductItem from '../components/ProductItem.vue'

const store = useProductsStore()

onMounted(async () => {
  await store.getProducts('?limit=12&sortBy=rating&order=desc')
  await store.getVendors()
})
</script>

<template>
  <div class="products-list">
    <el-row>
      <el-container class="wrapper">
        <el-row :gutter="20">
          <el-col
            :xs="12"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-for="product in store.products"
            :key="product.id"
          >
            <ProductItem
              :product-data="product"
              :vendor-data="
                store.vendors.filter((v) => v.email === product.reviews[0].reviewerEmail)
              "
            />
          </el-col>
        </el-row>
      </el-container>
    </el-row>
  </div>
</template>
