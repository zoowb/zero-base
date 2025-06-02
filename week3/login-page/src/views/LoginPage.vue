<template>
  <div class="login-box">
    <h2>로그인</h2>

    <!-- 자체 로그인 -->
    <input v-model="username" placeholder="아이디" />
    <input v-model="password" type="password" placeholder="비밀번호" />
    <button @click="login">로그인</button>

    <hr />

    <!-- Google -->
    <div
      id="g_id_onload"
      data-client_id="YOUR_GOOGLE_CLIENT_ID"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false"
      data-ux_mode="popup"
    ></div>
    <div class="g_id_signin" data-type="standard"></div>

    <!-- Naver -->
    <div @click="handleNaverLogin" id="naverIdLogin" style="margin-top: 10px"></div>

    <!-- Kakao -->
    <button
      @click="handleKakaoLogin"
      style="background-color: #fee500; color: #000; margin-top: 10px"
    >
      카카오로 로그인
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()
const emit = defineEmits(['login-success'])

// 자체 로그인
const login = async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      emit('login-success')
      router.push('/')
    } else {
      alert(data.message)
    }
  } catch (err) {
    console.error('로그인 오류:', err)
    alert('서버 오류가 발생했습니다.')
  }
}

// Google 로그인 응답 처리
const handleGoogleLogin = (response) => {
  const payload = parseJwt(response.credential)
  console.log('✅ Google 사용자:', payload)
  emit('login-success')
  router.push('/')
}

// Naver 로그인 성공 처리
const handleNaverLogin = () => {
  const naverUser = window.naver_id_login.getLoginStatus && window.naver_id_login.user
  if (naverUser && naverUser.email) {
    console.log('✅ Naver 사용자:', naverUser)
    emit('login-success')
    router.push('/')
  } else {
    alert('네이버 로그인 실패')
  }
}

// Kakao 로그인 성공 처리
const handleKakaoLogin = () => {
  window.Kakao.Auth.login({
    scope: 'profile_nickname,account_email',
    success(authObj) {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success(res) {
          console.log('✅ Kakao 사용자:', res.kakao_account)
          emit('login-success')
          router.push('/')
        },
        fail: (err) => alert('카카오 사용자 정보 요청 실패'),
      })
    },
    fail: (err) => alert('카카오 로그인 실패'),
  })
}

// JWT 디코더
function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = decodeURIComponent(
    atob(base64Url)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
  return JSON.parse(base64)
}

// SDK 로드 및 초기화
onMounted(() => {
  // Google 콜백 전역 등록
  window.handleCredentialResponse = handleGoogleLogin

  // Naver 로그인 초기화
  new window.naver.LoginWithNaverId({
    clientId: 'YOUR_NAVER_CLIENT_ID',
    callbackUrl: window.location.href,
    isPopup: true,
    loginButton: { color: 'green', type: 3, height: '40' },
  }).init()

  // Kakao 초기화
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY')
  }
})
</script>
