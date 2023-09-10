<template>
    <div>
        <!-- Navbar Section -->
        <NavLayout />
        <slot />
        <!-- content -->

    </div>
</template>

<script>
import NavLayout from "./Nav.vue";
export default {
    name: "MasterLayout",
    components: {
        NavLayout,
    }
};
// eslint-disable-next-line vue/comment-directive
</script>