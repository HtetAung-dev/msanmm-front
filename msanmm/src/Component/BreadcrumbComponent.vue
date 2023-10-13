<template>
    <v-breadcrumbs>
        <v-breadcrumbs-item v-for="(item, index) in crumbs" :key="index" :disabled="index === crumbs.length - 1"
            :to="item.to">
            {{ item.text }}
        </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>
  
<script>
export default {
    props: {
        crumbs: {
            type: Array,
            required: true
        }
    },
    methods: {
        isLast(index) {
            return index === this.crumbs.length - 1
        },
        selected(crumb) {
            this.$emit('selected', crumb)
        }
    }
};
</script>
   
<style scoped></style>