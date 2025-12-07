<template>
    <div class="p-6">
        <h1 class="mb-6 font-semibold text-gray-800 dark:text-gray-100 text-3xl">Clients</h1>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="border-4 border-gray-200 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-red-800 dark:text-red-200">{{ error }}</p>
            <button 
                @click="fetchClients" 
                class="bg-red-600 hover:bg-red-700 mt-2 px-4 py-2 rounded text-white"
            >
                Retry
            </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="clients.length === 0" class="bg-gray-50 dark:bg-gray-800 px-4 py-12 rounded-lg text-center">
            <p class="text-gray-600 dark:text-gray-400">No clients found</p>
        </div>

        <!-- Data Table -->
        <div v-else class="shadow-md rounded-lg overflow-x-auto">
            <table class="divide-y divide-gray-200 dark:divide-gray-700 min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th 
                            @click="sortBy('id')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            ID
                            <span v-if="sortField === 'id'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                        <th 
                            @click="sortBy('name')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            Name
                            <span v-if="sortField === 'name'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                        <th 
                            @click="sortBy('address')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            Address
                            <span v-if="sortField === 'address'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                        <th 
                            @click="sortBy('postcode')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            Postcode
                            <span v-if="sortField === 'postcode'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                        <th 
                            @click="sortBy('created_at')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            Created At
                            <span v-if="sortField === 'created_at'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                        <th 
                            @click="sortBy('updated_at')" 
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 font-medium text-gray-500 dark:text-gray-300 text-xs text-left uppercase tracking-wider cursor-pointer"
                        >
                            Updated At
                            <span v-if="sortField === 'updated_at'">{{ sortOrder === 1 ? '↑' : '↓' }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr 
                        v-for="(client, index) in paginatedClients" 
                        :key="client.id"
                        :class="index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'"
                        class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                            {{ client.id }}
                        </td>
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                            {{ client.name }}
                        </td>
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm">
                            {{ client.address }}
                        </td>
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                            {{ client.postcode || '-' }}
                        </td>
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                            {{ formatDate(client.created_at) }}
                        </td>
                        <td class="px-6 py-4 text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                            {{ formatDate(client.updated_at) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
            <div class="text-gray-700 dark:text-gray-300 text-sm">
                Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, sortedClients.length) }} of {{ sortedClients.length }} results
            </div>
            <div class="flex gap-2">
                <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-200 text-sm disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                        'px-4 py-2 text-sm font-medium rounded-md',
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    ]"
                >
                    {{ page }}
                </button>
                <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-200 text-sm disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Client {
    id: number;
    name: string;
    address: string;
    postcode: string;
    created_at: Date;
    updated_at: Date;
}

const clients = ref<Client[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const currentPage = ref(1);
const rowsPerPage = 10;
const sortField = ref<keyof Client | null>(null);
const sortOrder = ref<1 | -1>(1);

const fetchClients = async () => {
    try {
        loading.value = true;
        error.value = null;
        const response = await fetch('http://localhost:3000/api/client/get_all');
        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        clients.value = data;
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching clients:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchClients();
});

const sortBy = (field: keyof Client) => {
    if (sortField.value === field) {
        sortOrder.value = sortOrder.value === 1 ? -1 : 1;
    } else {
        sortField.value = field;
        sortOrder.value = 1;
    }
};

const sortedClients = computed(() => {
    if (!sortField.value) return clients.value;

    return [...clients.value].sort((a, b) => {
        const field = sortField.value!;
        const aVal = a[field];
        const bVal = b[field];

        if (aVal < bVal) return -1 * sortOrder.value;
        if (aVal > bVal) return 1 * sortOrder.value;
        return 0;
    });
});

const totalPages = computed(() => Math.ceil(sortedClients.value.length / rowsPerPage));

const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage);
const endIndex = computed(() => startIndex.value + rowsPerPage);

const paginatedClients = computed(() => {
    return sortedClients.value.slice(startIndex.value, endIndex.value);
});

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
</script>