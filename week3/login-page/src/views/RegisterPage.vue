<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p>
      이미 계정이 있으신가요?
      <router-link to="/login">로그인 하기</router-link>
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
    async register() {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('회원가입 성공! 로그인 해주세요.')
        this.$router.push('/login')
      } else {
        alert(data.message)
      }
    },
  },
}
</script>
