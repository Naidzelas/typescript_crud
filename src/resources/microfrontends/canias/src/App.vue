<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import type { Component } from 'vue'
import SYST99 from './pages/SYST99.vue'

// Types
interface Tab {
  id: string
  title: string
  component: Component
}

interface PageOption {
  id: string
  title: string
  component: Component
}

// Available pages
const availablePages: PageOption[] = [
  { id: 'syst99', title: 'SYST99', component: markRaw(SYST99) }
]

// State
const openTabs = ref<Tab[]>([])
const activeTabId = ref<string | null>(null)
const selectedPage = ref('')

// Computed
const activeTab = computed(() => {
  return openTabs.value.find(tab => tab.id === activeTabId.value)
})

// Methods
const openPage = () => {
  if (!selectedPage.value) return

  const page = availablePages.find(p => p.id === selectedPage.value)
  if (!page) return

  // Check if tab already exists
  const existingTab = openTabs.value.find(tab => tab.id === page.id)
  if (existingTab) {
    activeTabId.value = existingTab.id
    selectedPage.value = ''
    return
  }

  // Create new tab
  const newTab: Tab = {
    id: page.id,
    title: page.title,
    component: page.component
  }

  openTabs.value.push(newTab)
  activeTabId.value = newTab.id
  selectedPage.value = ''
}

const closeTab = (tabId: string, event: Event) => {
  event.stopPropagation()
  
  const index = openTabs.value.findIndex(tab => tab.id === tabId)
  if (index === -1) return

  openTabs.value.splice(index, 1)

  // If closing active tab, switch to another tab
  if (activeTabId.value === tabId) {
    if (openTabs.value.length > 0) {
      // Switch to the tab before the closed one, or the first tab
      const newIndex = Math.max(0, index - 1)
      activeTabId.value = openTabs.value[newIndex]?.id || null
    } else {
      activeTabId.value = null
    }
  }
}

const switchTab = (tabId: string) => {
  activeTabId.value = tabId
}
</script>

<template>
  <div class="flex flex-col bg-[#c0d0e0] h-screen">
    <!-- Header with Page Selector -->
    <div class="flex items-center gap-4 bg-[#e0e8f0] px-4 py-2 border-[#8090a0] border-b-2">
      <label class="font-semibold text-gray-700 text-sm">Open Page:</label>
      <select 
        v-model="selectedPage"
        @change="openPage"
        class="bg-white shadow-sm px-3 py-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      >
        <option value="">Select a page...</option>
        <option 
          v-for="page in availablePages" 
          :key="page.id" 
          :value="page.id"
        >
          {{ page.title }}
        </option>
      </select>
    </div>

    <!-- Tabs Bar -->
    <div v-if="openTabs.length > 0" class="flex bg-[#b0c0d0] border-gray-400 border-b">
      <div
        v-for="tab in openTabs"
        :key="tab.id"
        @click="switchTab(tab.id)"
        class="relative flex items-center gap-2 px-4 py-2 border-gray-400 border-r min-w-[120px] cursor-pointer"
        :class="{
          'bg-[#d4e4f0] border-t-2 border-t-blue-500': tab.id === activeTabId,
          'bg-[#a0b0c0] hover:bg-[#b0c0d0]': tab.id !== activeTabId
        }"
      >
        <span class="font-medium text-sm">{{ tab.title }}</span>
        <button
          @click="closeTab(tab.id, $event)"
          class="hover:bg-red-100 ml-auto px-1 rounded font-bold text-gray-600 hover:text-red-600 text-xs"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-hidden">
      <component 
        v-if="activeTab" 
        :is="activeTab.component"
        class="h-full"
      />
      <div 
        v-else
        class="flex justify-center items-center h-full text-gray-500"
      >
        <p class="text-lg">Select a page from the dropdown above to get started</p>
      </div>
    </div>
  </div>
</template>
