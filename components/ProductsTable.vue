<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Цена</th>
        <th>Наличие</th>
        <th>Статус</th>
        <th>Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price }}₽</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.status }}</td>
        <td>{{ product.date_created }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'

defineProps<{
  products: Product[]
}>()
</script>

<style scoped lang="scss">
.product-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  th {
    background-color: #a5c940;
    padding: 10px;
    text-align: center;
  }

  td {
    text-align: center;
    padding: 8px;
    border: 1px solid #d0e3a8;
  }

  tbody tr:nth-child(even) {
    background-color: #f3fbe0;
  }
}
</style>
