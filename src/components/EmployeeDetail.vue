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
import {ref} from 'vue'
import { useRoute } from 'vue-router'
import TopBar from "@/components/TopBar.vue"
import { getUserById } from '/src/scripts/requests'

interface User {
  id: number
  name: string
  company: string
  experience: string
}

const route = useRoute()
const { params } = route
const user = ref<User>()

async function fetchData() {
  try {
    let rawData = await getUserById(params.id)
    const currentUser: User = {
      id: rawData.id,
      name: rawData.full_name,
      company: rawData.company,
      experience: rawData.experience,
    }
    user.value = currentUser; // Установка полученных данных в реактивную переменную
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}
fetchData()
</script>