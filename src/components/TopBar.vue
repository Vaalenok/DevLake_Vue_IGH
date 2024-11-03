<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>

<template>
  <el-menu class="el-menu-demo" style="align-items: center; margin-bottom: 10px" mode="horizontal">
    <el-page-header @back="router.push('/')" title="Назад">
      <template #content>
        <span class="text-large font-600 mr-3"> ScoreWorker </span>
      </template>
    </el-page-header>
  </el-menu>
</template>