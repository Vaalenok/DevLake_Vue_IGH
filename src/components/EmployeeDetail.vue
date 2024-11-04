<template>
  <TopBar />

  <h1 style="margin-bottom: 10px">Информация о сотруднике</h1>

  <div style="font-size: 18px; line-height: 2" v-if="user">
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Компания:</strong> {{ user.company }}</p>
    <p><strong>Стаж:</strong> {{ user.experience }}</p>
  </div>
  <div v-else>
    Загрузка данных...
  </div>

  <!-- Отрисовка критериев -->
  <div v-if="userScores && userScores.length">
    <div v-for="score in userScores" :key="score.criteriaType" style="margin: 20px 0; border-bottom: 1px solid #ccc; padding-bottom: 15px;">
      <h3><strong>{{ score.criteriaType }}:</strong></h3>
      <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="score.score * 20"
          :color="customColors"
          :format="format"
      />
    </div>
  </div>

  <el-input
      style="margin: 15px 0"
      v-model="textarea"
      size="large"
      :autosize="{ minRows: 3, maxRows: 6 }"
      type="textarea"
      placeholder="Оставьте отзыв"
  />
  <el-button type="primary" size="large" @click="submitFeedback">Отправить отзыв</el-button>

  <FeedbackList v-if="user" :userId="user.id" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TopBar from "@/components/TopBar.vue";
import FeedbackList from "@/components/FeedbackList.vue";
import { useRoute } from 'vue-router';
import {
  getUserById,
  addFeedback,
  getUserScores // измененный метод функции
} from "@/scripts/requests";

const format = (percentage: number) => `${(percentage / 20).toFixed(2)} из 5`;

interface User {
  id: string;
  name: string;
  company: string;
  experience: string;
}

interface Score {
  criteriaType: string;
  score: number;
}

const route = useRoute();
const { params } = route;
const user = ref<User | null>(null);
const textarea = ref('');
const userScores = ref<Score[]>([]);

async function fetchData() {
  try {
    const rawData = await getUserById(params.id);
    user.value = {
      id: rawData.id,
      name: rawData.full_name,
      company: rawData.company,
      experience: rawData.experience,
    };
    await fetchUserScores();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

async function fetchUserScores() {
  if (user.value) {
    try {
      const scores = await getUserScores(user.value.id);
      userScores.value = [
        { criteriaType: 'Профессионализм', score: scores.professionalism },
        { criteriaType: 'Командная работа', score: scores.teamwork },
        { criteriaType: 'Коммуникативность', score: scores.communication },
        { criteriaType: 'Инициативность', score: scores.initiative }
      ];
    } catch (error) {
      console.error("Ошибка при получении оценок:", error);
    }
  }
}

onMounted(fetchData);

async function submitFeedback() {
  if (textarea.value) {
    if (user.value) {
      try {
        // Формируем объект с нужной структурой
        const feedback = {
          feedback: textarea.value, // Название поля изменено на 'feedback'
          reviewer_id: user.value.id, // Убедитесь, что вы используете корректное поле для reviewer_id
          under_reviewer_id: params.id, // Здесь используется id для under_reviewer_id
        };
        console.log(feedback)
        await addFeedback(feedback); // Вызываем addFeedback с правильным объектом
        textarea.value = ''; // Очищаем поле ввода
        console.log("Отзыв успешно отправлен!");
      } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
      }
    }
  } else {
    alert("Пожалуйста, оставьте текст отзыва.");
  }
}

const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#ffb433', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
];
</script>

<style scoped>
.review-card {
  margin: 20px 0;
}

.toggle-button {
  background: none;
  border: none;
  color: #409eff;
  cursor: pointer;
  margin: 10px 0;
  font-size: 14px;
}

.demo-progress, .progress-item, .el-progress {
  margin: 15px 0;
}

.progress-label {
  font-size: 18px;
}

.progress-text {
  font-size: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
