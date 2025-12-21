<template>
  <div class="flex flex-col bg-[#d4e4f0] h-full">
    <!-- Header Toolbar -->
    <div class="flex items-center gap-2 bg-[#c0d0e0] px-4 py-2 border-gray-400 border-b">
      <button 
        @click="executeQuery"
        :disabled="isExecuting"
        class="bg-[#e0e8f0] hover:bg-[#d0dce8] disabled:opacity-50 px-4 py-1 border border-gray-400 text-sm"
      >
        Execute
      </button>
      
      <span class="ml-4 font-semibold text-sm">Run Query In:</span>
      <input 
        type="text" 
        v-model="queryName"
        class="bg-white px-2 py-1 border border-gray-400 w-32 text-sm"
      />
      
      <span class="text-sm">File Name</span>
      <input 
        type="text" 
        v-model="fileName"
        class="flex-1 bg-white px-2 py-1 border border-gray-400 text-sm"
      />
      
      <button class="bg-[#e0e8f0] hover:bg-[#d0dce8] px-4 py-1 border border-gray-400 text-sm">
        Load
      </button>
      <button class="bg-[#e0e8f0] hover:bg-[#d0dce8] px-4 py-1 border border-gray-400 text-sm">
        Save
      </button>
    </div>

    <!-- SQL Editor Area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="flex-1 p-2 overflow-auto">
        <div class="bg-white border border-gray-400 h-full">
          <textarea
            v-model="sqlQuery"
            class="p-2 outline-none w-full h-full font-mono text-sm resize-none"
            placeholder="Enter SQL query..."
            spellcheck="false"
          ></textarea>
        </div>
      </div>

      <!-- Results Section -->
      <div class="flex flex-col flex-1 p-2 pt-0">
        <div class="bg-white border border-gray-400 h-full overflow-auto">
          <!-- Status Bar -->
          <div v-if="executionStatus" class="bg-[#f0f4f8] px-2 py-1 border-gray-300 border-b text-xs">
            {{ executionStatus }}
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Results Table -->
          <div v-else-if="queryResults.length > 0" class="overflow-auto">
            <table class="w-full text-xs border-collapse">
              <thead class="top-0 sticky bg-[#e0e8f0]">
                <tr>
                  <th 
                    v-for="column in resultColumns" 
                    :key="column"
                    class="px-2 py-1 border border-gray-300 font-semibold text-left"
                  >
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(row, index) in queryResults" 
                  :key="index"
                  class="hover:bg-blue-50"
                  :class="{ 'bg-[#e8f4ff]': index % 2 === 0 }"
                >
                  <td 
                    v-for="column in resultColumns" 
                    :key="column"
                    class="px-2 py-1 border border-gray-300"
                  >
                    {{ formatValue(row[column]) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else-if="!isExecuting && !errorMessage" class="p-4 text-gray-500 text-sm">
            No results. Execute a query to see results here.
          </div>

          <!-- Loading State -->
          <div v-if="isExecuting" class="p-4 text-gray-600 text-sm">
            Executing query...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const sqlQuery = ref('SELECT * FROM client')
const queryName = ref('STANDART')
const fileName = ref('')
const isExecuting = ref(false)
const queryResults = ref<any[]>([])
const executionStatus = ref('')
const errorMessage = ref('')

// Computed
const resultColumns = computed(() => {
  if (queryResults.value.length === 0) return []
  return Object.keys(queryResults.value[0])
})

// Methods
const executeQuery = async () => {
  if (!sqlQuery.value.trim()) {
    errorMessage.value = 'Please enter a SQL query'
    return
  }

  isExecuting.value = true
  errorMessage.value = ''
  executionStatus.value = ''
  queryResults.value = []

  try {
    const response = await fetch('/api/canias/syst99/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: sqlQuery.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Query execution failed')
    }

    queryResults.value = data.results || []
    const rowCount = queryResults.value.length
    executionStatus.value = `${rowCount} row(s) affected`
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred while executing the query'
    executionStatus.value = ''
  } finally {
    isExecuting.value = false
  }
}

const formatValue = (value: any) => {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString()
  return String(value)
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
