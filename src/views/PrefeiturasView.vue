<script setup>
import PrefeituraFormComponent from '@/components/PrefeituraFormComponent.vue';
import PrefeiturasTableComponent from '@/components/PrefeiturasTableComponent.vue';
import { reactive, ref } from "vue";

let membro = reactive(ref({}));


function atualizarMembro(element) {
    console.log(element);
    membro.value = {
        id: element.id,
        nome: element.name,
        cargo: getCargo(element.type),
        status: element.status ? 'Ativo' : 'Inativo',
    }
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

function getMembro() {
    return membro.value;
}

</script>
<template>
    <v-main>
        <v-app>
            <v-container class="mt-5">
                <prefeitura-form-component class="mt-5" @update-membros="atualizarMembro"></prefeitura-form-component>
                <prefeituras-table-component :membro="getMembro()"></prefeituras-table-component>
            </v-container>
        </v-app>
    </v-main>
</template>


<style></style>