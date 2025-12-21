<template>
  <div
    class="lg:static relative flex bg-surface-50 dark:bg-surface-950 min-h-screen resize-container-2"
  >
    <div
      id="app-sidebar-colored"
      class="hidden lg:block top-0 left-0 z-10 lg:static absolute bg-[#023f87] w-[280px] h-screen select-none shrink-0"
    >
      <div class="flex flex-col h-screen">
        <div class="flex justify-center gap-4 p-4 w-full">
          <img
            src="/logo.png"
            alt="Logo"
            class="rounded-lg w-40 h-20 object-cover"
          />
        </div>
        <div class="flex flex-col flex-1 gap-4 p-2 overflow-y-auto">
          <ul class="flex flex-col gap-1 m-0 list-none">
            <li>
              <div
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="flex items-center gap-4 hover:bg-primary-emphasis p-3 rounded-lg text-surface-0 transition-colors duration-150 cursor-pointer"
              >
                <span
                  class="font-semibold text-primary-contrast text-base leading-tight"
                  >{{ $t("dashboard.home") }}</span
                >
                <i
                  class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-down"
                />
              </div>
              <ul class="flex flex-col gap-1 m-0 overflow-hidden list-none">
                <li>
                  <a
                    @click="currentPage = 'clients'"
                    class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer"
                    :class="{
                      'bg-primary-emphasis': currentPage === 'clients',
                    }"
                  >
                    <i
                      class="text-base! text-primary-contrast leading-none! pi pi-home"
                    />
                    <span class="font-medium text-base leading-tight">{{
                      $t("navigation.clients")
                    }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="currentPage = 'activities'"
                    class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer"
                    :class="{
                      'bg-primary-emphasis': currentPage === 'activities',
                    }"
                  >
                    <i
                      class="text-base! text-primary-contrast leading-none! pi pi-bookmark"
                    />
                    <span class="font-medium text-base leading-tight">{{
                      $t("navigation.activityLogs")
                    }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="currentPage = 'canias'"
                    class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer"
                    :class="{ 'bg-primary-emphasis': currentPage === 'canias' }"
                  >
                    <i
                      class="text-base! text-primary-contrast leading-none! pi pi-bookmark"
                    />
                    <span class="font-medium text-base leading-tight">{{
                      $t("navigation.canias")
                    }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <hr
            class="my-0 border-primary-400 dark:border-primary-300 border-t"
          />
        </div>
      </div>
    </div>
    <div class="relative flex flex-col flex-auto max-h-screen">
      <div
        class="lg:static relative flex justify-between items-center bg-surface-0 dark:bg-surface-900 px-8 py-4 border-surface-200 dark:border-surface-700 border-b"
      ></div>
      <ScrollPanel class="h-[90%]">
        <div class="flex flex-col p-8">
          <!-- Clients Page -->
          <template v-if="currentPage === 'clients'">
            <div class="flex justify-end gap-4 mb-4">
              <UploadButton @upload-complete="handleUploadComplete" />
            </div>
            <UpdatePostcodes @update-complete="handleUpdateComplete" />
            <div class="bg-surface-50 dark:bg-surface-800">
              <Clients ref="clientsRef" />
            </div>
          </template>

          <!-- Activities Page -->
          <template v-else-if="currentPage === 'activities'">
            <Activities />
          </template>
        </div>
      </ScrollPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Clients from "client/Clients";
import UploadButton from "admin/UploadButton";
import UpdatePostcodes from "admin/UpdatePostcodes";
import Activities from "./pages/Activities.vue";
import ScrollPanel from "primevue/scrollpanel";

const currentPage = ref<"clients" | "activities" | "canias">("clients");
const clientsRef = ref<InstanceType<typeof Clients> | null>(null);

const handleUploadComplete = () => {
  clientsRef.value?.refresh();
};

const handleUpdateComplete = () => {
  clientsRef.value?.refresh();
};

function handleRedirect(page: string){
  
}
</script>
