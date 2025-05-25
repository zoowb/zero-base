<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p>
      아직 계정이 없으신가요?
      <router-link to="/register">회원가입 하기</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        this.$emit('login-success')
        this.$router.push('/')
      } else {
        alert(data.message)
      }
    },
  },
}
</script>
