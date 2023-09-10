<template>
    <div>
        <!-- Navbar Section -->
        <NavLayout />
        <div class="row">
            <SideNav />
            <slot />
        </div>
        <!-- content -->

    </div>
</template>

<script>
import NavLayout from "./Nav.vue";
import SideNav from './SideNav.vue';
export default {
    name: "MasterLayout",
    components: {
        NavLayout,
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
// eslint-disable-next-line vue/comment-directive
</script>