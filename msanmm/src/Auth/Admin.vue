<template>
    <div>
        <MasterLayout>
            <DashboardLayout></DashboardLayout>
        </MasterLayout>
    </div>
</template>

<script>
import DashboardLayout from '../Layout/Dashboard.vue'
import MasterLayout from '@/Layout/Master.vue';
export default {
    name: "AdminPage",
    components: {
        DashboardLayout,
        MasterLayout
    },
}
</script>