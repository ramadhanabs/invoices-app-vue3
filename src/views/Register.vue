<template>
  <div class="container">
    <a-row style="width: 100%" align="middle">
      <a-col :span="16">
        <p class="hero-title">
          Confused of making invoice? <br />
          Say no more.
        </p>
        <p class="subtitle">Sign your account here. No pay needed.</p>
      </a-col>
      <a-col :span="8">
        <div class="card">
          <p class="title">Sign up here.</p>
          <text-input
            label="Name"
            placeholder="Input your Name"
            v-model="input.name"
            style="margin-bottom: 16px"
          />
          <text-input
            label="Email"
            placeholder="Input your email"
            v-model="input.email"
            type="email"
            style="margin-bottom: 16px"
          />
          <text-input
            label="Password"
            placeholder="Input your Password"
            v-model="input.password"
            type="password"
            style="margin-bottom: 16px"
          />
          <Button
            block
            type="primary"
            shape="round"
            style="margin-top: 16px"
            @click="handleRegister"
            :loading="loading"
          >
            Sign Up
          </Button>

          <a-divider
            style="background-color: white; opacity: 0.3; margin: 16px 0px"
          />
          <a-button block @click="handleGoogleAuth">
            <template #icon>
              <GoogleCircleFilled />
            </template>
            Sign Up with Google
          </a-button>

          <div style="margin-top: 24px; text-align: center">
            <p class="subtitle">Already have account?</p>
            <a class="subtitle" @click="$router.push('/login')">Login here</a>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import TextInput from '@/components/Input/text.vue'
import Button from '@/components/Button/index.vue'
import { GoogleCircleFilled } from '@ant-design/icons-vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import db from '../firebase/firebaseInit'

export default defineComponent({
  components: { TextInput, Button, GoogleCircleFilled },
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const input = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        loading.value = true
        await createUserWithEmailAndPassword(
          getAuth(),
          input.value.email,
          input.value.password
        ).then(({ user }) => {
          updateProfile(user, { displayName: input.value.name })
          db.collection('users').doc(user.uid).set({
            displayName: input.value.name,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          })
          message.success('Success Register')
          router.push('/')
        })
      } catch (err) {
        message.error(err)
      } finally {
        loading.value = false
      }
    }

    const handleGoogleAuth = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then(({ user }) => {
          db.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          })
          message.success('Success Login')
          router.push('/')
        })
        .catch((error) => {
          message.error(error.code)
        })
    }
    return {
      loading,
      input,
      handleRegister,
      handleGoogleAuth
    }
  }
})
</script>
<style scoped>
.card {
  background-color: #1e2030;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
}
.hero-title {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 24px !important;
}
.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px !important;
}
.subtitle {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}
.ant-btn {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  color: #a185da;
  padding: 16px 24px;
  line-height: 1;
  border-radius: 8px;
  height: auto;
}
.ant-btn:hover {
  background-color: #2a213c !important;
  color: #a185da;
}
a {
  text-decoration: underline;
  color: white;
}
</style>
