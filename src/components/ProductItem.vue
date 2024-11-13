<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  productData: {
    type: Object,
    required: true,
  },
  vendorData: {
    type: Object,
    required: false,
  },
})

import { ref } from 'vue'

const rating = ref(props.productData.rating)
</script>

<template :set="(regex = new RegExp('^' + props.productData.brand))">
  <el-card
    shadow="hover"
    style="border: none"
    @click="router.push({ name: 'Details', params: { id: props.productData.id } })"
  >
    <!-- <template #header>{{ props.productData.title }}</template> -->
    <el-image :src="props.productData.thumbnail" style="width: 100%">
      <template #error>
        <div class="image-slot">
          <el-icon><Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <p class="category">{{ props.productData.category }}</p>
    <p class="price"><span class="currency">CHF</span> {{ props.productData.price }}</p>
    <p class="title">
      <b class="brand">{{ props.productData.brand }}</b>
      {{ props.productData.title.replace(regex, '').trim() }}
    </p>
    <el-rate v-model="rating" disabled show-score text-color="#ff9900" score-template="{value}" />
    <p class="vendor" v-if="props.vendorData">
      <el-icon><UserFilled /></el-icon>&nbsp;{{ props.vendorData?.[0].firstName }}
      {{ props.vendorData?.[0].lastName }}
    </p>
  </el-card>
</template>

<style>
.el-card {
  background: none !important;
  cursor: pointer;
}
.el-card p {
  color: #f4ebe4;
  margin: 02px;
}
.el-card p.category {
  opacity: 0.5;
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 5px;
}
.el-card span.currency {
  font-size: 11px;
}
b.brand {
  text-transform: uppercase;
}
p.vendor {
  display: flex;
  align-items: center;
}
</style>
