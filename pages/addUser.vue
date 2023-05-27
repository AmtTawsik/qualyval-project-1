<script setup>
import { onMounted } from 'vue'
import { initDropdowns } from 'flowbite'
import UserList from './userList.vue';
import { useRouter } from 'vue-router'

const { app, Realm } = useMyRealmApp();
const router = useRouter()

onMounted(() => {
	initDropdowns();
})


const logout = () => {
	app.currentUser.logOut();
	navigateTo("/");
};

const email = ref(null);
const password = ref(null);


const register = async (e) => {

	await app.emailPasswordAuth.registerUser({ email: email.value, password: password.value });
	let vat = false;
	if (VATRegistered.value === 'yes') {
		vat = true;
	}
	else {
		vat = false;
	}
	await app.currentUser.callFunction("addUser", {
		name: name.value,
		bankName: bankName.value,
		invoiceName: invoiceName.value,
		bankAccountNumber: bankAccountNumber.value,
		agencyName: agencyName.value,
		commissionPercentage: commissionPercentage.value,
		maxCommissionPerWeek: maxCommissionPerWeek.value,
		VATRegistered: vat,
		email: email.value,
	});
	e.target.reset()
	navigateTo('/userList')
};

const name = ref(null);
const bankName = ref(null);
const invoiceName = ref(null);
const bankAccountNumber = ref(null);
const agencyName = ref(null);
const commissionPercentage = ref(null);
const maxCommissionPerWeek = ref(null);
const VATRegistered = ref(null);

const goBack = () => {
	router.go(-1)
}

</script>

<template>
	<NuxtLayout name="header">
		<section class="md:w-6/12 w-11/12 mx-auto my-5 border-2 p-5 rounded-md">
			<form @submit.prevent="register">
				<div class="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Name</label>
						<input v-model="name" type="text" id="name"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Name" required>
					</div>
					<div>
						<label for="bankName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Name in bank account</label>
						<input v-model="bankName" type="text" id="bankName"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Name in bank account" required>
					</div>
					<div>
						<label for="bankAccountNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Bank account Number</label>
						<input v-model="bankAccountNumber" type="text" id="bankAccountNumber"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Name in bank account" required>
					</div>
					<div>
						<label for="invoiceName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
							in
							invoice</label>
						<input v-model="invoiceName" type="text" id="invoiceName"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Name in invoice" required>
					</div>
					<div>
						<label for="agencyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agency
							name</label>
						<select v-model="agencyName" id="agencyName"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option value="TFS Healthcare Limited">TFS Healthcare Limited</option>
							<option value="Santuary Personnel Limited">Santuary Personnel Limited</option>
							<option value="Athona Ltd">Athona Ltd</option>
							<option value="Venture Partnership Ltd">Venture Partnership Ltd</option>
							<option value="ID Medical Group Limited">ID Medical Group Limited</option>
							<option value="DRC Locums">DRC Locums</option>
						</select>
					</div>
					<div>
						<label for="commissionPercentage"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commission
							percentage</label>
						<input v-model="commissionPercentage" type="number" min="0" max="100" id="commissionPercentage"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="5" required>
					</div>
					<div>
						<label for="maxCommissionPerWeek"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Commission Per
							Week</label>
						<input v-model="maxCommissionPerWeek" type="number" id="maxCommissionPerWeek"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="40" required>
					</div>
					<div>
						<label for="VATRegistered" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is
							VAT
							registered?</label>
						<ul class="grid w-full gap-6 grid-cols-2" id="VATRegistered">
							<li>
								<input v-model="VATRegistered" type="radio" id="yes" name="vat" value="yes"
									class="hidden peer" required>
								<label for="yes"
									class="inline-flex items-center justify-between w-full p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
									<div class="block">
										<div class="w-full text-lg font-semibold">Yes</div>
									</div>
								</label>
							</li>
							<li>
								<input v-model="VATRegistered" type="radio" id="no" name="vat" value="no"
									class="hidden peer">
								<label for="no"
									class="inline-flex items-center justify-between w-full p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
									<div class="block">
										<div class="w-full text-lg font-semibold">No</div>
									</div>
								</label>
							</li>
						</ul>
					</div>
				</div>
				<div class="mb-6">
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
						address</label>
					<input v-model="email" type="email" id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="email@example.com" required>
				</div>
				<div class="mb-6">
					<label for="password"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<input v-model="password" type="password" id="password"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="•••••••••" required>
				</div>
				<div>
					<button type="button" @click="goBack"
						class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-2">Cancel</button>
					<button type="submit"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
				</div>
			</form>
		</section>
	</NuxtLayout>
</template>