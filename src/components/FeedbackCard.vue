<template>
  <el-card class="review-card">
    <h3>{{ feedback.reviewer.full_name }}</h3>
    <div>
      <p>{{ isTextExpanded ? feedback.feedback : truncatedFeedback }}</p>
      <button @click="toggleText" class="toggle-button">
        {{ isTextExpanded ? 'Свернуть текст' : 'Развернуть текст' }}
      </button>
    </div>
    <button @click="toggleDetails" class="toggle-button">
      {{ isExpanded ? 'Скрыть детали' : 'Показать детали' }}
    </button>
    <transition name="fade">
      <div v-if="isExpanded">
        <div v-for="(score, index) in feedback.scores" :key="score.id" class="demo-progress">
          <p class="progress-label">
            <strong>{{ translateCriteria(score.criteria_type.name) }}:</strong>
          </p>
          <p class="progress-text">{{ score.commentary }}</p>
          <el-progress
              :text-inside="true"
              :format="format"
              :stroke-width="20"
              :percentage="score.score * 20"
              :color="customColors"
          />
          <hr />
        </div>
      </div>
    </transition>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';

// Определение пропсов
const props = defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});

// Перевод критериев с английского на русский
const criteriaTranslation = {
  PROFESSIONALISM: 'Профессионализм',
  TEAMWORK: 'Командная работа',
  COMMUNICATION_SKILL: 'Коммуникативность',
  INITIATIVE: 'Инициативность'
};

function translateCriteria(criteria: string) {
  return criteriaTranslation[criteria] || criteria;
}

// Настройки формата и цвета бара
const format = (percentage: number) => `${percentage / 20} из 5`;

const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#ffb433', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
];

// Локальное состояние для отслеживания раскрытия текста и деталей
const isTextExpanded = ref<boolean>(false);
const isExpanded = ref<boolean>(false);

function toggleText() {
  isTextExpanded.value = !isTextExpanded.value;
}

function toggleDetails() {
  isExpanded.value = !isExpanded.value;
}

// Компьютед свойство для отображения сокращенного текста
const truncatedFeedback = computed(() => {
  const maxLength = 100; // Максимальная длина текста до обрезки
  if (props.feedback.feedback.length <= maxLength) {
    return props.feedback.feedback;
  }
  return props.feedback.feedback.slice(0, maxLength) + '...';
});
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