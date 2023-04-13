<script setup>
import CidadeFormComponent from "../components/CidadeFormComponent.vue"
import CidadesTableComponent from "@/components/CidadesTableComponent.vue";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

let cidade = reactive(ref({}));


function atualizarCidades(element) {
    console.log(element);
    cidade.value = {
        id: element.id,
        cidade: element.name,
        estado: element.state,
        status: getStatus(element.status),
    }
}

const getStatus = (status) => {
    let statusDictionary = {
        ACTIVE: 'Ativo',
        INATIVE: 'Inativo',
        BLOCKED: 'Pendente',
    }

    return statusDictionary[status];
}


function getCidade() {
    return cidade.value;
}

</script>
<template>
    <v-main>
        <v-app>
            <cidade-form-component class="mt-5" @update-cidades="atualizarCidades"></cidade-form-component>
            <cidades-table-component :cidade="getCidade()"></cidades-table-component>
        </v-app>
    </v-main>
</template>


<style></style>