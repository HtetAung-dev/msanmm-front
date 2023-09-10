<template>
    <div>
        <MasterLayout>
            <div class="jumbotron">
                <h2 class="display-4">Hello Guy</h2>
                <p class="lead">
                    This is the sample hero unit, a simple jumbotron-style component for calling extra attention to featured
                    content or information.
                </p>
                <hr class="my-4">
                <p>
                    It uses utility classses for typography and spacing to space content out within the larger container.
                </p>
                <a href="#" role="button" class="btn btn-primary">Learn More</a>
            </div>
        </MasterLayout>

    </div>
</template>

<script>
import MasterLayout from '../Layout/Master.vue';
export default {
    components: {
        MasterLayout
    },
    name: "HomePage",
};
</script>