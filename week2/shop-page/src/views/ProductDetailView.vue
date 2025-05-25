<template>
  <div v-if="product">
    <h2>{{ product.title }}</h2>
    <img :src="product.image" />
    <p>{{ product.description }}</p>
    <p>\${{ product.price }}</p>
    <button @click="addToCart(product)">🛒 장바구니 추가</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)
const { addToCart } = useCartStore()

onMounted(async () => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
  product.value = data
})
</script>
