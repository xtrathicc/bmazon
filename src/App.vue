<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import FilterItem from './components/FilterItem.vue'

//const router = useRouter()
const store = useProductsStore()
const url = './src/assets/logo.png'
</script>

<template>
  <el-container>
    <el-header height="80px">
      <el-container class="header-wrapper">
        <el-link href="/" :underline="false">
          <el-image class="logo" style="height: 60px; margin-top: 10px" :src="url" />
        </el-link>
        <nav>
          <el-link href="/">Highlights</el-link>
          <el-divider direction="vertical" />
          <el-link href="/products">Products</el-link>
          <el-divider direction="vertical" />
          <el-link href="/cart">
            <el-badge :value="store.cart.length" class="item" :show-zero="false" :offset="[12, 2]">
              Cart
            </el-badge>
          </el-link>
        </nav>
      </el-container>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <h2 class="routeNameDisplay">
          <el-icon :size="size" :color="color">
            <Menu />
          </el-icon>
          {{ this.$route.name }}
        </h2>
        <FilterItem v-if="this.$route.name === 'Products'" />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgb(34 43 51 / 95%);
  z-index: 10;
  backdrop-filter: blur(15px);
}
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
nav .el-link {
  color: #f4ebe4;
  margin: 0 10px;
  text-transform: uppercase;
}
.routeNameDisplay {
  margin: 30px 30px;
}
</style>
