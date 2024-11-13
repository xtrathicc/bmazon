<script setup lang="ts">
import { computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

const store = useProductsStore()
const route = useRoute()

const product = computed(() => {
  return store.products.find((item) => item.id === parseInt(route.params.id, 10))
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

import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
window.scrollTo(0, 0)

const rating = ref(product.value.rating)
</script>

<template>
  <!-- <pre>The third page, would be a detailed view of the item (after clicking an item)</pre> -->
  <el-link href="/products"
    ><el-icon><Back /></el-icon>&nbsp;Back to Overview</el-link
  >
  <!-- <pre>{{ product }}</pre> -->
  <el-row :gutter="30">
    <el-col :sm="24" :md="16" :lg="12" :xl="12">
      <el-carousel autoplay="false" height="400px">
        <el-carousel-item v-for="image in product.images" :key="image">
          <el-image style="width: 100%; height: 100%" :fit="contain" :src="image"> </el-image>
        </el-carousel-item> </el-carousel
    ></el-col>
    <el-col :sm="24" :md="16" :lg="8" :xl="8">
      <p class="brand">{{ product.brand }}</p>
      <p class="title">
        {{ product.title }}
      </p>
      <p class="price"><span class="currency">CHF</span> {{ product.price }}</p>
      <el-rate v-model="rating" disabled show-score text-color="#ff9900" score-template="{value}" />

      <el-divider></el-divider>
      <p class="description">{{ product.description }}</p>
      <br />
      <p>
        <el-input-number v-model="num" :min="1" @change="handleChange" />
        <el-button @click="addToCart" style="margin-left: 12px">Add to Cart</el-button>
      </p>
    </el-col>
  </el-row>

  <!-- <pre>{{ product }}</pre> -->
  <!-- <pre>{{ product.images }}</pre> -->
</template>

<style scoped>
p {
  margin: 10px 0;
}
.el-link {
  color: #e4ddd6;
  margin: 20px 0;
}
.brand {
  text-transform: uppercase;
}
.title {
  font-size: 26px;
}
.price {
  font-size: 22px;
}

.currency {
  font-size: 14px;
}

.el-divider {
  border-color: rgb(245 247 250 / 36%);
}

.el-carousel__item .el-image {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item .el-image .el-image__inner {
  object-fit: contain;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
