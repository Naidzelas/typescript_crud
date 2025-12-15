<template>
    <div class="bg-white dark:bg-gray-900 shadow p-6 rounded-lg">
        <h2 class="mb-4 font-semibold text-gray-900 dark:text-gray-100 text-2xl">{{ $t('updatePostcodes.title') }}</h2>
        
        <p class="mb-6 text-gray-600 dark:text-gray-400">
            {{ $t('updatePostcodes.description') }}
        </p>

        <!-- Status Messages -->
        <div v-if="successMessage" class="bg-green-50 dark:bg-green-900/20 mb-4 px-4 py-3 border border-green-200 dark:border-green-800 rounded-lg">
            <div class="flex items-start">
                <svg class="flex-shrink-0 mr-3 w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div class="flex-1">
                    <p class="font-medium text-green-800 dark:text-green-200">{{ successMessage }}</p>
                    <div v-if="updateResult" class="mt-2 text-green-700 dark:text-green-300 text-sm">
                        <p>{{ $t('updatePostcodes.totalProcessed') }}: {{ updateResult.total }}</p>
                        <p>{{ $t('updatePostcodes.successfullyUpdated') }}: {{ updateResult.updated }}</p>
                        <p>{{ $t('updatePostcodes.failed') }}: {{ updateResult.failed }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 mb-4 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-start">
                <svg class="flex-shrink-0 mr-3 w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div class="flex-1">
                    <p class="font-medium text-red-800 dark:text-red-200">{{ errorMessage }}</p>
                </div>
            </div>
        </div>

        <!-- Errors List -->
        <div v-if="updateResult?.errors && updateResult.errors.length > 0" class="bg-yellow-50 dark:bg-yellow-900/20 mb-4 px-4 py-3 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p class="mb-2 font-medium text-yellow-800 dark:text-yellow-200">{{ $t('updatePostcodes.errorsEncountered') }}:</p>
            <ul class="space-y-1 text-yellow-700 dark:text-yellow-300 text-sm list-disc list-inside">
                <li v-for="(error, index) in updateResult.errors.slice(0, 10)" :key="index">{{ error }}</li>
                <li v-if="updateResult.errors.length > 10" class="font-medium">
                    {{ $t('updatePostcodes.moreErrors', { count: updateResult.errors.length - 10 }) }}
                </li>
            </ul>
        </div>

        <!-- Progress Bar -->
        <div v-if="isUpdating" class="mb-6">
            <div class="flex justify-between mb-2 text-sm">
                <span class="text-gray-700 dark:text-gray-300">{{ $t('updatePostcodes.updatingPostcodes') }}</span>
                <span class="text-gray-700 dark:text-gray-300">{{ $t('updatePostcodes.pleaseWait') }}</span>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div class="bg-blue-600 dark:bg-blue-500 rounded-full h-full animate-pulse" style="width: 100%"></div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
            <button
                @click="updatePostcodes"
                :disabled="isUpdating"
                class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2.5 rounded-lg font-medium text-white transition-colors disabled:cursor-not-allowed"
            >
                <svg v-if="!isUpdating" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isUpdating ? $t('updatePostcodes.updating') : $t('updatePostcodes.button') }}
            </button>

            <button
                v-if="successMessage || errorMessage"
                @click="clearMessages"
                class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
                {{ $t('updatePostcodes.clearMessages') }}
            </button>
        </div>

        <!-- Info Box -->
        <div class="bg-blue-50 dark:bg-blue-900/20 mt-6 px-4 py-3 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start">
                <svg class="flex-shrink-0 mr-3 w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <div class="text-blue-700 dark:text-blue-300 text-sm">
                    <p class="font-medium">{{ $t('updatePostcodes.notes.title') }}</p>
                    <ul class="space-y-1 mt-1 list-disc list-inside">
                        <li>{{ $t('updatePostcodes.notes.onlyMissing') }}</li>
                        <li>{{ $t('updatePostcodes.notes.timeRequired') }}</li>
                        <li>{{ $t('updatePostcodes.notes.invalidAddresses') }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const emit = defineEmits<{
    updateComplete: [result: { updated: number; failed: number; total: number }]
}>();

interface UpdateResult {
    success: boolean;
    message: string;
    updated: number;
    failed: number;
    total: number;
    errors?: string[];
}

const isUpdating = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const updateResult = ref<UpdateResult | null>(null);

const updatePostcodes = async () => {
    isUpdating.value = true;
    successMessage.value = '';
    errorMessage.value = '';
    updateResult.value = null;

    try {
        // First check API health
        const healthResponse = await fetch('http://localhost:3000/api/postit/health');
        const healthData = await healthResponse.json() as { success: boolean; message: string };
        
        if (!healthData.success) {
            errorMessage.value = `${$t('updatePostcodes.apiHealthCheckFailed')}: ${healthData.message}`;
            isUpdating.value = false;
            return;
        }

        // Proceed with update
        const response = await fetch('http://localhost:3000/api/update-postcodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json() as UpdateResult;

        if (data.success) {
            successMessage.value = data.message;
            updateResult.value = data;
            emit('updateComplete', { updated: data.updated, failed: data.failed, total: data.total });
        } else {
            errorMessage.value = data.message || $t('updatePostcodes.failed');
        }
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : $t('updatePostcodes.error');
    } finally {
        isUpdating.value = false;
    }
};

const clearMessages = () => {
    successMessage.value = '';
    errorMessage.value = '';
    updateResult.value = null;
};
</script>
