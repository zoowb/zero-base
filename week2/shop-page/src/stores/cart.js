import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  function addToCart(product) {
    const exist = cartItems.value.find((p) => p.id === product.id)
    if (!exist) cartItems.value.push({ ...product, quantity: 1 })
    else exist.quantity++
  }

  function removeFromCart(id) {
    cartItems.value = cartItems.value.filter((p) => p.id !== id)
  }

  return { cartItems, addToCart, removeFromCart }
})
