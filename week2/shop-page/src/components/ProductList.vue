<template>
  <div>
    <input v-model="filters.keyword" placeholder="검색어 입력" />
    <select v-model="filters.category">
      <option value="">전체</option>
      <option value="electronics">전자제품</option>
      <option value="jewelery">쥬얼리</option>
    </select>
    <input type="number" v-model="filters.maxPrice" placeholder="최대 가격" />

    <div v-if="loading">로딩 중...</div>
    <div v-else class="product-grid">
      <ProductItem v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import ProductItem from './ProductItem.vue'

const products = ref([])
const loading = ref(true)
const filters = useFilterStore()

onMounted(async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products')
  products.value = data
  loading.value = false
})

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesKeyword = p.title.toLowerCase().includes(filters.keyword.toLowerCase())
    const matchesCategory = filters.category ? p.category === filters.category : true
    const matchesPrice = filters.maxPrice ? p.price <= filters.maxPrice : true
    return matchesKeyword && matchesCategory && matchesPrice
  })
})
</script>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
