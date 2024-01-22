<template>
    <div>
        <h1>Chat</h1>
        <h2>Write your message</h2>
        <input type="text" v-model="message" />
        <button @click="sendMessage()">submit</button>

        <div v-for="message in messages">{{ message.user }}: {{ message.data }}</div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useAppStore } from "../store/app.js";
import { dataPeer } from "../comunicationManager.js";

    export default {
        name: 'Chat',
        components: {
        },
        data() {
            const store = useAppStore();
            return {
                message: '',
                messages: computed(() => store.getMessages())
            }
        },
        methods: {
            sendMessage() {
                const store = useAppStore();
                let message = {
                    user: store.getName(),
                    data: this.message
                }
                store.newMessage(message);
                dataPeer(message);
                this.message = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>