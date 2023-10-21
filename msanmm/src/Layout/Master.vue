<template>
    <div>

        <v-card v-if="permission === 'EDITOR' || permission === 'AUTHOR' || permission === 'PUBLISHER'">
            <v-layout>
                <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

                <v-app-bar class="toolbar">
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                    <v-toolbar-title>Msanmm</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn variant="text" icon="mdi-magnify"></v-btn>

                    <v-btn variant="text" icon="mdi-filter"></v-btn>

                    <v-btn variant="text" icon="mdi-exit-to-app" @click="logout"></v-btn>
                </v-app-bar>

                <v-navigation-drawer v-model="drawer" location="left" temporary>
                    <v-list>
                        <v-list-item title="Home" prepend-icon="mdi-home"
                            @click="this.$router.push({ path: '/' })"></v-list-item>
                        <v-list-item title="Profile" prepend-icon="mdi-pencil-outline"
                            @click="this.$router.push({ name: 'ProfilePage', params: { id: this.user.id || 0 } })"></v-list-item>
                        <v-list-item title="Create Posts" prepend-icon="mdi-pencil-outline"
                            @click="this.$router.push({ path: '/post/new' })"></v-list-item>
                        <v-list-item title="ညမဖတ်ရစာပေများ" prepend-icon="mdi-pencil-outline"
                            @click="this.$router.push({ path: '/horror/create' })"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main class="main-section" style="height: 100%; overflow: scroll;">
                    <slot />
                </v-main>

            </v-layout>
            <FooterLayout />
        </v-card>
        <div v-else>
            <NavLayout />

            <main class="main-section">
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
            user: {}
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')

        },
    },

    components: {
        NavLayout,
        FooterLayout,
    },
    computed: {
        getUserPermissions() {
            console.log("User Permission in master: ", this.$store.getters.userPermissions)
            return this.$store.getters.userPermissions;
        },
        getAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
        getCurrentUser() {
            return this.$store.getters.userData;
        },
    },
    created() {
        this.permission = this.getUserPermissions;
        this.Authenticated = this.getAuthenticated;
        this.user = this.getCurrentUser;
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
.main-section {
    background-color: hsl(219, 49%, 37%);
    background-image: radial-gradient(650px circle at 10% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);

}

.toolbar {
    background-image: linear-gradient(to right, rgb(25, 25, 25), rgb(101, 101, 101), rgb(59, 59, 59)) !important;
    background-blend-mode: luminosity;
    color: #faad1f !important;
}
</style>