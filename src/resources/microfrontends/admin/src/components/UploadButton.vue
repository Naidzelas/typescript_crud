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
import { ref } from 'vue';
import { Button, Dialog } from 'primevue';

const visible = ref(false);
const selectedFile = ref<File | null>(null);

const clearFile = () => {
    selectedFile.value = null;
    // if (fileInput.value) {
    //     fileInput.value.value = '';
    // }
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
