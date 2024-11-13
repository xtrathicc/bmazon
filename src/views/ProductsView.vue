<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()

onMounted(async () => {
  await store.getProducts()
})

import ProductItem from '../components/ProductItem.vue'
</script>

<template :key="this.page">
  <el-container class="wrapper">
    <el-row :gutter="20" style="width: 100%">
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="product in store.products.slice(
          (this.page - 1) * this.limit,
          (this.page - 1) * this.limit + this.limit,
        )"
        :key="product.id"
      >
        <ProductItem :product-data="product" />
      </el-col>
    </el-row>
  </el-container>

  <el-container class="paginationWrapper">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.limit"
      :total="store.products.length"
      @current-change="changePage"
      :hide-on-single-page="true"
    />
  </el-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      page: 1,
      limit: 12,
    }
  },
  methods: {
    changePage(p: number) {
      this.page = p
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.paginationWrapper {
  margin: 10px;
  justify-content: center;
}
</style>
