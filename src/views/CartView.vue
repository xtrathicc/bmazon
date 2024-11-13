<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useRoute } from 'vue-router'

const store = useProductsStore()

onMounted(async () => {
  await store.getProducts()
})

import CartItem from '../components/CartItem.vue'

const checkout = () => {
  store.clearCart()
}
const getSum = () => {
  console.log(store.products)

  const prices = []
  store.cart.forEach((item) => {
    const price = store.products.find((p) => p.id === item.id).price
    prices.push(price * item.amount)
  })
  const sum = prices.reduce((partialSum, a) => partialSum + a, 0)
  return sum
}
</script>

<template>
  <!-- <main>Cart here</main> -->

  <!-- <pre>{{ store.cart }}</pre> -->

  <!-- <el-row :gutter="40"> -->
  <!-- <el-col :size="24" v-for="item in store.cart" :key="item.id"> -->
  <CartItem :product="item" v-for="item in store.cart" :key="item.id" />
  <!-- </el-col> -->
  <!-- </el-row> -->

  <br />
  <el-divider>Total</el-divider>

  <el-row>
    <el-col :sm="24" :md="12" :lg="12" :xl="12">
      <h2>
        <span class="currency">CHF</span> {{ Math.round((getSum() + Number.EPSILON) * 100) / 100 }}
      </h2>
    </el-col>

    <el-col
      :sm="24"
      :md="12"
      :lg="12"
      :xl="12"
      style="display: flex; align-items: center; justify-content: flex-end"
    >
      <el-button @click="checkout()">Checkout</el-button>
    </el-col></el-row
  >
</template>

<style>
.el-divider__text.is-center {
  background: #262f37;
  color: white;
}
</style>
