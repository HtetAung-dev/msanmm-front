<template>
    <div>

        <div class="row">
            <h3 class="col">
                Audio ကဏ္ဍ
            </h3>
            <button type="button" class="btn btn-primary btn-lg btn-floating float-end col-1"
                @click="this.$router.push({ name: 'AudioCreate' })">
                <i class="far fa-pen-to-square"></i>
                <v-tooltip activator="parent" location="left">Create New</v-tooltip>

            </button>
        </div>


        <div class="row ">
            <div class="col-md-3 col-sm-2 card-holder" v-for="post in  paginatedPosts" :key="post.id">
                <div class="card m-1">
                    <div class="card-body p-0 m-1 bg-img">

                        <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                            style="width:100%;height: 150px; padding: 0;margin: 0;" class="card-img">
                        <img style="width:100%;height: 150px;" v-else :src="this.noImageUrl" alt="no image"
                            class="card-img">


                        <span v-if="post.status == 'ONGOING'" class="badge rounded-pill badge-warning post-status"
                            data-mdb-toggle="tooltip" data-mdb-placement="top" title="This serires is ongoing."><i
                                class="fas fa-face-grin-hearts"></i> {{
                                    post.status }}</span>
                        <span v-if="post.status == 'COMPLETED'" class="badge rounded-pill badge-danger post-status"
                            data-mdb-toggle="tooltip" data-mdb-placement="top" title="This serires is completed."><i
                                class="fas fa-face-grin-hearts"></i> {{
                                    post.status }}</span>


                    </div>
                    <div class="card-footer">
                        <router-link :to="{ name: 'AudioDetail', params: { id: post.id } }">
                            <strong v-if="post.title.length > 15" class="post-title"> {{
                                post.title.substring(0,
                                    15)
                                + "..."
                            }}</strong>
                            <strong v-else class="post-title"> {{ post.title }}</strong>
                        </router-link>

                    </div>
                </div>
            </div>
            <div class="mt-3 text-center">
                <button class="mr-5 text-primary" @click="previousPage" :disabled="currentPage === 1">&lt;&lt;
                    Previous</button>
                <span class="mr-6">page {{ currentPage }} of {{ totalPages }}</span>
                <button class="text-primary" @click="nextPage" :disabled="currentPage === totalPages">Next
                    >></button>
            </div>

        </div>
        <v-divider></v-divider>
        <LoaderComponent v-show="!isLoad"></LoaderComponent>
    </div>
</template>
<script>
import LoaderComponent from '../Component/Loader.vue'
import axios from 'axios';

export default {
    name: "AudiosComponent",
    components: {
        LoaderComponent
    },
    data() {
        return {
            postList: [],
            isLoad: false,
            noImageUrl: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
            itemsPerPage: 12,
            currentPage: 1,
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        getPostsByUser() {
            const id = this.$route.params.id
            axios.get(`audios/${id}/audio/`).then((res) => {
                console.log(res)
                this.postList = res.data['data'];
                this.isLoad = true;
            }).catch((err) => {
                console.error("error receiving author posts", err);
                alert("ERROR RECEIVING POSTS!!!")
            });
        },
        totalPosts() {
            return this.postList.length;
        },
        displayedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.postList == undefined) {
                return this.postList
            }

            return this.postList.slice(start, end);
        },
    },
    computed: {
        totalPages() {
            if (this.postList !== undefined) {
                return Math.ceil(this.postList.length / this.itemsPerPage);
            }
            return 0
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.postList == undefined) {
                return this.postList
            }
            return this.postList.slice(start, end);
        },
    },
    created() {
        this.getPostsByUser()
    }

}
</script>

<style scoped>
.posts-section {
    min-width: 300px;
    max-width: 800px;
    border-radius: 5px;
    background-color: rgb(255, 251, 246);
}

.post-title {
    font-size: 10px;
}
</style>
