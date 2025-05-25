<template>
  <div>
    <h2>🛒 장바구니</h2>
    <div v-if="cartItems.length === 0">장바구니가 비어 있습니다.</div>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} ({{ item.quantity }}개) - \${{ item.price * item.quantity }}
        <button @click="removeFromCart(item.id)">❌ 제거</button>
      </li>
    </ul>
    <p>총액: \${{ totalPrice }}</p>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const { cartItems, removeFromCart } = useCartStore()
const totalPrice = computed(() =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
</script>
