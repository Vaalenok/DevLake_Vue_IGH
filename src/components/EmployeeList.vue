<template>
  <el-table
      row-key="name"
      :data="tableData"
      style="width: 100%"
      @row-click="handleRowClick"
  >
    <el-table-column
        prop="name"
        label="ФИО"
        sortable
        width="200"
    />
    <el-table-column
        prop="company"
        label="Компания"
        sortable
        width="300"
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

interface User {
  id: number
  name: string
  company: string
  experience: number
}

const router = useRouter()

function handleRowClick(row: User) {
  router.push({
    path: `/employee/${row.id}`
  })
}

const tableData: User[] = await getAllUsers()
</script>