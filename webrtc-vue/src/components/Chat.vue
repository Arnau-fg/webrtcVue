<template>
    <div>
        <h3>Noms: </h3>
        <div v-for="usuari in usuaris"> {{ usuari }}</div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useAppStore } from "../store/app.js";
import store from "@/store";



export default {

    components: {
    },
    data() {
        const pinia = useAppStore();
        return {
            usuaris: computed(() => pinia.getUsers())
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped></style>