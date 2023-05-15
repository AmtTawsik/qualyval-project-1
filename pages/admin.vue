<script setup>
import { onMounted } from 'vue'
import { initDropdowns } from 'flowbite'

onMounted(() => {
	initDropdowns();
})

const { app } = useMyRealmApp()

</script>

<template>
	<NuxtLayout name="header">
		<section class="w-11/12 mx-auto mt-5">
			<div class="flex justify-center">
				<NuxtLink to="/addUser"
					class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
					Add
					User</NuxtLink>
			</div>
			<div>
				<h3 class="text-center text-xl font-bold my-5">List of Users:</h3>
				<section class="flex flex-col items-center">
					<div class="w-[300px] px-5 py-2 border shadow-md rounded-md mb-3">
						<h5>Yousuf Ahmed</h5>
						<p>yousuf.qualyval@gmail.com</p>
					</div>
					<div class="w-[300px] px-5 py-2 border shadow-md rounded-md mb-3">
						<h5>Abdullah</h5>
						<p>abdullah.qualyval@gmail.com</p>
					</div>
					<div class="w-[300px] px-5 py-2 border shadow-md rounded-md mb-3">
						<h5>Mubin</h5>
						<p>mubin.qualyval@gmail.com</p>
					</div>
					<div class="w-[300px] px-5 py-2 border shadow-md rounded-md mb-3">
						<h5>Rahul</h5>
						<p>rahul.qualyval@gmail.com</p>
					</div>
					<div class="w-[300px] px-5 py-2 border shadow-md rounded-md mb-3">
						<h5>Fahim</h5>
						<p>fahim.qualyval@gmail.com</p>
					</div>
				</section>
			</div>
		</section>
	</NuxtLayout>
</template>