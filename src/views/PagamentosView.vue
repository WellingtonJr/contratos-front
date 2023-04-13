<script setup>
import PagamentoFormComponent from "@/components/PagamentoFormComponent.vue";
import PagamentosTableComponent from "@/components/PagamentosTableComponent.vue";

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
            <pagamento-form-component class="mt-5" @update-membros="atualizarMembro"></pagamento-form-component>
            <!-- <pagamentos-table-component :membro="getMembro()"></pagamentos-table-component> -->
        </v-app>
    </v-main>
</template>


<style></style>