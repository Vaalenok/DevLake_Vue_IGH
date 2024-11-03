<template>
  <TopBar/>

  <h1 style="margin-bottom: 10px">Сотрудники</h1>

  <el-table
      stripe
      row-key="name"
      :size="'large'"
      :data="tableData"
      style="width: 100%; font-size: 16px"
      @row-click="handleRowClick"
  >
    <el-table-column
        prop="name"
        label="ФИО"
        sortable
    />
    <el-table-column
        prop="company"
        label="Компания"
        sortable
    />
    <el-table-column
        prop="experience"
        label="Стаж"
        sortable
    />
  </el-table>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { getAllUsers } from '/src/scripts/requests.js'
import { ref, computed } from 'vue'
import TopBar from "@/components/TopBar.vue";

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
