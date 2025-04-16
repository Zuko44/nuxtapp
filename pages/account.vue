<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import type { User } from '~/types/User'
import UsersFilter from '~/components/UsersFilter.vue'
import UsersTable from '~/components/UsersTable.vue'

const filters = ref({
  dateFrom: '',
  dateTo: '',
  surnames: [] as string[]
})
const userStore = useUserStore()
const router = useRouter()

const user = userStore.currentUser
const usersData = ref<User[]>([])
const isLoading = ref(true)
const fetchError = ref<Error | null>(null)

// отфильтрованные пользователи
const filteredUsers = computed(() => {
  return usersData.value.filter((u) => {
    const surnameMatch =
      filters.value.surnames.length === 0 ||
      filters.value.surnames.includes(u.surname)

    const createdDate = new Date(u.created.split(' ')[0].split('.').reverse().join('-'))
    const from = filters.value.dateFrom ? new Date(filters.value.dateFrom) : null
    const to = filters.value.dateTo ? new Date(filters.value.dateTo) : null

    const dateMatch =
      (!from || createdDate >= from) &&
      (!to || createdDate <= to)

    return surnameMatch && dateMatch
  })
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

onMounted(async () => {
  const userStore = useUserStore()
  userStore.restoreSession()

  if (!userStore.isLoggedIn) {
    return navigateTo('/login')
  }

  try {
    isLoading.value = true
    const data = await $fetch<User[]>('/data/users.json')
    usersData.value = data
  } catch (err) {
    fetchError.value = err as Error
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="account-page">
    <div class="header">
      <h2>Добро пожаловать, {{ user?.name }} {{ user?.surname }}</h2>
      <button @click="handleLogout">Выйти</button>
    </div>

    <p v-if="isLoading">Загрузка...</p>
    <p v-if="fetchError">Ошибка загрузки данных</p>

    <UsersFilter
      v-model="filters"
      :all-users="usersData"
    />

    <h3>Список пользователей</h3>
    <UsersTable :users="filteredUsers" />
  </div>
</template>

<style scoped lang="scss">
.account-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    button {
      background-color: crimson;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
