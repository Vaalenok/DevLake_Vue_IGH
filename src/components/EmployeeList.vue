<template>
  <TopBar/>

  <h1 style="margin-bottom: 10px">Сотрудники</h1>

  <el-input style="font-size: 18px" v-model="search" size="large" placeholder="Поиск по имени">
    <template #prepend>
      <el-icon class="el-input__icon"><Search /></el-icon>
    </template>
  </el-input>

  <el-table
      stripe
      row-key="name"
      :size="'large'"
      :data="filterTableData"
      style="width: 100%; font-size: 16px"
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
import { ref, computed } from 'vue'
import TopBar from "@/components/TopBar.vue";

interface User {
  id: number
  name: string
  company: string
  experience: number
}

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const router = useRouter()

function handleRowClick(row: User) {
  router.push({
    path: `/employee/${row.id}`
  })
}

const tableData: User[] = await getAllUsers()
</script>