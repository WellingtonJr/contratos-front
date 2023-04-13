<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import axios from 'axios'

const emit = defineEmits(['updateMembros'])

// onMounted(() => {

// let membro = {
//     name: "Teste",
//     cpf: "05738312362",
//     phone: "phone 1",
//     email: "email 1",
//     type: "type 1",
//     status: false,
//     contractCity: 74,
//     start: 1681346285,
//     end: 1681346285,
//     id: Math.floor(Math.random() * 500) + 1
// };

//     console.log(membro);

//     // axios.post("https://64374d4c894c9029e8bb7d14.mockapi.io/contratos/prefeitura_membro", membro)
//     //     .then((resp) => {
//     //         console.log(resp);
//     //     })
//     //     .catch((err) => {
//     //         console.log(err);
//     //     })
// })

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        dueDate(value) {
            if (value) return true

            return 'Informe a data de ínicio.'
        },
        payDay(value) {
            if (value) return true

            return 'Informe a data de ínicio.'
        },
        paymentMethod(value) {
            if (value) return true

            return 'Selecione um cargo.'
        },
        city(value) {
            if (value) return true

            return 'Informe um CPF.'
        },
        discount(value) {
            if (value) return true

            return 'Informe um CPF.'
        },
        lateFee(value) {
            if (value) return true

            return 'Informe um CPF.'
        },
        value(value) {
            if (value) return true

            return 'Informe um CPF.'
        },
        status(value) {
            if (value) return true

            return 'Selecione um status.'
        }
    },
})



const dueDate = useField('dueDate')
const payDay = useField('payDay')
const paymentMethod = useField('paymentMethod')
const city = useField('city')
const discount = useField('discount')
const lateFee = useField('lateFee')
const value = useField('value')
const status = useField('status')



const paymentMethodItems = ref([
    'CRÉDITO',
    'DÉBITO',
    'ESPÉCIE',
    'PIX',
    'CHEQUE',
])

const cityItems = ref([
    'São Luís',
    'Imperatriz',
    'Codó',
    'Guimarães',
    'Cidade 1',
    'Cidade 2',
])

function getCidadeId(cidade) {
    let cidadeId;

    cityItems.value.forEach((element, index) => {
        if (cidade === element) {
            console.log(element, index);
            cidadeId = index;
        }
    });

    return cidadeId;
}


const statusItems = ref([
    'Ativo',
    'Inativo',
])



function getPaymentMethod(paymentMethod) {
    let paymentMethodDct = {
        'CRÉDITO': 'CREDIT_CARD',
        'DÉBITO': 'DEBIT',
        'ESPÉCIE': 'CASH',
        'PIX': 'PIX',
        'CHEQUE': 'CHECK'
    }

    return paymentMethodDct[paymentMethod] || '';
}



// const submit = handleSubmit(async () => {
const submit = handleSubmit(values => {
    console.log(values);

    const pagamento = {
        dueDate: values.dueDate,
        payDay: values.payDay,
        paymentMethod: getPaymentMethod(values.paymentMethod),
        city: getCidadeId(values.city),
        discount: values.discount,
        lateFee: values.lateFee,
        value: values.value,
        status: values.status == 'Ativo' ? true : false,
    };

    console.log(pagamento);

    // await axios.post("https://64386bac4660f26eb19c41d3.mockapi.io/payment", pagamento)
    //     .then((resp) => {
    //         emit('updateMembros', resp.data);
    //         console.log(resp);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

})

</script>
<template>
    <v-container>
        <v-card title="Prefeituras Contrato" subtitle="Formulário de Cadastro de Prefeitura">
            <hr>
            <v-container>
                <form @submit.prevent="submit">
                    <v-row align="center">
                        <v-col md="6">
                            <v-text-field v-model="dueDate.value.value" :counter="10" v-mask="'##/##/####'"
                                :error-messages="dueDate.errorMessage.value" label="Data Dívida"></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-text-field v-model="payDay.value.value" :counter="10" v-mask="'##/##/####'"
                                :error-messages="payDay.errorMessage.value" label="Data Pagamento"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mt-0">

                        <v-col md="6">
                            <v-select v-model="paymentMethod.value.value" :items="paymentMethodItems"
                                :error-messages="paymentMethod.errorMessage.value" label="Método de Pagamento">
                            </v-select>
                        </v-col>

                        <v-col md="6">
                            <v-select v-model="city.value.value" :items="cityItems"
                                :error-messages="city.errorMessage.value" label="Cidade">
                            </v-select>
                        </v-col>

                    </v-row>

                    <v-row align="center" class="mt-0">
                        <v-col md="6">

                            <v-text-field v-model="discount.value.value" :error-messages="discount.errorMessage.value"
                                label="Desconto"></v-text-field>
                        </v-col>

                        <v-col md="6">

                            <v-text-field v-model="lateFee.value.value" :error-messages="lateFee.errorMessage.value"
                                label="Taxa de Atraso"></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row align="center" class="mt-0">


                        <v-col md="6">
                            <v-text-field v-model="value.value.value" :error-messages="value.errorMessage.value"
                                label="Valor"></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-select v-model="status.value.value" :items="statusItems"
                                :error-messages="status.errorMessage.value" label="Status">
                            </v-select>
                        </v-col>

                    </v-row>

                    <v-row align="center">

                        <v-col md="2">
                            <v-btn type="submit">
                                Cadastrar
                            </v-btn>
                        </v-col>

                        <v-col md="2">
                            <v-btn @click="handleReset">
                                Limpar
                            </v-btn>
                        </v-col>



                    </v-row>



                </form>
            </v-container>

        </v-card>
    </v-container>
</template>


<style scoped></style>