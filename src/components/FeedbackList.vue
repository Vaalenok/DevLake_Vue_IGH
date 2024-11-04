<template>
  <div>
    <h2>Отзывы пользователей</h2>
    <ul v-if="paginatedFeedbacks.length">
      <li v-for="feedback in paginatedFeedbacks" :key="feedback.id">
        <FeedbackCard :feedback="feedback" />
      </li>
    </ul>
    <p v-else>Пока нет отзывов.</p>
    <el-pagination
        v-if="totalPages > 1"
        background
        layout="prev, pager, next"
        :total="feedbacks.length"
        :page-size="pageSize"
        v-model:current-page="currentPage"
        @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import FeedbackCard from '@/components/FeedbackCard.vue';
import { getFeedback } from '@/scripts/requests';
import { defineProps } from 'vue';

// Определение пропсов
const props = defineProps<{ userId: string }>();

const feedbacks = ref([]);
const pageSize = 5;  // Количество элементов на одной странице
const currentPage = ref(1);

const fetchFeedbacks = async () => {
  try {
    console.log(props.userId);
    feedbacks.value = await getFeedback(props.userId);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
  }
};

// Определяем общее количество страниц на основе количества отзывов
const totalPages = computed(() => Math.ceil(feedbacks.value.length / pageSize));

// Пагинация — выводим только отзывы для текущей страницы
const paginatedFeedbacks = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return feedbacks.value.slice(startIndex, endIndex);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// Используем userId, полученный через props
onMounted(fetchFeedbacks);
</script>

<style scoped>
/* Добавьте стили по вашему желанию */
</style>