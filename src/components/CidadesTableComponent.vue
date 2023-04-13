
<script setup>
import { onMounted, reactive, ref, watch, toRef, watchEffect } from 'vue';
import axios from 'axios';

const propsTable = defineProps({
    cidade: {
        type: Object,
        default: () => cidade,
        required: true
    }
});

let cidadeProp = reactive(ref(propsTable.cidade));
let tableItems = reactive(ref([]));

// const propsTable = defineProps(["cidadesArr"])

watchEffect(() => {
    if (propsTable.cidade.id) {
        tableItems.value.push(propsTable.cidade)
    }
});

onMounted(() => {
    atualizarCidades()
})

async function atualizarCidades() {
    await axios.get("https://64374d4c894c9029e8bb7d14.mockapi.io/contratos/contractcities")
        .then((resp) => {
            // console.log(JSON.stringify(resp.data));
            resp.data.forEach(element => {
                tableItems.value.push({
                    id: element.id,
                    cidade: element.name,
                    estado: element.state,
                    status: getStatus(element.status),
                });
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function getTableItems() {
    return propsTable.cidadesArr;
}


const getStatus = (status) => {

    let statusDictionary = {
        ACTIVE: 'Ativo',
        INATIVE: 'Inativo',
        BLOCKED: 'Pendente',
    }

    return statusDictionary[status];
}

</script>
<template>
    <v-container>
        <v-card border>

            <v-table height="300px">
                <thead>
                    <tr>
                        <th class="text-left">
                            Cidade
                        </th>
                        <th class="text-left">
                            Estado
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-center">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tableItems" :key="item.id">
                        <td>{{ item.cidade }}</td>
                        <td>{{ item.estado }}</td>
                        <td>{{ item.status }}</td>
                        <td class="text-center">
                            <v-btn color="blue-accent-3" size="small">
                                Editar
                            </v-btn>
                            <v-btn class="ml-2" color="red-darken-1" size="small">
                                Deletar
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>
</template>

<style></style>