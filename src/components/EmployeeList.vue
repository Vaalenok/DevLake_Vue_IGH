<template>
  <el-table
      row-key="name"
      :data="tableData"
      style="width: 100%"
      @row-click="handleRowClick"
  >
    <el-table-column
        prop="name"
        label="ФИО"
        sortable
        width="200"
    />
    <el-table-column
        prop="company"
        label="Компания"
        sortable
        width="300"
    />
    <el-table-column
        prop="experience"
        label="Стаж"
        sortable
    />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllUsers } from '/src/scripts/requests.js'

interface User {
  id: number
  name: string
  company: string
  experience: number
}

const router = useRouter()
const tableData = ref<User[]>([]) // Инициализируем как реактивную переменную

function handleRowClick(row: User) {
  router.push({
    path: `/employee/${row.id}` // исправлено на обратные кавычки
  })
}

// Асинхронная функция для получения данных
const fetchData = async () => {
  try {
    let rawData = await getAllUsers()
    const users: User[] = rawData.map(user => ({
      id: user.external_id,
      name: user.full_name,
      company: user.company,
      experience: user.experience,
    }));
    tableData.value = users; // Установка полученных данных в реактивную переменную
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

fetchData(); // Вызов функции для получения данных
</script>
