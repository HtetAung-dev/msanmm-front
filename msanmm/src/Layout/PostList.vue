<template>
    <div>
        <div class="side-post-list">
            <div class="row post-item">
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "SidePostList",
    methods: {
        async getPosts() {
            try {
                await axios.get('url', {}).then((result) => {
                    this.isLoad = false;
                    this.posts = result.data['results']
                    this.prevUrl = result.data['previous']
                    this.nextUrl = result.data['next']
                }).catch((err) => {
                    console.log(err)
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        }
    }
}
</script>

<style scoped></style>