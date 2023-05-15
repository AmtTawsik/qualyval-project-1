<script setup>
import { onMounted } from 'vue'
import { initDropdowns } from 'flowbite'

onMounted(() => {
    initDropdowns();
})

const { app } = useMyRealmApp()
const cUser = ref({})

const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const collection = mongo?.db("invoiceProcessor").collection("users");
collection?.find({ userId: app.currentUser.id })
    .then((d) => {
        cUser.value = d[0];
        console.log(cUser.value)
    })
    .catch((err) => {
        console.log(err);
    });


const logout = () => {
    app.currentUser.logOut();
    navigateTo("/");
};
</script>

<template>
    <nav class="bg-white border-gray-200 shadow-lg">
        <div class=" flex flex-wrap items-center justify-between py-4 w-11/12 mx-auto">
            <a href="#" class="flex items-center">
                <p class="text-xl font-bold">App Name</p>
            </a>
            <div class="flex items-center md:order-2 pr-2">
                <button type="button"
                    class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyD1W_NmuA1ve2hZYtC1hgxi1-J6TWHPKfHA&usqp=CAU"
                        crossorigin="anonymous" alt="user photo">
                </button>
                <!-- Dropdown menu -->
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                    id="user-dropdown">
                    <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 ">{{ cUser.name }}</span>
                        <span class="block text-sm  text-gray-500 truncate">{{ cUser.email }}</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                        </li>
                        <li>
                            <p href="#" @click="logout"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Sign
                                out</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <NuxtLink :to="app.currentUser?.profile?.email === 'admin@gmail.com' ? '/admin' : '/users'"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            aria-current="page">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/userList"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">
                            User List</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/agencies"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">
                            Agencies</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <slot></slot>
</template>


<style scoped>
a.router-link-active {
  font-weight: bold;
  color: #00c58e;
}
</style>