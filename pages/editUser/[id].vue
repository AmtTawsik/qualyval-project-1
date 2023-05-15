<script setup>
import { ObjectId } from 'bson';

const { app } = useMyRealmApp()
const route = useRoute()
const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const collectionUpdate = mongo?.db("invoiceProcessor").collection("users");

const data = ref({})
const id = route.params.id
collectionUpdate?.find({ _id: ObjectId(id) })
    .then((d) => {
        data.value = d[0];
        console.log('datttttttttta', data.value)
        console.log(data.value._id)
    })
    .catch((err) => {
        console.log(err);
    });

let cValue = false;

const updateData = (event) => {
    const name = event.target.name.value;
    const bankName = event.target.bankName.value;
    const bankAccountNumber = event.target.bankAccountNumber.value;
    const invoiceName = event.target.invoiceName.value;
    const agencyName = event.target.agencyName.value;
    const commissionPercentage = (+event.target.commissionPercentage.value);
    const maxCommissionPerWeek = (+event.target.maxCommissionPerWeek.value);
    let VATRegistered = event.target.vat.value
    if (VATRegistered === 'yes') {
        VATRegistered = true
    }
    else {
        VATRegistered = false
    }

    const updatedData = {
        name,
        bankName,
        bankAccountNumber,
        invoiceName,
        agencyName,
        commissionPercentage,
        maxCommissionPerWeek,
        VATRegistered
    }

    console.log(updatedData)

    collectionUpdate.updateOne({ _id: data.value._id }, {
        $set: updatedData
    })
        .then((data) => {
            console.log(data)
            if (data.matchedCount > 0) {
                event.target.reset()
                navigateTo('/userList')
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
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name</label>
                        <input type="text" id="name" name="name" v-model="data.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name" required>
                    </div>
                    <div>
                        <label for="bankName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name in bank account</label>
                        <input type="text" id="bankName" name="bankName" v-model="data.bankName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name in bank account" required>
                    </div>
                    <div>
                        <label for="bankAccountNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Bank account Number</label>
                        <input type="text" id="bankAccountNumber" name="bankAccountNumber" v-model="data.bankAccountNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bank account Number" required>
                    </div>
                    <div>
                        <label for="invoiceName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
                            in
                            invoice</label>
                        <input type="text" id="invoiceName" name="invoiceName" v-model="data.invoiceName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name in invoice" required>
                    </div>
                    <div>
                        <label for="agencyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agency
                            name</label>
                        <select id="agencyName" name="agencyName" v-model="data.agencyName"
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
                        <input type="number" min="0" max="100" id="commissionPercentage" name="commissionPercentage"
                            v-model="data.commissionPercentage"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="5" required>
                    </div>
                    <div>
                        <label for="maxCommissionPerWeek"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Commission Per
                            Week</label>
                        <input type="number" id="maxCommissionPerWeek" name="maxCommissionPerWeek"
                            v-model="data.maxCommissionPerWeek"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="40" required>
                    </div>
                    <div>
                        <label for="VATRegistered" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is
                            VAT
                            registered?</label>
                        <ul class="grid w-full gap-6 grid-cols-2" id="VATRegistered">
                            <li>
                                <input type="radio" id="yes" name="vat" value="yes" class="hidden peer"
                                    :checked="data.VATRegistered === true">
                                <label for="yes"
                                    class="inline-flex items-center justify-between w-full p-1.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div class="block">
                                        <div class="w-full text-lg font-semibold">Yes</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="no" name="vat" value="no" class="hidden peer"
                                    :checked="data.VATRegistered === false">
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
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </section>
    </NuxtLayout>
</template>