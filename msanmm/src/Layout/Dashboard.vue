<template>
    <div>
        <v-card>
            <SideNav style="height: 700px;"></SideNav>


            <main style=" height: 100%: overflow:auto;">
                <v-toolbar class="toolbar">
                    <v-toolbar-title>
                        <img src="../../public/asm_logo.png" alt="logo set" srcset="" width="80">
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn class="ma-2" variant="text" icon="mdi-exit-to-app" @click="logout">
                    </v-btn>
                </v-toolbar>
                <slot />
            </main>
        </v-card>

    </div>
</template>

<script>
import SideNav from './SideNav.vue';
export default {
    name: "DashboardLayout",
    components: {
        SideNav
    },
    data() {
        return {
            userHasPermisssions: ''
        };
    },
    computed: {
        getUserPermissions() {
            return this.$store.getters.userPermissions;
        }
    },
    created() {

    }


}
</script>