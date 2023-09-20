<template>
    <div>
        <MasterLayout>
            <div class="container">
                <div class="row">
                    <div class="col-12 editor-choice">
                        <h4>Editor choices</h4>
                        <v-card flat rounded="20">
                            <v-window v-model="onboarding">
                                <v-window-item v-for="n in length" :key="`card-${n}`" :value="n">
                                    <v-card height="100" class="d-flex editor-card">
                                        <div class="row">
                                            <img class="col-4"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3Irh3Hhos6P-VhdswVYAEWQIt7eyv0bXLkbYoDRM&s"
                                                alt="" style="width: 100px;">

                                        </div>
                                        <div class="col-4">
                                            <span class="text-h5">
                                                Title {{ n }}
                                            </span>
                                        </div>

                                        <span class="text-caption">post description and that is so detailed</span>
                                    </v-card>
                                </v-window-item>
                            </v-window>

                            <v-card-actions class="justify-space-between">
                                <v-btn variant="plain" @click="prev"><i class="fas fa-circle-left"></i></v-btn>
                                <v-btn variant="plain" @click="next"><i class="fas fa-circle-right"></i></v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="posts-section col-md-8 mt-4 p-4" max-width="600px">
                        <div class="row">
                            <h3 class="col">
                                စာစဉ်များ
                            </h3>
                        </div>

                        <div class="row ">
                            <div class="col-md-3 col-sm-2 card-holder" v-for="post in  paginatedPosts" :key="post.id">
                                <div class="card m-1">
                                    <!-- <div class="card-header">
                                <strong>{{ post.title }}</strong>
                            </div> -->
                                    <div class="card-body p-0 m-1 bg-img">

                                        <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                                            style="width:100%;height: 150px; padding: 0;margin: 0;" class="card-img">
                                        <img style="width:100%;height: 150px;" v-else :src="this.noImageUrl" alt="no image"
                                            class="card-img">


                                        <span v-if="post.status == 'ONGOING'"
                                            class="badge rounded-pill badge-warning post-status" data-mdb-toggle="tooltip"
                                            data-mdb-placement="top" title="This serires is ongoing."><i
                                                class="fas fa-face-grin-hearts"></i> {{
                                                    post.status }}</span>
                                        <span v-if="post.status == 'COMPLETED'"
                                            class="badge rounded-pill badge-danger post-status" data-mdb-toggle="tooltip"
                                            data-mdb-placement="top" title="This serires is completed."><i
                                                class="fas fa-face-grin-hearts"></i> {{
                                                    post.status }}</span>


                                    </div>
                                    <div class="card-footer">
                                        <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }">
                                            <strong v-if="post.title.length > 15" class="post-title text-caption"> {{
                                                post.title.substring(0,
                                                    15)
                                                + "..."
                                            }}</strong>
                                            <strong v-else class="post-title text-caption"> {{ post.title }}</strong>
                                        </router-link>

                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 text-center">
                                <button class="mr-5 text-info" @click="previousPage" :disabled="currentPage === 1">&lt;&lt;
                                    ရှေ့သို့ </button>
                                <span class="mr-6 text-info">page {{ currentPage }} of {{ totalPages }}</span>
                                <button class="text-info" @click="nextPage" :disabled="currentPage === totalPages">နောက်သို့
                                    >></button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </MasterLayout>

    </div>
</template>

<script>
import MasterLayout from '../Layout/Master.vue';
import axios from 'axios';
export default {
    components: {
        MasterLayout
    },
    name: "HomePage",
    data() {
        return {
            isLoad: true,
            itemsPerPage: 12,
            currentPage: 1,
            postList: [],
            url: 'posts/list/sort/',
            length: 8,
            widnow: 0,
            onboarding: 0
        }
    },
    methods: {
        next() {
            this.onboarding = this.onboarding + 1 > this.length
                ? 1
                : this.onboarding + 1
        },
        prev() {
            this.onboarding = this.onboarding - 1 <= 0
                ? this.length
                : this.onboarding - 1
        },
        async getPosts(url) {
            try {
                await axios.get(url).then((result) => {
                    this.isLoad = false;
                    this.postList = result.data['data']
                }).catch((err) => {
                    console.log("error request posts", err)
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        },
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
        this.getPosts(this.url);
    }
};
</script>
<style scoped>
.posts-section {
    background-color: #f7f4f4;
    border-radius: 20px;
}

.card-holder {
    max-width: 200px;
}

.editor-choice {
    background-color: #f7f4f4;
    width: 600px;
    height: 250px;
    padding: 20px;
    border-radius: 20px;
}

.editor-card {
    background-color: antiquewhite;
    border-radius: 15px;

}
</style>