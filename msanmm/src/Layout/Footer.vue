<template>
    <footer class="d-flex flex-column">
        <div class="bg-grey d-flex w-100 align-center px-4">
            <span class="footer-text">Get connected with MsanMM on social networks!</span>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" color="#0e0e0e"
                size="small"></v-btn>
        </div>

        <div class="px-4 py-2 footer-bottom text-center w-100">
            {{ new Date().getFullYear() }} — &copy; <strong>MSANMM</strong> <span class="text-caption">Developed by Quantum
                Tech</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterLayout",
    data() {
        return {
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }

    },
}
</script>

<style scoped>
.footer-text {
    color: #0e0e0e;
}

.footer-bottom {
    background-color: #323232;
    color: #ffd312c4;
}
</style>