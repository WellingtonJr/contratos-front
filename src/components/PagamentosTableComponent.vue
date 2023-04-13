
<script setup>
import { onMounted, reactive, ref, watch, toRef, watchEffect } from 'vue';
import axios from 'axios';

const propsTable = defineProps({
    membro: {
        type: Object,
        default: () => membro,
        required: true
    }
});

let membroProp = reactive(ref(propsTable.membro));
let tableItems = reactive(ref([]));

// const propsTable = defineProps(["cidadesArr"])

watchEffect(() => {
    if (propsTable.membro.id) {
        tableItems.value.push(propsTable.membro)
    }
});

onMounted(() => {
    atualizarCidades()
})

async function atualizarCidades() {
    await axios.get("https://64386bac4660f26eb19c41d3.mockapi.io/payment")
        .then((resp) => {
            console.log(resp.data);
            resp.data.forEach(element => {
                tableItems.value.push({
                    id: element.id,
                    nome: element.name,
                    cargo: getCargo(element.type),
                    status: element.status ? 'Ativo' : 'Inativo',
                });
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function getCargo(cargo) {
    let cargoDictionary = {
        MAYOR: "Prefeito",
        SECRETARY: "Secretário",
        VICE_MAYOR: "Vice-prefeito",
        VICE_SECRETARY: "Vice-secretário",
    }
    return cargoDictionary[cargo] || '';
}

</script>
<template>
    <v-container>
        <v-card border>
            <v-table height="300px">
                <thead>
                    <tr>
                        <th class="text-left">
                            Nome
                        </th>
                        <th class="text-left">
                            Cargo
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
                        <td>{{ item.nome }}</td>
                        <td>{{ item.cargo }}</td>
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