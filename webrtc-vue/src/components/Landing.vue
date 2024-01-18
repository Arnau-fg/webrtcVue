<template>
    <div>
        <h1>Landing</h1>
        <h2>Write your name</h2>
        <input type="text" v-model="name" />
        <button @click="goToChat()">submit</button>
    </div>
</template>

<script>
import { useAppStore } from "../store/app.js";
import store from "@/store";
import { socket } from "../socket.js"

    export default {
        name: 'Landing',
        components: {
        },
        setup() {
            return {
                name: ''
            }
        },
        methods: {
            goToChat() {
                const store = useAppStore();
                store.setName(this.name);
                socket.emit('hola', this.name)
                this.$router.push("/chat")
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>