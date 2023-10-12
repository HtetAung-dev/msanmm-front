<template>
    <footer class="d-flex flex-column">
        <div class="bg-grey d-flex w-100 align-center px-4">
            <strong>Get connected with MsanMM on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
        </div>

        <div class="px-4 py-2 bg-black text-center w-100">
            {{ new Date().getFullYear() }} — &copy; <strong>msanmm</strong> <span class="text-caption">Developed by Quantum
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