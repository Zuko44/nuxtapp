<template>
  <div class="filters">
    <label>
      Дата от:
      <input type="date" v-model="localDateFrom" />
    </label>
    <label>
      Дата до:
      <input type="date" v-model="localDateTo" />
    </label>
    <label>
      Фамилии:
      <select v-model="localSurnames" multiple>
        <option
          v-for="surname in availableSurnames"
          :key="surname"
          :value="surname"
        >
          {{ surname }}
        </option>
      </select>
    </label>
    <button type="button" @click="resetFilters" class="reset-button">
      Сбросить фильтры
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { User } from '~/types/User'

const props = defineProps<{
  allUsers: User[]
  modelValue: {
    dateFrom: string
    dateTo: string
    surnames: string[]
  }
}>()

const emit = defineEmits(['update:modelValue'])

const localDateFrom = ref(props.modelValue.dateFrom)
const localDateTo = ref(props.modelValue.dateTo)
const localSurnames = ref<string[]>([...props.modelValue.surnames])

watch([localDateFrom, localDateTo, localSurnames], () => {
  emit('update:modelValue', {
    dateFrom: localDateFrom.value,
    dateTo: localDateTo.value,
    surnames: localSurnames.value
  })
})

const availableSurnames = computed(() => {
  return [...new Set(props.allUsers.map((u) => u.surname))]
})

const resetFilters = () => {
  localDateFrom.value = ''
  localDateTo.value = ''
  localSurnames.value = []
}
</script>

<style lang="scss">
.filters {
  background-color: #a5c940;
  padding: 1rem;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  margin-bottom: 0;

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #333;

    input, select {
      margin-top: 4px;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }

  select {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 4px;
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  select[multiple] {
    background-color: #fff;
    height: 80px;
  }

  .reset-button {
    background-color: #fff;
    color: #333;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: auto;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>