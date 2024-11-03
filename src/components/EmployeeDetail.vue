<template>
  <TopBar/>
  <h1 style="margin-bottom: 10px">Информация о сотруднике</h1>
  <div style="font-size: 18px; line-height: 2">
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Компания:</strong> {{ user.company }}</p>
    <p><strong>Стаж:</strong> {{ user.experience }}</p>
  </div>
  <h1 style="margin-bottom: 10px">Отзывы</h1>
  <el-input
      v-model="textarea"
      size="large"
      :autosize="{ minRows: 3, maxRows: 6 }"
      type="textarea"
      placeholder="Оставте отзыв"
  />
  <FeedbackCard />
</template>


<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import TopBar from "@/components/TopBar.vue"
import {getUserById} from "@/scripts/requests"
import FeedbackCard from "@/components/FeedbackCard.vue";

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
fetchData()

const textarea = ref('')

</script>