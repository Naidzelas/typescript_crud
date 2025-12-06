<template>
    <div class="clients-page">
        <h1>Clients Page</h1>
        <p>This is the clients microfrontend loaded via module federation.</p>
        <div class="client-list">
            <h2>Client List</h2>
            <ul>
                <li v-for="client in clients" :key="client.id">
                    {{ client.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clients = ref([
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' },
]);
</script>

<style scoped>
.clients-page {
    padding: 20px;
}

h1 {
    color: #2c3e50;
    margin-bottom: 20px;
}

.client-list {
    margin-top: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    margin: 5px 0;
    background-color: #f4f4f4;
    border-radius: 4px;
}
</style>