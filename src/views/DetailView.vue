<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

const store = useProductsStore()
const route = useRoute()

onMounted(() => {
  window.scrollTo(0, 0)
})

const product = computed(() => {
  const id: string = String(route.params.id)
  return store.products.find((item) => item.id === parseInt(id, 10))
})

const addToCart = () => {
  store.addToCart(product.value.id, num.value)
  ElNotification({
    title: 'Success',
    message: 'Added to cart',
    type: 'success',
    position: 'bottom-right',
  })
}

const num = ref<number>(1)
const rating = ref<number>(product.value.rating)
</script>

<template>
  <el-link href="/products" class="mb-4 text-bmazon-secondary"
    ><el-icon><Back /></el-icon>&nbsp;Back to Overview</el-link
  >
  <el-row :gutter="30">
    <el-col :sm="24" :md="16" :lg="12" :xl="12">
      <el-carousel :autoplay="false" height="400px">
        <el-carousel-item v-for="image in product.images" :key="image" class="bg-[#39424a]">
          <el-image class="w-full h-full [&>img]:object-contain" :src="image"> </el-image>
        </el-carousel-item> </el-carousel
    ></el-col>
    <el-col :sm="24" :md="16" :lg="8" :xl="8">
      <p class="my-0 mb-1 mt-4 text-sm uppercase">{{ product.brand }}</p>
      <p class="my-0 text-2xl">
        {{ product.title }}
      </p>
      <p class="my-0 text-lg"><span class="text-sm">CHF</span> {{ product.price }}</p>
      <el-rate v-model="rating" disabled show-score text-color="#ff9900" score-template="{value}" />

      <el-divider></el-divider>
      <p class="my-0 description">{{ product.description }}</p>
      <p class="mt-6">
        <el-input-number v-model="num" :min="product.minimumOrderQuantity || 1" />
        <el-button @click="addToCart" class="ml-3" type="success">Add to Cart</el-button>
      </p>
    </el-col>
  </el-row>
</template>
