<template>
  <div class="app">
    <h1>🛍️ 쇼핑몰 메인 페이지</h1>
    <div>
      <nav>
        <router-link to="/">홈</router-link> |
        <router-link to="/cart">장바구니</router-link>
      </nav>
      <router-view />
    </div>
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
</script>

<style>
.app {
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem;
  text-align: center;
}
</style>
