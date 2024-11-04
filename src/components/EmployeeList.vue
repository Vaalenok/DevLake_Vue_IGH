<template>
  <TopBar/>

  <h1 style="margin-bottom: 10px">Сотрудники</h1>

  <el-table
      stripe
      row-key="name"
      :size="'large'"
      :data="currentPageData"
      style="width: 100%; font-size: 16px"
      @row-click="handleRowClick"
  >
    <el-table-column prop="name" label="ФИО" sortable />
    <el-table-column prop="company" label="Компания" sortable />
    <el-table-column prop="experience" label="Стаж" sortable />
  </el-table>

  <el-pagination
      background
      layout="prev, pager, next"
      :total="totalUsers"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getAllUsers } from '/src/scripts/requests.js';
import TopBar from "@/components/TopBar.vue";

interface User {
  id: string;
  name: string;
  company: string;
  experience: number;
}

const router = useRouter();
const pageSize = ref(10);
const currentPage = ref(1);
const totalUsers = ref(0);
// Храните данные страниц как объект, где ключ - номер страницы
const pagesData = ref<{ [key: number]: User[] }>({});

const currentPageData = computed(() => {
  return pagesData.value[currentPage.value] || []; // Возвращает пустой массив, если ничего нет
});

function handleRowClick(row: User) {
  router.push({
    path: `/employee/${row.id}`  // Корректный путь
  });
}

async function fetchData(page: number) {
  try {
    const skip = (page - 1) * pageSize.value;
    const rawData = await getAllUsers(skip, pageSize.value);
    const users: User[] = rawData.data.map(user => ({
      id: user.id,
      name: user.full_name,
      company: user.company,
      experience: user.experience
    }));
    pagesData.value[page] = users;  // Сохраняем данные для страницы
    if (!totalUsers.value) { // Устанавливаем только один раз
      totalUsers.value = rawData.total;
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

function handlePageChange(page: number) {
  currentPage.value = page;
  if (!pagesData.value[page]) {
    fetchData(page); // Загружаем данные только если их еще нет
  }
}

// Инициализация первой страницы
fetchData(currentPage.value);

// Автоматическое обновление и проверка вывода текущей страницы
watchEffect(() => {
  console.log('Данные для текущей страницы:', currentPageData.value);
});
</script>