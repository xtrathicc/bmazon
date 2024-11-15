<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import CartItem from '../components/CartItem.vue'

const store = useProductsStore()

onMounted(async () => {
  await store.getProducts()
})

const checkout = () => {
  store.clearCart()
}
const getSum = () => {
  const prices: number[] = []
  store.cart.forEach((item) => {
    const price = store.products.find((p: { id: number }) => p.id === item.id).price
    prices.push(price * item.amount)
  })
  const sum = prices.reduce((partialSum, a) => partialSum + a, 0)
  return sum
}
</script>

<template>
  <h2 class="mb-3">{{ store.cart.length > 0 ? store.cart.length : 'no' }} items in cart</h2>

  <CartItem :product="item" v-for="item in store.cart" :key="item.id" />

  <el-container v-if="store.cart.length > 0" direction="vertical">
    <el-divider class="[&>div]:bg-bmazon-primary [&>div]:text-bmazon-secondary">Total</el-divider>

    <el-row>
      <el-col :sm="24" :md="12" :lg="12" :xl="12">
        <h2><span class="text-sm">CHF</span> {{ getSum().toFixed(2) }}</h2>
      </el-col>

      <el-col :sm="24" :md="12" :lg="12" :xl="12" class="!flex items-center justify-end">
        <el-button @click="checkout()" size="large" type="success">Checkout</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>
