<script setup>
const { app, Realm } = useMyRealmApp();
const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const agencyCollection = mongo?.db("invoiceProcessor").collection("agencies");
import { useRouter } from 'vue-router'

const router = useRouter()

const agencyName = ref(null);
const address = ref(null);
const companyNumber = ref(null);
const vatNumber = ref(null);

const addAgency = (e) => {
    const newAgency = {
        agencyName: agencyName.value,
        address: address.value,
        companyNumber: companyNumber.value,
        vatNumber: vatNumber.value,
    }
    console.log('newAgency:', newAgency)
    agencyCollection.insertOne(newAgency)
        .then(data => {
            console.log(data)
            e.target.reset()
            navigateTo('/agencies')
        })


};

const goBack = () => {
    router.go(-1)
}

</script>

<template>
    <NuxtLayout name="header">
        <section class="md:w-6/12 w-11/12 mx-auto my-5 md:my-32 border-2 p-5 rounded-md ">
            <form @submit.prevent="addAgency">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="agencyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Agency Name</label>
                        <input v-model="agencyName" type="text" id="agencyName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Agency Name" required>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Address</label>
                        <input v-model="address" type="text" id="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Address" required>
                    </div>
                    <div>
                        <label for="companyNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Company Number</label>
                        <input v-model="companyNumber" type="number" id="companyNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Company Number" required>
                    </div>
                    <div>
                        <label for="vatNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            VAT Number</label>
                        <input v-model="vatNumber" type="number" id="vatNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="VAT Number" required>
                    </div>


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