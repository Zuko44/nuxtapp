<script setup lang="ts">
onMounted(() => {
  const userStore = useUserStore()
  userStore.restoreSession()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
