<template>
    <div>

        <v-card v-if="permission === 'EDITOR' || permission === 'AUTHOR' || permission === 'PUBLISHER'">
            <v-layout>
                <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

                <v-app-bar class="toolbar">
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                    <v-toolbar-title>Msanmm Dashboard</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn variant="text" icon="mdi-magnify"></v-btn>

                    <v-btn variant="text" icon="mdi-filter"></v-btn>

                    <v-btn variant="text" icon="mdi-exit-to-app" @click="logout"></v-btn>
                </v-app-bar>

                <v-navigation-drawer v-model="drawer" location="left" temporary>
                    <v-list>
                        <v-list-item title="Home" prepend-icon="mdi-home"
                            @click="this.$router.push({ path: '/' })"></v-list-item>
                        <v-list-item title="Create Posts" prepend-icon="mdi-pencil-outline"
                            @click="this.$router.push({ path: '/post/new' })"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="height: 100%; overflow: scroll;">
                    <slot />
                </v-main>

            </v-layout>
            <FooterLayout />
        </v-card>
        <div v-else>
            <NavLayout />

            <main>
                <slot />
            </main>
            <FooterLayout />
        </div>

        <!-- Navbar Section -->


        <!-- content -->

    </div>
</template>

<script>
import NavLayout from "./Nav.vue";
import FooterLayout from "./Footer.vue";

export default {
    name: "MasterLayout",
    data() {
        return {
            permission: '',
            Authenticated: false,
            drawer: false,
            group: null,
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')

        },
    },

    components: {
        NavLayout,
        FooterLayout
    },
    computed: {
        getUserPermissions() {
            console.log("User Permission in master: ", this.$store.getters.userPermissions)
            return this.$store.getters.userPermissions;
        },
        getAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
    },
    created() {
        this.permission = this.getUserPermissions;
        this.Authenticated = this.getAuthenticated;
    },
    watch: {
        group() {
            this.drawer = false;
        }
    }
};
// eslint-disable-next-line vue/comment-directive
</script>

<style scoped>
.toolbar {
    background-image: linear-gradient(to right, rgb(25, 25, 25), rgb(101, 101, 101), rgb(59, 59, 59)) !important;
    background-blend-mode: luminosity;
    color: #faad1f !important;
}
</style>