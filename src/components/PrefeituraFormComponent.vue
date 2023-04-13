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
        name(value) {
            if (value?.length >= 3) return true

            return 'Nome precisa ter pelo menos 3 caracteres.'
        },
        phone(value) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true

            return 'Telefone deve ter pelo menos 9 dígitos.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true


            return 'Informe um email válido.'
        },
        cargo(value) {
            if (value) return true

            return 'Selecione um cargo.'
        },
        cpf(value) {
            if (value) return true

            return 'Informe um CPF.'
        },
        dataInicio(value) {
            if (value) return true

            return 'Informe a data de ínicio.'
        },
        status(value) {
            if (value) return true

            return 'Selecione um status.'
        }
    },
})
const name = useField('name')
const cpf = useField('cpf')
const phone = useField('phone')
const email = useField('email')
const cargo = useField('cargo')
const status = useField('status')
const dataInicio = useField('dataInicio')



const statusItems = ref([
    'Ativo',
    'Inativo',
])

function getStatus(status) {
    let statusDictionary = {
        Ativo: true,
        Inativo: false,
    }
    return statusDictionary[status] || '';
}

const cargoItems = ref([
    'Prefeito',
    'Secretário',
    'Vice-prefeito',
    'Vice-secretário'
])

function getCargo(cargo) {
    let cargoDictionary = {
        'Prefeito': 'MAYOR',
        'Secretário': 'SECRETARY',
        'Vice-prefeito': 'VICE_MAYOR',
        'Vice-secretário': 'VICE_SECRETARY'
    }

    return cargoDictionary[cargo] || '';
}



const submit = handleSubmit(async () => {

    const membro = {
        name: name.value._value,
        cpf: cpf.value._value,
        phone: phone.value._value,
        email: email.value._value,
        type: getCargo(cargo.value._value),
        status: getStatus(status.value._value),
        // contractCity: 74,
        start: dataInicio.value._value,
        // end: 1681346285,
        // id: Math.floor(Math.random() * 500) + 1
    }


    await axios.post("https://64374d4c894c9029e8bb7d14.mockapi.io/contratos/prefeitura_membro", membro)
        .then((resp) => {
            emit('updateMembros', resp.data);
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })

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
                            <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                                label="Nome Completo"></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field v-model="cpf.value.value" :counter="11" :error-messages="cpf.errorMessage.value"
                                label="CPF" v-mask="'###.###.###-##'"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mt-0">

                        <v-col md="6">
                            <v-text-field v-model="phone.value.value" :counter="9" v-mask="'(##)#####-####'"
                                :error-messages="phone.errorMessage.value" label="Telefone"></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-text-field v-model="email.value.value" :counter="30"
                                :error-messages="email.errorMessage.value" label="Email"></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row align="center" class="mt-0">

                        <v-col md="6">
                            <v-select v-model="cargo.value.value" :items="cargoItems"
                                :error-messages="cargo.errorMessage.value" label="Cargo">
                            </v-select>
                        </v-col>

                        <v-col md="6">
                            <v-text-field v-model="dataInicio.value.value" :counter="10" v-mask="'##/##/####'"
                                :error-messages="dataInicio.errorMessage.value" label="Data Início"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mt-0">
                        <v-col md="6">
                            <v-select v-model="status.value.value" :items="statusItems"
                                :error-messages="status.errorMessage.value" label="Status">
                            </v-select>
                            <!-- <v-checkbox v-model="status.value.value" :error-messages="status.errorMessage.value" value="1"
                                                                                                        label="Ativo" type="checkbox"></v-checkbox> -->
                        </v-col>


                        <!-- <v-col md="6">
                                                                                                                                        <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                                                                                                                                            label="Data Fim"></v-text-field>
                                                                                                                                    </v-col> -->
                    </v-row>


                    <!-- <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                                                                                                                                    label="E-mail"></v-text-field> -->
                    <!-- 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <v-select v-model="select.value.value" :items="items" :error-messages="select.errorMessage.value"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    label="Select"></v-select> -->



                    <v-btn class="me-4" type="submit">
                        Cadastrar
                    </v-btn>

                    <v-btn @click="handleReset">
                        Limpar
                    </v-btn>
                </form>
            </v-container>

        </v-card>
    </v-container>
</template>


<style scoped></style>