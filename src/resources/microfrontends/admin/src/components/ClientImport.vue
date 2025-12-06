<template>
    <div class="flex justify-center items-center bg-surface-0 dark:bg-surface-950 px-6 md:px-12 lg:px-20 py-20">
        <Button label="Display" @click="visible = true" />

        <Dialog
            v-model:visible="visible"
            append-to="body"
            :modal="true"
            :breakpoints="{ '960px': '75vw', '640px': '80vw' }"
            :style="{ width: '40rem' }"
            :show-header="false"
            class="shadow-sm rounded-2xl"
            :pt="{ content: 'p-6!', footer: 'pb-6! px-6!' }"
        >
            <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-4">
                    <div class="flex justify-center items-center bg-primary-100 dark:bg-primary-400/30 border border-primary-200 dark:border-primary-400/20 rounded-full w-12 h-12 shrink-0">
                        <i class="text-primary-500 text-xl! dark:text-primary-200 leading-none! pi pi-check" />
                    </div>
                    <h3 class="m-0 font-semibold text-surface-900 dark:text-surface-0 text-xl text-center">Confirm Plan Upgrade</h3>
                </div>
                <p class="m-0 p-0 text-surface-700 dark:text-surface-300 text-base text-center leading-normal">
                    Verify your plan upgrade to unlock advanced features and boost productivity. Review the updated pricing, confirm your selection carefully, and activate changes seamlessly.
                </p>
            </div>
            <template #footer>
                <div class="flex gap-4 w-full">
                    <Button label="Cancel" class="flex-1" outlined @click="visible = false" />
                    <Button label="Save" class="flex-1" @click="visible = false" />
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const visible = ref(false);
</script>
