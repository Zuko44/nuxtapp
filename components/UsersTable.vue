<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Статус</th>
        <th>Дата создания</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(u, index) in users" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ u.name }}</td>
        <td>{{ u.surname }}</td>
        <td>{{ u.active ? 'Активен' : 'Неактивен' }}</td>
        <td>{{ u.created }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '~/types/User'

defineProps<{
  users: User[]
}>()
</script>

<style lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  text-align: center;

  thead {
    background-color: #a5c940;

    th {
      padding: 12px;
      text-align: center;
      font-weight: bold;
      color: #000;
      border-bottom: 2px solid #a5c940;
    }
  }

  tbody {
    tr:nth-child(even) {
      background-color: #f3fbe0;
    }

    tr:nth-child(odd) {
      background-color: #ffffff;
    }

    td {
      padding: 10px;
      text-align: center;
      border: 1px solid #d0e3a8;
    }
  }
}
</style>