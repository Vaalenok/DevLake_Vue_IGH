<template>
  <TopBar/>

  <h1 style="margin-bottom: 10px">Информация о сотруднике</h1>

  <div style="font-size: 18px; line-height: 2">
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Компания:</strong> {{ user.company }}</p>
    <p><strong>Стаж:</strong> {{ user.experience }}</p>
  </div>

  <el-input v-model="textarea" size="large" :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" placeholder="Оставте отзыв" />

  <FeedbackList :userId="user.id" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TopBar from "@/components/TopBar.vue";
import FeedbackList from "@/components/FeedbackList.vue";
import { useRoute } from 'vue-router';
import { getUserById } from "@/scripts/requests";

interface User {
  id: string;
  name: string;
  company: string;
  experience: string;
}

const route = useRoute();
const { params } = route;
const user = ref<User>();

async function fetchData() {
  try {
    let rawData = await getUserById(params.id);
    user.value = {
      id: rawData.id,
      name: rawData.full_name,
      company: rawData.company,
      experience: rawData.experience,
    };
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}
fetchData();

const textarea = ref('');
</script>