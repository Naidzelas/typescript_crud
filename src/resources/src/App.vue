<template>
    <div class="lg:static relative flex bg-surface-50 dark:bg-surface-950 min-h-screen resize-container-2">
        <div id="app-sidebar-colored" class="hidden lg:block top-0 left-0 z-10 lg:static absolute bg-primary w-[280px] h-screen select-none shrink-0">
            <div class="flex flex-col h-full">
                <div class="flex items-center gap-4 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none" class="w-10 h-10">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.5 42.0498C33.098 42.0498 42.5 32.6477 42.5 21.0498C42.5 9.45183 33.098 0.0498047 21.5 0.0498047C9.902 0.0498047 0.5 9.45183 0.5 21.0498C0.5 32.6477 9.902 42.0498 21.5 42.0498ZM28.0513 9.83248C28.3702 8.69975 27.2709 8.02994 26.267 8.74516L12.2528 18.7288C11.164 19.5045 11.3353 21.0498 12.51 21.0498H16.2003V21.0212H23.3926L17.5323 23.089L14.9487 32.2671C14.6299 33.3999 15.729 34.0697 16.733 33.3544L30.7472 23.3708C31.836 22.5951 31.6646 21.0498 30.49 21.0498H24.8937L28.0513 9.83248Z"
                            class="fill-primary-contrast"
                        />
                    </svg>
                    <span class="font-semibold text-primary-contrast text-lg leading-tight">ZenTrail</span>
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
                                    leaveActiveClass: 'animate-slideup'
                                }"
                                class="flex items-center gap-4 hover:bg-primary-emphasis p-3 rounded-lg text-surface-0 transition-colors duration-150 cursor-pointer"
                            >
                                <span class="font-semibold text-primary-contrast text-base leading-tight">Home</span>
                                <i class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-down" />
                            </div>
                            <ul class="flex flex-col gap-1 m-0 overflow-hidden list-none">
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-home" />
                                        <span class="font-medium text-base leading-tight">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-bookmark" />
                                        <span class="font-medium text-base leading-tight">Bookmarks</span>
                                        <Badge value="3" severity="contrast" class="bg-primary-contrast ml-auto rounded-xl! min-w-5! h-5! font-bold! text-primary text-xs! leading-tight!" />
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-users" />
                                        <span class="font-medium text-base leading-tight">Team</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-inbox" />
                                        <span class="font-medium text-base leading-tight">Messages</span>
                                        <Badge value="1" severity="contrast" class="bg-primary-contrast ml-auto rounded-xl! min-w-5! h-5! font-bold! text-primary text-xs! leading-tight!" />
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-calendar" />
                                        <span class="font-medium text-base leading-tight">Calendar</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <hr class="my-0 border-primary-400 dark:border-primary-300 border-t" />
                    <ul class="flex flex-col gap-1 m-0 list-none">
                        <li>
                            <div
                                v-styleclass="{
                                    selector: '@next',
                                    enterFromClass: 'hidden',
                                    enterActiveClass: 'animate-slidedown',
                                    leaveToClass: 'hidden',
                                    leaveActiveClass: 'animate-slideup'
                                }"
                                class="flex items-center gap-4 hover:bg-primary-emphasis p-3 rounded-lg text-surface-0 transition-colors duration-150 cursor-pointer"
                            >
                                <span class="font-semibold text-primary-contrast text-base leading-tight">Organization</span>
                                <i class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-down" />
                            </div>
                            <ul class="flex flex-col gap-1 m-0 mt-1 pl-0 overflow-hidden list-none">
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-sitemap" />
                                        <span class="font-medium text-base leading-tight">Overview</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        v-styleclass="{
                                            selector: '@next',
                                            enterFromClass: 'hidden',
                                            enterActiveClass: 'animate-slidedown',
                                            leaveToClass: 'hidden',
                                            leaveActiveClass: 'animate-slideup'
                                        }"
                                        class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer"
                                    >
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-shield" />
                                        <span class="font-medium text-base leading-tight">Security</span>
                                        <i class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-down" />
                                    </a>
                                    <ul class="hidden flex flex-col gap-1 m-0 mt-1 py-0 pr-0 pl-8 overflow-y-hidden transition-all duration-400 ease-in-out list-none">
                                        <li>
                                            <a
                                                v-styleclass="{
                                                    selector: '@next',
                                                    enterFromClass: 'hidden',
                                                    enterActiveClass: 'animate-slidedown',
                                                    leaveToClass: 'hidden',
                                                    leaveActiveClass: 'animate-slideup'
                                                }"
                                                class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer"
                                            >
                                                <i class="text-base! text-primary-contrast leading-none! pi pi-lock" />
                                                <span class="font-medium text-base leading-tight">Permissions</span>
                                                <i class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-down" />
                                            </a>
                                            <ul class="hidden flex flex-col gap-1 m-0 mt-1 py-0 pr-0 pl-8 overflow-y-hidden transition-all duration-400 ease-in-out list-none">
                                                <li>
                                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                                        <i class="text-base! text-primary-contrast leading-none! pi pi-users" />
                                                        <span class="font-medium text-base leading-tight">User Access</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                                        <i class="text-base! text-primary-contrast leading-none! pi pi-history" />
                                                        <span class="font-medium text-base leading-tight">Audit Log</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                                <i class="text-base! text-primary-contrast leading-none! pi pi-bell" />
                                                <span class="font-medium text-base leading-tight">Alerts</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-globe" />
                                        <span class="font-medium text-base leading-tight">Domains</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                        <i class="text-base! text-primary-contrast leading-none! pi pi-copy" />
                                        <span class="font-medium text-base leading-tight">Reports</span>
                                        <Badge value="4" severity="contrast" class="bg-primary-contrast ml-auto rounded-xl! min-w-5! h-5! font-bold! text-primary text-xs! leading-tight!" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="mt-auto py-2 border-primary-400 dark:border-primary-300 border-t">
                    <ul class="hidden m-0 p-2 overflow-hidden animate-duration-150 list-none">
                        <li>
                            <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                <i class="text-base! text-primary-contrast leading-none! pi pi-user" />
                                <span class="font-medium text-base leading-tight">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                <i class="text-base! text-primary-contrast leading-none! pi pi-cog" />
                                <span class="font-medium text-base leading-tight">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center gap-2 hover:bg-primary-emphasis p-3 rounded-lg text-primary-contrast transition-colors duration-150 cursor-pointer">
                                <i class="text-base! text-primary-contrast leading-none! pi pi-sign-out" />
                                <span class="font-medium text-base leading-tight">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                    <a
                        v-styleclass="{
                            selector: '@prev',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup'
                        }"
                        class="flex items-center gap-2 p-2 text-primary-contrast cursor-pointer"
                    >
                        <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="rounded-full w-8 h-8 cursor-pointer" />
                        <span class="font-medium text-base leading-tight">Amy Elsner</span>
                        <i class="ml-auto text-base! text-primary-contrast leading-none! pi pi-angle-up" />
                    </a>
                </div>
            </div>
        </div>
        <div class="relative flex flex-col flex-auto min-h-screen">
            <div class="lg:static relative flex justify-between items-center bg-surface-0 dark:bg-surface-900 px-8 py-4 border-surface-200 dark:border-surface-700 border-b">
                <div class="flex items-center">
                    <a
                        v-styleclass="{
                            selector: '#app-sidebar-colored',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-fadeinleft',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeoutleft',
                            hideOnOutsideClick: true,
                            resizeSelector: '.resize-container-2',
                            hideOnResize: true
                        }"
                        class="lg:hidden block mr-4 text-surface-700 dark:text-surface-100 cursor-pointer"
                    >
                        <i class="text-xl! pi pi-bars" />
                    </a>
                </div>
                <div class="flex items-center gap-8">
                    <i class="text-lg! text-surface-500 dark:text-surface-400 leading-none! cursor-pointer pi pi-bell" />
                    <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="rounded-full w-8 h-8 cursor-pointer" />
                </div>
            </div>
            <div class="flex flex-col flex-auto p-8">
                <div class="flex justify-end mb-4">
                    <UploadButton />
                </div>
                <div class="bg-surface-50 dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 border-dashed rounded-2xl" >
                    <Clients />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Clients from 'client/Clients';
import UploadButton from 'admin/UploadButton';
</script>
