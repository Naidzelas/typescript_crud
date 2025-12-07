<template>
    <div class="p-6">
        <h1 class="mb-6 font-semibold text-gray-800 dark:text-gray-100 text-3xl">Activity Logs</h1>

        <!-- Activity Logs Section -->
        <div class="bg-white dark:bg-gray-900 shadow mb-8 p-6 rounded-lg">
            <h2 class="mb-4 font-semibold text-gray-900 dark:text-gray-100 text-2xl">User Actions</h2>
            
            <!-- Loading State -->
            <div v-if="activityLoading" class="flex justify-center items-center py-12">
                <ProgressSpinner />
            </div>

            <!-- Error State -->
            <div v-else-if="activityError" class="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-red-800 dark:text-red-200">{{ activityError }}</p>
                <Button 
                    @click="fetchActivityLogs" 
                    label="Retry"
                    severity="danger"
                    class="mt-2"
                />
            </div>

            <!-- Data Table -->
            <DataTable 
                v-else
                :value="activityLogs" 
                :paginator="true" 
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                sortField="created_at" 
                :sortOrder="-1"
            >
                <template #empty>
                    <div class="py-8 text-center">
                        <p class="text-gray-600 dark:text-gray-400">No activity logs found</p>
                    </div>
                </template>

                <Column field="id" header="ID" sortable>
                    <template #body="{ data }">
                        <span class="font-mono text-sm">{{ data.id }}</span>
                    </template>
                </Column>

                <Column field="action" header="Action" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.action" :severity="getActionSeverity(data.action)" />
                    </template>
                </Column>

                <Column field="code" header="Code" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.code.toString()" :severity="getCodeSeverity(data.code)" />
                    </template>
                </Column>

                <Column field="payload" header="Details" style="min-width: 300px">
                    <template #body="{ data }">
                        <div class="text-sm">
                            <div v-if="getPayload(data.payload).name" class="font-semibold">{{ getPayload(data.payload).name }}</div>
                            <div class="text-gray-600 dark:text-gray-400">{{ getPayload(data.payload).message }}</div>
                        </div>
                    </template>
                </Column>

                <Column field="created_at" header="Timestamp" sortable>
                    <template #body="{ data }">
                        <span class="text-sm">{{ formatDate(data.created_at) }}</span>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Outgoing Requests Section -->
        <div class="bg-white dark:bg-gray-900 shadow p-6 rounded-lg">
            <h2 class="mb-4 font-semibold text-gray-900 dark:text-gray-100 text-2xl">Outgoing API Requests</h2>
            
            <!-- Loading State -->
            <div v-if="requestsLoading" class="flex justify-center items-center py-12">
                <ProgressSpinner />
            </div>

            <!-- Error State -->
            <div v-else-if="requestsError" class="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-red-800 dark:text-red-200">{{ requestsError }}</p>
                <Button 
                    @click="fetchOutgoingRequests" 
                    label="Retry"
                    severity="danger"
                    class="mt-2"
                />
            </div>

            <!-- Data Table -->
            <DataTable 
                v-else
                :value="outgoingRequests" 
                :paginator="true" 
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                sortField="created_at" 
                :sortOrder="-1"
            >
                <template #empty>
                    <div class="py-8 text-center">
                        <p class="text-gray-600 dark:text-gray-400">No outgoing requests found</p>
                    </div>
                </template>

                <Column field="id" header="ID" sortable>
                    <template #body="{ data }">
                        <span class="font-mono text-sm">{{ data.id }}</span>
                    </template>
                </Column>

                <Column field="method" header="Method" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.method" :severity="getMethodSeverity(data.method)" />
                    </template>
                </Column>

                <Column field="endpoint" header="Endpoint" sortable>
                    <template #body="{ data }">
                        <span class="font-mono text-sm break-all">{{ data.endpoint }}</span>
                    </template>
                </Column>

                <Column field="code" header="Status" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.code.toString()" :severity="getCodeSeverity(data.code)" />
                    </template>
                </Column>

                <Column field="payload" header="Payload" style="min-width: 250px">
                    <template #body="{ data }">
                        <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto font-mono text-xs">
                            {{ JSON.stringify(data.payload, null, 2) }}
                        </div>
                    </template>
                </Column>

                <Column field="created_at" header="Timestamp" sortable>
                    <template #body="{ data }">
                        <span class="text-sm">{{ formatDate(data.created_at) }}</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

interface ActivityLog {
    id: number;
    code: number;
    action: string;
    payload: {
        name: string;
        message: string;
    };
    created_at: Date;
}

interface OutgoingRequest {
    id: number;
    endpoint: string;
    method: string;
    payload: any;
    code: number;
    created_at: Date;
}

const activityLogs = ref<ActivityLog[]>([]);
const activityLoading = ref(true);
const activityError = ref<string | null>(null);

const outgoingRequests = ref<OutgoingRequest[]>([]);
const requestsLoading = ref(true);
const requestsError = ref<string | null>(null);

const fetchActivityLogs = async () => {
    try {
        activityLoading.value = true;
        activityError.value = null;
        const response = await fetch('http://localhost:3000/api/logs/activity');
        if (!response.ok) {
            throw new Error('Failed to fetch activity logs');
        }
        const data = await response.json() as ActivityLog[];
        activityLogs.value = data;
    } catch (err) {
        activityError.value = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching activity logs:', err);
    } finally {
        activityLoading.value = false;
    }
};

const fetchOutgoingRequests = async () => {
    try {
        requestsLoading.value = true;
        requestsError.value = null;
        const response = await fetch('http://localhost:3000/api/logs/outgoing-requests');
        if (!response.ok) {
            throw new Error('Failed to fetch outgoing requests');
        }
        const data = await response.json() as OutgoingRequest[];
        outgoingRequests.value = data;
    } catch (err) {
        requestsError.value = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching outgoing requests:', err);
    } finally {
        requestsLoading.value = false;
    }
};

onMounted(() => {
    fetchActivityLogs();
    fetchOutgoingRequests();
});

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('lt-LT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Vilnius'
    });
};

const getPayload = (payload: any) => {
    if (typeof payload === 'string') {
        try {
            return JSON.parse(payload);
        } catch {
            return { message: payload };
        }
    }
    return payload || {};
};

const getActionSeverity = (action: string) => {
    if (action.includes('ERROR') || action.includes('FAILED')) return 'danger';
    if (action.includes('CREATED') || action.includes('UPDATED')) return 'success';
    if (action.includes('STARTED')) return 'info';
    return 'secondary';
};

const getCodeSeverity = (code: number) => {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 400 && code < 500) return 'warn';
    if (code >= 500) return 'danger';
    return 'info';
};

const getMethodSeverity = (method: string) => {
    switch (method.toUpperCase()) {
        case 'GET': return 'info';
        case 'POST': return 'success';
        case 'PUT': return 'warn';
        case 'DELETE': return 'danger';
        default: return 'secondary';
    }
};
</script>