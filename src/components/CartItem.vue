<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { computed, defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
const store = useProductsStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const num = ref(props.product.amount)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productData = computed<any>(() => {
  return store.products.find((item: { id: number }) => item.id === props.product.id)
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

const removeCartItem = (id: number) => {
  store.removeCartItem(id)
}

const getRegex = (str: string) => {
  return new RegExp('^' + str)
}
</script>

<template>
  <el-row :gutter="30" align="center">
    <el-col :sm="4" :md="6" :lg="6" :xl="8" class="text-bmazon-secondary mb-1">
      <el-image :src="productData.thumbnail" class="w-full bg-[#39424a]">
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </el-col>
    <el-col :sm="20" :md="18" :lg="18" :xl="16" class="text-bmazon-secondary mb-1">
      <p class="my-1 text-lg">
        <b class="brand">{{ productData.brand }}</b>
        {{ productData.title.replace(getRegex(productData.brand), '').trim() }}
      </p>
      <p class="my-1 text-lg font-medium">
        <span class="text-xs">CHF</span>
        {{ productData.price * product.amount }}
        <span v-if="product.amount > 1" class="text-xs text-gray-500"
          >single price {{ productData.price }}</span
        >
      </p>
      <el-input-number
        v-model="num"
        :min="productData.minimumOrderQuantity || 1"
        class="my-1"
        @change="updateCart()"
      />
      <el-button @click="removeCartItem(productData.id)" class="ml-3"><el-icon><Delete /></el-icon></el-button>
    </el-col>
  </el-row>
</template>
