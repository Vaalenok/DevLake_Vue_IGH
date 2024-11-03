<template>
  <TopBar/>
  <h1 style="margin-bottom: 10px">Информация о сотруднике</h1>

  <div style="font-size: 18px; line-height: 2">
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Компания:</strong> {{ user.company }}</p>
    <p><strong>Стаж:</strong> {{ user.experience }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import {useRoute} from 'vue-router'
import TopBar from "@/components/TopBar.vue";

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