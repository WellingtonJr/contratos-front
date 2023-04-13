<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import axios from 'axios'

const emit = defineEmits(['updateCidades'])


const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 3) return true

            return 'Nome da cidade precisa ter pelo menos 3 caracteres.'
        },
        phone(value) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true

            return 'Telefone deve ter pelo menos 9 dígitos.'
        },
        // email(value) {
        //     if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        //     countErrors++;

        //     return 'Must be a valid e-mail.'
        // },
        estado(value) {
            if (value) return true

            return 'Selecione um estado.'
        },
        status(value) {
            if (value) return true

            return 'Selecione um status.'
        },
        tipoContrato(value) {
            if (value) return true

            return 'Selecione um tipo de contrato.'
        },
        // checkbox(value) {
        //     if (value === '1') return true

        //     countErrors++;
        //     return 'Must be checked.'
        // },
    },
})
const name = useField('name')
const phone = useField('phone')
// const email = useField('email')
const estado = useField('estado')
// const checkbox = useField('checkbox')
const status = useField('status')
const tipoContrato = useField('tipoContrato')



const statusItems = ref([
    'Ativo',
    'Inativo',
    'Pendente',
])

function getStatus(status) {

    let statusDictionary = {
        Ativo: 'ACTIVE',
        Inativo: 'INATIVE',
        Pendente: 'BLOCKED',
    }

    return statusDictionary[status] || '';
}

const tipoContratoItems = ref([
    'Mensal',
    'Trimestral',
    'Semestral',
    'Anual'
])

function getTipContrato(tipoContrato) {
    let tipoContratoDictionary = {
        Mensal: 'MONTHLY',
        Trimestral: 'QUARTERLY',
        Semestral: 'SEMESTER',
        Anual: 'YEARLY'
    }

    return tipoContratoDictionary[tipoContrato] || '';
}

const estados = ref([
    'Maranhão',
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
])

function getUfByStateName(stateName) {
    const ufByState = {
        'Acre': 'AC',
        'Alagoas': 'AL',
        'Amapá': 'AP',
        'Amazonas': 'AM',
        'Bahia': 'BA',
        'Ceará': 'CE',
        'Distrito Federal': 'DF',
        'Espírito Santo': 'ES',
        'Goiás': 'GO',
        'Maranhão': 'MA',
        'Mato Grosso': 'MT',
        'Mato Grosso do Sul': 'MS',
        'Minas Gerais': 'MG',
        'Pará': 'PA',
        'Paraíba': 'PB',
        'Paraná': 'PR',
        'Pernambuco': 'PE',
        'Piauí': 'PI',
        'Rio de Janeiro': 'RJ',
        'Rio Grande do Norte': 'RN',
        'Rio Grande do Sul': 'RS',
        'Rondônia': 'RO',
        'Roraima': 'RR',
        'Santa Catarina': 'SC',
        'São Paulo': 'SP',
        'Sergipe': 'SE',
        'Tocantins': 'TO'
    }

    return ufByState[stateName] || 'Estado não encontrado'
}


// const submit = handleSubmit(values => {
//          console.log(JSON.stringify(values, null, 2))
const submit = handleSubmit(async () => {
    const cidade = {
        name: name.value._value,
        state: getUfByStateName(estado.value._value),
        year: new Date().getFullYear(),
        status: getStatus(status.value._value),
        type: getTipContrato(tipoContrato.value._value),
        phone: phone.value._value
    }

    await axios.post("https://64374d4c894c9029e8bb7d14.mockapi.io/contratos/contractcities", cidade)
        .then((resp) => {
            emit('updateCidades', resp.data);
        })
        .catch((err) => {
            console.log(err);
        })

})


</script>

<template>
    <v-container>
        <v-card title="Cidades Contrato" subtitle="Formulário de Cadastro de Cidade" border>
            <hr>
            <v-container>
                <form @submit.prevent="submit">
                    <v-row align="center">
                        <v-col md="6">
                            <v-select v-model="estado.value.value" :items="estados"
                                :error-messages="estado.errorMessage.value" label="Estado"></v-select>
                        </v-col>

                        <v-col md="6">
                            <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                                label="Cidade"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mt-0">

                        <v-col md="6">
                            <v-text-field v-model="phone.value.value" :counter="7" v-mask="'(##)#####-####'"
                                :error-messages="phone.errorMessage.value" label="Telefone"></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-select v-model="status.value.value" :items="statusItems"
                                :error-messages="status.errorMessage.value" label="Status"></v-select>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mt-0">

                        <v-col md="6">
                            <v-select v-model="tipoContrato.value.value" :items="tipoContratoItems"
                                :error-messages="tipoContrato.errorMessage.value" label="Tipo Contrato"></v-select>
                        </v-col>
                    </v-row>


                    <!-- <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            label="E-mail"></v-text-field> -->
                    <!-- 
                                                                                                                                                                                                                                                                                                                                                                            <v-select v-model="select.value.value" :items="items" :error-messages="select.errorMessage.value"
                                                                                                                                                                                                                                                                                                                                                                                label="Select"></v-select> -->

                    <!-- <v-checkbox v-model="checkbox.value.value" :error-messages="checkbox.errorMessage.value" value="1"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                label="Option" type="checkbox"></v-checkbox> -->

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
