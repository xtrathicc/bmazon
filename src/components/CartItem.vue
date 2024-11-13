<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const store = useProductsStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const productData = computed(() => {
  return store.products.find((item) => item.id === props.product.id)
})

const updateCart = () => {
  store.updateCart(props.product.id, num.value)
  ElNotification({
    title: 'Success',
    message: 'Updated amount',
    type: 'success',
    position: 'bottom-right',
  })
}

import { ref } from 'vue'

const num = ref(props.product.amount)
const handleChange = (value: number) => {
  console.log(value)
}
</script>

<template :set="(regex = new RegExp('^' + productData.brand))">
  <el-row :gutter="30" align="center">
    <el-col :sm="4" :md="6" :lg="6" :xl="8">
      <el-image :src="productData.thumbnail" style="width: 100%; background: #39424a">
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </el-col>
    <el-col :sm="20" :md="18" :lg="18" :xl="16">
      <p class="title">
        <b class="brand">{{ productData.brand }}</b>
        {{ productData.title.replace(regex, '').trim() }}
      </p>
      <p class="price"><span class="currency">CHF</span> {{ productData.price }}</p>
      <el-input-number v-model="num" @change="updateCart()" />
    </el-col>
  </el-row>
</template>

<style>
.el-col p {
  color: #f4ebe4;
  /* margin: 0px 0px 10px 0; */
}
p.category {
  opacity: 0.5;
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 5px;
}
span.currency {
  font-size: 11px;
}
</style>
