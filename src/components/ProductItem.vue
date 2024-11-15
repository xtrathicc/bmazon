<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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

const rating = ref(props.productData.rating)

const getRegex = (str: string) => {
  return new RegExp('^' + str)
}
</script>

<template>
  <el-card
    shadow="never"
    class="mb-4 !bg-transparent cursor-pointer !border-[1px] [&&]:border-transparent transition-all duration-200 hover:[&>*]:scale-105 hover:!bg-bmazon-primary"
    @click="router.push({ name: 'Details', params: { id: props.productData.id } })"
  >
    <el-image :src="props.productData.thumbnail" class="w-full">
      <template #error>
        <div class="image-slot">
          <el-icon><Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <p class="text-bmazon-secondary -m-1 uppercase text-xs mt-2">
      {{ props.productData.category }}
    </p>
    <p class="text-bmazon-secondary -m-1 text-lg">
      <span class="text-sm">CHF</span> {{ props.productData.price }}
    </p>
    <p class="text-bmazon-secondary -m-1 line-clamp-2">
      <b class="uppercase">{{ props.productData.brand }}</b>
      {{ props.productData.title.replace(getRegex(props.productData.brand), '').trim() }}
    </p>
    <el-rate v-model="rating" disabled show-score text-color="#ff9900" score-template="{value}" />
    <p v-if="props.vendorData?.length > 0" class="text-bmazon-secondary -m-1 flex items-center">
      <el-icon><UserFilled /></el-icon>&nbsp;{{ props.vendorData?.[0].firstName }}
      {{ props.vendorData?.[0].lastName }}
    </p>
  </el-card>
</template>
