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

const tableData: User[] = [
  {
    id: 1,
    name: 'Tom',
    company: 'No. 189, Grove St, Los Angeles',
    experience: 2
  },
  {
    id: 2,
    name: 'Jack',
    company: 'No. 182, Grove St, Los Angeles',
    experience: 4
  },
  {
    id: 3,
    name: 'Mary',
    company: 'No. 185, Grove St, Los Angeles',
    experience: 3
  },
  {
    id: 4,
    name: 'Lena',
    company: 'No. 181, Grove St, Los Angeles',
    experience: 6
  },
]
</script>