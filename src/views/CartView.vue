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

<h2>{{ (store.cart.length > 0 ? store.cart.length : 'no') }} items in cart</h2>

  <CartItem :product="item" v-for="item in store.cart" :key="item.id" />

  <br />
  <el-container v-if="store.cart.length > 0" direction="vertical">
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
        <el-button @click="checkout()" size="large">Checkout</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<style>
.el-divider__text.is-center {
  background: #262f37;
  color: white;
}
</style>
