<template>
  <div>
    <h1>PAGE</h1>
    <p v-if="user">👋 안녕하세요, {{ user }}님! <button @click="logout">로그아웃</button></p>
    <router-view @login-success="fetchUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const res = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (res.ok) {
          this.user = data.username
        }
      } catch (err) {
        this.user = null
      }
    },
    async logout() {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
      this.user = null
      this.$router.push('/login')
    },
  },
}
</script>
