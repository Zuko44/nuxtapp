<template>
  <div class="products-page">
    <h2>Каталог товаров</h2>

    <div class="filters">
      <label>
        Статус:
        <select v-model="statusFilter">
          <option value="">Все</option>
          <option value="active">Активен</option>
          <option value="inactive">Неактивен</option>
          <option value="draft">Черновик</option>
        </select>
      </label>

      <label>
        Категория:
        <select v-model="categoryFilter">
          <option value="">Все</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </label>
    </div>

    <ProductsTable :products="filteredProducts" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '~/types/Product'
import ProductsTable from '~/components/ProductsTable.vue'

const { data: productsData } = await useFetch<Product[]>('/api/products')

const statusFilter = ref('')
const categoryFilter = ref('')

const filteredProducts = computed(() => {
  return (productsData.value ?? []).filter((p) => {
    const statusOk = !statusFilter.value || p.status === statusFilter.value
    const categoryOk = !categoryFilter.value || p.category === categoryFilter.value
    return statusOk && categoryOk
  })
})

const uniqueCategories = computed(() => {
  const all = productsData.value?.map(p => p.category) ?? []
  return [...new Set(all)]
})
</script>

<style scoped lang="scss">
.products-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 2rem;
}

.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;

    select {
      margin-top: 4px;
      padding: 0.5rem;
      border-radius: 6px;
    }
  }
}
</style>
