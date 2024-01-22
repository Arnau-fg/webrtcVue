<template>
    <div>
        <h3>Noms: </h3>
        <div v-for="usuari in usuaris"> {{ usuari }}</div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useAppStore } from "../store/app.js";


export default {

    components: {
    },
    data() {
        const store = useAppStore();
        return {
            usuaris: computed(() => store.getUsers())
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped></style>