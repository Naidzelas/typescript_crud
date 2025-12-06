<template>
    <div class="p-6">
        <h1 class="mb-6 font-semibold text-gray-800 dark:text-gray-100 text-3xl">Clients</h1>
        <DataTable 
            :value="clients" 
            stripedRows 
            showGridlines 
            :paginator="true" 
            :rows="10"
            tableStyle="min-width: 50rem"
        >
            <Column field="id" header="ID" sortable style="width: 10%"></Column>
            <Column field="name" header="Name" sortable style="width: 25%"></Column>
            <Column field="address" header="Address" sortable style="width: 30%"></Column>
            <Column field="created_at" header="Created At" sortable style="width: 17.5%">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.created_at) }}
                </template>
            </Column>
            <Column field="updated_at" header="Updated At" sortable style="width: 17.5%">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.updated_at) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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