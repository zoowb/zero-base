<template>
  <div class="item">
    <router-link :to="`/product/${product.id}`">
      <img :src="product.image" alt="" />
      <h3>{{ product.title }}</h3>
      <p>\${{ product.price }}</p>
    </router-link>
    <button @click="addToCart(product)">🛒 장바구니 추가</button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({ product: Object })
const { addToCart } = useCartStore()
</script>

<style scoped>
.item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
}
.item img {
  width: 100px;
}
</style>
