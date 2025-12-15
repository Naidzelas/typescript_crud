<template>
    <div>
        <button 
            @click="visible = true"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white transition-colors"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {{ $t('upload.button') }}
        </button>

        <!-- Modal Backdrop -->
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="visible"
                class="z-50 fixed inset-0 flex justify-center items-center bg-black/30 p-4"
                @click.self="closeDialog"
            >
                <!-- Modal Dialog -->
                <Transition
                    enter-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                >
                    <div 
                        v-if="visible"
                        class="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-2xl"
                    >
                        <!-- Header -->
                        <div class="flex justify-between items-center px-6 py-4 border-gray-200 dark:border-gray-700 border-b">
                            <h2 class="font-semibold text-gray-900 dark:text-gray-100 text-xl">{{ $t('upload.title') }}</h2>
                            <button
                                @click="closeDialog"
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Body -->
                        <div class="px-6 py-6">
                            <div class="flex flex-col gap-6">
                                <div class="flex flex-col gap-4">
                                    <label for="file-upload" class="font-semibold text-gray-900 dark:text-gray-100">
                                        {{ $t('upload.selectFile') }}
                                    </label>
                                    
                                    <div class="relative">
                                        <input
                                            ref="fileInput"
                                            id="file-upload"
                                            type="file"
                                            accept=".json,application/json"
                                            @change="handleFileSelect"
                                            class="block bg-gray-50 hover:file:bg-blue-700 dark:bg-gray-700 file:bg-blue-600 file:mr-4 file:px-4 file:py-2 border border-gray-300 dark:border-gray-600 file:border-0 rounded-lg file:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full file:font-semibold text-gray-900 dark:text-gray-100 file:text-white text-sm file:text-sm cursor-pointer file:cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div v-if="selectedFile" class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                    <svg class="w-8 h-8 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-semibold text-gray-900 dark:text-gray-100 truncate">{{ selectedFile.name }}</p>
                                        <p class="text-gray-500 dark:text-gray-400 text-sm">{{ formatFileSize(selectedFile.size) }}</p>
                                    </div>
                                    <button
                                        @click="clearFile"
                                        class="hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full text-red-600 hover:text-red-700 transition-colors shrink-0"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="flex justify-end gap-3 px-6 py-4 border-gray-200 dark:border-gray-700 border-t">
                            <button
                                @click="closeDialog"
                                class="bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-200 transition-colors"
                            >
                                {{ $t('upload.cancel') }}
                            </button>
                            <button
                                @click="handleUpload"
                                :disabled="!selectedFile"
                                class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 disabled:opacity-50 shadow-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white transition-colors disabled:cursor-not-allowed"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                {{ $t('upload.upload') }}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const emit = defineEmits<{
    uploadComplete: [result: { inserted: number; skipped: number }]
}>();

const visible = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<any>(null);

const handleFileSelect = (event: Event) => {
    const target = event.target as any;
    const file = target.files?.[0];
    
    if (file && file.type === 'application/json') {
        selectedFile.value = file;
    } else if (file) {
        // Clear the invalid file
        console.warn($t('upload.invalidFormat'));
        if (fileInput.value) {
            fileInput.value.value = '';
        }
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

const handleUpload = async () => {
    if (!selectedFile.value) return;

    try {
        const fileContent = await selectedFile.value.text();
        const rawClients = JSON.parse(fileContent);

        // Validate that it's an array
        if (!Array.isArray(rawClients)) {
            console.error($t('upload.invalidFormat'));
            return;
        }

        // Normalize field names (support both uppercase and lowercase)
        const clients = rawClients.map((client: any) => ({
            name: client.name || client.Name,
            address: client.address || client.Address,
            postcode: client.postcode || client.PostCode || ''
        }));

        // Send to backend
        const response = await fetch('http://localhost:3000/api/client/bulk-import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clients }),
        });

        const result: any = await response.json();

        if (response.ok) {
            console.log($t('upload.success'), result);
            console.log(`${$t('upload.success')}: ${$t('upload.fileName')}: ${result.inserted}, ${$t('upload.error')}: ${result.skipped}`);
            emit('uploadComplete', { inserted: result.inserted, skipped: result.skipped });
            closeDialog();
        } else {
            console.error($t('upload.error'), result);
            console.error(`${$t('upload.error')}: ${result.message}`);
        }
    } catch (error) {
        console.error($t('upload.error'), error);
    }
};

const closeDialog = () => {
    visible.value = false;
    clearFile();
};
</script>
