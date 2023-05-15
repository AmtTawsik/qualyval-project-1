<script setup>
import { ObjectId } from 'bson';

const { app } = useMyRealmApp()
const route = useRoute()
const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const collectionUpdate = mongo?.db("invoiceProcessor").collection("agencies");

const data = ref({})
const id = route.params.id
collectionUpdate?.find({ _id: ObjectId(id) })
    .then((d) => {
        data.value = d[0];
        console.log('Agency Data', data.value)
    })
    .catch((err) => {
        console.log(err);
    });


const updateData = (event) => {
    const agencyName = event.target.agencyName.value;
    const address = event.target.address.value;
    const companyNumber = event.target.companyNumber.value;
    const vatNumber = event.target.vatNumber.value;

    const updatedData = {
        agencyName,
        address,
        companyNumber,
        vatNumber,
    }

    console.log(updatedData)

    collectionUpdate.updateOne({ _id: data.value._id }, {
        $set: updatedData
    })
        .then((data) => {
            console.log(data)
            if (data.matchedCount > 0) {
                event.target.reset()
                navigateTo('/agencies')
            }
        })
        .catch((err) => {
            console.log(err);
        });
}


</script>

<template>
    <NuxtLayout name="header">
        <section class="md:w-6/12 w-11/12 mx-auto my-5 border-2 p-5 rounded-md">
            <form @submit.prevent="updateData">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="agencyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Agency Name</label>
                        <input type="text" id="agencyName" name="agencyName" v-model="data.agencyName" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Agency Name" required>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Agency Address</label>
                        <input type="text" id="address" name="address" v-model="data.address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Agency Address" required>
                    </div>
                    <div>
                        <label for="companyNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Company Number</label>
                        <input type="text" id="companyNumber" name="companyNumber" v-model="data.companyNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Company Number" required>
                    </div>
                    <div>
                        <label for="vatNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Vat Number</label>
                        <input type="text" id="vatNumber" name="vatNumber" v-model="data.vatNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Vat Number" required>
                    </div>
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </section>
    </NuxtLayout>
</template>