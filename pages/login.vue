<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  const success = await userStore.login(username.value, password.value)
  if (success) {
    router.push('/account')
  } else {
    errorMessage.value = 'Введены неверные данные авторизации. Попробуйте ещё раз.'
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  max-width: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  
  input {
    padding: 8px;
    margin: 8px 0px;
    width: 100%; 
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid #ccc;
    border-radius: 4px;  

    &:focus {
    outline: none;
    border-color: #a5c940;
    box-shadow: 0 0 4px #a5c94066;
  }
  }

  button {
    display: block;
    padding: 8px 16px;
    background-color: #333;
    color: white;
    border-radius: 8px;
    margin: 0 auto;
    transition: background-color 0.2s ease;

    &:hover {
    background-color: #555;
    }
  }

  .error {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
}
</style>
