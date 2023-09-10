<template>
    <div>
        <div v-show="!isReady" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-show="isReady" class="ready">
            <p v-if="post.description.length > 100" class="p-description">{{ post.description.substring(0, 100) + "..." }}
            </p>
            <p v-else class="p-description"> {{ post.description }}</p>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "DetailWindowComponent",
    props: ['pid'],
    data() {
        return {
            isReady: false,
            post: {}
        };
    },
    methods: {
        getPost(id) {
            axios.get(`posts/detail/${id}/`).then((result) => {
                this.post = result.data["data"]
                this.isReady = true
            }).catch((err) => {
                alert("The post was not found!")
                console.log(err)
            });
        }
    },
    created() {
        this.getPost(this.pid)
    }

}
</script>