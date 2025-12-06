<template>
    <div class="p-6">
        <h1 class="mb-6 font-semibold text-gray-800 dark:text-gray-100 text-3xl">Clients</h1>
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table class="w-full border-collapse">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b-2 font-semibold text-gray-600 dark:text-gray-300 text-xs text-left uppercase tracking-wider">ID</th>
                        <th class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b-2 font-semibold text-gray-600 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Name</th>
                        <th class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b-2 font-semibold text-gray-600 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Address</th>
                        <th class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b-2 font-semibold text-gray-600 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Created At</th>
                        <th class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b-2 font-semibold text-gray-600 dark:text-gray-300 text-xs text-left uppercase tracking-wider">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="client in clients" 
                        :key="client.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <td class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b text-gray-900 dark:text-gray-100">{{ client.id }}</td>
                        <td class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b text-gray-900 dark:text-gray-100">{{ client.name }}</td>
                        <td class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b text-gray-900 dark:text-gray-100">{{ client.address }}</td>
                        <td class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b text-gray-900 dark:text-gray-100">{{ formatDate(client.created_at) }}</td>
                        <td class="px-4 py-3 border-gray-200 dark:border-gray-600 border-b text-gray-900 dark:text-gray-100">{{ formatDate(client.updated_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Client {
    id: number;
    name: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}

const clients = ref<Client[]>([
    { 
        id: 1, 
        name: 'Acme Corporation', 
        address: '123 Main St, New York, NY',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-12-01')
    },
    { 
        id: 2, 
        name: 'Tech Solutions Ltd', 
        address: '456 Tech Ave, San Francisco, CA',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-11-28')
    },
    { 
        id: 3, 
        name: 'Global Industries', 
        address: '789 Business Blvd, Chicago, IL',
        created_at: new Date('2024-06-10'),
        updated_at: new Date('2024-12-05')
    },
]);

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
</script>