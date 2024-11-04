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
        :total="totalFeedbacks"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import FeedbackCard from '@/components/FeedbackCard.vue';
import { getFeedback } from '@/scripts/requests';
import { defineProps } from 'vue';

// Определение пропсов
const props = defineProps<{ userId: string }>();

// Состояние компонентов
const feedbacks = ref([]);
const totalFeedbacks = ref(0);
const pageSize = 5;  // Количество элементов на одной странице
const currentPage = ref(1);

// Функция для получения отзывов
const fetchFeedbacks = async () => {
  try {
    const { data, total } = await getFeedback(props.userId, (currentPage.value - 1) * pageSize, pageSize);
    feedbacks.value = data;
    totalFeedbacks.value = total;
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
  }
};

// Пагинация — выводим только отзывы для текущей страницы
const paginatedFeedbacks = computed(() => feedbacks.value);

// Определяем общее количество страниц
const totalPages = computed(() => Math.ceil(totalFeedbacks.value / pageSize));

// Обработчик изменения страницы
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchFeedbacks(); // заново загружаем данные для новой страницы
};

// Следим за изменением currentPage и загружаем новые данные
watch(currentPage, () => fetchFeedbacks());

// Инициализируем загружаемые данные
onMounted(() => fetchFeedbacks());
</script>

<style scoped>
/* Добавьте стили по вашему желанию */
</style>