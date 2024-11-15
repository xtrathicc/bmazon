<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import FilterItem from './components/FilterItem.vue'

const store = useProductsStore()
const logoUrl: string = './src/assets/logo.png'
const router = useRouter()
</script>

<template>
  <el-container>
    <el-header height="80px" class="w-full fixed top-[0px] bg-bmazon-primary/95 z-10 backdrop-blur">
      <el-container class="header-wrapper flex items-center justify-between">
        <el-link href="/" :underline="false">
          <el-image class="logo h-[60px] mt-[10px]" :src="logoUrl" />
        </el-link>
        <nav>
          <el-link href="/" class="[&&]:text-bmazon-secondary uppercase mx-2">Highlights</el-link>
          <el-divider direction="vertical" />
          <el-link href="/products" class="[&&]:text-bmazon-secondary uppercase mx-2"
            >Products</el-link
          >
          <el-divider direction="vertical" />
          <el-link href="/cart" class="[&&]:text-bmazon-secondary uppercase mx-2">
            <el-badge :value="store.cart.length" class="item" :show-zero="false" :offset="[12, 2]">
              Cart
            </el-badge>
          </el-link>
        </nav>
      </el-container>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-container class="m-8 items-center">
          <el-icon size="20" class="mr-2"><Menu /></el-icon>
          <h2>{{ router.currentRoute.value.name }}</h2>
        </el-container>
        <FilterItem v-if="router.currentRoute.value.name === 'Products'" />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
