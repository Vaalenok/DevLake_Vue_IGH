<template>
  <el-card class="review-card">
    <h1>Отзыв</h1>
    <div class="demo-progress">
      <div
          v-for="bar in progressBars"
          :key="bar.label"
          class="progress-item"
      >
        <p class="progress-label">{{ bar.label }}</p>
        <p class="progress-text">{{ bar.description }}</p>
        <el-progress
            :text-inside="true"
            :format="format"
            :stroke-width="20"
            :percentage="bar.score * 20"
            :color="customColors"
        />
        <hr>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>

const progressBars = [
  { label: 'Категория 1', score: 1.5, description: "Описание 1" },
  { label: 'Категория 2', score: 3.5, description: "Описание 2" },
  { label: 'Категория 3', score: 2.5, description: "Описание 3" },
  { label: 'Категория 4', score: 4.5, description: "Описание 4" },
]

const format = (percentage: number) => (`${percentage/20} из 5`)

const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#ffb433', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
]
</script>

<style scoped>
.review-card {
  margin: 20px 0;
}

.demo-progress, .progress-item, .el-progress--line {
  margin: 15px 0;
}

.progress-label {
  font-size: 18px;
}

.progress-text {
  font-size: 15px;
}
</style>

