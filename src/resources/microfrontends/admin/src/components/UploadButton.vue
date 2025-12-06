<template>
    <div>
        <Button 
            label="Upload File" 
            icon="pi pi-upload"
            @click="visible = true"
            severity="primary"
        />

        <Dialog
            v-model:visible="visible"
            :modal="true"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40rem' }"
            header="Upload File"
            class="shadow-lg rounded-2xl"
        >
            <div class="flex flex-col gap-6 py-4">
                <div class="flex flex-col gap-4">
                    <label for="file-upload" class="font-semibold text-surface-900 dark:text-surface-0">
                        Select a file to upload
                    </label>
                    <div 
                        class="flex flex-col justify-center items-center p-8 border-2 border-surface-300 hover:border-primary-500 dark:border-surface-600 border-dashed rounded-lg transition-colors cursor-pointer"
                        @click="triggerFileInput"
                        @dragover.prevent="isDragging = true"
                        @dragleave.prevent="isDragging = false"
                        @drop.prevent="handleDrop"
                        :class="{ 'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragging }"
                    >
                        <i class="mb-4 text-surface-400 dark:text-surface-500 text-4xl pi pi-cloud-upload" />
                        <p class="mb-2 text-surface-600 dark:text-surface-400 text-center">
                            <span class="font-semibold text-primary-500">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-surface-500 dark:text-surface-500 text-sm">
                            {{ selectedFile ? selectedFile.name : 'No file selected' }}
                        </p>
                    </div>
                    <input 
                        ref="fileInput"
                        id="file-upload"
                        type="file"
                        class="hidden"
                        @change="handleFileSelect"
                        accept=".csv,.xlsx,.xls,.json"
                    />
                </div>

                <div v-if="selectedFile" class="flex items-center gap-3 bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                    <i class="text-primary-500 text-2xl pi pi-file" />
                    <div class="flex-1">
                        <p class="mb-1 font-semibold text-surface-900 dark:text-surface-0">{{ selectedFile.name }}</p>
                        <p class="text-surface-500 dark:text-surface-400 text-sm">{{ formatFileSize(selectedFile.size) }}</p>
                    </div>
                    <Button 
                        icon="pi pi-times" 
                        severity="danger" 
                        text 
                        rounded 
                        @click="clearFile"
                    />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-3">
                    <Button 
                        label="Cancel" 
                        severity="secondary" 
                        outlined 
                        @click="closeDialog"
                    />
                    <Button 
                        label="Upload" 
                        severity="primary"
                        icon="pi pi-upload"
                        :disabled="!selectedFile"
                        @click="handleUpload"
                    />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
/// <reference lib="dom" />
import { ref } from 'vue';
import { Button, Dialog } from 'primevue';

const visible = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]!;
    }
};

const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        selectedFile.value = event.dataTransfer.files[0]!;
    }
};

const clearFile = () => {
    selectedFile.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const handleUpload = () => {
    if (selectedFile.value) {
        // TODO: Implement actual upload logic here
        console.log('Uploading file:', selectedFile.value.name);
        // You can emit an event or call an API here
        closeDialog();
    }
};

const closeDialog = () => {
    visible.value = false;
    clearFile();
};
</script>

<style scoped>
.hidden {
    display: none;
}
</style>
