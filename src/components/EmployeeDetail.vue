<template>
  <div>
    <h1>Информация о сотруднике</h1>
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Компания:</strong> {{ user.company }}</p>
    <p><strong>Стаж:</strong> {{ user.experience }}</p>
    <router-link to="/">Назад к списку</router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface User {
  id: number
  name: string
  company: string
  experience: string
}

const route = useRoute()
const { params } = route

const user: User = {
  id: params.id,
}

onMounted(() => {
  // Здесь можно выполнить асинхронные запросы для получения данных
})
</script>